// JavaScript File
var x=0;
var y=0;
$(window).on("resize",function(){
    $("#game").attr("width",700);
    $("#game").attr("height",700);
    setTimeout($("#game").css("margin-left",((window.innerWidth/2)-350)),100);
    console.log(((window.innerWidth/2)-350));
});

$("#game").css("margin-left",((window.innerWidth/2)-350));

//Task: Click Responsivness
//call function on click
$("#game").on("click",function(e){
    //figure out the x position block
    x = e.offsetX;
    y = e.offsetY;
    x = Math.floor(x/100);
    //figure out the y position block
    y = Math.floor(y/100);
    y*=7;
    //calculate the actual block
    console.log(x+y);
});

    
//Task: Pathfinding
//function that intakes map, start block, and end block(smart guy stuff)
function pathfinding(map,start,end){
    //initialize all the things
    var nodes = [];
    for(var i = 0; i<49;i++){
        var node = {
            h:0,
            g:0,
            f:0,
            parent:0
        };
        nodes.push(node);
    }
    //calculate the h(heuristic) value for each block
    for(var i=0;i<nodes.length; i++){
        var endX=(end%7);
        var endY=(end-endX)/7;
        var thisX=(i%7);
        var thisY=(i-thisX)/7;
        var hX= Math.abs((endX-thisX));
        var hY= Math.abs((endY-thisY));
        nodes[i].h = (hX+hY);
    }
    //put the wall blocks and start position on the closed list
    //put adjacent blocks to the current node on the open list
        //calculate the g values of the adjacent blocks
    //calculate the f values of eachblock
    //cycle through open list, finding new nodes to add
    //repeat calculations until you find the end node
    //go through the parent nodes of the successful path
}
