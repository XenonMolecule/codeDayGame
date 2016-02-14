  // JavaScript File
var my_canvas = document.getElementById("game");
var context = my_canvas.getContext("2d");
var x=0;
var y=0;
var context = $("canvas")[0].getContext("2d");
var closedList = [];
var openList = [];
var nodes = [];
var currentRoom = firstRoom;
var charX = 3;
var charY = 6;

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
        openList.push(start);
    }
    cycles = 0;
    do{
        if(cycles >= openList.length){
            cycles = 0;
        }
        currentNode = openList[cycles];
        closedList.push(currentNode);
        openList.splice(openList.indexOf(currentNode),1);
        if(currentNode === end){
            break;
        }
        //put adjacent blocks to the current node on the open list
        calcAdjacent(currentNode);
        //calculate the f values of eachblock
        calcF();
        //cycle through open list, finding new nodes to add
        //repeat calculations until you find the end node
        //sortByF();
        console.log("trying");
        console.log(openList.length);
    } while(openList.length>0);
    //go through the parent nodes of the successful path
    var testNode = currentNode;
    var path = [];
    var cycles = 0;
    if(currentNode==end){
        while((testNode != start)&&(cycles<50)) {
            console.log(testNode);
            path.push(testNode);
            console.log(nodes[testNode]);
            testNode = nodes[testNode].parentNode;
        }
        path.reverse();
        console.log("path found");
    } else {
        console.log("couldn't find a path");
    }
}

function calcAdjacent(currentNode){
    var above = currentNode-7;
    var left = currentNode-1;
    var right= currentNode+1;
    var below = currentNode+7;
    var restrictions = [];
    for(var i = 0; i<closedList.length; i++){
        //console.log(above);
        if(above == closedList[i]){
            restrictions.push("above");
            console.log(pass);
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
    //excludeBadGuys();
    //calculate the g values of the adjacent blocks
    for(var i=0; i<nodes.length;i++){
        if(((nodes[i].position==above)||(nodes[i].position==left))||((nodes[i].position==right)||(nodes[i].position==below))){
            nodes[i].parentNode = currentNode;
            if((retNodeProps(currentNode).g)!=0){
                var gVal = retNodeProps(currentNode).g;
            }
            nodes[i].g = (gVal)+1;
        }
    }
}

function calcF(){
    for(var i=0;i<openList.length;i++){
        //console.log(openList[i]);
        if(openList[i]>=0){
            nodes[openList[i]].f=((nodes[openList[i]].g)+(nodes[openList[i]].h));
        }
    }    
}

function retNodeProps(nodePos){
    for(var i=0;i<nodes.length;i++){
        if(nodePos===nodes[i].position){
            return nodes[i];
        }
    }
    return 0;
}

function sortByF(){
    var sort = [];
    var counter = 0;
    for(var i = 0;i < openList.length;i ++){
        //console.log(openList[i]);
        if(openList[i]>=0){
            sort.push(nodes[openList[i]].f);
        }
    }
    sort.sort(function(a, b){return a-b});
    var newOpenList=[];
    for(var i = 0; i < openList.length; i++){
        for(var j = 0; j < openList.length; i++){
            if((nodes[openList[j]].f)===sort[i]){
                counter=0;
                for(var k=0;k<newOpenList.length;i++){
                    if(newOpenList[k]===sort[i]){
                        break;
                    } else {
                        counter++;
                    }
                }
                if(counter===(newOpenList.length-1)){
                    newOpenList.push(sort[i]);
                }
            }
        }
    }
    openList=[];
    for(var i=0; i<openList.length; i++){
        openList.push(newOpenList[i]);
    }
}

function excludeBadGuys(){
    for(var i=0;i<openList.length;i++){
        if(openList[i]<0){
            openList.splice(i,1);
        }
    }
}

//Task:Draw the screen
function draw(){
    clear();
    drawRoom(currentRoom);
    drawCharacter();
    setTimeout(draw,(1000/16));
}

//function that takes in room
function drawRoom(room){
    //calculate the position of the blocks
    //draw each image into the proper spot
    var cycles = 0
    for(var prop in room){
        if(cycles<49){
            var img = document.getElementById((room[prop].texture));
            var x = (cycles%7);
            var y = ((cycles-cycles%7)/7);
            context.drawImage(img,(x*100),(y*100),100,100);
            cycles++;
        }
    }
    //var love
    
}
//function to clear the canvas
function clear(){
    context.clearRect(0, 0, $("#game").attr("width"), $("#game").attr("height"));
}

draw();

//draw character function
function drawCharacter(){
    var img = document.getElementById("character");
    context.drawImage(img,(charX*100),(charY*100),100,100);
}