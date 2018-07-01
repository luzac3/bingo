/*
 * キャンバスの設定・キャンバスの切り替えを行う
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

    const canvas = document.getElementById(canvas_name+canvas_kind);
    if ( !canvas || !canvas.getContext ) { return false; }
    const ctx = canvas.getContext('2d');
    const arr = [ctx,parseInt(canvas_kind),parseInt(old_canvas_kind)];

    ctx.clearRect(0,0,master_obj.width,master_obj.height);
    ctx.fillStyle="rgb(255,255,255)";
    ctx.fillRect(0,0,master_obj.width,master_obj.height);

    //オブジェクトと現在のキャンバス(Visible用)と過去のキャンバス(Hidden用)を送る
    return arr;
}