/*
 * 項目登録用のマスを表示する部分
 * 項目更新時に再描画
 */
function msre_draw(game_property,msre_property,wrapper,canvas_name){
    // ビンゴ番号入力画面を閉じる
    return new Promise((resolve,reject) => {
        const property = {
            game_property:game_property
            ,draw_property:msre_property
            ,wrapper_width:game_property.width
            ,wrapper_height:game_property.height
            ,canvas_name:canvas_name
        }
        canvas_initialize(initialize_draw,property).then(function(){
            resolve(game_property);
        },function(){
            reject();
        });
    });
}

function initialize_draw(ctx,obj){
    // 色指定
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