/*
 * Canvasの共通処理についてCanvas共通名設定
 * 共通に出来る部分もあるが、共通に出来ない詳細設定が多すぎてあまり具合良くないっぽい
 */

/*
 * アニメーションフレームのアニメーション処理部分
 * 描画オブジェクトを受け取り、コールバックでdraw関数を動かす
 */
function anim(draw_obj,draw,fn_animloop,animloop){
    // 描画リストの演出画像を切り替え
    // ていうかこの中でやるのって描画処理呼び出しだけでよくない？何で複雑にしようとしてるの？
    // オブジェクトの描画関数呼び出し
    let result = draw(draw_obj);
    if(result){
        return;
    }
    fn_animloop(animloop);
}

function animloop(property,draw){
    let obj = property.obj;
    let time = property.time;

    let timer_set_flg = timer_set_flg()();

    let timer = null;

    if(time && !timer_set_flg){
        timer = new Timer();
        timer.start();
        timer_set_flg(true);
    }

    /* 共通関数用 */
    let speed = property.speed;
    if(time){
        let now_time = timer.get_time();
        if(time < now_time){
            anim(property.bind(property),draw,window.requestAnimationFrame(animloop).bind(window),animloop);
        }else{
            window.requestAnimationFrame(animloop);
        }
    }
}

// オブジェクトを変更する関数
// こちらはセットタイムアウト？
// フロー
/*
 * 1、アニメーションを回す関数を設定(時間ごとにSETTIMEOUTを呼んで制御？　時間制御も出来るようにしとくか
 * 　プロパティで受け取るようにすればいいわけだし(引数が省略できる共通関数になる)。完了したらresolveを返す非同期関数)
 * 2、
 */


/*
 * 以下、AnimFrame未対応ブラウザのための再定義
 */
window.requestAnimationFrame  = (function(){
	return  window.requestAnimationFrame   ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame    ||
	window.oRequestAnimationFrame      ||
	window.msRequestAnimationFrame     ||
	function(callback){
		window.setTimeout(callback, 1000 / 60);
	};
})();

window.cancelAnimationFrame = (function() {
  return window.cancelAnimationFrame ||
         window.cancelRequestAnimationFrame ||
         window.webkitCancelAnimationFrame ||
         window.webkitCancelRequestAnimationFrame ||
         window.mozCancelAnimationFrame ||
         window.mozCancelRequestAnimationFrame ||
         window.msCancelAnimationFrame ||
         window.msCancelRequestAnimationFrame ||
         window.oCancelAnimationFrame ||
         window.oCancelRequestAnimationFrame ||
         function(id) { window.clearTimeout(id); };
}());
