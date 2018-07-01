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
    , IN `_user_name` VARCHAR(40)
    , OUT `exit_cd` INTEGER
)
COMMENT 'ユーザー参加処理'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SELECT @sqlstate, @errno, @text;
        ROLLBACK;
        SET exit_cd = 99;
    END;

    -- ユーザーのインサートを行う
    INSERT INTO
        T_USR
    SELECT
        _bng_no
        ,(
            SELECT
                LPAD(CAST((IFNULL(MAX(USR_CD),0) + 1) AS CHAR),5,0)
            FROM
                T_USR
            WHERE
                BNG_NO = _bng_no
        )
        ,_user_name
        ,'1'
        ,'0'
        ,'0'
        ,null
        ,NOW()
        ,NOW()
    ;

        SET @query = CONCAT("
            SELECT
                BNG_NO
                ,USR_CD
                ,USR_NAME
            FROM
                T_USR
            WHERE
                BNG_NO = '",_bng_no,"'
            AND
                USR_NAME = '",_user_name,"'
            ;
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
