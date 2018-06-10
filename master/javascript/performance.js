/*
 * 演出を行う関数
 * 演出前段階でキャラクター選別は済
 */
function performance(game_property){
    // 本来はこれもコールバックでDBからデータを取得する必要がある(ゲームごとに画像やムービーを設定する)が、Phase1では省略
    // 固定の演出を取得
    // 演出前にz-indexを変更、演出終了と同時に戻す
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
        let img_num = game_property.url_item_num;
        for (let  key in game_property.item_list) {
            if(game_property.item_list[key].url){
                game_property.image_list[key] = new Draw_obj();
                game_property.image_list[key].img = new Image();
                game_property.image_list[key].img.src = "../../img/"+game_property.item_list[key].url;
                game_property.image_list[key].img.onload = load_num(item_num,
                    function(){
                        resolve(game_proerty);
                    }
                    ,game_proerty
                )();
            }else{
                game_property.image_list[key] = new Draw_obj();
                game_property.image_list[key].text = game_property.item_list[key].name;
            }
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
 * @param ctx　キャンバスオブジェクト
 * @param obj プロパティ
 * @return drawの完了状況　Falseで完了
 */
function draw_performance(ctx,obj){
    // 背景オブジェクトのプロパティ取得
    let initialize_property = storager.get("initialize_property");
    // 背景の描画
    canvas_initialize(draw_initialize,initialize_property);

    // game_property取得
    let game_property = obj.game_property;

    random_draw(ctx,game_property);
    random_draw(whiteout,initialize_property);

    let rate = rate(0)();
    let opactity = opacity(0)();

    // 戻り値フラグ設定
    let return_flg = null;

    if(return_flg == null){
        return_flg = true;
    }

    setTimeout(function(){
        return_flg = false;
    },500);

    if(rate == 0.8 && opactity == 1){
        return return_flg;
    }else{
        return true;
    }
}

function random_draw(ctx,game_property){
    // ランダム表示用のオブジェクトの長さを求める
    let len = obj.length;

    // ランダム表示する画像のコード値を求める
    let cd = game_property.item_cd_list[Math,floor(Math.rondom()) * len];

    // 画像のサイズは50%→80%
    let rate = rate(0)();
    if(rate < 0.8){
        rate = rate(0.01)();
    }

    let width_rate = property_master.width / obj.width * rate;
    let height_rate = property_master.height / obj.height * rate;

    // レートの小さいほう(変換幅が小さいほう)に合わせる
    if(width_rate < height_rate){
        // 高さを幅に合わせる
        game_property.image_list[cd].width = game_property.image_list[cd] * width_rate;
        game_property.image_list[cd].height = game_property.image_list[cd] * width_rate;
        // 上下に隙間ができるので、Y座標を移動させる
        game_property.image_list[cd].y = (initialize_property.height - game_property.image_list[cd].height) / 2;
        // 左右に隙間ができるので、X座標を移動させる
        game_property.image_list[cd].x = (initialize_property.width - game_property.image_list[cd].width) / 2;
    }else{
        game_property.image_list[cd].width = game_property.image_list[cd] * height_rate;
        game_property.image_list[cd].height = game_property.image_list[cd] * height_rate;
        // 上下に隙間ができるので、Y座標を移動させる
        game_property.image_list[cd].y = (initialize_property.height - game_property.image_list[cd].height) / 2;
        // 左右に隙間ができるので、X座標を移動させる
        game_property.image_list[cd].x = (initialize_property.width - game_property.image_list[cd].width) / 2;
    }

    if(game_property.image_list[cd].img){
        ctx.drawImage(
            game_property.image_list[cd].img
            ,game_property.image_list[cd].x
            ,game_property.image_list[cd].y
            ,game_property.image_list[cd].width
            ,game_property.image_list[cd].height
        );
    }else{
        // 文字を描画
        ctx.textalign = "center";
        ctx.fillText(
            game_property.image_list[cd].name
            ,game_property.image_list[cd].x + (game_property.image_list[cd].width / 2)
            ,game_property.image_list[cd].y + (game_property.image_list[cd].height / 2)
        );
    }

    ctx.globalCompositeOperation = 'destination-in';

    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(
        game_property.image_list[cd].x
        ,game_property.image_list[cd].y
        ,game_property.image_list[cd].width
        ,game_property.image_list[cd].height
    );
}

function rate(add){
    let rate = 0.5;
    return (function(){
        return rate += add;
    })
}

function whiteout(ctx,initialize_property){
    let number = number()();
    // 不透明度初期化
    let opacity = 0;
    if(number % 10 == 0){
        // 不透明度を下げるのは10回に一回
        if(opacity == 10){
            opacity = opacity(0)();
        }else{
            opacity = opacity(0.1)();
        }
    }

    ctx.globalAlpha = opacity;
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,initialize_property.width,initialize_property.height);
}

function opacity(add){
    let opacity = 0.1;
    return (function(){
        return opacity += add;
    })
}

function number(){
    let num = 0;
    return (function(){
        return ++num;
    })
}





