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
--   _item_cd             ：項目コード
--   _status_cd           ：ステータスコード
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
            KUSN_NYU_CD = "2"
        ;

        SLEEP(1);

    END WHILE

        SET @query = CONCAT("

            SELECT
                ITM_CD
            FROM
                T_BNG_ITM
            WHERE
                BNG_NO = ",_bng_no,"
            AND
               KUSN_NYU_CD = '2'
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
