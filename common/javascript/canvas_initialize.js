/*
 * プロパティ
 * ・描画するオブジェクトのプロパティ(リスト)
 * ・ラッパークラスの名称(ID)
 * ・Canvasの名称
 */
function canvas_initialize(draw,property){
    return new Promise(function(resolve,reject){

        let property_list = property["list"];
        let wrapper = property["wrapper"];
        let canvas_name = property["canvas_name"];

        // ラッパークラスの長さを取得
        let wrapper_length = document.getElementById(wrapper).outerwWidth();

        // Canvasのサイズを設定
        canvas.width = wrapper_length;
        canvas.height = wrapper_length;

        // 全体プロパティを作成
        let property_master = new Property_master(width,height);

        // 描画するCanvasの設定とCanvasオブジェクト
        canvas_obj = canvas_change(property_master,canvas_name);

        draw(canvas_obj[0],property.draw_property);

        // canvasの入れ替え
        document.getElementById(canvas_name+canvas_obj[1]).css('visibility','visible');
        document.getElementById(canvas_name+canvas_obj[2]).css('visibility','hidden');

        //ローカルストレージに配列を保存
        storager.set("property_master", property_master);
        storager.set("initialize_property",property);
        return resolve();
    });
}

/*
 * キャンバスの上下を入れ替えて描画するメソッド
 */
function canvas_change(master_obj,canvas_name){
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

    let canvas = document.getElementById(canvas_name+canvas_kind)[0];
    if ( !canvas || !canvas.getContext ) { return false; }
    let ctx = canvas.getContext('2d');
    let arr = [ctx,parseInt(canvas_kind),parseInt(old_canvas_kind)];

    ctx.clearRect(0,0,master_obj.width,master_obj.height);
    ctx.fillStyle="rgb(0,0,0)";
    ctx.fillRect(0,0,master_obj.width,master_obj.height);

    //オブジェクトと現在のキャンバス(Visible用)と過去のキャンバス(Hidden用)を送る
    return arr;
}


