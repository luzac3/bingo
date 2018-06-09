/*
 * ゲーム全体の値を保持するプロパティ
 *
 * @param bng_no ビンゴ番号
 * @param user_num ユーザー人数
 */
let Game_property = function(bng_no){
    // ビンゴ番号
    this.bng_no = bng_no;
    // ユーザー人数
    this.user_num = 0;
    // 描画オブジェクトリスト
    this.draw_obj_list = [];
    // 背景使用フラグ
    this.bg_us_flg = null;
    // 背景URL
    this.bg_url = "";

    // 項目数
    this.item_num = 0;

    // 演出フラグ
    this.prfmnc_flg = null;

    // 終了マスフラグ
    this.end_msre_flg = null;

    // 確率フラグ
    this.prbblty_flg = null;
    // 確率コード
    this.prbblty_cd = null;
    // ユーザーのプロパティ
    this.user_property = {};
    // 読み上げる項目のプロパティ(Item_property)リスト
    this.item_list = {};
    // 確率を持たない場合のリスト
    this.no_prbblty_list = [];
    // 確率ごとにまとめた項目の配列
    this.prbblty_list = [];
    // 存在する確率のリスト
    this.prbblty_item_list = [];
    /*
     * コード値をキーとしたイメージのリスト
     * ・コード値：imgオブジェクト
     */
    this.image_list = {};

    // 現在選択されている項目のコード値
    this.item_cd = "";
    // 残項目
    this.left_item_num = 0;
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
    // 存在フラグ(デフォルトは存在)
    this.exist_flg = "1";
}

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


