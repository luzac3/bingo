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
        canvas_initialize(draw,property).then(function(){
            resolve(game_property);
        },function(){
            reject();
        });
    });
}
