function search_main(event){
    let arg_arr = {
            bng_no:$("#set_bng_no").attr("class")
            ,tag:null
            ,search_word1:null
            ,search_word2:null
            ,search_word3:null
        }

    // マス情報取得、設定、表示
    msre_set(event,arg_arr);

    $("#search").on("click",function(){
        let search_word =$("#search_word").val();
        // 全角スペースを半角スペースに置換
        search_word = search_word.replace(/ /g, '　');

        const checked_box_arr = get_checkbox("tag");

        let check_box_str = "";
        checked_box_arr.foraEach(function(checked_box){
            check_box_str += "'" + checked_box + "'";
            check_box_str += ",";
        });
        tag.slice(0,-1);

        const search_word_arr = search_word.split(" ");

        for(let i=0; i<3; i++){
            arg_arr["search_word" + i] = search_word_arr[i];
        }

        arg_arr["tag"] = check_box_str;

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
        user_property.msre_property[index].item_cd = $(this).val();
        user_property.msre_property[index].item_name = $(this).text();

        msre_draw(user_property,"register_wrapper","register_canvas").then(function(){
            load_anim.stop();
            // user_propertyをストレージ
            storager.set("user_property",user_property);

            // ロード終了

            // 選択窓を閉じる
            $("#search_main").attr("class",hidden);
        });
    });
}

function msre_set(e,arg_arr){
    // ゲームプロパティ取得
    const user_property = storager.get("user_property");

    const msre_num = user_property.msre_num;

    const index_num = get_target_object(e,user_property.msre_property);

    const show_obj_id = "search_main";

    // Divを表示
    show_obj(show_obj_id,80,80);

    // index番号を埋め込む
    $("#item_list").attr("class",index_num);

    // 読み込み起動
    // let load_anim =

    // サーチ
    search(arg_arr).then(function(data){
        // 特に何もしない
        console.log(data);
    },function(data){
        console.log(data);
    });
}

/*
 * 項目のサーチ/表示処理
 * 条件を入力しなかった場合は全リストを抽出
 */
function search(arg_arr){
    return new Promise((resolve,reject) => {
        call_stored("get_item_list_001",arg_arr).then(function(data){
            let flag = true;
            let base = $(".item_button").filter(":first");

            // 項目リストの中身を空に
            $("#item_list").empty();

            data.forEach(function(item){
                // コピーオブジェクトを生成
                let copy = base.clone();
                copy.attr("class","item_list");
                copy.val(item["ITM_CD"]);
                copy.text(item["ITM_NAME"]);

                // コピーした要素を表示状態に切り替え
                copy.css("visibility","visible");

                // 要素の最後にコピーしたクローンを挿入
                $("#item_list").append(copy);


                // クリックイベントをセット
                // 複数クリック対応
                $(".item_list").off("click");

                $(".item_list").on("click",function(){
                    // アイテムのコードを取得
                    const item_cd = $(this).val();
                    // アイテム名を取得
                    const item_name = $(this).text();

                    // index番号取得
                    const index = parseInt($("#item_list").prop("class"));

                    // ユーザープロパティの取得
                    const user_property = storager.get("user_property");

                    // マス情報をセット
                    user_property.msre_property[index].item_cd = item_cd;
                    user_property.msre_property[index].item_name = item_name;

                    // マスの再描画
                    msre_draw(user_property,user_property.msre_property,"register_wrapper","register_canvas");

                    storager.set("user_property",user_property);
                });

            });
            resolve("success");
        },function(){ reject("failue"); });
    })
}
