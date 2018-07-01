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
                ,USR.USR_NUM

                ,TBM.BG_US_FLG
                ,TBM.BG_URL

                -- マス数
                ,TBM.MSRE_NUM

                -- アイテム数
                ,IP.ALL_ITM_NUM
                ,IP.ALL_URL_ITM_NUM

                -- 選択アイテム数
                ,IP.CHSD_ITM_NUM
                ,IP.CHSD_URL_ITM_NUM

                -- 演出
                ,TBM.PRFMNC_FLG

                -- 演出コード未実装のため停止
                -- ,TBM.PRFMNC_CD

                -- 終了マス
                ,TBM.END_MSRE_FLG

                -- 確率
                ,TBM.PRBBLTY_FLG
                ,TBM.PRBBLTY_CD

                -- ゲームモード
                ,TBM.BNG_MD_CD

                -- 読上済項目数
                ,IP.READ_ITM_NUM

                -- ユーザー情報プロパティ
                ,USR.USR_CD
                ,USR.USR_NAME
                ,USR.LCH_NUM
                ,USR.BNG_NUM
                ,USR.END_FLG
                ,USR.EXST_FLG

                -- 項目情報プロパティ
                ,IP.ITM_CD
                ,IP.ITM_NAME
                ,IP.SH_NAME
                ,IP.PRBBLLTY

                -- ユーザーに選択された回数
                ,IP.CHSD_ITM_SELECTED_NUM

                -- 選択項目情報プロパティ
                ,IP.CHSD_ITM_CD
                ,IP.CHSD_ITM_NAME
                ,IP.CHSD_SH_NAME
                ,IP.CHSD_PRBBLLTY
            FROM
                T_BNG_MSTR TBM
                -- ユーザー情報
                ,(
                    SELECT
                        TU.BNG_NO
                        ,COUNT(1) AS USR_NUM
                        ,GROUP_CONCAT(TU.USR_CD) AS USR_CD
                        ,GROUP_CONCAT(TU.USR_NAME) AS USR_NAME
                        ,GROUP_CONCAT(TU.LCH_NUM) AS LCH_NUM
                        ,GROUP_CONCAT(TU.BNG_NUM) AS BNG_NUM
                        ,GROUP_CONCAT(TU.END_FLG) AS END_FLG
                        ,GROUP_CONCAT(TU.EXST_FLG) AS EXST_FLG
                    FROM
                        T_USR TU
                    WHERE
                        TU.BNG_NO = '",_bng_no,"'
                    AND
                        TU.EXST_FLG = '1'
                    GROUP BY
                        TU.BNG_NO
                ) USR
                -- 項目情報
                ,(
                    SELECT
                        TBI.BNG_NO
                        -- アイテムコードリスト
                        ,GROUP_CONCAT(TBI.ITM_CD) ITM_CD

                        -- アイテム名リスト
                        ,GROUP_CONCAT(TBI.ITM_NAME) ITM_NAME

                        -- アイテム省略名リスト
                        ,GROUP_CONCAT(TBI.ITM_SH_NAME) SH_NAME

                        -- 固有確率リスト
                        ,GROUP_CONCAT(TBI.PRBBLLTY) PRBBLLTY

                        -- 選択された項目の項目名リスト
                        ,GROUP_CONCAT(
                            CASE
                                WHEN TBI.CHSD_NUM > 0 THEN TBI.ITM_NAME
                                ELSE NULL
                            END
                        ) AS CHSD_ITM_CD

                        -- 項目の選択された回数リスト
                        ,GROUP_CONCAT(
                            CASE
                                WHEN TBI.CHSD_NUM > 0 THEN TBI.CHSD_NUM
                                ELSE NULL
                            END
                        ) AS CHSD_ITM_SELECTED_NUM

                        -- 選択された項目の名前リスト
                        ,GROUP_CONCAT(
                            CASE
                                WHEN TBI.CHSD_NUM > 0 THEN TBI.ITM_NAME
                                ELSE NULL
                            END
                        ) AS CHSD_ITM_NAME

                        -- 選択された項目の省略名リスト
                        ,GROUP_CONCAT(
                            CASE
                                WHEN TBI.CHSD_NUM > 0 THEN TBI.ITM_SH_NAME
                                ELSE NULL
                            END
                        ) AS CHSD_SH_NAME

                        -- 選択された項目の固有確率リスト
                        ,GROUP_CONCAT(
                            CASE
                                WHEN TBI.CHSD_NUM > 0 THEN TBI.PRBBLLTY
                                ELSE NULL
                            END
                        ) AS CHSD_PRBBLLTY

                        -- 全項目数
                        ,COUNT(1) AS ALL_ITM_NUM

                        -- 全項目のうち、画像URLを持つ項目の数
                        ,COUNT(TBI.IMG_URL) AS ALL_URL_ITM_NUM

                        -- 選択された項目の数
                        ,COUNT(
                            CASE
                                WHEN TBI.CHSD_NUM > 0 THEN 1
                                ELSE NULL
                            END
                        ) AS CHSD_ITM_NUM

                        -- 選択された項目のうち、画像URLを持つ項目の数
                        ,COUNT(
                            CASE
                                WHEN TBI.CHSD_NUM > 0 THEN TBI.IMG_URL
                                ELSE NULL
                            END
                        ) AS CHSD_URL_ITM_NUM

                        -- 読上げ済み(CD02)項目数
                        ,COUNT(
                            CASE
                                WHEN TBI.KUSN_NYU_CD = 2 THEN 1
                                ELSE NULL
                            END
                        ) AS READ_ITM_NUM
                    FROM
                        T_BNG_ITM TBI
                    WHERE
                        TBI.BNG_NO = '",_bng_no,"'
                    GROUP BY
                        TBI.BNG_NO
                ) IP
            WHERE
                TBM.BNG_NO = ",_bng_no,"
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
