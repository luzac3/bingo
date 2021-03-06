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
    const user_property = new User_property();

    const button = $(_this).val();

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

            $("#input_bng_no")[0].style.display = "none";

            if(data[0]["MSRE_NO_LST"] && data[0]["ITM_SLCTD_FLG"]){
                // 項目リスト設定済(選択済)→ゲーム進行処理起動
                // ゲームステータスによって表示/非表示ボタンが切り替わるため、切り替えを関数内で行う

                if(data[0]["GMSTTS_CD"]){
                    alert("募集中ではありません");
                    return;
                }

                let num = 0;

                set_property(user_property,"bng_wrapper").then(function(user_property){
                    // ゲーム進行を変更する
                    // game_progress(user_property);
                    game_progress_ease(user_property);
                },function(reject){
                    console.log(reject);
                });
            }else{
                // 項目リスト設定関数起動
                // 上に合わせる
                const arg_arr = {
                    bng_no:user_property.bng_no
                }
                call_stored("get_tag_list_001",arg_arr).then(function(tag_list){
                    const tagElem = document.getElementsByClassName("tag");
                    let option = document.createElement("option");

                    if(tag_list != "データ取得エラー"){
                        // タグを設定
                        for(let i = 0; i < 3; i++){
                            if(!tag_list){
                              option = document.createElement("option");

                              option.value = "";
                              option.text = "---";

                              // 要素の最後に挿入
                              tagElem[i].appendChild(option);

                              continue;
                            }
                            tag_list.forEach(function(tag){
                                option = document.createElement("option");
                                option.value = tag["BNG_TAG"];
                                option.text = tag["BNG_TAG"];

                                // 要素の最後に挿入
                                tagElem[i].appendChild(option);
                            });
                        }
                    }

                    item_register(user_property);
                });
            }
        });
        break;

        case "clear":
          bng_clear();
          break;

        case "edit":
          item_register(storager.get("user_property"));
          break;

        // 以下開閉処理はマスタと同様
        case "open":
          $(this).addClass("visible");
          $(this).next().removeClass();
          $(this)[0].visibility = "visible";
          game_recruit(button);
          break;
        case "close":
          $(this).addClass("hidden");
          $(this).next().removeClass();
          $(this)[0].visibility = "hidden";
          game_progress(game_status);
          break;
    }
}
