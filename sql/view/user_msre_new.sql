-- ユーザーライン情報をまとめたVIEW
DROP VIEW IF EXISTS V_USR_LN;

CREATE VIEW V_USR_LN AS
    SELECT DISTINCT
        TLTMM.BNG_NO AS BNG_NO
        ,TUM.USR_CD AS USR_CD
        ,TLTMM.LN_NUM AS LN_NUM
        ,CASE
            WHEN COUNT(1) - COUNT(TUM.CLL_FLG) = 1 THEN '1'
            ELSE NULL
        END AS LCH_FLG
        ,CASE
            WHEN COUNT(1) - COUNT(TUM.CLL_FLG) = 0 THEN '1'
            ELSE NULL
        END AS BNG_FLG
    FROM
        T_LN_TO_MSRE_MSTR TLTMM
    LEFT OUTER JOIN
        T_USR_MSRE TUM
    ON
        TLTMM.BNG_NO = TUM.BNG_NO
    AND
        TLTMM.MSRE_NO = TUM.MSRE_NO
    GROUP BY
        BNG_NO
        ,USR_CD
        ,LN_NUM
    ORDER BY LN_NUM ASC