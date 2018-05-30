/**
 * インスタンス：全体　CANVASのサイズ、マス数などを設定するインスタンス
 * マスごとのインスタンス：全体にあわせてサイズを変更し、クリックで色を変更するなどする(色変更時にインスタンスも書き換え)
 *
 */

$(window).on("load",function(){
    // ここが起点
    $("#pz_canvas1").css('visibility','visible');
    $("#pz_canvas2").css('visibility','hidden');

    // 初期描画
    initialize();

    // サイズ変更時
    // マス長だけ変更してDraw

    // コマ数変更時
    $("#BNG_FNSH_NUM").on("change",function(){
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
    let msre_num = $("#BNG_FNSH_NUM").val();

    // マス数にあわせてマスのプロパティをインスタンス化、配列に保存してストレージに格納

    // ラッパークラスの長さを取得
    let wrapper_length = $("#wrapper").outerwWidth();

    // 1列のマス数
    let msre_ln_num = Math.sqrt(msre_num);

    // 1マスの長さ
    let msre_length = msre_num / msre_ln_num;

    // Canvasのサイズを設定
    canvas.width = wrapper_length;
    canvas.height = wrapper_length;

    // 全体プロパティを作成
    let msre_property_master = new Msre_property_master(width,height,msre_num);

    // 列数カウント用
    let ln_count = 1;

    // X座標
    let x = 0;

    // Y座標
    let y = 0;

    for(let i=0; i < msre_num; i++){
        if(ln_count == msre_ln_num){
            x = 0;
            y = y + msre_length;
            ln_count = 1;
        }
        msre_property[i] = new Msre_property(i+1,x,y,msre_length,msre_length);
        x = x + msre_length;
        ln_count++;
    }

    // free_flgがオン、かつマス番号が奇数
    if($("#FREE_MSRE").prop("checked") && msre_num % 2 != 0){
        let free_num = parseInt(msre_num / 2);
        msre_property[free_num].color = "red";
        msre_property[free_num].item_name = "free";
    }

    // 描画するCanvasの設定とCanvasオブジェクト
    canvas_obj = canvas_change(msre_property_master);

    for(let i=0; i<msre_num; i++){
        draw(canvas_obj,msre_property[i]);
    }

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
    let msre_num = $("#BNG_FNSH_NUM").val();

    // クリックされた場所を特定、画面上の座標からCanvas上の絶対座標に変換
    let x = 0;
    let y = 0;

    let msre_property = storager.get("msre_property");

    let pos = null;

    let rect = e.target.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;

    // 自分自身を取得
    for(let i = 0; i < msre_num; i++){
        if(msre_property[i].x == x && msre_property[i].y == y){
        	msre_property[i].color = "red";
        	msre_property[i].item_name = "free";
            break;
        }
    }

    let msre_property_master = storager.get("msre_property_master");

    // 描画するCanvasの設定とCanvasオブジェクト
    canvas_obj = canvas_change(msre_property_master);

    draw(canvas_obj,Obj);

    //ローカルストレージに配列を保存
    storager.set("msre_property", msre_property);
}

function canvas_change(master_obj){
    let old_canvas_kind = 1;
    let canvas_kind = 2;

    if(!window.sessionStorage.getItem("canvas_kind")){
        old_canvas_kind = 1;
        canvas_kind = 2;
    }else{
        old_canvas_kind = storager.get("canvas_kind");
        // トグル キャンバスの切り替え
        canvas_kind = (old_canvas_kind % 2) + 1;
    }

    storager.set("canvas_kind",canvas_kind);

    let canvas = $("#pz_canvas"+canvas_kind)[0];
    if ( !canvas || !canvas.getContext ) { return false; }
    let ctx = canvas.getContext('2d');
    let arr = [ctx,parseInt(canvas_kind),parseInt(old_canvas_kind)];

    ctx.clearRect(0,0,master_obj.width,master_obj.height);
    ctx.fillStyle="rgb(0,0,0)";
    ctx.fillRect(0,0,master_obj.width,master_obj.height);

    //オブジェクトと現在のキャンバス(Visible用)と過去のキャンバス(Hidden用)を送る
    return arr;
}

function draw(canvas_obj,obj){
    let ctx = canvas_obj[0];

    // 色を設定
    ctx.fillStyle="rgb("+this.r+","+this.g+","+this.b+")";
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);

    // 枠線
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);

    if(obj.item_name){
        // 文字を描画
    }
    // 描画した下のレイヤを表示、表のレイヤを非表示
    $("canvas"+canvas_obj[1]).css('visibility','visible');
    $("canvas"+canvas_obj[2]).css('visibility','hidden');
}