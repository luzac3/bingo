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
        let search_word = $("#search_word").val();
        let search_word_arr = [];
        if(search_word){
            // 全角スペースを半角スペースに置換
            search_word = search_word.replace(/　/g, ' ');
            search_word_arr = search_word.split(" ");
        }

        const checked_box_arr = get_checkbox("tag");

        let check_box_str = "";
        checked_box_arr.forEach(function(checked_box){
            check_box_str += "'" + checked_box + "'";
            check_box_str += ",";
        });
        if(check_box_str){
            check_box_str = check_box_str.slice(0,-1);
        }

        const len = search_word_arr.length;

        // 要素が一つもない場合、---を表示
        if(len > 0){

        }

        for(let i = 1; i <= 3; i++){
            if(i > len){
                arg_arr["search_word" + i] = "";
            }else{
                arg_arr["search_word" + i] = search_word_arr[i-1];
            }
        }

        arg_arr["tag"] = check_box_str;

        msre_set(null,arg_arr);
    });

    // 閉じるボタン
    $(".close").on("click",function(){
        click_event(this);
    });
}

function msre_set(e,arg_arr){
    // ゲームプロパティ取得
    const user_property = storager.get("user_property");

    const msre_num = user_property.msre_num;

    let index_num = null;

    // マスのクリックイベントから入った場合と検索キーから入った場合で分ける
    if(e){
        index_num = get_target_object(e,user_property.msre_property);

        // index番号を埋め込む
        $("#item_list").attr("class",index_num);
    }else{
        index_num = $("#item_list").prop("class");
    }

    const show_obj_id = "search_main";

    // Divを表示
    show_obj(show_obj_id,80,80);

    // 読み込み起動
    // let load_anim =

    // 子要素がある(すでに読み込み済み)の場合再検索はしない
    if(e && $("#item_list").children().length){
        return;
    }

    // サーチ
    search(arg_arr).then(function(data){
        // 特に何もしない
        // サーチ完了した時点で、検索画面を表示
        $("#search_main")[0].style.display = "block";
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
            let base = $(".line").filter(":first");

            // 項目リストの中身を空に
            $("#search_down").empty();

            let num = 0;

            data.forEach(function(item){
                // アイテム数が4で割れるかどうかで判定
                if(num % 4  == 0){
                      // コピーオブジェクトを生成
                      let copy = base.clone();
                      copy.attr("class","line");

                      // コピーした要素を表示状態に切り替え
                      copy[0].style.display = "block";

                      // 要素の最後にコピーしたクローンを挿入
                      $("#search_down").append(copy);
                }

                $(".line:last").find(".item_button_" + num % 4).val(item["ITM_CD"]);
                $(".line:last").find(".item_button_" + num % 4).text(item["ITM_NAME"]);

                // クリックイベントをセット
                // 複数クリック対応
                $("#search_down:button").off("click");

                $("#search_down:button").on("click",function(){
                    // アイテムのコードを取得
                    const item_cd = $(this).val();
                    // アイテム名を取得
                    const item_name = $(this).text();

                    const item_name_arr = [];

                    // index番号取得
                    const index = parseInt($("#item_list").prop("class"));

                    // ユーザープロパティの取得
                    const user_property = storager.get("user_property");

                    // マス情報をセット
                    user_property.msre_property[index].item_cd = item_cd;
                    user_property.msre_property[index].item_name = item_name;

                 // 項目名を4文字区切りで分割
                    for(let k = 0, len = item_name.length; k < len; k += 4){
                    	item_name_arr[k/4] = item_name.substr(k,4);
                    }
                    user_property.msre_property[index].item_name = item_name_arr;

                    // マスの再描画
                    msre_draw(user_property,user_property.msre_property,"register_wrapper","register_canvas");

                    // 検索画面を閉じる
                    $("#search_main")[0].style.display = "none";

                    storager.set("user_property",user_property);
                });

            });
            resolve("success");
        },function(){ reject("failue"); });
    })
}
