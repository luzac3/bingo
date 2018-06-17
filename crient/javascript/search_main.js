function search_main(event){
    let arg_arr = {
            bng_no:bng_no
            ,user_cd:user_cd
            ,search_word:null
            ,check_box_str:null
        }
    msre_set(event);

    $("#search").on("click",function(){
        let search_word =$("#search_word").val();
        let checked_box_arr = get_checkbox("tag");

        let check_box_str = "";
        checked_box_arr.foraEach(function(checked_box){
            check_box_str += checked_box;
            check_box_str += ",";
        });
        check_box_str.slice(0,-1);

        arg_arr["search_word"] = search_word;
        arg_arr["check_box_str"] = check_box_str;

        msre_set(event,arg_arr);
    });

    // 閉じるボタン
    $(".close").on("click",function(){
        click_event(this);
    });

    // 項目をクリック
    $(".item_button").on("click",function(){
        // ロード開始

        let index = $("#item_list").prop("class");
        game_property.msre_property[index].item_cd = $(this).val();
        game_property.msre_property[index].item_name = $(this).text();

        register_msre_draw(game_property).then(function(){
            load_anim.stop();
            // game_propertyをストレージ
            storager.set("game_property",game_property);

            // ロード終了

            // 選択窓を閉じる
            $("#search_main").attr("class",hidden);
        });
    });

}

function msre_set(e,arg_arr){
    // ゲームプロパティ取得
    let game_property = storager.get("game_property");

    let msre_num = game_property.msre_num;

    let index_num = get_target_object(e,game_property.msre_property);

    // index番号を渡してDivを表示
    show();

    // index番号を埋め込む
    $("#item_list").attr("class",index_num);

    // 読み込み起動
    // let load_anim =

    search(arg_arr).then(function(){
        // 読み込み表示終了
        stop();
    })
}

/*
 * 項目のサーチ/表示処理
 * 条件を入力しなかった場合は全リストを抽出
 */
function search(arg_arr){
    return new Promise(resolve,reject => {
        call_stored("get_item_list_001",arg_arr).then(function(data){
            let flag = true;
            let base = $(".class")[0];
            data.forEach(function(item){
                if(flag){
                    // 初回はサンプルを変換
                    base.attr("class",item["item_cd"]);
                    base.val(item["item_name"]);
                    flag = false;
                    return;
                }
                // コピーオブジェクトを生成
                let copy = base.clone();
                copy.val(item["item_cd"]);
                copy.text(item["item_name"]);

                // 要素の最後にコピーしたクローンを挿入
                $(".item").filter(":last").after(copy);
            });
            resolve();
        },function(){ reject(); });
    })
}
