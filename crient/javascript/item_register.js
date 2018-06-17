/*
 * マスごとの項目のプロパティを取得、設定する
 */
function item_register(game_property){
    // ビンゴ番号入力画面を閉じる

    // 読み込み画像アニメーションを表示

    set_property(game_property).then(function(game_property){
        register_msre_draw(game_property).then(function(){
            load_anim.stop();
            // game_propertyをストレージ
            storager.set("game_property",game_property);
        });
    });

}

