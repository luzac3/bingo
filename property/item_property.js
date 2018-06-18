/*
 * 項目情報を保持するプロパティ
 *
 * @param cd アイテムコード
 * @param name アイテム名
 * @param sh_name アイテム略称
 * @param choose_num 選択された回数
 */
let Item_property = function(cd,name,sh_name,prbblty,choose_num,url){
    // コード番号
    this.cd = cd;
    // 名前
    this.name = name;
    // 略称
    this.sh_name = sh_name;
    // 確率
    this.prbblty = prbblty;
    // 選択された回数
    this.item_selected_num = choose_num;

    // 読み上げフラグ(読み上げられたら立つ)
    this.flg = null;

    // 項目のURL
    this.url = url;
}