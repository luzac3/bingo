/**
 * インスタンス化して利用する
 */
let AnimLoop = function(){
    /*
     * アニメーションフレームのアニメーション処理部分
     * 描画オブジェクトを受け取り、コールバックでdraw関数を動かす
     *
     * @return 終了コード値(フラグ？)
     * ・0　一時停止
     * ・1　正常終了
     */
    function anim(property,draw){
        return new Promise(resolve,reject => {
            // キャンバス変更用のマスタ取得
            let property_master = storager.get("property_master");

            // 描画するCanvasの設定とCanvasオブジェクト
            canvas_obj = canvas_change(property_master,property.canvas_name);

            // オブジェクトの描画関数呼び出し
            // draw_propertyに変更前後の値を入れておく必要アリ(移動とか出来ないし)
            // speed等のデータを使うためこちらを取得
            draw(canvas_obj[0],property).then(function(data){
                // canvasの入れ替え
                document.getElementById(canvas_name+canvas_obj[1]).css('visibility','visible');
                document.getElementById(canvas_name+canvas_obj[2]).css('visibility','hidden');
                if(!data){
                    resolve(data);
                }else{
                    reject(data);
                }
            },function(){

            });
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
     * ・描画間隔(何ミリ秒後に次の描画を始めるか)　必須：0なら即時
     */
    function animloop(property,draw){
        // 初期オブジェクトの保持
        first_object(property);

        // animFrameストップ用にanimFrameを格納する変数
        let animFrame = null;

        return new Promise(resolve,reject => {
            let obj = property.obj;
            // wrapperクラスの名称
            let wrapper = property.wrapper;
            // Canvas名称
            let canvas_name = property.canvas_name;

            if(repeat == null && property.repeat != null){
                // リピート回数初期化
                let repeat = property.repeat;
            }

            // 稼働時間
            let time = property.operation_time;
            if(time != null){
                // タイマー起動
                let timer = timer_storage()().getTime();
                if(timer > time){
                    resolve(1);
                }
            }

            // スピード
            let draw_interval = property.draw_interval;

            anim(property,draw).then(function(data){
                reject(data);
            },function(data){
                if(data == 1){
                    if(!draw_interval){
                        requestAnimationframe(animloop,property,draw);
                    }else{
                        setTimeout(requestAnimationframe(animloop.bind(undefined,property,draw),draw_interval));
                    }
                }else{
                    if(repeat != null){
                        // リピート回数の確認
                        let repeat_num = repeat_num()();
                        if(repeat_num < repeat){
                            if(!draw_interval){
                                requestAnimationframe(animloop,property,draw);
                            }else{
                                setTimeout(requestAnimationframe(animloop.bind(undefined,property,draw),draw_interval));
                            }
                        }
                    }else{
                        reject(data);
                    }
                }
            });
        });
    }

    // アニメーションフレームを起動する関数
    this.start = function(){
        animFrame = (function(){requestAnimationFrame(animloop,property,draw)})
    }

    // アニメーションフレームを停止する関数
    this.stop = function(){
        cancelAnimationFrame(animFrame);
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

    // 繰り返し回数
    function repeat_num(){
        if(!this.num && this.num != 0){
            this.num = 0;
        }
        return (function(){
            return this.num + 1;;
        })
    }

    // 初期オブジェクトの保持
    function first_object(object){
        // objectが定義されていない一度目のみ保持する
        if(!this.object){
            this.object = object;
        }

        return (function(){
            return this.object;
        });

    }


    /*
     * 以下、AnimFrame未対応ブラウザのための再定義
     */
    let requestAnimationFrame  = (function(){
        return  window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    let cancelAnimationFrame = (function() {
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

}
