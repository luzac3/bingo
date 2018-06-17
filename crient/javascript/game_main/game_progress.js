function game_progress(game_property){
    // ロード処理

    // 初期描画処理
    msre_draw(game_property,"progress_wrapper","progress_canvas").then(function(){
        // ロード終了
        load_anim.stop();

        // タイマーを起動
        // 20秒以上経過していたら更新処理を呼ぶ
        // setTimeoutでフラグを倒しに行く

        wait_get_item(game_property);

    });

}

function wait_get_item(game_property){
    // タイマーをリセット
    return new Promise(resolve,reject => {
        // 待機を開始
        call_stored_wait("get_item_001",function(data){
            let num = 0;
            game_property.item_list.forEach(function(item){
                if(data["item_cd"] == item){
                    // ゲームプロパティ更新
                    game_property.item_list[num].cll_flg = 1;
                    // hitアニメーション表示/リーチ判定処理/青色点滅
                    // DB登録
                    // 終了判定処理
                    if(end){
                        return;
                    }
                    wait_get_item(game_property);
                }
                num++;
            });
            // DB登録
            // 終了判定処理
            if(end){
                return;
            }
            wait_get_item(game_property);
        },function(){
            // DB通信自体に失敗している場合
            // 再度呼ぶかどうか聞く
        });
    });
}

/**
 * ヒットアニメーション表示/リーチ判定/点滅処理
 */



/**
 * DB登録、終了判定処理
 */