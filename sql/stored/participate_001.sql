DROP PROCEDURE IF EXISTS participate_001;
DELIMITER //
-- ********************************************************************************************
-- participate_001 参加表明時のデータ取得
--
-- 【処理概要】
--  参加表明時のデータ取得を行う。募集開始していなければエラー
--
--
-- 【呼び出し元画面】
--   インデックス
--
-- 【引数】
--   _bng_no              ：ビンゴ番号
--   _user_Cd             ：ユーザコード
--
--
-- 【戻り値】
--      exit_cd            : exit_cd
--      正常：0
--      異常：99
-- --------------------------------------------------------------------------------------------
-- 【更新履歴】
--  2018.6.21 大杉　新規作成
-- ********************************************************************************************
CREATE PROCEDURE `get_bng_mstr_001`(
    IN `_bng_no` CHAR(5)
    , IN `_user_cd` CHAR(5)
    , OUT `exit_cd` INTEGER
)
COMMENT '参加表明時データ取得'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

        SET @query = CONCAT("
            SELECT
                BNG_NO

                -- ユーザー情報プロパティ
                ,USR_CD
                ,USR_NAME
                ,USR_LCH_NUM
                ,USR_BNG_NUM
                ,USR_END_FLG

                -- 項目情報プロパティ
                ,MSRE_NUM
                ,ITM_CD

            FROM
                T_BNG_MSTR GP
                -- ユーザー情報
                ,(
                    SELECT
                        ,BNG_NO
                        ,USR_CD
                        ,USR_NAME
                        ,LCH_NUM
                        ,BNG_NUM
                        ,END_FLG
                    FROM
                        T_USR
                    WHERE
                        BNG_NO = ",_bng_no,"
                    AND
                        USR_CD = '",_usr_cd,"'
                ) USR
                -- 項目情報
                ,(
                    SELECT
                        TUM.BNG_NO
                        ,GROUP_CONCAT(TUM.MSRE_NUM) MSRE_NUM
                        ,GROUP_CONCAT(TUM.ITM_CD) ITM_CD
                    FROM
                        T_USR_MSRE TUM
                    WHERE
                        TUM.BNG_NO = ",_bnng_no,"
                    AND
                       TUM.USR_CD = '",_usr_cd,"'
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
