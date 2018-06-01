$(document).ready(function(){
    $("button").on("click",function(){
        // 詳細設定の開閉ボタン
        if($(this).val() == "add"){
            let add_num = $("#add_item select").val();

            let base = null;
            let clone_obj = null;

            for(let i=0; i<add_num; i++){
                base = $("#item").find("tr").filter(":last");
                clone_obj = base.clone();
                // クローンしたオブジェクトの値を削除
                $(clone_obj).find("input")[0].val("");
                $(clone_obj).find("input")[1].val("");
                $(clone_obj).find("input")[2].val("");

                // クローンオブジェクトを追加
                base.append(clone_obj);
            }
        }else if($(this).val() == "register"){
            let bng_num = $("#bng_num");

            // オブジェクト郡を取得
            let item_name_obj = $(".item_name");
            let item_short_name = $(".item_short_name");
            let tag = $(".tag");

            // 全体のINSERT文字列
            let str = "";

            // タグ用の文字列
            let str_tag = "";

            let num = 0;

            let tags = null;
            item_name_obj.forEach(function(){
                str += "(";
                str += bng_num;
                str += ",";
                str += "LPAD(" + num + ",2,0)";
                str += ",";
                str += item_name_obj[num].val();
                str += ",";
                str += item_short_name[num].val();
                str += ",";
                str += property.free_flg;
                str += ",";
                str += "NOW()";
                str += ",";
                str += "NOW()";
                str += ")";
                str += ",";

                // タグの全角スペースを半角スペースに修正
                tags = item_short_name[num].val().replace(/　/g, " ");

                // tagを配列に変換
                let tag_arr = tags.split(" ");

                tag_arr.forEach(function(tag){
                    // タグの加工
                    str_tag += "(";
                    str_tag += bng_num;
                    str_tag += ",";
                    str_tag += "LPAD(" + num + ",2,0)";
                    str_tag += ",";
                    str_tag += tag;
                    str_tag += ",";
                    str_tag += "NOW()";
                    str_tag += ",";
                    str_tag += "NOW()";
                    str_tag += ")";
                    str_tag += ",";
                });
            });
            str = str.slice(0,-1);
            str_tag = str_tag.slice(0,-1);

            $.when(
                item_register(str)
                ,tag_register(str)
            ).then(function(){
                alert("登録完了");
            },function(){
                alert("登録失敗");
            });
        }
    });
});

function item_register(str){

    let arg_arr = {
        insert:str
    };

    call_stored("item_register_001",arg_arr);
}

function tag_register(str){

    let arg_arr = {
        insert:str
    };

    call_stored("tag_register_001",arg_arr);
}

