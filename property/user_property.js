/*
 * ユーザー情報を保持するプロパティ
 *
 * @param cd ユーザー番号
 * @param name ユーザー名
 */
let User_property = function(cd,name){
    // ビンゴ番号
    this.bng_num = "";
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