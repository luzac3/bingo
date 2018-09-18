DROP PROCEDURE IF EXISTS clear_user_update_001;
DELIMITER //
-- ********************************************************************************************
-- clear_user_update_001 確率選択
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
CREATE PROCEDURE `clear_user_update_001`(
    IN `_bng_no` CHAR(5)
    ,IN `_user_cd` CHAR(5)
    ,IN `_cd_list` VARCHAR(100)
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

    SET @query = CONCAT("
        UPDATE
            T_USR_MSRE
        SET
            CLL_FLG = 1
        WHERE
            BNG_NO = '",_bng_no,"'
        AND
            USR_CD = '",_user_cd,"'
        AND
            ITM_CD IN (",_cd_list,")
        ;
        ")
        ;

    SET @query_text = @query;

    -- 実行
    PREPARE main_query FROM @query_text;
    EXECUTE main_query;
    DEALLOCATE PREPARE main_query;

    UPDATE
        T_USR
    SET
        END_FLG = 1
    WHERE
        BNG_NO = _bng_no
    AND
        USR_CD = _user_cd
    ;

    SET exit_cd = 0;

END
//
DELIMITER ;
