function bng_clear(){
    const bng_no = $("#set_bng_no").attr("class");
    const user_cd = $("#set_user_cd").attr("class");

    const obj_arr = storager.get("msre_property");

    let call_cd = "";

    obj_arr.forEach(function(obj){
        if(obj.call_flg){
            call_cd += "'";
            call_cd += obj.item_cd;
            call_cd += "',";
        }
    });

    // 呼び出しコード
    call_cd = call_cd.slice(0,-1);

    const arg_arr = {
        bng_no:bng_no
        ,user_cd:user_cd
        ,call_cd:call_cd
    }

    call_stored("clear_user_update_001",arg_arr).then(function(){
        alert("クリア登録完了！")
    },function(){
        alert("エラー");
    })
}
