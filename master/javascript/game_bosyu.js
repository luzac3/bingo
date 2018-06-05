function game_bosyu(val){
    if(val == "bosyu"){
        // 参加者募集処理開始
        // ゲームステータスを募集中に書き換え
        // ここはさすがにコード値直接入力でいいと思う。取ってくることもできんことはないが
        let arg_arr = {
            game_status : 1
        }
        let result = call_stored("game_status_update_001",arg_arr);

        arg_arr = {
            user_list:null
            ,user_exist_num:0
        }

        user_bosyu_loop(0,arg_arr);

        // ユーザー配列のDB保管
    }else if(val == "pause"){
    	wait_status(false);
    }
}

function user_bosyu_loop(num,arg_arr){
    // 継続フラグチェック
    let continue_flg = wait_status()();
    if(!continue_flg){
        return;
    }

    // 待機開始
    call_stored_wait("user_bosyu_001",arg_arr).then(function(data){
        // ヒットした自動割り振りのユーザーコードとユーザー名が返却される
        // 0,1は人数が入っている
        user_list(data);
        user_bosyu_loop(num++,arg_arr,user_list()(),user_num()());
    },function(){
        if(num > 100){
            // ユーザ募集を続けるかどうか確認
            // 続ける場合はnumをリセット
        }
        user_bosyu_loop(num++,arg_arr);
    });
}

/*
 * ユーザーのリストを登録するためのプロパティ
 * 文字列で返すことになっているが、考え中(マップで帰ってきてもいいのではないかと)
 */
function user_list(arr_str){

    if(this.user_list == null){
        this.user_list = {};
    }

    if(user_arr != null){
        let user_arr = arr_str.split(",");

        for(let i = 2,len = user_arr.length(); i< len; i++){
            this.user_list[user_arr[i]] = new User_property(user_arr);
        }
    }

    return (function(){
        return this.user_list;
    });
}

/*
 * ユーザー人数(全体と存在している人数)のプロパティを返却するクロージャ
 */
function user_num(user_arr){
    return (function(){
        return this.user_num;
    });
    let User_num_arr = function(user_arr){
        this.user_num_whole = user_arr[0];
        this.user_num_exist = user_arr[1];
    }
    if(user_num != null){
        this.user_num = new User_num_arr(user_arr);
    }
}

/*
 * ユーザ募集を続けるかどうかのチェック。募集をとめる場合はここをFalseに設定
 */
function wait_status(status){
    // 募集を続けるかどうかのチェック用真偽値
    if(status != null){
        this.status = status;
    }
    return (function(){
        return this.status;
    });
}

/*
 * ユーザの情報を設定するプロパティ
 */
let User_property = function(){
    this.user_cd;
    this.user_name;
    this.exist_flg;
}