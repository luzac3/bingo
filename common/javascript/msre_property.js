let Msre_property = function(msre_no,posX,posY,width,height){
    this.msre_no = msre_no;

    this.posX = posX;
    this.posY = posY;

    this.width = width;
    this.height = height;

    this.free_flg = null;
    this.end_flg = null;

    this.color = "white";

    // 項目コードと項目名
    this.item_cd = null;
    this.item_name = null;
}