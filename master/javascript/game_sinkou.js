/*
 * ゲームを進行させる
 * 募集完了して、ゲーム開始を押した場合に起動
 *
 * @param user_list 登録画面で取得した参加ユーザーリスト
 */
function game_sinkou(user_list){
	let pause = $("#pause").val();

	if(pause == "pause"){
        wait_status(false);
	}

    let bng_no = $("#all").prop("class");

    let arg_arr = {
        bng_no : bng_no
        ,game_status : 2
    }
    // ゲームステータスを更新
    let result = call_stored("game_status_update_001",arg_arr);

    // 確率設定登録・初期化
    kakuritu(bng_no);

    // ゲーム進行ループ呼び出し
    game_sinkou_loop(user_list);
}

function game_sinkou_loop(user_list){
    // 継続フラグチェック
    let continue_flg = wait_status()();
    if(!continue_flg){
        return;
    }
    // 参加ユーザーの登録フラグをリセット

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