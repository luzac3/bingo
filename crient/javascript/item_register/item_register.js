/*
 * マスごとの項目のプロパティを取得、設定する
 */
function item_register(user_property){
    // canvasの非表示を設定する
    $("#register_canvas1").css('visibility','visible');
    $("#register_canvas2").css('visibility','hidden');

    // ビンゴ番号入力画面を閉じる

    // 読み込み画像アニメーションを表示

    set_property(user_property,"register_wrapper").then(function(user_property){
        msre_draw(
            user_property
            ,user_property.msre_property
            ,"register_wrapper"
            ,"register_canvas"
        ).then(function(){
            // load_anim.stop();
            // user_propertyをストレージ
            storager.set("user_property",user_property);

            // 登録枠を表示
            $("#item_register")[0].style.display = "block";
        });
    });


    // 複数クリック対応
    $("#item_register canvas").off("click");

    // canvasをクリックしたときの動作
    $("#item_register canvas").on("click",function(event){
        // 処理を項目選択用のJSファイル「search_main」に移す
        search_main(event);
    });

    // 項目の登録処理
    $("#register_msre").on("click",function(){
        const user_property = storager.get("user_property");
        register_user_msre(user_property);
    });
}

/*
 * オブジェクトのリストから、クリックされたオブジェクトのキーを取得する
 */
function get_target_object(e,msre_property){
    // クリックされた場所を特定、画面上の座標からCanvas上の絶対座標に変換
    let x = 0;
    let y = 0;

    let pos = null;

    const rect = e.target.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;


    let xStart = 0;
    let yStart = 0;

    let xEnd = 0;
    let yEnd = 0;

    const msre_num = msre_property.length;

    let index = 0;
    // 自分自身を取得
    for(let i = 0; i < msre_num; i++){
        xStart = msre_property[i].posX;
        yStart = msre_property[i].posY;

        xEnd = xStart + msre_property[i].width;
        yEnd = yStart + msre_property[i].height;
        if(xStart < x && x < xEnd && yStart < y && y < yEnd){
            index = i;
            break;
        }
    }
    return index;
}
