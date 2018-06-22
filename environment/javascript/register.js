$(document).ready(function(){
    $("button").on("click",function(){
        // 詳細設定の開閉ボタン
        if($(this).val() == "open"){
            $("#enviroment_detail").removeClass();
        }else if($(this).val() == "close"){
            $("#enviroment_detail").addClass("hidden");
        }else if($(this).val() == "register"){
            // 登録ボタン押下

            // ビンゴ通番取得
            let bng_no = $("#bng_no").val();

            // 基本オプションのオブジェクトを取得
            let enviroment_lst = [];
            enviroment_lst = $(".enviroment_base");

            // 基本オプションの値を取得
            let enviroment = {};
            enviroment_lst.foreach(function(obj){
                let checkbox = obj.prop("type");

                if(checkbox == "checkbox"){
                    if(obj.prop("checked")){
                        enviroment[obj.prop("id")] = 1;
                    }else{
                        enviroment[obj.prop("id")] = null;
                    }
                }else{
                    enviroment[obj.prop("id")] = obj.val();
                }
            });
            enviroment_lst = null;

            // 詳細オプションのオブジェクトを取得
            enviroment_lst = $(".enviroment_detail");

            // 詳細オプションの値を取得
            enviroment_lst.foreach(function(obj){
                let checkbox = obj.prop("type");

                if(checkbox == "checkbox"){
                    if(obj.prop("checked")){
                        enviroment[obj.prop("id")] = 1;
                    }else{
                        enviroment[obj.prop("id")] = null;
                    }
                }else{
                    enviroment[obj.prop("id")] = obj.val();
                }
            });

            // ラインマスタ
            // 1ラインのマス数で自動的に記録するため、マス数を送ればOK
            // 偶数時の斜めを認めるかどうかはチェック要るかな？
            // デフォルトはなしにしておこうか。危ないし

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
                        enviroment_base["HSH"] = data;
                        // 登録呼び出し
                        $.when(
                            master_register(enviroment)
                            ,ln_register(bng_no)
                            ,msre_register(bng_no)
                        ).then(function(){
                            // 登録成功
                            location.href = "./register_item.html?bng_no=" + bng_no;
                        },function(){
                            // 登録失敗
                            alert("登録処理失敗");
                        });
                    },function(error){
                        alert(error);
                        return;
                    }
                ));
            }else{
                enviroment_base["HSH"] = null;
                // 登録呼び出し
                $.when(
                    master_register(enviroment)
                    ,ln_register(bng_no)
                    ,msre_register(bng_no)
                ).then(function(){
                    // 登録成功
                    location.href = "./register_item.html?bng_no=" + bng_no;
                },function(){
                    // 登録失敗
                    alert("登録処理失敗");
                });
            }
        }
    });

});

function master_register(enviroment){
    let arg_arr = {
        BNG_NO:enviroment["BNG_NO"]
        ,BNG_NAME:enviroment["BNG_NAME"]
        ,HSH:enviroment["HSH"]
        ,PRFMNC_FLG:enviroment["PRFMNC_FLG"]
        ,PRFRMNC_CNT_LCH:null
        ,PRFRMNC_CNT_BNG:null
        ,BNG_FNSH_NUM:enviroment["BNG_FNSH_NUM"]
        ,BNG_NUM:enviroment["BNG_NUM"]
        ,MSRE_NUM:enviroment["MSRE_NUM"]
        ,END_MSRE_FLG:enviroment["END_MSRE_FLG"]
        ,FREE_MSRE_FLG:enviroment["FREE_MSRE_FLG"]
        ,END_LN_FLG:enviroment["END_LN_FLG"]
        ,PRBBLTY_FLG:enviroment["PRBBLTY_FLG"]
        ,PRBBLTY_CD:enviroment["PRBBLTY_CD"]
        ,BNG_MD_CD:enviroment["BNG_MD_CD"]
        ,GM_STTS_CD:0
        ,AT_STP_LRS_CD:enviroment["AT_STP_LRS_CD"]
        ,AT_STP_LRS_TM:enviroment["AT_STP_LRS_TM"]
    }
    return call_stored("enviroment_register_001",arg_arr);
}

function ln_register(bng_num){
    let arg_arr = {
            BNG_NUM:bng_num
            ,msre_num:$("#BNG_FNSH_NUM").val()
        }
        return call_stored("ln_register_001",arg_arr);
}

function msre_register(bng_num){
    // マスマスタ/ローカルストレージを取得
    let msre_property = storager.get("msre_property");

    let str = "";

    // INSERTの文字列として登録
    msre_property.forEach(function(property){
        str += "(";
        str += property.bng_num;
        str += ",";
        str += property.msre_no;
        str += ",";
        str += property.end_flg;
        str += ",";
        str += property.free_flg;
        str += ",";
        str += "NOW()";
        str += ",";
        str += "NOW()";
        str += ")";
        str += ",";
    });
    str = str.slice(0,-1);

    let arg_arr = {
        insert:str
    };

    call_stored("msre_register_001",arg_arr);
}






