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

            if(data[0]["MSRE_NO_LST"]){
                // 項目リスト設定済(選択済)→ゲーム進行処理起動
                // ゲームステータスによって表示/非表示ボタンが切り替わるため、切り替えを関数内で行う

                if(data[0]["GMSTTS_CD"]){
                    alert("募集中ではありません");
                    return;
                }

                let num = 0;

                set_property(user_property).then(function(user_property){
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
                    // タグを設定
                    const base = $("#tag_sample input").filter(":first-child");

                    tag_list.forEach(function(tag){
                        // copyオブジェクトを作成
                        let copy = base.clone();
                        copy.attr("class","tag_list");
                        copy.attr("name","tag");
                        copy.val(tag["BNG_TAG"]);

                        // コピーした要素を表示状態に切り替え
                        copy.css("visibility","visible");

                        // 要素の最後にコピーしたクローンを挿入
                        $("#tag").append(copy);
                        $("#tag").append(tag["BNG_TAG"]);
                    });

                    item_register(user_property);
                });
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