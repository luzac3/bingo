DROP PROCEDURE IF EXISTS register_user_msre_001;
DELIMITER //
-- ********************************************************************************************
-- register_user_msre ユーザーマス登録
--
-- 【処理概要】
--  選択したユーザーのマスを登録する
--
--
-- 【呼び出し元画面】
--   インデックス
--
-- 【引数】
--  SQL                    :_insert
--
-- 【戻り値】
--      exit_cd            : exit_cd
--      正常：0
--      異常：99
-- --------------------------------------------------------------------------------------------
-- 【更新履歴】
--  2018.6.05 大杉　新規作成
-- ********************************************************************************************
CREATE PROCEDURE `register_user_msre_001`(
    IN `_insert` VARCHAR(2500)
    ,OUT `exit_cd` INTEGER
)
COMMENT '選択したユーザーのマスを登録する'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION

    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SELECT @sqlstate, @errno, @text;
        ROLLBACK;
        SET exit_cd = 99;
    END;

    SET @query = CONCAT("
        INSERT INTO
            T_USR_MSRE
        VALUES
            ",_insert,"
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
