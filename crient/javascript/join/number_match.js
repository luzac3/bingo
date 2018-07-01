/*
 * ビンゴ番号マッチングシステム
 */
function matching(){
    // 読み込み画像表示
    // animを再利用
    return new Promise((resolve,reject) => {
        let bng_no = $("#bng_no").val();
        let arg_arr = {
            bng_no:bng_no
        }
        call_stored("bng_no_matching_001",arg_arr).then(function(data){
            // anim停止
            // ビンゴ番号とビンゴ名を表示して確認を促す
            // いずれはこれもモダンにしましょう
            let message = "ビンゴ番号:" + bng_no + "\n";
            message += "ビンゴ名:" + data[0]["BNG_NAME"] + "\n";
            message += "このビンゴに参加します。よろしいですか？";
            if(window.confirm(message)){
                let user_name = $("#user_name").val();
                let arg_arr2= {
                    bng_no:bng_no
                    ,user_name:user_name
                }
                call_stored("user_registration_001",arg_arr2).then(function(data){
                    if(data == 99){
                        reject();
                    }
                    resolve(data);
                });
            }else{
                alert("キャンセルされました");
                reject();
            }
        },function(){
            //anim停止2

            alert("ビンゴ番号が発見できません");
            reject();
        });
    });
}