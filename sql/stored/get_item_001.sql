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
--   _kusn_ntj            ：前回の更新日時
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
    , IN `_kusn_ntj` DATETIME(3)
    , OUT `exit_cd` INTEGER
)
COMMENT '更新待機処理'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SELECT @sqlstate, @errno, @text;
        ROLLBACK;
        SET exit_cd = 99;
    END;

    set @read_num = 0;
    set @num = 0;

    WHILE (@read_num = 0 and @num < 20) DO
            SELECT
                COUNT(1) INTO @read_num
            FROM
                T_BNG_ITM
            WHERE
                BNG_NO = _bng_no
            AND
                KUSN_NYU_CD = '2'
            AND
                KUSN_NTJ > _kusn_ntj
            ;

        SELECT SLEEP(5);
        set @num = @num + 1;

    END WHILE;

        -- ユーザーマスの呼び出し済みフラグをアップデート
        UPDATE
            T_USR_MSRE
        SET
            CLL_FLG = "1"
            ,KUSN_NTJ = NOW(3)
        WHERE
            BNG_NO = _bng_no
        AND
            ITM_CD IN (
                SELECT DISTINCT
                    ITM_CD
                FROM
                    T_BNG_ITM
                WHERE
                    BNG_NO = _bng_no
                AND
                    KUSN_NYU_CD = "2"
                AND
                    KUSN_NTJ > _kusn_ntj
            )
        ;

        SET @query = CONCAT("
            -- VIEWと結合してリーチ、ビンゴ数を取得
            SELECT
                TBI.ITM_CD ITM_CD
                ,USR_LN.LCH_NUM LCH_NUM
                ,USR_LN.BNG_NUM BNG_NUM
                ,KUSN_NTJ
            FROM
                T_BNG_ITM TBI
            LEFT OUTER JOIN
                (
                    SELECT
                        BNG_NO
                        ,COUNT(LCH_FLG) AS LCH_NUM
                        ,COUNT(BNG_FLG) AS BNG_NUM
                    FROM
                        V_USR_LN
                    WHERE
                        USR_CD = '",_user_cd,"'
                    GROUP BY
                        BNG_NO
                ) USR_LN
            ON
                TBI.BNG_NO = USR_LN.BNG_NO
            WHERE
                TBI.BNG_NO = '",_bng_no,"'
            AND
                TBI.KUSN_NYU_CD = '2'
            AND
                TBI.KUSN_NTJ > '",_kusn_ntj,"'
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
