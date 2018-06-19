DROP PROCEDURE IF EXISTS update_user_001;
DELIMITER //
-- ********************************************************************************************
-- update_user_001 ユーザーステータスを更新する
--
-- 【処理概要】
--  ユーザーステータスの更新をする
--
--
-- 【呼び出し元画面】
--   インデックス
--
-- 【引数】
--   _bng_no           ：ビンゴ番号
--   _user_cd          ：ユーザーコード
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
CREATE PROCEDURE `update_user_001`(
    IN `_bng_no` CHAR(5)
    IN `_user_cd` CHAR(5)
    , OUT `exit_cd` INTEGER
)
COMMENT 'ステータス更新'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

    UPDATE
        T_USR
    SET
        EXST_FLG = 1
        ,KUSN_NTJ = NOW()
    WHERE
        BNG_NO = _bng_no
    AND
        USR_CD = _user_cd
    ;

END
//
DELIMITER ;
