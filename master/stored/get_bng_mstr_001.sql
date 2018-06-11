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
                ,USR_NUM
                ,BG_US_FLG
                ,ITEM_NUM
                ,URL_ITEM_NUM
                ,PRFMNC_FLG
                ,END_MSRE_FLG
                ,PRBBLTY_FLG
                ,PRBBLTY_CD
                -- ユーザー情報プロパティ

                -- 項目情報プロパティ
            FROM
                T_BNG_MSTR GP
                -- ユーザー情報
                ,(
                    SELECT
                        ,BNG_NO
                        ,COUNT(1) AS USR_NUM
                        ,GROUP_CONCAT(USR_CD) AS USR_CD
                        ,GROUP_CONCAT(USR_NAME) AS USR_NAME
                        ,GROUP_CONCAT(LCH_NUM) AS LCH_NUM
                        ,GROUP_CONCAT(BNG_NUM) AS BNG_NUM
                        ,GROUP_CONCAT(END_FLG) AS END_FLG
                    FROM
                        T_USR
                    WHERE
                        BNG_NO = ",_bng_no,"
                    AND
                        EXST_FLG = "1"
                    GROUP BY
                        BNG_NO
                ) USR
                -- 項目情報
                ,(
                    SELECT
                        TBCM.BNG_NO
                        ,GROUP_CONCAT(TBCM.ITEM_CD)
                        ,GROUP_CONCAT(TBCM.ITEM_NAME)
                        ,GROUP_CONCAY(TBCM.SH_NAME)
                        ,GROUP_CONCAT(TBCM.PRBBLTY)
                        ,GROUP_CONCAT(TU.ITEM_CD) AS CHSED_ITEM
                        ,GROUP_CONCAT(COUNT(TBCM.ITEM_CD))) AS CHSED_ITEM_NUM
                        ,GROUP_CONCAT(
                            CASE
                                WHEN TU.ITEM_CD ISNULL THEN NULL
                                WHEN TU.ITEM_CD ISNOTNULL THEN TBCM.ITEM_NAME
                                ELSE 99
                            END
                        ) AS CHSED_ITEM_NAME
                        ,GROUP_CONCAT(
                            CASE
                                WHEN TU.ITEM_CD ISNULL THEN NULL
                                WHEN TU.ITEM_CD ISNOTNULL THEN TBCM.SH_NAME
                                ELSE 99
                            END
                        ) AS CHSED_SH_NAME
                        ,GROUP_CONCAT(
                            SUM(
                                CASE
                                    WHEN TU.ITEM_CD IS NOT NULL THEN 1
                                    ELSE 0
                                END
                            )
                        ) AS ALL_ITEM_NUM
                    FROM
                        T_BNG_CNTNT_MSTR TBCM
                    LEFT OUTER JOIN
                        T_USR TU
                    ON
                        TU.BNG_NO = TBCM.BNG_NO
                    AND
                        TU.ITEM_CD = TBCM.ITEM_CD
                    WHERE
                        TBCM.BNG_NO = ",_bnng_no,"
                    GROUP BY
                        TBCM.BNG_NO
                ) IP
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
