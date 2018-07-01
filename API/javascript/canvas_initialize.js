/*
 * プロパティ
 * ・描画するオブジェクトのプロパティ(リスト)
 * ・ラッパークラスの名称(ID)
 * ・Canvasの名称
 */
function canvas_initialize(draw,property){
    return new Promise((resolve,reject) => {
        // プロパティリストの展開
        const draw_property = property["draw_property"];
        const wrapper_width = property["wrapper_width"];
        const wrapper_height = property["wrapper_height"];
        const canvas_name = property["canvas_name"];

        // ラッパークラスの長さを取得
        const wrapper_length = document.getElementById(wrapper).offsetWidth;

        // canvasの取得
        const canvas = document.getElementsByClassName(canvas_name);

        // Canvasのサイズを設定
        canvas[0].width = wrapper_width;
        canvas[0].height = wrapper_height;
        canvas[1].width = wrapper_width;
        canvas[1].height = wrapper_height;

        // 全体プロパティを作成
        const property_master = new Property_master(wrapper_length,wrapper_length);

        // 描画するCanvasの設定とCanvasオブジェクト
        const canvas_obj = canvas_change(property_master,canvas_name);

        draw(canvas_obj[0],draw_property);

        // canvasの入れ替え
        document.getElementById(canvas_name+canvas_obj[1]).css('visibility','visible');
        document.getElementById(canvas_name+canvas_obj[2]).css('visibility','hidden');

        //ローカルストレージに配列を保存
        storager.set("property_master", property_master);
        storager.set("initialize_property",property);
        resolve();
    });
}