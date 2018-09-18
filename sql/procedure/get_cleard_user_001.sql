DROP PROCEDURE IF EXISTS get_cleard_user_001;
DELIMITER //
-- ********************************************************************************************
-- get_cleard_user_001 確率選択
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
CREATE PROCEDURE `get_cleard_user_001`(
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
        TU.USR_CD AS USR_CD
        ,TU.USR_NAME AS USR_NAME
        ,bng_num.BNG_NUM AS BNG_NUM
    FROM
        T_USR TU
    INNER JOIN
        (
            SELECT
                BNG_NO
                ,USR_CD
                ,COUNT(BNG_FLG) BNG_NUM
            FROM
                V_USR_LN
            GROUP BY
                BNG_NO
                ,USR_CD
        ) bng_num
    ON
        TU.BNG_NO = bng_num.BNG_NO
    AND
        TU.USR_CD = bng_num.USR_CD
    WHERE
        TU.BNG_NO = _bng_no
    AND
        TU.END_FLG = 1
    ;

    SET exit_cd = 0;

END
//
DELIMITER ;
