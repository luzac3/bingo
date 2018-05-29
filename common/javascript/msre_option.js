/**
 * インスタンス：全体　CANVASのサイズ、マス数などを設定するインスタンス
 * マスごとのインスタンス：全体にあわせてサイズを変更し、クリックで色を変更するなどする(色変更時にインスタンスも書き換え)
 *
 */

$(window).on("load",function(){
    // ここが起点
    $("#pz_canvas1").css('visibility','visible');
    $("#pz_canvas2").css('visibility','hidden');

    initialize();

    $("button").on("click",function(){
        $("button").prop("disabled", true);
        shufle([],storager.get("panelObj"),new RectObj(150,150,50,50,0,0,0),0);
        /* canvas要素に対してイベントを設定 */
        $("canvas").on( "click", function( event ) {
            move(event);
        });
    });
});

function initialize(){

    // マスごとのプロパティを格納する配列
    let msre_property = [];

    // マス数を取得
    let msre_num = $("#BNG_FNSH_NUM").val();

    // マス数にあわせてマスのプロパティをインスタンス化、配列に保存してストレージに格納

    // ラッパークラスの長さを取得
    let wrapper_length = $("#wrapper").outerwWidth();

    // 1列のマス数
    let msre_ln_num = Math.sqrt(msre_num);

    // 1マスの長さ
    let msre_length = msre_num / msre_ln_num;

    // ラッパークラスの縦幅を変更

    // Canvasのサイズを設定

    // 全体プロパティを作成
    let msre_property_master = new Msre_property_master(width,height,msre_num);

    // 列数カウント用
    let ln_count = 1;

    // X座標
    let x = 0;

    // Y座標
    let y = 0;

    for(let i=0; i < msre_num; i++){
        if(ln_count == msre_ln_num){
            x = 0;
            y = y + msre_length;
            ln_count = 1;
        }
        msre_property[i] = new Msre_property(i+1,x,y,msre_length,msre_length);
        x = x + msre_length;
        ln_count++;
    }

}