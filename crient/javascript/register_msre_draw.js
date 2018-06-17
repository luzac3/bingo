/*
 * 項目登録用のマスを表示する部分
 * 項目更新時に再描画
 */
function register_msre_draw(game_property){
    // ビンゴ番号入力画面を閉じる
    return (resolve,reject => {
        let property = {
            game_property:game_property
            ,wrapper:"register_wrapper"
            ,canvas_name:"register_canvas"
        }
        canvas_initialize(property,initialize_draw).then(function(){
            resolve(game_property);
        },function(){
            reject();
        });
    });
}

function initialize_draw(ctx,property){
    // 色指定
    ctx.fillStyle="rgb("+property.r+","+property.g+","+property.b+")";
    // 位置を設定
    ctx.fillRext(property.x,property.y,property.width,property.height);

    // 枠線
    ctx.lineWidth = 5;
    ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);

    if(obj.item_name){
        // 文字を描画
        ctx.textalign = "center";
        ctx.fillText(obj.item_name,obj.x + (obj.width / 2),obj.y + (obj.height / 2));
    }
}