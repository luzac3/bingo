/*
 * 確率設定と、確率ごとの配列オブジェクトを作成する関数
 *
 * @param ビンゴ番号
 * @param 参加人数
 * @param 確率設定フラグ
 * @return
 */
function prbblty(game_property){
    let arg_arr = {
        bng_no:game_property["bng_no"]
    }
    return (function(){
        // 存在するコードとコード数をすべて受信
        call_stored("item_list_choose_001",arg_arr).then(function(data){
            let kugiri = 0;
            let prbblty = 0;
            // ユーザーリスト設定
            data.forEach(function(val){
                kugiri = game_property.user_num / 5;
                // 確率グループのキー(0～4)
                prbblty_group = Math.floor((val["item_num"] - 1) / kugiri);
                if(prbblty_group > 4){
                    prbblty_group = 4;
                }
                for(let i = 0; i<4; i++){
                	prbblty_group.prbblty_list[i] = [];
                    game_property.prbblty_list.push(prbblty_kugiri(i));
                }
                // 項目のプロパティ
                game_property.item_list[val["item_cd"]] = new Item_property(
                    val["item_cd"]
                    ,val["item_name"]
                    ,val["item_sh_name"]
                    ,kakuritu_kugiri(prbblty)
                    ,val["item_num"]
                );
                // 確率をベースにしたリスト
                game_property.prbblty_item_list[prbblty].push(val["item_cd"]);

                return game_property;
            })
        },function(data){
            // 通信に失敗した旨を通知。リトライするかどうかを選択
        });
    });
}
