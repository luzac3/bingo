-- ユーザーライン情報をまとめたVIEW

CREATE VIEW V_USR_LN AS
    SELECT
        TLM.BNG_NO AS BNG_NO
        ,TLM.LN_NUM AS LN_NUM
        ,TUM.USR_CD AS USR_CD
        ,CASE
            WHEN
            (
                select
                    count(1) as msre_num
                from
                    T_USR_MSRE
            )
            -
            (
                select
                    COUNT(CLL_FLG) AS HIT_NUM
                from
                    T_USR_MSRE
            )
            = 1 THEN '1'
            ELSE '0'
            END AS LCH_FLG
        ,CASE
            WHEN
            (
                select
                    count(1) as msre_num
                from
                    T_USR_MSRE
            )
            -
            (
                select
                    COUNT(CLL_FLG) AS HIT_NUM
                from
                    T_USR_MSRE
            )
            = 0 THEN '1'
            ELSE '0'
        END AS BNG_FLG
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