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
function hit_anim(animLoop){

}

/*
 * マス塗りつぶし処理
 */
function msre_hit_anim(){

}

/*
 * リーチ演出
 */
function leach_anim(){

}

/*
 * ビンゴ演出
 */
function bng_anim(){

}
