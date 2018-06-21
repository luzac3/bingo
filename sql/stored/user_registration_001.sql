DROP PROCEDURE IF EXISTS user_registration_001;
DELIMITER //
-- ********************************************************************************************
-- user_registration_001 ユーザー参加処理
--
-- 【処理概要】
--  ユーザーを参加者に登録し、ゲームプロパティを返却する
--
--
-- 【呼び出し元画面】
--   インデックス
--
-- 【引数】
--   _bng_no              ：ビンゴ番号
--   _user_name           ：ユーザー名
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
CREATE PROCEDURE `user_registration_001`(
    IN `_bng_no` CHAR(5)
    IN `_user_name` VARCHAR(40)
    , OUT `exit_cd` INTEGER
)
COMMENT 'ユーザー参加処理'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

    -- ユーザーコードを取得
    SELECT
        MAX(USR_CD) + 1 AS USR_CD INTO @usr_cd
    FROM
        T_USR
    WHERE
        BNG_NO = _bng_no
    ;

    -- ユーザーのインサートを行う
    INSERT INTO
        T_USR
    VALUES (
        _bng_no
        ,@usr_cd
        ,1
        ,0
        ,0
        null
        ,NOW()
        ,NOW()
    )
    WHERE
        BNG_NO = _bng_no
    ;

        SET @query = CONCAT("
            SELECT
                BNG_NO
                ,@usr_cd AS USR_CD
            FROM
                T_BNG_ITM TBI
            WHERE
                BNG_NO = ",_bnng_no,"
        ")
        ;

    SET @query_text = @query;

    -- 実行
    PREPARE main_query FROM @query_text;
    EXECUTE main_query;
    DEALLOCATE PREPARE main_query;

    SET exit_cd = 0;

END
//
DELIMITER ;
