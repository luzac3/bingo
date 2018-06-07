/*
 * ゲーム全体の値を保持するプロパティ
 *
 * @param bng_no ビンゴ番号
 * @param user_num ユーザー人数
 */
let Game_property = function(bng_no,user_num){
    // ビンゴ番号
    this.bng_no = bng_no;
    // ユーザー人数
    this.user_num = user_num;
    // 演出フラグ
    this.prfmnc_flg;
    // 確率フラグ
    this.prbblty_flg;
    // 確率コード
    this.cd;
    // ユーザーのプロパティ
    this.user_property = {};
    // 読み上げる項目のプロパティリスト
    this.item_list = {};
    // 確率を持たない場合のリスト
    this.no_prbblty_list = [];
    // 確率ごとにまとめた項目の配列
    this.prbblty_list = [];
    // 存在する確率のリスト
    this.prbblty_item_list = [];
}

/*
 * ユーザー情報を保持するプロパティ
 *
 * @param cd ユーザー番号
 * @param name ユーザー名
 */
let User_property = function(cd,name){
    // ユーザーコード
    this.cd = cd;
    // ユーザー名
    this.name = name;
    // リーチ数
    this.leach_num = "";
    // ビンゴ数
    this.bng_num = "";
    // 終了フラグ
    this.end_flg = "";
}

/*
 * 項目情報を保持するプロパティ
 *
 * @param cd アイテムコード
 * @param name アイテム名
 * @param sh_name アイテム略称
 * @param choose_num 選択された回数
 */
let Item_property = function(cd,name,sh_name,prbblty,choose_num){
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
}

//
function prbblty_kugiri(group){
    let kakuritu = "";
    switch(group){
      case 0:
        kakuritu = 1;
        break;
      case 1:
        kakuritu = 4;
        break;
      case 2:
        kakuritu = 15;
        break;
      case 3:
        kakuritu = 30;
        break;
      case 4:
        kakuritu = 50;
        break;
    }
    return kakuritu;
}


