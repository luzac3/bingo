$(document).ready(function(){
    // ポーズボタンの状態を初期化
    pause(true);

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

function pause(pause){
    if(arguments.length > 0){
        this.pause = pause;
    }
    return (function(){
        return this.pause;
    });
}