$(document).ready(function(){
    $("button").on("click",function(){
        let button_val = $(this).val();
        switch(button_val){
          case "register":
            // 登録画面に遷移
            location.href = "/bingo/environment/html/register.html"
            break;
          case "join":
            // クライアントページに遷移
              location.href = "/bingo/entrance/html/bng_select.html?kind=1";
              break;
          case "execute":
              // ゲーム一覧画面に遷移→マスタではなくエントランス？
              // マスタはあくまでゲーム開始後の画面を想定
              location.href = "/bingo/entrance/html/bng_select.html?kind=2";
              break;
        }
    });
});
