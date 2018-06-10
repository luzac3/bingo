DROP PROCEDURE IF EXISTS get_bng_mstr_001;
DELIMITER //
-- ********************************************************************************************
-- get_bng_mstr_001 ゲームプロパティ取得
--
-- 【処理概要】
--  ゲームプロパティを取得する。初期化処理
--
--
-- 【呼び出し元画面】
--   インデックス
--
-- 【引数】
--   _bng_no              ：ビンゴ番号
--   _item_cd             ：項目コード
--   _status_cd           ：ステータスコード
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
CREATE PROCEDURE `get_bng_mstr_001`(
    IN `_bng_no` CHAR(5)
    , OUT `exit_cd` INTEGER
)
COMMENT 'ゲームプロパティ取得'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

        SET @query = CONCAT("
            SELECT
                BNG_NO
                ,BG_US_FLG
                ,BG_URL
                ,PRFMNC_FLG
                ,END_MSRE_FLG
                ,PRBBLTY_FLG
                ,PRBBLTY_CD
            FROM
                T_BNG_MSTR
            WHERE
                BNG_NO = ",_bng_no,"
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
