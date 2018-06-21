/*
 * 参加表明時の確認/データ取得関数
 */
function participate(){
    let bng_no = $("#set_bng_no").attr("class");
    let user_cd = $("#set_user_cd").attr("class");
    return new Promise(resolve,reject => {
        let arg_arr = {
            bng_no:bng_no
            ,user_cd:user_cd
        }

        call_stored("participate_001",arg_arr).then(function(data){
            // データをuser_propertyにつめなおす
            user_property.bng_no = data["BNG_NO"];
            user_property.user_cd = data["USR_CD"];
            user_property.user_name = data["USR_NAME"];
            user_property.lch_num = data["USR_LCH_NUM"];
            user_property.bng_num = data["USR_BNG_NUM"];
            user_property.end_flg = data["USR_END_FLG"];

            if(!data["game_status"]){
                // エラー募集開始してない
                reject();
            }
            wait_game_start(user_property);
        },function(){
            // エラーの場合募集停止なのでスルー
            // メッセージ「募集が開始されていないか、通信状態が悪いかもしれません」
        });
    });
}

function wait_game_start(user_property){
    // これを行うとき、
    call_stored_wait("get_status_001",function(data){
        // データをチェックする
        if(data["game_status"] == 2){
            // 再起呼び出しを行う
            game_progress(user_property);
        }
    },function(){
        let num = try_number()();

        // 60回(想定20分)を超えたら再起を止める
        // 現状の実装だと動かないんで一時停止しておく(あとで復帰します)
/*
        if(num > 60){
            return;
        }
*/
        // エラーで帰ってきているので、再起呼び出しを行う
        // 本当はエラーの種類をチェックすべき
        wait_game_start(user_property);
    });
}

// 再起した回数をチェック
function try_number(){
    let num = 0;
    return (function(){
        return num++;
    });
}
