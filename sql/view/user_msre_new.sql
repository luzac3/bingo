-- ユーザーライン情報をまとめたVIEW
DROP VIEW V_USR_LN;

CREATE VIEW V_USR_LN AS
    SELECT DISTINCT
        TLM.BNG_NO AS BNG_NO
        ,TLM.LN_NUM AS LN_NUM
        ,TUM.USR_CD AS USR_CD
        ,CASE
            WHEN COUNT(1) - COUNT(CLL_FLG) = 1 THEN '1'
            ELSE NULL
        END AS LCH_FLG
        ,CASE
            WHEN COUNT(1) - COUNT(CLL_FLG) = 0 THEN '1'
            ELSE NULL
        END AS BNG_FLG
    FROM
        T_LN_MSTR TLM
    LEFT OUTER JOIN
        T_USR_MSRE TUM
    ON
        TLM.BNG_NO = TUM.BNG_NO
    GROUP BY
        BNG_NO
        ,LN_NUM
        ,USR_CD
    ORDER BY LN_NUM ASC