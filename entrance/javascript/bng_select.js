$("document").ready(function(){
    $("a").on("click",function(){
        const bng_no = this.id;

        const kind_cd = parseInt($("#bng_list").attr("class"), 10);

        if(kind_cd == 1){
            location.href = "/bingo/crient/html/game.html?bng_no=" + bng_no;
        }else{
            // location.href = "/bingo/master/html/game.html"
            location.href = "/bingo/master/html/reading.html?bng_no=" + bng_no;
        }
    });
});
