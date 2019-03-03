DROP PROCEDURE IF EXISTS get_called_item_list_001;
DELIMITER //
-- ********************************************************************************************
-- get_called_item_list_001 呼び出し済の項目を選択
--
-- 【処理概要】
--  呼び出し済の項目を選択
--
-- 【呼び出し元画面】
--   master.html.reading
--
-- 【引数】
--   _bng_no              ：ビンゴ番号
--
-- 【戻り値】
--      exit_cd            : exit_cd
--      正常：0
--      異常：99
-- --------------------------------------------------------------------------------------------
-- 【更新履歴】
--  2019.3.03 大杉　新規作成
-- ********************************************************************************************
CREATE PROCEDURE `get_called_item_list_001`(
    IN `_bng_no` CHAR(5)
    , OUT `exit_cd` INTEGER
)
COMMENT '項目リスト取得処理'

BEGIN

    -- データ無しの場合
    DECLARE EXIT HANDLER FOR NOT FOUND SET exit_cd = 1;

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SELECT @sqlstate, @errno, @text;
        ROLLBACK;
        SET exit_cd = 99;
    END;

    SELECT
        BNG_NO
        ,ITM_CD
        ,ITM_NAME
        ,KUSN_NYU_CD
    FROM
        T_BNG_ITM
    WHERE
        KUSN_NYU_CD = '2'
    ;

    SET exit_cd = 0;

END
//
DELIMITER ;
