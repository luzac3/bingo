DROP PROCEDURE IF EXISTS bng_no_matching_001;
DELIMITER //
-- ********************************************************************************************
-- bng_no_matching_001 ビンゴ番号の確認をする
--
-- 【処理概要】
--  ユーザーが参加する際のビンゴ番号を確認する
--
--
-- 【呼び出し元画面】
--   インデックス
--
-- 【引数】
--   _bng_no           ：ビンゴ番号
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
CREATE PROCEDURE `bng_no_matching_001`(
    IN `_bng_no` CHAR(5)
    , OUT `exit_cd` INTEGER
)
COMMENT 'ビンゴ番号確認'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

    set @query = CONCAT("
        SELECT
            BNG_NO
            ,BNG_NAME
            ,CASE
                WHEN COUNT(1) > 0 THEN 0
                ELSE 99
            END AS MATCH_FLG
        FROM
            T_BNG_MSTR
        WHERE
            BNG_NO = '",_bng_no,"'
        GROUP BY
            BNG_NO
            ,BNG_NAME
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
