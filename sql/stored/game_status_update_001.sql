DROP PROCEDURE IF EXISTS game_status_update_001;
DELIMITER //
-- ********************************************************************************************
-- game_status_update_001 ゲームステータスを更新する
--
-- 【処理概要】
--  ゲームステータスの更新をする
--
--
-- 【呼び出し元画面】
--   インデックス
--
-- 【引数】
--   _bng_no           ：ビンゴ番号
--   _status           ：ゲームステータス
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
CREATE PROCEDURE `game_status_update_001`(
    IN `_bng_no` CHAR(5)
    , IN `_status` CHAR(1)
    , OUT `exit_cd` INTEGER
)
COMMENT 'ステータス更新'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

    UPDATE
        T_BNG_USR
    SET
        GM_STTS_CD = _status
        ,KUSN_NTJ = NOW()
    WHERE
        BNG_NO = _bng_no
    ;

END
//
DELIMITER ;
