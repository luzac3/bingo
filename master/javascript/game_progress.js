/*
 * ゲームを進行させる
 * 募集完了して、ゲーム開始を押した場合に起動
 *
 * @param user_list 登録画面で取得した参加ユーザーリスト
 */
function game_progress(game_property){
    let arg_arr = {
        bng_no : game_property.bng_no
        ,game_status : "2"
    }
    // ゲームステータスを更新
    call_stored("game_status_update_001",gameProperty).then(function(){
        // 確率設定登録・初期化
        initialize(game_property).then(game_property => {
            // ゲーム進行ループ呼び出し
            game_progress_loop(game_property);
        });
    });
}

async function initialize(){
    game_property = await prbblty(game_property);
    // ゲーム状態を保存
    game_property_stocker(game_property);

    game_property = await image_set(game_property);

    if(game_property.prfmnc_flg){
        let obj = new Draw_obj();
        if(game_property.bg_us_flg){
            obj.img = new Image();
            obj.img.src = "../../img/"+game_property.bg_url;
        }
        let property = {
            obj:obj
            ,wrapper:"mstr_wrapper"
            ,canvas_name:"mstr_canvas"
        }
        await canvas_initialize(draw_initialize,property);
    }
    return game_property;
}

async function game_progress_loop(game_property){
    // ポーズ状態チェック
    let pause = pause()();
    if(!pause){
        return;
    }
    let arg_arr = {
        bng_no:game_property["bng_no"]
    }

    // 参加ユーザーの登録フラグをリセット
    call_stored_wait("user_flg_reset_001",arg_arr).then(function(){
        // 項目選択
        game_property = await item_select(game_property);

        // 演出呼び出し
        if(game_property.prfmnc_flg){
            performance(game_property).then(function(){
                // DB登録、ループ呼び出し
                // 演出アリでもDB登録はちゃんと待つ(即落ちの可能性も0ではない)
                let arg_arr = {
                    bng_no:bng_no
                    ,item_cd:game_property.item_cd;
                    ,cd:"2"
                }
                call_stored("item_status_update_001",arg_arr).then(function(){
                    game_progress_loop(game_prpoerty);
                })
            });
        }else{
            call_stored("item_status_update_001",arg_arr).then(function(){
                game_progress_loop(game_prpoerty);
            })
        }
    },function(data){

    });
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

