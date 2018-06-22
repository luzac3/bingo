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
                ,BG_URL

                ,ITEM_NUM
                ,URL_ITEM_NUM

                -- 選択アイテム数
                ,CHSED_ITEM_NUM
                ,CHSED_URL_ITEM_NUM

                // 演出
                ,PRFMNC_FLG
                ,PRFMNC_CD

                // 終了マス
                ,END_MSRE_FLG

                // 確率
                ,PRBBLTY_FLG
                ,PRBBLTY_CD

                -- ゲームモード
                ,BNG_MD_CD

                -- 残り項目数
                ,LFT_ITM_NUM

                -- ユーザー情報プロパティ
                ,USR_CD
                ,USR_NAME
                ,USR_LCH_NUM
                ,USR_BNG_NUM
                ,USR_END_FLG
                ,USR_EXST_FLG

                -- 項目情報プロパティ
                ,ITM_CD
                ,ITM_NAME
                ,ITM_SH_NAME
                ,ITM_PRBBLTY
                ,ITM_NUM

                -- 選択項目情報プロパティ
                ,CHSD_ITM_CD
                ,CHSD_ITM_NAME
                ,CHSD_ITM_SH_NAME
                ,CHSD_ITM_PRBBLTY
                ,CHSD_ITEM_NUM
            FROM
                T_BNG_MSTR GP
                -- ユーザー情報
                ,(
                    SELECT
                        BNG_NO
                        ,COUNT(1) AS USR_NUM
                        ,GROUP_CONCAT(USR_CD) AS USR_CD
                        ,GROUP_CONCAT(USR_NAME) AS USR_NAME
                        ,GROUP_CONCAT(LCH_NUM) AS LCH_NUM
                        ,GROUP_CONCAT(BNG_NUM) AS BNG_NUM
                        ,GROUP_CONCAT(END_FLG) AS END_FLG
                        ,GROUP_CONCAT(EXST_FLG) AS EXST_FLG
                    FROM
                        T_USR
                    WHERE
                        BNG_NO = '",_bng_no,"'
                    AND
                        EXST_FLG = '1'
                    GROUP BY
                        BNG_NO
                ) USR
                -- 項目情報
                ,(
                    SELECT
                        TBI.BNG_NO
                        ,GROUP_CONCAT(TBI.ITM_CD) ITM_CD
                        ,GROUP_CONCAT(TBI.ITM_NAME) ITM_NAME
                        ,GROUP_CONCAT(TBI.ITM_SH_NAME) SH_NAME
                        ,GROUP_CONCAT(TBI.PRBBLLTY) PRBBLLTY
                        ,GROUP_CONCAT(
                            CASE
                                WHEN TBI.CHSD_NUM > 0 THEN TBI.ITM_NAME
                                ELSE NULL
                            END
                        ) AS CHSD_ITEM_CD
                        ,GROUP_CONCAT(
                            CASE
                                WHEN TBI.CHSD_NUM > 0 THEN TBI.CHSD_NUM
                                ELSE NULL
                            END
                        ) AS CHSD_ITEM_NUM
                        ,GROUP_CONCAT(
                            CASE
                                WHEN TBI.CHSD_NUM > 0 THEN TBI.ITM_NAME
                                ELSE NULL
                            END
                        ) AS CHSD_ITEM_NAME
                        ,GROUP_CONCAT(
                            CASE
                                WHEN TBI.CHSD_NUM > 0 THEN TBI.ITM_SH_NAME
                                ELSE NULL
                            END
                        ) AS CHSD_SH_NAME
                        ,GROUP_CONCAT(
                            CASE
                                WHEN TBI.CHSD_NUM > 0 THEN TBI.PRBBLLTY
                                ELSE NULL
                            END
                        ) AS CHSD_PRBBLLTY
                        ,COUNT(1) AS ALL_ITEM_NUM
                    FROM
                        T_BNG_ITM TBI
                    WHERE
                        TBI.BNG_NO = ",_bnng_no,"
                    GROUP BY
                        TBI.BNG_NO
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
