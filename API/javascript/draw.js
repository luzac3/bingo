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