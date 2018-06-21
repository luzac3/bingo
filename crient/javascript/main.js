/*
 * 初期読み込み
 */
function initialize(){
    // canvasの設定
}

// 基本的な方針
// Phase１においては、自動ビンゴ機能は省く(コード01として扱う)
// ただし毎回受信ごとにチェックを行うのは変わらず(基本要件なので)

function main(){
    // 項目登録
    let game_property = new Game_proeprty();

    let button = $(this).val();

    switch(button){
      case "enter":
        // join.matching
        matching().then(function(data){
            game_property.bng_no = data[0];
            game_property.user_name = data[1];
            game_property.user_cd = data[2];

            $("#set_bng_no").addClass(game_property.bng_no);
            $("#set_user_name").addClass(game_property.user_name);
            $("#set_user_cd").addClass(game_property.user_cd);

            if(data["itm_lst"]){
                // 項目リスト設定済(選択済)→ゲーム進行処理起動
                // ゲームステータスによって表示/非表示ボタンが切り替わるため、切り替えを関数内で行う
                //
                game_progress(data);
            }else{
                // 項目リスト設定関数起動
                // 上に合わせる
                item_register(data);
            }
        });
        break;

        // 以下開閉処理はマスタと同様
        case "open":
          $(this).addClass("hidden");
          $(this).next().removeClass();
          game_recruit(button);
          break;
        case "close":
          $(this).addClass("hidden");
          $(this).next().removeClass();
          game_progress(game_status);
          break;
    }
}