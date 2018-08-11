DROP PROCEDURE IF EXISTS get_tag_list_001;
DELIMITER //
-- ********************************************************************************************
-- get_tag_list_001 検索タグ一覧取得
--
-- 【処理概要】
--  タグの一覧を取得する処理
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
--  2018.7.02 大杉　新規作成
-- ********************************************************************************************
CREATE PROCEDURE `get_tag_list_001`(
    IN `_bng_no` CHAR(5)
    , OUT `exit_cd` INTEGER
)
COMMENT '項目リスト取得処理'

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
        SELECT DISTINCT
            BNG_NO
            ,BNG_TAG
        FROM
            T_BNG_TAG
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
