let Msre_property = function(msre_no,posX,posY,width,height){
    this.msre_no = msre_no;

    this.posX = posX;
    this.posY = posY;

    this.width = width;
    this.height = height;

    this.free_flg = false;
    this.end_flg = true;

    this.set_color = function(color){
        if(color == "red"){
            this.r = "255";
            this.g = "0";
            this.b = "51";
        }else if(color == "blue"){
            this.r = "";
            this.g = "";
            this.b = "";
        }else if(color == "white"){
            this.r = "255";
            this.g = "255";
            this.b = "255";
        }
    }

    this.r = "0";
    this.g = "0";
    this.b = "0";

    // 項目コードと項目名
    this.item_cd = "";
    this.item_name = "";
}