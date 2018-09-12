function register_user_msre(user_property){
    // ロード画面表示
    str = "";

    let num = 1;

    user_property.msre_property.forEach(function(data){
        str += "(";
        str += "'" + user_property.bng_no + "'";
        str += ",";
        str += "'" + user_property.user_cd + "'";
        str += ",";
        str += "LPAD(" + num++ + ",2,0)";
        str += ",";
        str += "LPAD(" + data.item_cd + ",4,0)";
        str += ",";
        str += "null";
        str += ",";
        str += "NOW(3)";
        str += ",";
        str += "NOW(3)";
        str += ")";
        str += ",";
    });
    str = str.slice(0,-1);

    let arg_arr = {
        bng_no:user_property.bng_no
        ,user_cd:user_property.user_cd
        ,insert:str
    }
    call_stored("register_user_msre_001",arg_arr).then(function(){
        alert("登録完了");
        // ロード停止

        // ゲーム進行を起動
        // game_progress(user_property);
        game_progress_ease(user_property);
    });
}