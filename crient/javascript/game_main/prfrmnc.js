/**
 * ヒットアニメーション表示/リーチ判定/点滅処理
 * ビンゴ/リーチ演出
 */
function prfrmnc(game_property){
    let animLoop = new AnimLoop();

    let property = {
        obj:game_property
        ,wrapper:game_property
        ,canvas:canvas_name
        ,repeat:null
        ,operation_time:null
        ,draw_interval:null
    }
    // ヒットアニメーション表示
    animLoop.animloop(property,hit_anim);

    // マス塗りつぶし処理

    // リーチ増加フラグがたっていたらリーチ演出

    // ビンゴ増加フラグが立っていたらリーチ演出



    resolve(game_property);
}

/*
 * ヒットアニメーション表示
 */
function hit_anim(){
    let img = new Image();
    img.onload = function(){

    }
}

/*
 * マス塗りつぶし処理
 */
function msre_hit_anim(ctx,property){
    let cnt = 0;
    return new Promise(resolve,reject => {
        function flash(){
            let num = 0;
            let index = 0;
            property.obj.item_list.forEach(function(item){
                if(item.cll_flg){
                    if(cnt % 2 == 0){
                        item.r = "";
                        item.g = "";
                        item.b = "";
                    }else{
                        item.r = 0;
                        item.g = 0;
                        item.b = 0;
                    }
                    index = num;
                }
                num++;
            });

            msre_draw(game_property,wrapper,canvas_name).then(function(){
                if(cnt == 10){
                    game_property.item_list[index].cll_flg = null;
                    resolve(game_property);
                }
                setInterval(function(){
                    flash()
                },500);
            });
        }
        flash();
    });}

/*
 * リーチ演出
 */
function leach_anim(ctx,property){
    let canvas_master_obj = storager.get("prfrmnc_master_obj");

    let img_list = [];
    // 背景(ラベル)
    img_list[0] = new Draw_obj();

    // 背景(ラベル内、ループ画像)
    img_list[1] = new Draw_obj();

    // トップイラストなど
    img_list[2] = new Draw_obj();

    let leach_img_counter = img_counter(3,function(){
        // ラベルのwidthを画像のマックスにあわせる
        img_list[0].width = canvas_master_obj.width;

        // 比率を維持してheightを変更
        img_list[0].height = img_list[0].img.naturalHeight * (img_list[0].width / img_list[0].img.naturalWidth);

        // X座標をCanvasの端、Y座標をCanvasの中心-ラベルサイズの半分に

    })
    // 画像をすべて読み込む
    for(let i=0; i<3; i++){
        img_list[i].onload = leach_img_counter;
        img_list[i].img.src = img_list[i].url;
    }




    // キャンバス(ラッパー)の縦の方が長い場合も同様？縦長用の画像を作る？

    // 速度設定

    // 縦をラベルのサイズに合わせる。X、Y座標もラベルと共通

    // 同上
}

/*
 * ビンゴ演出
 */
function bng_anim(){

}


function img_counter(cnt,callback){
    let num = 0;
    return (function(){
    	if(++num == cnt){ callback(); }
    })
}