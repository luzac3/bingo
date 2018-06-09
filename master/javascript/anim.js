/*
 * Canvasの共通処理についてCanvas共通名設定
 * 共通に出来る部分もあるが、共通に出来ない詳細設定が多すぎてあまり具合良くないっぽい
 */

/*
 * アニメーションフレームのアニメーション処理部分
 * 描画オブジェクトを受け取り、コールバックでdraw関数を動かす
 *
 * @return 終了コード値(フラグ？)
 * ・0　一時停止
 * ・1　正常終了
 */
function anim(draw_obj,draw){
    return new Promise(resolve,reject => {
        // オブジェクトの描画関数呼び出し
        let result = draw(draw_obj);
        if(!result){
            resolve(result);
        }else{
            reject(result);
        }
    });
}

/*
 * @param プロパティ
 * ・描画オブジェクトプロパティ(リスト)
 * ・ラッパークラスの名称(ID)
 * ・Canvasの名称
 *
 * ・リピート回数(未指定無限回リピート、0なら1回で終了)
 * ・稼働時間(未指定なら無限時間稼動、0なら即時終了(アニメーションしない)) ミリ秒指定
 * ＊回数と時間を同時に入れる場合、どちらかが0になった時点で終了するので注意(片方が無限指定であっても)
 * ・スピード(1動作が何FPSか)
 */
function animloop(property,draw){
    return new Promise(resolve,reject => {
        let obj = property.obj;
        // wrapperクラスの名称
        let wrapper = property.wrapper;
        // Canvas名称
        let canvas_name = property.canvas_name;

        // リピート回数
        let repeat = property.repeat;
        if(repeat != null){
            // タイマー起動
            let repeat_num = repeat_num()();
            if(repeat_num > repeat){
                resolve(1);
            }
        }

        // 稼働時間
        let time = property.time;
        if(time != null){
            // タイマー起動
            let timer = timer_storage()().getTime();
            if(timer > time){
                resolve(1);
            }
        }

        // スピード
        let speed = property.speed;

        anim(property,draw).then(function(data){
            reject(data);
        },function(data){
            if(data == 1){
                animloop(property,draw);
            }else{
                reject(data);
            }
        });
    });
}

let Timer = function(){
    /*
     * タイマー開始/リセット
     */
    this.startTimer = function(){
        this.now = Date.now();
    }

    /*
     * 時間取得
     */
    this.getTime = function(){
        return Date.now() - this.now;
    }
}

function timer_storage(){
    if(!this.timer){
        this.timer = new Timer();
        this.timer.startTimer();
    }
    return (function(){
        return this.timer;
    });
}

function repeat_num(){
    if(!this.num && this.num != 0){
        this.num = 0;
    }
    return (function(){
        return this.num;
    })
}

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
