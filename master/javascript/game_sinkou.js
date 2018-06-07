/*
 * ゲームを進行させる
 * 募集完了して、ゲーム開始を押した場合に起動
 *
 * @param user_list 登録画面で取得した参加ユーザーリスト
 */
function game_sinkou(game_property){
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
    call_stored("game_status_update_001",gameProperty).then(function(){

    });

    // 確率設定登録・初期化
    game_property = kakuritu(game_property);

    // ゲーム進行ループ呼び出し
    game_sinkou_loop(user_list);
}

function game_sinkou_loop(game_property){
    // 継続フラグチェック
    let continue_flg = wait_status()();
    if(!continue_flg){
        return;
    }
    let arg_arr = {
        bng_no:game_property["bng_no"]
    }
    // 参加ユーザーの登録フラグをリセット
    call_stored_wait("user_flg_reset_001",arg_arr).then(function(data){
        // 項目選択
        item_select(game_property);

        // 演出呼び出し
        if(ensyutu_flg){
            ensyutu(game_property);
        }else{

        }
    },function(){

    });
}

/*
 * 項目の選択を行う
 */
function item_select(game_prpoerty){
    let item_cd = "";
    // 確率設定有無チェック
    if(game_proerty.kakuritu_flg){
        let kakuritu = Math.rondom();
        let kakuritu_hikaku = 0;
        let kakuritu_group = 0;
        // 確率[0]の確率+確率[1]の確率・・・とやっていく
        for(let i=0,len = game_proerty.kakuritu_list.length(); i < len; i++){
            kakuritu_hikaku += game_proerty.kakuritu_list[i] / 100;
            if(kakuritu < kakuritu_hikaku){
                kakuritu_group = i;
                break;
            }
        }
        let arr_length = game_property.kakuritu_list[kakuritu_group].length();

        item_cd = game_property.kakuritu_list[kakuritu_group][Math,floor(Math.rondom()) * arr_length];
    }else{
        let arr_length = game_property.no_kakuritu_list.length();
        item_cd = game_property.no_kakuritu_list[Math,floor(Math.rondom()) * arr_length];
    }
    // 登録が完了するまで配列の削除は行わないが、一度でも選択されたら読み上げられたというフラグを立てにいく
    // 演出完了前に落ちた場合、すでに値は選択されたものとして扱う(すでにチェックが完了していた場合はフラグが立っているため、進行する)
    // 配列生成の際にチェックして読み上げフラグが立っている場合は選択項目に登録せず、完了リストにセットして進める
    return item_cd;
}


/*
 * 演出を行う関数
 * 演出前段階でキャラクター選別は済
 */
function ensyutu(game_property){

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