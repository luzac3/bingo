/*
 * マスごとの項目のプロパティを取得、設定する
 */
function set_property(user_property){
    // ビンゴ番号入力画面を閉じる
    return new Promise((resolve,reject) => {

        let arg_arr = {
            bng_no:user_property.bng_no
        }

        // ビンゴ領域の描画　コモンの描画と同じもの　マス数とかの情報が必要なので結局ゲームプロパティはコモンなのでは
        call_stored("crient_msre_property_001",arg_arr).then(function(data){
            // マスタデータを保管
            const bng_mstr = data[0];

            // マスのプロパティ
            const msre_num_list =  bng_mstr["MSRE_NO"].split(",");
            const end_flg_list =  bng_mstr["END_FLG"].split(",");
            const free_flg_list =  bng_mstr["FREE_FLG"].split(",");

            // マス数
            user_property.msre_num = bng_mstr["MSRE_NUM"];

            // 1列のマス数
            const msre_ln_num = Math.sqrt(user_property.msre_num);

            // ラッパーオブジェクトのサイズ
            const wrapper_length = Math.floor( $("#register_wrapper").outerWidth() / msre_ln_num) * msre_ln_num;

            user_property.width = wrapper_length;
            user_property.height = wrapper_length;

            // 1行のマス数
            user_property.msre_ln_num = Math.sqrt(user_property.msre_num);

            // 1マスの長さ
            const msre_length = wrapper_length / msre_ln_num;

            let ln_count = 0;

            let x = 0;

            let y = 0;

            for(let i=0; i < user_property.msre_num; i++){
                if(ln_count == msre_ln_num){
                    x = 0;
                    y = y + msre_length;
                    ln_count = 0;
                }
                user_property.msre_property[i] = new Msre_property(i+1,x,y,msre_length,msre_length);
                if(parseInt(free_flg_list[i])){
                    user_property.msre_property[i].free_flg = true;

                    user_property.msre_property[i].set_color("red");
                    user_property.msre_property[i].item_name = "free";
                    user_property.msre_property[i].item_cd = "00";
                }else if(parseInt(end_flg_list[i])){
                    user_property.msre_property[i].end_flg = true;
                }else{
                    user_property.msre_property[i].set_color("white");
                }
                x = x + msre_length;
                ln_count++;
            }
            resolve(user_property);
        });
    });
}