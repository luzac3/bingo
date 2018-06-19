function game_progress(game_property){
    // ロード処理

    // 初期描画処理
    msre_draw(game_property,"progress_wrapper","progress_canvas").then(function(){
        // ロード終了
        load_anim.stop();

        // タイマーを起動
        timer_storage();

        // 20秒以上経過していたら更新処理
        // 確認は5秒間隔
        let update_check = (setTimeout(function(){
            let time = check_timer(false);

            if(time > 20 * 1000){
                // 回数のチェック・一定回数(約20秒)オーバーしたら停止処理
                let num = num_storage()();
                if(num > 60){
                    return;
                }
                let arg_arr = {
                    bng_no:game_property.bng_no
                    ,user_cd:game_property.user_cd
                }
                call_stored("update_user_001",arg_arr).then(function(data){
                    update_check();

                    // タイマーをリセット
                    timer_storage(true);
                })
            }else{
                update_check();
            }
        },5*1000));

        // 取得待機
        wait_get_item(game_property);
    });
}

function wait_get_item(game_property){
    // タイマーをリセット
    timer_storage(true);
    return new Promise(resolve,reject => {
        // 待機を開始
        call_stored_wait("get_item_001",function(data){
            let num = 0;
            game_property.item_list.forEach(function(item){
                if(data["item_cd"] == item){
                    // ゲームプロパティ更新
                    game_property.item_list[num].cll_flg = 1;

                    // ビンゴ、リーチ判定、GameProperty更新処理
                    game_property = check_bng(game_property,item);

                    // hitアニメーション表示/リーチ判定処理/青色点滅
                    prfrmnc(game_property).then(function(){
                        // DB登録
                    });

                    if(game_property.end_flg){
                        return;
                    }
                    // タイマーをリセット
                    timer_storage(true);
                    wait_get_item(game_property);
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
function check_bng(game_property,item){
    // item["leach_num"]と["bng_num"]の二つを使用
    if(game_property.leach_num < item["leach_num"]){
        game_property.leach_flg = 1;
    }
    if(game_property.bng_num < item["bng_num"]){
        game_property.bng_flg = 1;
    }
    game_property.end_flg = item["end_flg"];

    return game_property;
}


/**
 * DB登録処理
 */
function db_register(game_property){
    let index = null;
    let num = 0;
    game_property.item_list.forEach(function(item){
        if(item.cll_flg){
            index = num;
            game_property.item_list[num] = null;
        }
        num++;
    });

    let arg_arr = {
        bng_no:game_proprerty.bng_no
        ,usr_cd:game_proprerty.user_cd
        ,msre_num:index
        ,cntnt_id:item_cd
        ,exst_flg:1
    }
    call_stored("db_rgister_001",arg_arr).then(function(data){
        if(data["end_flg"]){
            return;
        }
        // タイマーをリセット
        timer_storage(true);
        wait_get_item(game_property);
    });
}

/*
 * 終了判定処理
 */
function end_process(game_property){

}

/*
 * 回数取得処理
 */
function num_strage(){
    let num = 0;
    return (function(){
        return num++;
    })
}
