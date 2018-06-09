/*
 * 演出を行う関数
 * 演出前段階でキャラクター選別は済
 */
function performance(game_property){
    // 本来はこれもコールバックでDBからデータを取得する必要がある(ゲームごとに画像やムービーを設定する)が、Phase1では省略
    // 固定の演出を取得
    animloop().then(function(data){
        // 演出が完了したらデータを更新に行く

    },function(){

    });
}

function draw_initialize(ctx,obj){
    // 背景設定
    ctx.fillStyle="rgb(255,255,255)";
    ctx.fillRect(0,0,property_master.width,property_master.height);

    if(obj.img){
        let width_rate = property_master.width / obj.width;
        let height_rate = property_master.height / obj.height;

        // レートの小さいほう(変換幅が小さいほう)に合わせる
        if(width_rate < height_rate){
            // 高さを幅に合わせる
            obj.width = obj * width_rate;
            obj.height = obj * width_rate;
            // 上下に隙間ができるので、Y座標を移動させる
            obj.y = (property_master.height - obj.height) / 2;
        }else{
            obj.width = obj * height_rate;
            obj.height = obj * height_rate;
            // 左右に隙間ができるので、X座標を移動させる
            obj.x = (property_master.width - obj.width) / 2;
        }
        ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
    }
}

function image_set(game_property){
    return new Promise(resolve,reject => {
        let loop_num = 0;
        let img_num = game_property.item_num;
        for (let  key in game_property.item_list) {
            game_property.image_list[key] = new Draw_obj();
            game_property.image_list[key].img = new Image();
            game_property.image_list[key].img.src = "../../img/"+game_property.item_list[key].url;
            game_property.image_list[key].img.onload = load_num(img_num,
                function(){
                    resolve(game_proerty);
                }
                ,game_proerty
            )();
        }
    })
    function load_num(img_num,callback,game_property){
        let num = 0;
        return (function(){
            if(++num == img_num){ callback();}
        })
    }
}
/*
 * ランダムに画像を表示する関数
 */
function draw_random(ctx,obj){
    // 背景オブジェクトのプロパティ取得
    let initialize_property = storager.get("initialize_property");
    // 背景の描画
    canvas_initialize(draw_initialize,initialize_property)
}











