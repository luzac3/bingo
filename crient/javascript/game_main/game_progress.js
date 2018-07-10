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

                if(time > 20 * 1000){
                    // 回数のチェック・一定回数(約20秒)オーバーしたら停止処理
                    // 呼び出された回数
                    let num = num_storager();
                    if(num > 60){
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
                    })
                }else{
                    update_check();
                }
            },5*1000);
        }

        update_check();

        // 取得待機
        wait_get_item(user_property);
    });
}

function wait_get_item(user_property){
    // タイマーをリセット
    timer_storage(true);
    return new Promise((resolve,reject) => {
        // 待機を開始
        call_stored_wait("get_item_001",arg_arr).then(function(data){
            // これが帰ってきた時点でコードの更新処理は走ってないといけない
            let num = 0;
            user_property.msre_property.forEach(function(item_cd){
                if(data["item_cd"] == item_cd){
                    // ゲームプロパティ更新
                    user_property.msre_property[num].cll_flg = 1;

                    // ビンゴ、リーチ判定、GameProperty更新処理
                    user_property = check_bng(user_property,data);

                    // hitアニメーション表示/リーチ判定処理/青色点滅
                    prfrmnc(user_property).then(function(){
                        // DB登録
                        db_register(user_property).then(function(){
                            //
                        });
                    });

                    if(user_property.end_flg){
                        return;
                    }
                    // タイマーをリセット
                    timer_storage(true);
                    wait_get_item(user_property);
                }
                num++;
            });
            // DB登録


            if(end){
                return;
            }
        },function(){
            // DB通信自体に失敗している場合
            // 再度呼ぶかどうか聞く
        });
    });
}

/*
 * ビンゴ・リーチ判定、ゲームプロパティ更新処理
 */
function check_bng(user_property,data){
    // item["leach_num"]と["bng_num"]の二つを使用
    if(user_property.leach_num < data["leach_num"]){
        user_property.leach_flg = 1;
    }
    if(user_property.bng_num < data["bng_num"]){
        user_property.bng_flg = 1;
    }
    return user_property;
}


/**
 * DB登録処理
 */
function db_register(user_property){
    let index = null;
    let num = 0;
    user_property.item_list.forEach(function(item){
        if(item.cll_flg){
            index = num;
            user_property.item_list[num] = null;
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
        if(data["end_flg"]){
            return;
        }
        // タイマーをリセット
        timer_storage(true);
        wait_get_item(user_property);
    });
}

/*
 * 終了判定処理
 */
function end_process(user_property){

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
