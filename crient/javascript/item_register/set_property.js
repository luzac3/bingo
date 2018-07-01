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
        call_stored("get_bng_mstr_001",arg_arr).then(function(data){
            // マスタデータを保管
            const bng_mstr = data[0];

            // マス数
            const msre_num = bng_mstr["MSRE_NUM"];

            // ラッパーオブジェクトのサイズ
            const wrapper_length = Math.floor( $("#register_wrapper").outerWidth() / msre_ln_num) * msre_ln_num;

            // 1行のマス数
            user_property.msre_ln_num = Math.sqrt(msre_num);

            // 1マスの長さ
            const msre_length = wrapper_length / msre_ln_num;

            let ln_count = 1;

            let x = 0;

            let y = 0;

            for(let i=0; i < msre_num; i++){
                if(ln_count == msre_ln_num){
                    x = 0;
                    y = y + msre_length;
                    ln_count = 1;
                }
                user_property.msre_property[i] = new Msre_property(i+1,x,y,msre_length,msre_length);
                x = x + msre_length;
                ln_count++;
            }
            resolve(user_property);
        });
    });
}