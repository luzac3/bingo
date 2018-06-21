-- ユーザーライン情報をまとめたVIEW

CREATE VIEW V_USR_LN AS
    SELECT
        LN.BNG_NO AS BNG_NO
        ,LN.LN_NUM AS LN_NUM
        ,LN.USR_CD AS USR_CD
        ,CASE
            WHEN LN.MSRE_NUM - LN.HIT_NUM = 1 THEN '1'
            ELSE '0'
        END AS LCH_FLG
        ,CASE
            WHEN LN.MSRE_NUM - LN.HIT_NUM = 0 THEN '1'
            ELSE '0'
        END AS BNG_FLG
    FROM
        (
            SELECT
                TLM.BNG_NO AS BNG_NO
                ,TLM.LN_NUM AS LN_NUM
                ,TUM.USR_CD AS USR_CD
                ,COUNT(TUM.CLL_FLG) AS HIT_NUM
                ,COUNT(1) AS MSRE_NUM
            FROM
                T_LN_MSTR TLM
            LEFT OUTER JOIN
                T_USR_MSRE TUM
            ON
                TLM.BNG_NO = TUM.BNG_NO
            GROUP BY
                TLM.BNG_NO
                ,TUM.USR_CD
                ,TUM.CLL_FLG
        ) LN