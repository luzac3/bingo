/*
 * 参加表明時の確認/データ取得関数
 */
function participate(){
    call_stored("participate_001",function(data){
        // データをgame_propertyにつめなおす
        if(!data["game_status"]){
            // エラー募集開始してない
            return;
        }
        wait_game_start(game_property);
    },function(){
        // エラーの場合募集停止なのでスルー
        // メッセージ「募集が開始されていないか、通信状態が悪いかもしれません」
    });
}

function wait_game_start(game_property){
    // これを行うとき、
    call_stored_wait("get_status_001",function(data){
        // データをチェックする
        if(data["game_status"] == 2){
            // 再起呼び出しを行う
            game_progress(game_property);
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
        wait_game_start(game_property);
    });
}

// 再起した回数をチェック
function try_number(){
    let num = 0;
    return (function(){
        return num++;
    });
}
