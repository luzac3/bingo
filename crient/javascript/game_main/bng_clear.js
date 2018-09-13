function bng_clear(){
    const bng_no = ("#set_bng_no").attr("class");
    const user_cd = ("#set_user_cd").attr("class");

    const obj_arr = storager.get("msre_property");

    let call_cd = "";

    obj_arr.forEach(function(obj){
        if(obj.cll_flg){
            call_cd.push("'");
            call_cd.push(obj.item_cd);
            call_cd.push("',");
        }
    });

    // 呼び出しコード
    call_cd = call_cd.slice(-1);

    const arg_arr = {
        bng_no:bng_no
        ,user_cd:user_cd
        ,call_cd:call_cd
    }

    call_stored("clear_set_001",arg_arr);
}