DROP PROCEDURE IF EXISTS user_flg_reset_001;
DELIMITER //
-- ********************************************************************************************
-- user_flg_reset_001 ユーザー募集処理
--
-- 【処理概要】
--  ユーザーの存在フラグをリセットする
--
--
-- 【呼び出し元画面】
--   インデックス
--
-- 【引数】
--   _bng_no              ：ビンゴ番号
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
CREATE PROCEDURE `user_flg_reset_001`(
    IN `_bng_no` CHAR(5)
    , OUT `exit_cd` INTEGER
)
COMMENT 'ユーザー募集処理'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

    SET @query = CONCAT("
        UPDATE
            T_BNG_USR
        SET
            EXST_FLG = null;
        WHERE
            BNG_NO = ",_bng_no,"
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
