/*
 * アイテム登録
 */
function item_register(property){
    // ビンゴ番号入力画面を閉じる

    let arg_arr = {
        bng_no:property.bng_no
    }

    // ビンゴ領域の描画　コモンの描画と同じもの　マス数とかの情報が必要なので結局ゲームプロパティはコモンなのでは
    call_stored("get_msre_num_001",arg_arr).then(function(data){
        // マス数
        let msre_num = data["msre_num"];
    })
}