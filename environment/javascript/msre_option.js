/**
 * インスタンス：全体　CANVASのサイズ、マス数などを設定するインスタンス
 * マスごとのインスタンス：全体にあわせてサイズを変更し、クリックで色を変更するなどする(色変更時にインスタンスも書き換え)
 *
 */

$(window).on("load",function(){
    // ここが起点
    $("#msre_canvas1").css('visibility','visible');
    $("#msre_canvas2").css('visibility','hidden');

    // 初期描画
    initialize();

    // サイズ変更時
    // マス長だけ変更してDraw

    // コマ数変更時
    $("#MSRE_NUM").on("change",function(){
    	initialize();
    });

    $("canvas").on("click",function(event){
        msre_set(event);
    })
});

function initialize(){
    // マスごとのプロパティを格納する配列
    let msre_property = [];

    // マス数を取得
    let msre_num = $("#MSRE_NUM").val();

    // マス数にあわせてマスのプロパティをインスタンス化、配列に保存してストレージに格納
    // こっちを呼び出しもとで行う

    // ラッパークラスの長さを取得
    let wrapper_length = $("#wrapper").outerWidth();

    // 1列のマス数
    let msre_ln_num = Math.sqrt(msre_num);

    // ラッパークラスの長さを区切りやすい長さに変更
    wrapper_length = Math.floor(wrapper_length / msre_ln_num) * msre_ln_num;

    // 1マスの長さ
    let msre_length = wrapper_length / msre_ln_num;

    let canvas = document.getElementsByClassName("msre_canvas");

    // Canvasのサイズを設定
    canvas[0].width = wrapper_length;
    canvas[0].height = wrapper_length;
    canvas[1].width = wrapper_length;
    canvas[1].height = wrapper_length;

    // 全体プロパティを作成
    let msre_property_master = new Msre_property_master(wrapper_length,wrapper_length,msre_num);

    // 列数カウント用
    let ln_count = 0;

    // X座標
    let x = 0;

    // Y座標
    let y = 0;

    for(let i=0; i < msre_num; i++){
        if(ln_count == msre_ln_num){
            x = 0;
            y = y + msre_length;
            ln_count = 0;
        }
        msre_property[i] = new Msre_property(i+1,x,y,msre_length,msre_length);
        msre_property[i].set_color("white");
        x = x + msre_length;
        ln_count++;
    }

    // free_flgがオン、かつマス番号が奇数
    if($("#FREE_MSRE").prop("checked") && msre_num % 2 != 0){
        let free_num = parseInt(msre_num / 2);
        msre_property[free_num].set_color("red");
        msre_property[free_num].item_cd = "00";
        msre_property[free_num].item_name = "free";
    }

    // 描画するCanvasの設定とCanvasオブジェクト
    const canvas_obj = canvas_change(msre_property_master,"msre_canvas");

    for(let i=0; i<msre_num; i++){
        draw(canvas_obj,msre_property[i]);
    }

    // 描画した下のレイヤを表示、表のレイヤを非表示
    $("#msre_canvas"+canvas_obj[1]).css('visibility','visible');
    $("#msre_canvas"+canvas_obj[2]).css('visibility','hidden');

    //ローカルストレージに配列を保存
    storager.set("msre_property_master", msre_property_master);
    storager.set("msre_property", msre_property);
}

function msre_set(e){
    // freeフラグがオフなら発生しない
    if(!$("#FREE_MSRE").prop("checked")){
        return;
    }

    // マス数を取得
    let msre_num = $("#MSRE_NUM").val();

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
    // 自分自身を取得
    for(let i = 0; i < msre_num; i++){
        xStart = msre_property[i].posX;
        yStart = msre_property[i].posY;

        xEnd = xStart + msre_property[i].width;
        yEnd = yStart + msre_property[i].height;
        if(xStart < x && x < xEnd && yStart < y && y < yEnd){
            if(msre_property[i].item_cd != "00"){
                msre_property[i].set_color("red");
                msre_property[i].item_cd = "00";
                msre_property[i].item_name = "free";
            }else{
                msre_property[i].set_color("white");
                msre_property[i].item_cd = "";
                msre_property[i].item_name = "";
            }
            break;
        }
    }

    let msre_property_master = storager.get("msre_property_master");

    // 描画するCanvasの設定とCanvasオブジェクト
    const canvas_obj = canvas_change(msre_property_master,"msre_canvas");

    for (let i=0; i<msre_num; i++){
        draw(canvas_obj,msre_property[i]);
    }

    // 描画した下のレイヤを表示、表のレイヤを非表示
    $("#msre_canvas"+canvas_obj[1]).css('visibility','visible');
    $("#msre_canvas"+canvas_obj[2]).css('visibility','hidden');

    //ローカルストレージに配列を保存
    storager.set("msre_property", msre_property);
}

function draw(canvas_obj,obj){
    let ctx = canvas_obj[0];

    // 色を設定
    ctx.fillStyle="rgb("+obj.r+","+obj.g+","+obj.b+")";
    ctx.fillRect(obj.posX, obj.posY, obj.width, obj.height);

    // 枠線
    ctx.lineWidth = 3;
    ctx.strokeStyle="rgb(0,0,0)";
    ctx.strokeRect(obj.posX, obj.posY, obj.width, obj.height);

    if(obj.item_name){
        // 文字を描画
        ctx.textAlign = "center";
        ctx.fillStyle="rgb(0,0,0)";
        ctx.fillText(obj.item_name,obj.posX + (obj.width / 2),obj.posY + (obj.height / 2));
    }
}
