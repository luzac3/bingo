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
    	const len = obj.item_name.length;

        let fontsize = obj.font_size;

    	if(len > 4){
    		fontsize = fontsize * 4 / 5;
    	}

        ctx.font = fontsize + "px 'MS ゴシック'";

        // 文字を描画
        ctx.textAlign = "center";
        ctx.fillStyle="rgb(0,0,0)";

        for (let i = 0, len = obj.item_name.length; i < len; i++){
        	ctx.fillText(obj.item_name[i],obj.posX + (obj.width / 2),obj.posY + (obj.height / 2) - (len / 2 * fontsize) + (fontsize * (i+1)));
/*
            if(len == 1){
                ctx.fillText(obj.item_name[i],obj.posX + (obj.width / 2),obj.posY + (obj.height / 2) + (fontsize / 2));
            }else if(len == 2){
                ctx.fillText(obj.item_name[i],obj.posX + (obj.width / 2),obj.posY + (obj.height / 2) + (fontsize * i) + (fontsize / 2) - (fontsize / 2));
            }else{
                ctx.fillText(obj.item_name[i],obj.posX + (obj.width / 2),obj.posY + (obj.height / 2) - (len / 2 * fontsize) + (fontsize * (i+1)));
            }
*/
        }
    }
}