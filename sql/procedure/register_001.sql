DROP PROCEDURE IF EXISTS register_001;
DELIMITER //
-- ********************************************************************************************
-- register_001 ユーザーのデータベース登録/更新処理
--
-- 【処理概要】
--  ユーザーのデータベース登録/更新処理を行う
--
--
-- 【呼び出し元画面】
--   インデックス
--
-- 【引数】
--
--
-- 【戻り値】
--      exit_cd            : exit_cd
--      正常：0
--      異常：99
-- --------------------------------------------------------------------------------------------
-- 【更新履歴】
--  2018.6.05 大杉　新規作成
-- ********************************************************************************************
CREATE PROCEDURE `register_001`(
    OUT `exit_cd` INTEGER
)
COMMENT 'ユーザーのデータベース登録/更新'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;
    SET @date = NOW(3);

    INSERT INTO
        T_BNG_MSTR
    (
        BNG_NO
        ,TURK_NTJ
        ,KUSN_NTJ
    )
    SELECT
        LPAD((MAX(BNG_NO) + 1),5,0)
        ,@date
        ,@date
    FROM
        T_BNG_MSTR
    ;

set @query = CONCAT("

        SELECT
            BNG_NO
        FROM
            T_BNG_MSTR
        WHERE
            TURK_NTJ = '",@date,"'
        ;
    ");
    SET @query_text = @query;

    -- 実行
    PREPARE main_query FROM @query_text;
    EXECUTE main_query;
    DEALLOCATE PREPARE main_query;

    SET exit_cd = 0;

END
//
DELIMITER ;
