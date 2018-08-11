DROP PROCEDURE IF EXISTS prbblty_cd_load_001;
DELIMITER //
-- ********************************************************************************************
-- prbblty_cd_load_001 確率コード一覧を取得する
--
-- 【処理概要】
--  確率コード一覧を取得する
--
--
-- 【呼び出し元画面】
--   インデックス
--
-- 【引数】
--   なし
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
CREATE PROCEDURE `prbblty_cd_load_001`(
    OUT `exit_cd` INTEGER
)
COMMENT 'ビンゴ番号確認'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION SET exit_cd = 99;

    SELECT
        PRBBLTY_CD
        ,PRBBLTY_EXPLAIN
    FROM
        C_PRBBLTY_CD
    ;

END
//
DELIMITER ;
