/*
 * 描画するオブジェクトを保持するためのプロパティテンプレート
 */
let Draw_obj = function(){
    this.x=0;
    this.y=0;

    this.target_x = 0;
    this.target_y = 0;

    this.width=0;
    this.heihgt=0;

    this.target_width = 0;
    this.target_height = 0;

    this.r=0;
    this.g=0;
    this.b=0;

    // 不透明度設定(0.0~1.0、0が透明)
    this.opacity = 1;

    this.target_opacity = 1;

    // ピクセル/fps 1フレームに何ピクセル移動するか
    this.velocity = 0;

    // imageをインスタンス化したときの格納先
    this.img = null;

    // text用
    this.text;
    // フォントなど
}