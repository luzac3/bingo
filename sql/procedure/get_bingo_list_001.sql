DROP PROCEDURE IF EXISTS get_bingo_list_001;
DELIMITER //
-- ********************************************************************************************
-- get_bingo_list_001 ビンゴリスト取得処理
--
-- 【処理概要】
--  ビンゴリストを取得する
--
-- 【呼び出し元画面】
--   entrance.bng_select
--
-- 【引数】
--   なし
--
-- 【戻り値】
--      exit_cd            : exit_cd
--      正常：セレクト結果
--      異常：99
-- --------------------------------------------------------------------------------------------
-- 【更新履歴】
--  2019.3.01 大杉　新規作成
-- ********************************************************************************************
CREATE PROCEDURE `get_bingo_list_001`(
    OUT `exit_cd` INTEGER
)
COMMENT 'ビンゴリスト取得処理'

BEGIN

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
        ,BNG_NAME
    FROM
        T_BNG_MSTR
    ;

    SET exit_cd = 0;

END
//
DELIMITER ;
