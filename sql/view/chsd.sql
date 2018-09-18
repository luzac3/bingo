-- 選択された項目の数を数え、選択数順に並び替える
DROP VIEW IF EXISTS V_CHSD;

CREATE VIEW V_CHSD AS

    SELECT
        TUM.BNG_NO
        ,TUM.ITM_CD
        ,TBI.ITM_NAME
        ,COUNT(1) AS CHSD_NUM
    FROM
        T_USR_MSRE TUM
    LEFT OUTER JOIN
        T_BNG_ITM TBI
    ON
        TUM.BNG_NO = TBI.BNG_NO
    AND
        TUM.ITM_CD = TBI.ITM_CD
    WHERE
        TBI.KUSN_NYU_CD <> 2
    GROUP BY
        BNG_NO,ITM_CD,ITM_NAME
    ORDER BY
        CHSD_NUM ASC
    ;