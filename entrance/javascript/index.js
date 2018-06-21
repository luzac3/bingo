$(document).ready(function(){
    $("button").on("clock",function(){
        let button_val =~ $(this).val();
        switch(button_val){
          case register:
            // 登録画面に遷移
            location.href = "/bingo/environment/html/register.html"
            break;
          case join:
            // クライアントページに遷移
            location.href = "/bingo/crient/html/main.html";
            break;
          case master:
              // ゲーム一覧画面に遷移→マスタではなくエントランス？
              // マスタはあくまでゲーム開始後の画面を想定
              location.href = "/bingo/entrance/html/game_list.html";
              break;
        }
    });
});