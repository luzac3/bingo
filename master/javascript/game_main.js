$(document).ready(function(){
    // ポーズボタンの状態を初期化
    pause(true);

    let bng_no = $("#all").prop("class");

    // アニメーション呼び出し
    let anim = anim();

    // プロパティのインスタンス化、保存
    game_property_stocer = (new Game_property(bng_no)).then(function(){
    	// アニメーションを非同期で止めるにあたり、Canvasそのものを隠してしまうという手を考える
    	// loadはいろんなところで使えるから関数化しちゃいたいよね
        stop_anim();
    });

    // 全プロパティ情報を取得、設定
    // その間動かないようにロードイメージを表示
    // マスタが落ちて復帰する場合、必ず再開からスタートさせる。
    // 全面の画像が消えるまで動きようがないため、resolveが帰ってきた時点で個別に動かしていたアニメーションをキルしにいく
    // アニメーションのキルはストップアニメーションだとめんどくさいか？　フラグ管理でもいい感じ

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
