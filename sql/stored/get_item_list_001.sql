DROP PROCEDURE IF EXISTS get_item_list_001;
DELIMITER //
-- ********************************************************************************************
-- get_item_list_001 項目リスト取得処理
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
--   _search_word         ：検索文字列
--   _tag                 ：タグ名
--
--
-- 【戻り値】
--      exit_cd            : exit_cd
--      正常：0
--      異常：99
-- --------------------------------------------------------------------------------------------
-- 【更新履歴】
--  2018.7.02 大杉　新規作成
-- ********************************************************************************************
CREATE PROCEDURE `get_item_list_001`(
    IN `_bng_no` CHAR(5)
    , IN `_user_cd` CHAR(5)
    , IN `_search_word` VARCHAR(40)
    , IN `_tag` VARCHAR(200)
    , OUT `exit_cd` INTEGER
)
COMMENT '更新待機処理'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

    SET @query = CONCAT("
        SELECT
            BNG_NO
            ,MSRE_NUM
            ,ITM_CD
            ,ITM_NAME
            ,ITM_SH_NAME
        FROM
            T_ITM
        WHERE
            BNG_NO = '",_bng_no,"'
    ");

    IF (IFNULL(_user_cd,0)) = 0 THEN
        SET @query = CONCAT(
            @query
            ,""

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
