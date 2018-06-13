$(document).ready(function(){
    // ポーズボタンの状態を初期化
    pause(true);

    let bng_no = $("#all").prop("class");

    // プロパティのインスタンス化、保存
    game_property_stocer = (new Game_property(bng_no));

    // 全プロパティ情報を取得、設定
    // その間動かないようにロードイメージを表示

    // 参加人数を取得、参加者の生死確認をする繰り返し処理

    $("button").on("click",function(){
        // データの取得
        game_status_initizalize(bng_no).then(function(data){
            game_property = data;
        });

        let button = $(this).val();
        switch(button){
          case "recruit":
              $("#game").addClass("hidden");
              $("#bosyu").removeClass("hidden");
            game_recruit(button);
            break;
          case "start":
              $("#bosyu").addClass("hidden");
              $("#game").removeClass("hidden");
              game_progress(game_status);
            break;

          case "pause":
            pause(!pause()());
            break;
        }
    })
});

/*
 * ポーズの状態を保持するクロージャ
 */
function pause(pause){
    if(arguments.length > 0){
        this.pause = pause;
    }
    return (function(){
        return this.pause;
    });
}

/*
 * ゲーム全体の値を保持するクロージャ
 */
function game_property_stocker(game_property){
    if(arguments.length > 0){
        this.game_property = game_property;
    }
    return(function(){
        return this.game_property;
    })
}
/*
 * ゲームステータスを設定する関数
 */
async function game_status_initizalize(bng_no){
    return(resolve,reject => {
        let arg_arr={
            bng_no:bng_no
        }
        let result = await call_stored("get_bng_mstr_001",arg_arr);
        let game_proerty = new Game_property(bng_no);
        let user_property = new User_property();
        let item_property = new Item_property();

        result.forEach(function(arr){
            game_property.user_num = arr["USR_NUM"];

            game_property.bg_us_flg = arr["BG_US_FLG"];
            game_property.bg_url = arr["BG_URL"];

            let num = 0;
            // ビンゴモード：全部読み上げ時
            if(arr["BNG_MD_CD"] == 1){
                game_property.item_num = arr["ITEM_NUM"];
                game_property.url_item_num = arr["URL_ITEM_NUM"];

                let item_cd = arr["ITM_CD"].split(",");
                let item_name = arr["ITM_NAME"].split(",");
                let item_sh_name = arr["ITM_SH_NAME"].split(",");
                let item_prbblty = arr["ITM_PRBBLTY"].split(",");
                let item_num = arr["ITM_NUM"].split(",");

                item_cd.forEach(function(){
                    game_property.item_list[item_cd[num]] = new Item_property(
                        item_cd[num]
                        ,item_name[num]
                        ,item_sh_name[num]
                        ,item_prbblty[num]
                        ,item_num[num]
                    );
                    num++;
                });
            }else{
                game_property.item_num = arr["CHSED_ITEM_NUM"];
                game_property.url_item_num = arr["CHSED_URL_ITEM_NUM"];

                let item_cd = arr["CHSD_ITM_CD"].split(",");
                let item_name = arr["CHSD_ITM_NAME"].split(",");
                let item_sh_name = arr["CHSD_ITM_SH_NAME"].split(",");
                let item_prbblty = arr["CHSD_ITM_PRBBLTY"].split(",");
                let item_num = arr["CHSD_ITEM_NUM"].split(",");

                item_cd.forEach(function(){
                    game_property.item_list[item_cd[num]] = new Item_property(
                        item_cd[num]
                        ,item_name[num]
                        ,item_sh_name[num]
                        ,item_prbblty[num]
                        ,item_num[num]
                    );
                    num++;
                });
            }

            // 演出フラグ
            game_property.prfmnc_flg = arr["PFRMNC_FLG"];
            game_property.pfrmnc_cd = arr["PFRMNC_CD"];

            // 終了マスフラグ
            game_property.end_msre_flg= arr["USR_NUM"];

            // 確率
            game_property.prbblty_flg = arr["USR_NUM"];
            game_property.prbblty_flg = arr["USR_NUM"];

            // ユーザーコードリスト
            game_property.user_list = arr["USR_CD"].split(",");

            // 残項目数
            game_property.left_item_num = arr["LFT_ITM_NUM"].split(",");

            let usr_name = arr["USR_NAME"].split(",");
            let usr_leach_num = arr["USR_LCH_NUM"].split(",");
            let usr_bng_num = arr["USR_BNG_NUM"].split(",");
            let usr_end_flg = arr["USR_END_FLG"].split(",");
            let usr_exist_flg = arr["USR_EXST_FLG"].split(",");
            num = 0;
            game_property.user_list.forEach(function(){
                game_property.user_property[user_cd[num]] = new User_property(
                    user_cd[num]
                    ,user_name[num]
                    user_leach_num[num]
                    ,user_bng_num[num]
                    user_end_flg[num]
                    ,user_exist_flg[num]
                );
                num++;
            });
        });
        resolve(game_property);
    });
}


