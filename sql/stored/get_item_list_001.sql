DROP PROCEDURE IF EXISTS get_item_list_001;
DELIMITER //
-- ********************************************************************************************
-- get_item_list_001 項目リスト取得処理
--
-- 【処理概要】
--  項目リストを条件に従い取得する処理
--
--
-- 【呼び出し元画面】
--   インデックス
--
-- 【引数】
--   _bng_no              ：ビンゴ番号
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
    , IN `_tag` VARCHAR(200)
    , IN `_search_word1` VARCHAR(40)
    , IN `_search_word2` VARCHAR(40)
    , IN `_search_word3` VARCHAR(40)
    , OUT `exit_cd` INTEGER
)
COMMENT '項目リスト取得処理'

BEGIN

    -- 異常終了ハンドラ
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SELECT @sqlstate, @errno, @text;
        ROLLBACK;
        SET exit_cd = 99;
    END;

    SET @query_before = CONCAT("
        SELECT DISTINCT
            TBI.BNG_NO
            ,TBI.ITM_CD
            ,TBI.ITM_NAME
            ,TBI.ITM_SH_NAME
            ,TBI.PRBBLLTY
            ,TBI.IMG_URL
            ,TBI.END_FLG
            ,TBI.CHSD_NUM
            ,TBI.KUSN_NYU_CD
        FROM
            T_BNG_ITM TBI
    ");

    SET @query_after = CONCAT("
        WHERE
            TBI.BNG_NO = '",_bng_no,"'
        AND
            -- freeマスを除外
            TBI.ITM_CD <> '0000'
    ");

    IF IFNULL(_tag,'') != '' THEN
        SET @query_tag = CONCAT("
            INNER JOIN
                T_BNG_TAG TBT
            ON
                TBI.BNG_NO = TBT.BNG_NO
            AND
                TBI.ITM_CD = TBT.ITM_CD
            AND
                TBT.BNG_TAG IN (",_tag,")
        ");
    ELSE
        SET @query_tag = "";
    END IF;

    IF IFNULL(_search_word1,'') != '' THEN
        SET @query_search = CONCAT("
            AND(
                (
                        TBI.ITM_NAME LIKE ('%",_search_word1,"%')
                    OR
                        TBI.ITM_SH_NAME LIKE ('%",_search_word1,"%')
                )
        ");
    END IF;

    IF IFNULL(_search_word2,'') != '' THEN
        SET @query_search = CONCAT(
            @query_search,"
                OR(
                        TBI.ITM_NAME LIKE ('%",_search_word2,"%')
                    OR
                        TBI.ITM_SH_NAME LIKE ('%",_search_word2,"%')
                )
        ");
    END IF;

    IF IFNULL(_search_word3,'') != '' THEN
        SET @query_search = CONCAT(
            @query_search,"
                OR(
                        TBI.ITM_NAME LIKE ('%",_search_word3,"%')
                    OR
                        TBI.ITM_SH_NAME LIKE ('%",_search_word3,"%')
                )
            )
        ");
    ELSE
        SET @query_search = CONCAT(
            @query_search,"
            )
        ");
    END IF;

    IF IFNULL(_search_word1,'') = '' THEN
        SET @query_search = "";
    END IF;


    SET @query_text = CONCAT(@query_before,@query_tag,@query_after,@query_search,";");

    -- 実行
    PREPARE main_query FROM @query_text;
    EXECUTE main_query;
    DEALLOCATE PREPARE main_query;

    SET exit_cd = 0;

END
//
DELIMITER ;
