$("document").ready(function(){
    $("a").on("click",function(){
        const bng_cd = this.id;

        const kind_cd = $("#bng_list").attr("class");

        if(kind_cd == 1){
            location.href = "/bingo/crient/html/game.html?bng_cd=" + bng_cd;
        }else{
            // location.href = "/bingo/master/html/game.html"
            location.href = "/bingo/master/html/reading.html?bng_cd=" + bng_cd;
        }
    });
});