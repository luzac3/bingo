DROP PROCEDURE IF EXISTS clear_set_001;
DELIMITER //
-- ********************************************************************************************
-- clear_set_001 クリア情報を記録する
--
-- 【処理概要】
--  ユーザーのクリア情報を記録する
--
--
-- 【呼び出し元画面】
--   インデックス
--
-- 【引数】
--   _bng_no           ：ビンゴ番号
--   _user_cd          ：ユーザーコード
--   _call_cd          ：呼び出し済コード
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
CREATE PROCEDURE `clear_set_001`(
    IN `_bng_no` CHAR(5)
    , IN `_user_cd` CHAR(5)
    , IN `_call_cd` VARCHAR(200)
    , OUT `exit_cd` INTEGER
)
COMMENT 'クリア情報記録'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

    UPDATE
        T_USR_MSRE
    SET
        HT_FLG = 1
    WHERE
        BNG_NO = _bng_no
    AND
        USR_CD = _user_cd
    AND
        MSRE_NUM IN (_call_cd)
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
