let Msre_property = function(msre_no,posX,posY,width,height){
    this.msre_no = msre_no;

    this.posX = posX;
    this.posY = posY;

    this.width = width;
    this.height = height;

    this.free_flg = null;
    this.end_flg = null;

    this.color = "white";

    if(this.color == "red"){
        this.r = "255";
        this.g = "0";
        this.b = "51";
    }else if(this.color == "blue"){
        this.r = "";
        this.g = "";
        this.b = "";
    }else if(this.color == "white"){
        this.r = "0";
        this.g = "0";
        this.b = "0";
    }

    // 項目コードと項目名
    this.item_cd = null;
    this.item_name = null;
}