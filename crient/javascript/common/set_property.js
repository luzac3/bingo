/*
 * マスごとの項目のプロパティを取得、設定する
 */
function set_property(user_property,wrapper_name){
    // ビンゴ番号入力画面を閉じる
    return new Promise((resolve,reject) => {

        let arg_arr = {
            bng_no:user_property.bng_no
            ,user_cd:user_property.user_cd
        }

        // ビンゴ領域の描画　コモンの描画と同じもの　マス数とかの情報が必要なので結局ゲームプロパティはコモンなのでは
        call_stored("crient_msre_property_001",arg_arr).then(function(data){
            // マスタデータを保管
            const bng_mstr = data[0];

            // マスのプロパティ
            const msre_num_list =  bng_mstr["MSRE_NO"].split(",");
            const end_flg_list =  bng_mstr["END_FLG"].split(",");
            const free_flg_list =  bng_mstr["FREE_FLG"].split(",");

            let itm_cd_list = [];
            let itm_name_list = [];


            if(bng_mstr["ITM_CD"]){
                itm_cd_list = bng_mstr["ITM_CD"].split(",");
                itm_name_list = bng_mstr["ITM_NAME"].split(",");
            }

            // マス数
            user_property.msre_num = bng_mstr["MSRE_NUM"];

            // 1列のマス数
            const msre_ln_num = Math.sqrt(user_property.msre_num);

            const hidden = document.getElementsByClassName("hidden");

            Object.keys(hidden).forEach(function(key){
                hidden[key].style.display = "block";
            });

            // ラッパーのサイズを調整
            // 横か縦幅が画面のサイズの90％より大きかったら縮小
            const outerWidth = $("#"+ wrapper_name)[0].offsetWidth;
            const outerHeight = $("#"+ wrapper_name)[0].offsetHeight;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            Object.keys(hidden).forEach(function(key){
                hidden[key].style.display = "none";
            });

            let length = 0;

            if((outerWidth > windowWidth * 0.9) || (outerHeight > windowHeight * 0.9)){
                if((outerWidth - windowWidth) > (outerHeight - windowHeight)){
                    length = windowWidth * 0.9;
                }else{
                	length = windowHeight * 0.9;
                }
            }else{
                length = outerWidth;
            }

            // ラッパーオブジェクトのサイズ
            const wrapper_length = Math.floor( length / msre_ln_num) * msre_ln_num;
            $("#"+ wrapper_name).outerWidth(wrapper_length);
            $("#"+ wrapper_name).outerHeight(wrapper_length);

            user_property.width = wrapper_length;
            user_property.height = wrapper_length;

            // 1行のマス数
            user_property.msre_ln_num = Math.sqrt(user_property.msre_num);

            // 1マスの長さ
            const msre_length = wrapper_length / msre_ln_num;

            // フォントのサイズ
            const font_size = Math.floor((msre_length - (msre_length / 10)) / 4);

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

                user_property.msre_property[i].font_size = font_size;

                // アイテムコードが取得できていれば登録
                if(itm_cd_list[i]){
                    user_property.msre_property[i].item_cd = itm_cd_list[i];
                    user_property.msre_property[i].item_name = itm_name_list[i];

                    let itm_name = [];

                    // 項目名を4文字区切りで分割
                    for(let k = 0, len = itm_name_list[i].length; k < len; k += 4){
                    	itm_name[k/4] = itm_name_list[i].substr(k,k+4);
                    }
                    user_property.msre_property[i].item_name = itm_name;

                }
                x = x + msre_length;
                ln_count++;
            }

            // マス数を設定


            resolve(user_property);
        });
    });
}