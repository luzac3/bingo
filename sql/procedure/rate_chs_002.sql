DROP PROCEDURE IF EXISTS rate_chs_002;
DELIMITER //
-- ********************************************************************************************
-- rate_chs_002 確率選択
--
-- 【処理概要】
--  選ばれた数が多いほど選択されにくくなる項目の選択
--
--
-- 【呼び出し元画面】
--   インデックス
--
-- 【引数】
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
CREATE PROCEDURE `rate_chs_002`(
    IN `_bng_no` CHAR(5)
    ,IN `_itm_cd` CHAR(4)
    ,OUT `exit_cd` INTEGER
)
COMMENT 'ユーザーのデータベース登録/更新'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SELECT @sqlstate, @errno, @text;
        ROLLBACK;
        SET exit_cd = 99;
    END;

        UPDATE
            T_BNG_ITM
        SET
            KUSN_NYU_CD = 2
        WHERE
            BNG_NO = _bng_no
        AND
            ITM_CD = _itm_cd
        ;

        SELECT
            ITM_CD
            ,ITM_NAME
        FROM
            T_BNG_ITM
        WHERE
            BNG_NO = _bng_no
        AND
            ITM_CD = _itm_cd
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
