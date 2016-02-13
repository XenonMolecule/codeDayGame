// JavaScript File
$(window).on("resize",function(){
    $("#game").attr("width",700);
    $("#game").attr("height",700);
    setTimeout($("#game").css("margin-left",((window.innerWidth/2)-350)),100);
    console.log(((window.innerWidth/2)-350));
});

$("#game").css("margin-left",((window.innerWidth/2)-350));