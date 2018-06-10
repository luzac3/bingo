/*
 * 項目の選択を行う
 * @param ゲームプロパティ
 * @return(resolve) 現在選択されている項目をアップデートしたゲームプロパティ
 */
function item_select (game_prpoerty){
    return new Promise(resolve,reject => {
        let item_cd = "";
        // 確率設定有無チェック
        if(game_proerty.kakuritu_flg){
            // 選択したグループの中身がなかった場合、再選択するためループ
            function select(){
                let kakuritu = Math.rondom();
                let kakuritu_hikaku = 0;
                let kakuritu_group = 0;
                // 確率[0]の確率+確率[1]の確率・・・とやっていく
                for(let i=0,len = game_proerty.kakuritu_list.length(); i < len; i++){
                    kakuritu_hikaku += game_proerty.kakuritu_list[i] / 100;
                    if(kakuritu < kakuritu_hikaku){
                        kakuritu_group = i;
                        break;
                    }
                }
            }
            select();

            let arr_length = game_property.kakuritu_list[kakuritu_group].length();

            if(!arr_length){
                // 選択した配列の中身が空だった場合、再度呼び出し
                select();
            }

            game_property.item_cd = game_property.kakuritu_list[kakuritu_group][Math,floor(Math.rondom()) * arr_length];

            let arg_arr = {
                bng_no:bng_no
                ,item_cd:game_property.item_cd
                ,status_cd:"1"
            }
            call_stored("item_status_update_001",arg_arr).then(function(){
                resolve(game_property);
            },function(data){
                reject(data);
            });
        }else{
            let arr_length = game_property.no_kakuritu_list.length();
            game_property.item_cd = game_property.no_kakuritu_list[Math,floor(Math.rondom()) * arr_length];
            resolve(game_property);
        }
    });
}
