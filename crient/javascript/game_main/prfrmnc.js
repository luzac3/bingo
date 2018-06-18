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
function msre_hit_anim(){

}

/*
 * リーチ演出
 */
function leach_anim(ctx,property){
    let img_list = [];
    // 背景(ラベル)
    img_list[0] = new Draw_obj();
    // ラベルのwidthを画像のマックスにあわせる
    // 比率を維持してheightを変更

    // X座標をCanvasの端、Y座標をCanvasの中心-ラベルサイズの半分に

    // キャンバス(ラッパー)の縦の方が長い場合も同様？縦長用の画像を作る？

    // 速度設定

    // 背景(ラベル内、ループ画像)
    img_list[1] = new Draw_obj();
    // 縦をラベルのサイズに合わせる。X、Y座標もラベルと共通

    // トップイラストなど
    img_list[2] = new Draw_obj();
    // 同上

    let img = new Image();
    img.onload = function(){
        // 描画処理
    }

    img.src = "url";
}

/*
 * ビンゴ演出
 */
function bng_anim(){

}
