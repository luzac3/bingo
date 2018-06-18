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

    // canvasをクリックしたときの動作
    $("canvas").on("click",function(event){
        // 処理を項目選択用のJSファイル「search_main」に移す
        search_main(event);
    });

    // 項目の登録処理
    $("#register").on("click",function(){
        register_user_msre(game_property);
    });
}

/*
 * オブジェクトのリストから、クリックされたオブジェクトのキーを取得する
 */
function get_target_object(e,obj_list){
    // クリックされた場所を特定、画面上の座標からCanvas上の絶対座標に変換
    let x = 0;
    let y = 0;

    let msre_property = storager.get("msre_property");

    let pos = null;

    let rect = e.target.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;


    let xStart = 0;
    let yStart = 0;

    let xEnd = 0;
    let yEnd = 0;

    let index = 0;
    // 自分自身を取得
    for(let i = 0; i < msre_num; i++){
        xStart = msre_property[i].x;
        yStart = msre_property[i].y;

        xEnd = xStart + msre_property[i].width;
        yEnd = yStart + msre_property[i].height;
        if(xStart < x && x < xEnd && yStart < y && y < yEnd){
            index = i;
            break;
        }
    }
    return index;
}
