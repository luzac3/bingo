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
        const wrapper = property["wrapper"];
        const canvas_name = property["canvas_name"];

        // ラッパークラスの長さを取得
        const wrapper_length = document.getElementById(wrapper).outerwWidth();

        // canvasの取得
        const canvas = document.getElementsByClassName(canvas_name);

        // Canvasのサイズを設定
        canvas[0].width = wrapper_length;
        canvas[0].height = wrapper_length;
        canvas[1].width = wrapper_length;
        canvas[1].height = wrapper_length;

        // 全体プロパティを作成
        const property_master = new Property_master(width,height);

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