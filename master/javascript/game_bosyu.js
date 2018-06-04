function game_bosyu(val){
    if(val == "bosyu"){
        // 参加者募集処理開始
        // ゲームステータスを募集中に書き換え
        // ここはさすがにコード値直接入力でいいと思う。取ってくることもできんことはないが
        let arg_arr = {
            game_status : 1
        }
        let result = call_stored("game_status_update_001",arg_arr);

        user_bosyu_loop(0);

        // ユーザー配列のDB保管
    }else if(val == "pause"){
    	wait_status(false);
    }
}

function user_bosyu_loop(num){
    // 継続フラグチェック
    let continue_flg = wait_status()();
    if(!continue_flg){
        return;
    }

    // 待機開始
    call_stored_wait("user_bosyu_001").then(function(data){
        // ヒットした自動割り振りのユーザーコードとユーザー名が返却される
        user_list(data);
        user_bosyu_loop(num++);
    },function(){
        if(num > 100){
            // ユーザ募集を続けるかどうか確認
            // 続ける場合はnumをリセット
        }
        user_bosyu_loop(num++);
    });
}

function user_list(arr_str){
    if(this.user_list == null){
        this.user_list = {};
    }
    let user_arr = arr_str.split(",");

    let num = 0;
    for(let i = 0,len = user_arr.length(); i< len; i++){
        this.user_list[user_arr[i]] = user_arr[i++];
    }

    return (function(){
        return this.user_list;
    })
}

function wait_status(status){
    // 募集を続けるかどうかのチェック用真偽値
    if(status != null){
        this.status = status;
    }
    return (function(){
        return this.status;
    })
}