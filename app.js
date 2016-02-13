// JavaScript File
var x=0;
var y=0;
var context = $("canvas")[0].getContext("2d");
var closedList = [];
var openList = [];
var nodes = [];
var currentRoom = firstRoom;

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
    var currentNode = start;
    nodes = [];
    for(var i = 0; i<49;i++){
        var node = {
            h:0,
            g:0,
            f:0,
            parentNode:0,
            position:i
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
    var cycles = 0;
    for(var prop in map){
        if(map[prop].passable==false){
            closedList.push(cycles);
            cycles++;
        }
        closedList.push(start);
    }
    //put adjacent blocks to the current node on the open list
    cycles = 0;
    calcAdjacent(currentNode);
        
    //calculate the f values of eachblock
    //cycle through open list, finding new nodes to add
    //repeat calculations until you find the end node
    //go through the parent nodes of the successful path
}

function calcAdjacent(currentNode){
    var above = currentNode-7;
    var left = currentNode-1;
    var right= currentNode+1;
    var below = currentNode+7;
    var restrictions = [];
    for(var i = 0; i<closedList.length; i++){
        if(above == closedList[i]){
            restrictions.push("above");
        } else if(left == closedList[i]){
            restrictions.push("left");
        } else if(right == closedList[i]){
            restrictions.push("right");
        } else if(below == closedList[i]){
            restrictions.push("down");
        }
    }
    var abovePasses=0;
    var leftPasses=0;
    var rightPasses=0;
    var belowPasses=0;
    for(var i = 0; i<restrictions.length; i++){
        if((above>=0)&&(restrictions[i]!="above")){
            abovePasses++;
        }
        if(((currentNode%7)!=0)&&(restrictions[i]!="left")){
            leftPasses++;
        }
        if(((currentNode%7)!=6)&&(restrictions[i]!="right")){
            rightPasses++;
        }
        if((below<=48)&&(restrictions[i])!="down"){
            belowPasses++;
        }
    }
    if(abovePasses==(restrictions.length-1)){
        openList.push(above);
    }
    if(leftPasses==(restrictions.length-1)){
        openList.push(left);
    }
    if(rightPasses==(restrictions.length-1)){
        openList.push(right);
    }
    if(belowPasses==(restrictions.length-1)){
        openList.push(below);
    }
    //calculate the g values of the adjacent blocks
    for(var i=0; i<nodes.length;i++){
        if(((nodes[i].position==above)||(nodes[i].position==left))||((nodes[i].position==right)||(nodes[i].position==below))){
            nodes[i].parentNode = currentNode;
            nodes[i].g = (retNodeProps(currentNode).g)+1;
        }
    }
}

function retNodeProps(nodePos){
    for(var i=0;i<nodes.length;i++){
        if(nodePos===nodes[i].position){
            return nodes[i];
        }
    }
}

//Task:Draw the screen
function draw(){
    clear();
    drawRoom(currentRoom);
    setTimeout(draw,(1000/16));
    console.log("drawing");
}

//function that takes in room
function drawRoom(room){
    //calculate the position of the blocks
    //draw each image into the proper spot
    var cycles = 0
    for(var prop in room){
        var img = document.getElementById((room[prop].texture));
        var x = (cycles%7);
        var y = ((cycles-cycles%7)/7);
        context.drawImage(img,(x*100),(y*100),100,100);
        cycles++;
    }
    //var love
    
}
//function to clear the canvas
function clear(){
    context.clearRect(0, 0, $("#game").attr("width"), $("#game").attr("height"));
}

draw();