let Color_property = function(color){
    this.color = color;

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
}