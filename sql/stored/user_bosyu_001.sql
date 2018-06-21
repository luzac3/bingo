DROP PROCEDURE IF EXISTS user_bosyu_001;
DELIMITER //
-- ********************************************************************************************
-- user_bosyu_001 ユーザー募集処理
--
-- 【処理概要】
--  募集されたユーザーのリストを取得・更新する
--
--
-- 【呼び出し元画面】
--   インデックス
--
-- 【引数】
--   _bng_no              ：ビンゴ番号
--   _user_list           ：フラグ「オン」であるユーザーのリスト
--   _user_exist_num      ：フラグ「オン」であるユーザーの数
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
CREATE PROCEDURE `user_bosyu_001`(
    IN `_bng_no` CHAR(5)
    IN `_user_list` VARCHAR(2000)
    , IN `_user_exist_num` INTEGER
    , OUT `exit_cd` INTEGER
)
COMMENT 'ユーザー募集処理'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

    UPDATE
        T_BNG_USR
    SET
        EXST_FLG = null;
    WHERE
        BNG_NO = _bng_no
    AND
        KUSN_NTJ < ( NOW() - INTERVAL 30 SECOND )
    ;

    WHILE _user_exist_num = @ul_num AND _user_exist_num = @ul1_num DO
        SELECT
            COUNT(1) INTO @ul_num
        FROM
            T_BNG_USR
        WHERE
            BNG_NO = _bng_no
        AND
            EXST_FLG = 1
        ;

        SELECT
            COUNT(1) INTO @ul1_num
        FROM
            T_BNG_USR
        WHERE
            BNG_NO = _bng_no
        AND
            EXST_FLG = 1
        ;

        SLEEP(1);

    END WHILE

        SELECT
            COUNT(1) INTO @ul0_num
        FROM
            T_BNG_USR
        WHERE
            BNG_NO = _bng_no
        ;

        SET @query = CONCAT("
            SELECT
                ",@ul0_num," AS WHOLE_NUM
                ,",@ul1_num," AS EXST_NUM
                ,GROUP_CONCAT(USR_CD) AS USR_CD
                ,GROUP_CONCAT(USR_NAME) AS USR_NAME
                ,GROUP_CONCAT(EXST_FLG) AS EXST_FLG
                ,NOW() AS DATETIME
            FROM
                T_BNG_USR
            WHERE
                BNG_NO = _bng_no
            AND
                EXST_FLG = 1
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
