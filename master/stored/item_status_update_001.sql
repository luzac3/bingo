DROP PROCEDURE IF EXISTS item_status_update_001;
DELIMITER //
-- ********************************************************************************************
-- item_status_update_001 項目状態更新
--
-- 【処理概要】
--  項目の選択状態を更新する
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
CREATE PROCEDURE `item_status_update_001`(
    IN `_bng_no` CHAR(5)
    , IN `_item_cd` CHAR(4)
    , IN `_status_cd` CHAR(1)
    , OUT `exit_cd` INTEGER
)
COMMENT '項目状態更新'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

        SET @query = CONCAT("
            UPDATE
                T_BNG_CNTNT_MSTR
            SET
                KUSN_NYU_CD = ",_status_cd,"
            WHERE
                BNG_NO = ",_bng_no,"
                ,CNTNT_ID = ",_status_cd,"
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
