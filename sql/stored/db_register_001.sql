DROP PROCEDURE IF EXISTS db_register_001;
DELIMITER //
-- ********************************************************************************************
-- db_register_001 ユーザーのデータベース登録/更新処理
--
-- 【処理概要】
--  ユーザーのデータベース登録/更新処理を行う
--
--
-- 【呼び出し元画面】
--   インデックス
--
-- 【引数】
--   _bng_no           ：ビンゴ番号
--   _usr_cd           ：ユーザーコード
--   _msre_num         ：マス番号
--   _exst_flg         ：存在フラグ
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
CREATE PROCEDURE `db_register_001`(
    IN `_bng_no` CHAR(5)
    IN `_usr_cd` CHAR(5)
    IN `_msre_num` CHAR(2)
    IN `_exst_flg` CHAR(1)
    , OUT `exit_cd` INTEGER
)
COMMENT 'ユーザーのデータベース登録/更新'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

    set @query = CONCAT("
        UPDATE
            T_USR
        SET
            EXST_FLG = 1
            ,KUSN_NTJ = NOW()
        WHERE
            BNG_NO = ",_bng_no,"
        AND
            USR_CD = ",_usr_cd,"
        ;
    ");

    SET @query_update = "";
    IF IFNULL(_msre_num) THEN
        SET @query_update = CONCAT("
            UPDATE
                T_USR_MSRE
            SET
                CLL_FLG = 1
                ,KUSN_NTJ = NOW()
            WHERE
                BNG_NO = ",_bng_no,"
            AND
                USR_CD = ",_user_cd,"
            AND
                MSRE_NUM = ",_msre_num,"
            ;
        ");
     END IF;

     SET @query_end = "";
     IF IFNULL(_msre_num) THEN
         SET @query_end = CONCAT("
             SELECT
                 CASE
                     WHEN TBM.BNG_NUM < USR_LN.BNG_NUM THEN '1'
                     WHEN TBM.END_MSRE_FLG = '1' AND MSRE = '1' THEN '1'
                     -- 終了ラインフラグ挿入箇所
                     ELSE NULL
                 END AS END_FLG
             FROM
                 T_BNG_MSTR TBM
             LEFT OUTER JOIN
                 (
                    SELECT
                        BNG_NO
                        COUNT (IF BNG_FLG = 1 THEN 1 ELSE NULL) AS BNG_NUM
                    FROM
                        V_USR_LN
                    GROUP BY
                        BNG_NO
                        ,LN_NUM
                 ) USR_LN
             ON
                 TBM.BNG_NO = USR_LN.BNG_NO
             LEFT OUTER JOIN
                 (
                     SELECT
                         BNG_NO
                         ,END_FLG
                     FROM
                         T_MSRE
                     WHERE
                         MSRE_NUM = '",_msre_num,"'
                 ) MSRE
             ON
                 TBM.BNG_NO = MSRE.BNG_NO
             WHERE
                 TBM.BNG_NO = '",_bng_no,"'
             AND
                 TBM.USR_CD = '",_usr_cd,"'
             ;
         ");
    END IF;

    SET @query_text = CONCAT(@query,@query_update,@query_end);

    -- 実行
    PREPARE main_query FROM @query_text;
    EXECUTE main_query;
    DEALLOCATE PREPARE main_query;

    SET exit_cd = 0;

END
//
DELIMITER ;
