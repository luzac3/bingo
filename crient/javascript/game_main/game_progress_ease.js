function game_progress_ease(user_property){
    // 初期描画処理
    msre_draw(
        user_property
        ,user_property.msre_property
        ,"bng_wrapper"
        ,"bng_canvas"
    ).then(function(){
        // canvas表示
        $("#game_main")[0].style.display = "block";

        // 設定したユーザープロパティを保存
        storager.set("msre_property",user_property.msre_property);

        // イベント設定・カラー変換
        $("#bng_wrapper").on("click",function(event){
            msre_set_b(event);
        });
    },function(){
        console.log("error");
    });
}

function msre_set_b(e){
    // マス数を取得
    const property_master = storager.get("property_master");
    const msre_num = property_master.msre_num;

    // クリックされた場所を特定、画面上の座標からCanvas上の絶対座標に変換
    let x = 0;
    let y = 0;

    let msre_property = storager.get("msre_property");

    for(let key in msre_property){
        msre_property[key] = re_instance(Msre_property,msre_property[key]);
    }

    let pos = null;

    let rect = e.target.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;


    let xStart = 0;
    let yStart = 0;

    let xEnd = 0;
    let yEnd = 0;
    // 自分自身を取得
    for(let i = 0; i < msre_num; i++){
        xStart = msre_property[i].posX;
        yStart = msre_property[i].posY;

        xEnd = xStart + msre_property[i].width;
        yEnd = yStart + msre_property[i].height;
        if(xStart < x && x < xEnd && yStart < y && y < yEnd){
            if(msre_property[i].item_cd != "00"){
                msre_property[i].set_color("red");
            }else{
                msre_property[i].set_color("white");
                msre_property[i].item_cd = "";
            }
            break;
        }
    }

    // 描画するCanvasの設定とCanvasオブジェクト
    const canvas_obj = canvas_change(property_master,"bng_canvas");

    for (let i=0; i<msre_num; i++){
        draw(canvas_obj,msre_property[i]);
    }

    // 描画した下のレイヤを表示、表のレイヤを非表示
    $("#bng_canvas"+canvas_obj[1]).css('visibility','visible');
    $("#bng_canvas"+canvas_obj[2]).css('visibility','hidden');

    //ローカルストレージに配列を保存
    storager.set("msre_property", msre_property);
}