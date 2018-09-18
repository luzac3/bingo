DROP PROCEDURE IF EXISTS rate_chs_001b;
DELIMITER //
-- ********************************************************************************************
-- rate_chs_001 確率選択
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
CREATE PROCEDURE `rate_chs_001b `(
    IN `_bng_no` CHAR(5)
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

    SELECT
        FLOOR(POW(RAND(),3) * COUNT(1)) INTO @rand
    FROM
        V_CHSD
    WHERE
        BNG_NO = _bng_no
    ;

    SET @query = CONCAT("
        SELECT
            ITM_CD
        FROM
            V_CHSD
        WHERE
            BNG_NO = '",_bng_no,"'
        LIMIT 1 OFFSET ",@rand,"
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
