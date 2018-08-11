function game_progress(user_property){
    // ロード処理

    // 初期描画処理
    msre_draw(
        user_property
        ,user_property.msre_property
        ,"bng_wrapper"
        ,"bng_canvas"
    ).then(function(){
        // ロード終了
        // load_anim.stop();

        // タイマーを起動
        timer_storage();

        // 呼び出し回数初期化
        const num_storager = num_storage();

        // 20秒以上経過していたら更新処理
        // 確認は5秒間隔
        function update_check(){
            setTimeout(function(){
                let time = timer_storage(false)();

                // 回数のチェック・一定回数(約20秒)オーバーしたら停止処理
                // 呼び出された回数
                let num = num_storager();
                console.log(num);
                if(num > 10){
                    return;
                }
                let arg_arr = {
                    bng_no:user_property.bng_no
                    ,user_cd:user_property.user_cd
                }
                call_stored("update_user_001",arg_arr).then(function(data){
                    // タイマーをリセット
                    timer_storage(true);
                    update_check();
                });
            },20 * 1000);
        }

        update_check();

        let arg_arr2 = {
            bng_no : user_property.bng_no
            ,user_cd : user_property.user_cd
            ,kusn_ntj : 0
        }

        // 取得待機
        wait_get_item(user_property,arg_arr2).then(function(user_property){
            if(!user_property.end_flg){
                return;
            }
        });
    });
}

function wait_get_item(user_property,arg_arr){
    // タイマーをリセット
    timer_storage(true);
    return new Promise((resolve,reject) => {
        // 待機を開始
        // 2分以上かかるならタイムアウト
        call_stored("get_item_001",arg_arr,2 * 60 * 1000).then(function(data){
            let num = 0;
            user_property.msre_property.forEach(function(msre_property){
                if(data["ITM_CD"] == msre_property.item_cd){
                    // ゲームプロパティ更新
                    user_property.msre_property.cll_flg = true;
                }
                num++;
            });
            // ユーザ情報のマス情報はマス情報リストにすべき

            // ビンゴ、リーチ判定、GameProperty更新処理
            user_property = check_bng(user_property,data);

            // hitアニメーション表示/リーチ判定処理/青色点滅
            prfrmnc(user_property).then(function(){
                // DB登録
                db_register(user_property).then(function(user_property){
                    if(user_property.end_flg){
                        return;
                    }

                    // タイマーをリセット
                    timer_storage(true);

                    // 引数の更新日時を更新
                    arg_arr["kusn_ntj"] = data["KUSN_NTJ"];

                    // 再帰呼び出し
                    wait_get_item(user_property,arg_arr).then(function(user_property){
                        // resolve(user_property);
                    	console.log("再帰呼び出し");
                    });
                });
            });
        },function(){
            // DB通信自体に失敗している場合
            // 再度呼ぶかどうか聞く
            if(window.confirm("通信に時間がかかっています。\n再度接続しますか？")){
                // 再帰呼び出し
                wait_get_item(user_property,arg_arr).then(function(user_property){
                    resolve(user_property);
                });
            }else{
                alert("処理を中断しました");
            	console.log("ex_error");
            }
        });
    });
}

/*
 * ビンゴ・リーチ判定、ゲームプロパティ更新処理
 */
function check_bng(user_property,data){
    // item["leach_num"]と["bng_num"]の二つを使用
    if(user_property.leach_num < data["LCH_NUM"]){
        user_property.leach_flg = true;
    }
    if(user_property.bng_num < data["BNG_NUM"]){
        user_property.bng_flg = true;
    }
    user.property.leach_num = data["LCH_NUM"];
    user.property.bng_num = data["BNG_NUM"];

    return user_property;
}

/**
 * DB登録処理
 */
function db_register(user_property){
    return new Promise((resolve,reject) => {
        let index = null;
        let num = 0;
        user_property.msre_property.forEach(function(msre_property){
            if(msre_property.cll_flg){
                index = num;
                user_property.msre_property = false;
            }
            num++;
        });

        let arg_arr = {
            bng_no:game_proprerty.bng_no
            ,usr_cd:game_proprerty.user_cd
            ,msre_num:index
            ,exst_flg:1
        }
        call_stored("db_register_001",arg_arr).then(function(data){
            if(data["END_FLG"]){
                user_property.end_flg = true;
            }

            resolve(user_property);
        },function(){
        	reject();
        });
    });
}

/*
 * 回数取得処理
 */
function num_storage(){
    let num = 0;
    return (function(){
        return num++;
    })
}
