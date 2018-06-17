/*
 * アイテム登録
 * ここの初期化処理は、進行用のデータを作る際にも利用する(というかこっちが転用)
 */
function item_register(game_property){
    // ビンゴ番号入力画面を閉じる
    return (resolve,reject => {

        let arg_arr = {
            bng_no:property.bng_no
            ,user_cd:property.user_cd
        }

        // ビンゴ領域の描画　コモンの描画と同じもの　マス数とかの情報が必要なので結局ゲームプロパティはコモンなのでは
        call_stored("get_msre_property_001",arg_arr).then(function(data){
            // マス数
            let msre_num = data["msre_num"];

            // マス数
            let msre_num = property.msre_num;

            let wrapper_length = $("#wrapper").outerWidth();

            let msre_ln_num = Math.sqrt(msre_num);

            let msre_length = wrapper_length / msre_ln_num;

            let ln_count = 1;

            let x = 0;

            let y = 0;

            for(let i=0; i < msre_num; i++){
                if(ln_count == msre_ln_num){
                    x = 0;
                    y = y + msre_length;
                    ln_count = 1;
                }
                game_property.msre_property[i] = new Msre_property(i+1,x,y,msre_length,msre_length);
                x = x + msre_length;
                ln_count++;
            }

            initialize(property,initialize_draw).then(function(){
                resolve(game_property);
            },function(){
                reject();
            });
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