function register_user_msre(user_property){
    // ロード画面表示
    str = "";

    let num = 0;

    user_property.msre_property.forEach(function(data){
        str += "(";
        str += "'" + user_property.bng_no + "'";
        str += ",";
        str += "'" + user_property.user_cd + "'";
        str += ",";
        str += "LPAD(" + num + ",2,0)";
        str += ",";
        str += "LPAD(" + data[num].item_cd + ",3,0)";
        str += ",";
        str += "null";
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
    }
    call_stored("register_user_msre_001",arg_arr).then(function(){
        // ロード停止
    })
}