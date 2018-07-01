/*
 * 初期読み込み
 */
$(document).ready(function (){
    // canvasの設定

    // メイン関数起動
    $("button").on("click",function(){
        main(this);
    });
});

// 基本的な方針
// Phase１においては、自動ビンゴ機能は省く(コード01として扱う)
// ただし毎回受信ごとにチェックを行うのは変わらず(基本要件なので)

function main(_this){
    // 項目登録
    let user_property = new User_property();

    let button = $(_this).val();

    switch(button){
      case "enter":
        // join.matching
        matching().then(function(data){
            user_property.bng_no = data[0]["BNG_NO"];
            user_property.user_cd = data[0]["USR_CD"];
            user_property.user_name = data[0]["USR_NAME"];

            $("#set_bng_no").addClass(user_property.bng_no);
            $("#set_user_cd").addClass(user_property.user_cd);
            $("#set_user_name").addClass(user_property.user_name);

            if(data["itm_lst"]){
                // 項目リスト設定済(選択済)→ゲーム進行処理起動
                // ゲームステータスによって表示/非表示ボタンが切り替わるため、切り替えを関数内で行う
                // この処理はおかしいです。要修正
                game_progress(user_property);
            }else{
                // 項目リスト設定関数起動
                // 上に合わせる
                item_register(user_property);
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