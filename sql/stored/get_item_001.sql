DROP PROCEDURE IF EXISTS get_item_001;
DELIMITER //
-- ********************************************************************************************
-- get_item_001 更新待機処理
--
-- 【処理概要】
--  アイテムの更新を待機する処理
--
--
-- 【呼び出し元画面】
--   インデックス
--
-- 【引数】
--   _bng_no              ：ビンゴ番号
--   _user_cd             ：ユーザコード
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
CREATE PROCEDURE `get_item_001`(
    IN `_bng_no` CHAR(5)
    , IN `_user_cd` CHAR(5)
    , OUT `exit_cd` INTEGER
)
COMMENT '更新待機処理'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

    set @read_num = 0;

    WHILE @read_num = 0 DO
        SELECT
            COUNT(1) INTO @read_num
        FROM
            T_BNG_ITM
        WHERE
            BNG_NO = _bng_no
        AND
            KUSN_NYU_CD = '2'
        ;

        SELECT SLEEP(1);

    END WHILE;

        -- ユーザーマスの呼び出し済みフラグをアップデート
        UPDATE
            T_USR_MSRE
        SET
            CLL_FLG = 1
            ,KUSN_NTJ = NOW()
        WHERE
            BNG_NO = _bng_no
        AND
            CNTNT_ID IN (
                SELECT DISTINCT
                    CNTNT_ID
                FROM
                    T_BNG_ITM
                WHERE
                    BNG_NO = _bng_no
                AND
                    KUSN_NYU_CD = "2"
            )
        ;

        SET @query = CONCAT("
            -- VIEWと結合してリーチ、ビンゴ数を取得
            SELECT
                TBI.ITM_CD ITM_CD
                ,USR_LN.LCH_NUM LCH_NUM
                ,USR_LN.BNG_NUM BNG_NUM
                ,MAX(KUSN_NTJ) AS KUSN_NTJ
            FROM
                T_BNG_ITM TBI
                ,(
                    SELECT
                        COUNT (IF LCH_FLG = 1 THEN 1 ELSE NULL) AS LCH_NUM
                        COUNT (IF BNG_FLG = 1 THEN 1 ELSE NULL) AS BNG_NUM
                    FROM
                        V_USR_LN
                    WHERE
                        USR_CD = ",_usr_cd,"
                    GROUP BY
                        BNG_NO
                        ,LN_NUM
                ) USR_LN
            WHERE
                TBI.BNG_NO = ",_bng_no,"
            AND
                TBI.KUSN_NYU_CD = '2'
            GROUP BY
                ITM_CD
                ,LCH_NUM
                ,BNG_NUM
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
