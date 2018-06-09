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
        let button = $(this).val();
        switch(button){
          case "recruit":
            game_recruit(button);
            break;
          case "start":
              game_progress(button);
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