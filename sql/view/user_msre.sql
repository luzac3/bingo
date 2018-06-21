-- ユーザーライン情報をまとめたVIEW
-- ライン番号、ビンゴ状態、リーチ状態を保持

-- ビンゴ番号、ライン番号、マス番号、ユーザコード、リーチ、ビンゴ状態フラグ
-- マス番号の数だけ生成されるため、

CREATE VIEW V_USR_LN AS
    SELECT
        BNG_NO
        ,LN_NUM
        ,USR_CD
        ,LCH_FLG
        ,BNG_FLG
    FROM