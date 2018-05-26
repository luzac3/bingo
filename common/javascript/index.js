$(document).ready(function(){
    $("button").on("clock",function(){
        let button_val =~ $(this).val();
        switch(button_val){
          case register:
            // 登録画面に遷移
            location.href = "../html/register.html"
            break;
          case join:
            // クライアントページに遷移
            location.href = "../../crient/html/game.html";
            break;
          case master:
              // ゲーム一覧画面に遷移
              location.href = "../html/game_list.html";
              break;
        }
    });
});