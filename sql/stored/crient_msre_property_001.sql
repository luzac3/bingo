DROP PROCEDURE IF EXISTS crient_msre_property_001;
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
CREATE PROCEDURE `crient_msre_property_001`(
    IN `_bng_no` CHAR(5)
    , OUT `exit_cd` INTEGER
)
COMMENT 'ゲームプロパティ取得'

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
            SELECT
                TBM.BNG_NO

                -- マス数
                ,TBM.MSRE_NUM

                -- マス番号リスト
                ,GROUP_CONCAT(TM.MSRE_NO) AS MSRE_NO
                -- 終了フラグ
                ,GROUP_CONCAT(IFNULL(TM.END_FLG,0)) AS END_FLG
                -- FREEフラグ
                ,GROUP_CONCAT(IFNULL(TM.FREE_FLG,0)) AS FREE_FLG
                
                -- userのマス情報
                ,GROUP_CONCAT(IFNULL(TUM.ITM_CD,0)) AS ITM_CD
                
                -- マスにひもづく項目情報
                ,GROUP_CONCAT(IFNULL(TUM.ITM_NAME,0)) AS ITM_NAME
                ,GROUP_CONCAT(IFNULL(TUM.ITM_SH_NAME,0)) AS ITM_SH_NAME
            FROM
                T_BNG_MSTR TBM
            LEFT OUTER JOIN
                T_MSRE TM
            ON
                TBM.BNG_NO = TM.BNG_NO
            LEFT OUTER JOIN
                T_USER_MSRE TUM
            ON
                TBM.BNG_NO = TUM.BNG_NO
            AND
                -- 修正により、ユーザーコードは必ずある想定
                TUM.USR_CD = '",_user_cd,"'
            LEFT OUTER JOIN
                T_BNG_ITM TBI
            ON
                TBM.BNG_NO = TBI.BNG_NO
            AND
                TUM.ITM_CD = TBI.ITM_CD
            WHERE
                TBM.BNG_NO = '",_bng_no,"'
            GROUP BY
                TBM.BNG_NO
                ,TBM.MSRE_NUM
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
