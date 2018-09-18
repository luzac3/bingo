$(document).ready(function(){
    $("button").on("click",function(){
        const button = this.value;

        switch(button){
          case "scout":
            // ビンゴモードを変数として受け渡し
            scout();
            break;
          case "user_update":
            user_update();
            break;
        }
    })
})

/*
 * @param bng_md:ビンゴモード
 *     00:通常(完全基本)
 *     10:確率あり通常
 *     01:確率なしエンドモード
 *     11:確率ありエンドモード
 * @return なし
 */
function scout(bng_md = "00"){
    const rate_cd = bng_md.slice(0,1);
    const bng_md = bng_md.slice(1,1);
    const bng_no = $("#read").attr("class");

    const arg_arr = {
        bng_no:bng_no
    }
    // call_stored("rate_chs_001",arg_arr).then(function(data){
    call_stored("rate_chs_001_b",arg_arr).then(function(data){

        const chsd_num_length = data.length;

        let itm_cd_lst = [];

        switch(rate_cd){
          case "0":
            itm_cd_lst = data[Math.floor(Math.random() * chsd_num_length)]["ITM_CD_LST"].split(",");
            break;
          case "1":
        	itm_cd_lst = data[Math.floor(Math.pow(Math.random(),3) * chsd_num_length)]["ITM_CD_LST"].split(",");
            break;
        }

        const itm_num = itm_cd_lst.length;
        const itm_cd = itm_cd_lst[Math.floor(math.rondom()*itm_num)];

        const arg_arr2 = {
            bng_no:bng_no
            ,itm_cd:itm_cd
        }

        call_stored("rate_chs_002",arg_arr2).then(function(data){
            $("#show_item_inner").html("<p id = '" + data[0]["ITM_CD"] + "' class = 'large'>" + data[0]["ITM_NAME"] + "</p>");

            data.forEach(function(usr_data){
                const p = document.createElement("p");
                p.id = usr_data["ITM_CD"];
                p.innerHTML = usr_data["ITM_NAME"];

                $("#stock")[0].appendChild(p);
            });
        },function(){
            alert("error");
        });
    },function(){
        alert("error");
    });
}

/*
 * @param bng_md:ビンゴモード
 *     00:通常(完全基本)
 *     10:確率あり通常
 *     01:確率なしエンドモード
 *     11:確率ありエンドモード
 * @return なし
 */
function user_update(bng_md = "00"){
    const rate_cd = bng_md.slice(0,1);
    const bng_md = bng_md.slice(1,1);

    const arg_arr = {
        bng_no:$("#read").attr("class")
    }

    call_stored("get_cleard_user_001",arg_arr).then(function(data){
        data.forEach(function(usr_data){
            const p = document.createElement("p");
            p.id = usr_data["USR_CD"];
            if(usr_data["BNG_NUM"] == null){
                p.innerHTML = usr_data["USR_NAME"] + "(" + 0 + ")";
            }
            p.innerHTML = usr_data["USR_NAME"] + "(" + usr_data["BNG_NUM"] + ")";

            $("#user_list")[0].appendChild(p);
        })
    });
}