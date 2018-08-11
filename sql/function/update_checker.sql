DROP FUNCTION IF EXISTS update_checker;
DELIMITER //
-- ********************************************************************************************
-- update_checker 更新待機処理
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
CREATE FUNCTION `update_checker`(
    `_bng_no` CHAR(5)
    , `_user_cd` CHAR(5)
    , `_kusn_ntj` DATETIME(3)
) RETURNS INTEGER DETERMINISTIC
COMMENT '更新待機処理'

BEGIN
    DECLARE exit_cd INTEGER;


    -- 異常終了ハンドラ(古いのに戻す)

    set @read_num = 0;
    set @num = 0;

    WHILE (@read_num = 0 and @num < 20) DO
            SELECT SLEEP(5) INTO @sleep;

            SELECT EXISTS(
                SELECT 1
                FROM
                    T_BNG_ITM
                WHERE
                    BNG_NO = _bng_no
                AND
                    KUSN_NYU_CD = '2'
                AND
                    KUSN_NTJ > _kusn_ntj
            ) INTO @read_num
            ;
        set @num = @num + 1;
    END WHILE;

    SET exit_cd = @read_num;

    RETURN exit_cd;

END
//
DELIMITER ;
