$(document).ready(function(){
    // 詳細設定を閉じる
    $("#enviroment_detail").hide();

    $("button").on("click",function(){
        // 詳細設定の開閉ボタン
        if($(this).val() == "open"){
            $("#enviroment_detail").show();
            $("#detail button").val("close");
            $("#detail button").text("閉じる");
        }else if($(this).val() == "close"){
            $("#enviroment_detail").hide();
            $("#detail button").val("open");
            $("#detail button").text("開く");
        }else if($(this).val() == "register"){
            // 登録ボタン押下

            // ビンゴ通番取得
            let bng_no = $("#bng_no").val();

            let enviroment_lst = [];
            enviroment_lst = $(".enviroment_base");

            let enviroment_base = {};
            enviroment_lst.foreach(function(obj){
                enviroment_base[obj.prop("id")] = obj.val();
            });
            enviroment_lst = null;

            enviroment_lst = $(".enviroment_detail");

            let enviroment_detail = {};
            enviroment_lst.foreach(function(obj){
                enviroment_detail[obj.prop("id")] = obj.val();
            });

            // マスマスタ
            


            // 最後に実行
            let old_password = enviroment_base["old_password"];

            if(enviroment_base["new_password"]){
                // パスワード変更時のみ
                let new_password = enviroment_base["new_password"];
                let new_password2 = enviroment_base["new_password2"];
                if(new_password !== new_password2){
                    alert("パスワードが一致しません");
                    return;
                }
                login(bng_no,old_password).then(
                    function(){
                        // 成功しても何もしない
                    },function(error){
                        alert(error);
                        return;
                    }
                ).then(new_user().then(
                    function(data){
                        // 登録呼び出し
                    },function(error){
                        alert(error);
                        return;
                    }
                ));
            }else{
                enviroment_base["HASH"] = null;
            }
            // パスワードを変更しない場合
        }

    });

});

