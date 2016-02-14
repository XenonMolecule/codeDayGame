  // JavaScript File(meme generator)
var y=0;
var context = $("canvas")[0].getContext("2d");
var closedList = [];
var openList = [];
var nodes = [];
var currentRoom = firstRoom;
var charX = 3;
var charY = 6;
var debugData;
var canMove = true;
var inventory = [];
var inventorySpace = 1;
var thisRoom = {
    leftDoor:false,
    rightDoor:false,
    topDoor:false,
    bottomDoor:false
}
//var love???

$(window).on("resize",function(){
    $("#game").attr("width",700);
    $("#game").attr("height",700);
    setTimeout($("#game").css("margin-left",((window.innerWidth/2)-350)),100);
    $("#sidebar").css("margin-left",(window.innerWidth/2)+300);
    $("#sidebarDiv").css("margin-left",(window.innerWidth/2)+300);
    console.log(((window.innerWidth/2)-400));
});

$("#game").css("margin-left",((window.innerWidth/2)-400));
$("#sidebar").css("margin-left",(window.innerWidth/2)+300);
$("#sidebarDiv").css("margin-left",(window.innerWidth/2)+300);
$(".rpgText").css("margin-top",500);
$(".rpgText").css("margin-left",(window.innerWidth/2)-400);

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
    for(var i = 0; i<rooms.length; i++){
        if((currentRoom.coordX-1===rooms[i].coordX)&&(currentRoom.coordY===rooms[i].coordY)){
            var img = document.getElementById("leftdoor");
            thisRoom.leftDoor = true;
            context.drawImage(img,0,300,100,100);
        }
        if((currentRoom.coordX+1===rooms[i].coordX)&&(currentRoom.coordY===rooms[i].coordY)){
            var img = document.getElementById("rightdoor");
            thisRoom.rightDoor = true;
            context.drawImage(img,600,300,100,100);
        }
        if((currentRoom.coordY-1===rooms[i].coordY)&&(currentRoom.coordX===rooms[i].coordX)){
            thisRoom.topDoor = true;
            var img = document.getElementById("topdoor");
            context.drawImage(img,300,0,100,100);
        }
        if((currentRoom.coordY+1===rooms[i].coordY)&&(currentRoom.coordX===rooms[i].coordX)){
            thisRoom.bottomDoor = true;
            var img = document.getElementById("bottomdoor");
            context.drawImage(img,300,600,100,100);
        }
    }
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

$(window).on("keypress",function(e){
    if(canMove ==true){
        debugData = e;
        var pos = charX+(charY*7);
        if((e.charCode==97)&&(charX>0)&&(getPassability((pos-1)))){
            //left
            glideX(charX,charX-1);
        } else if((e.charCode===100)&&(charX<6)&&(getPassability(pos+1))){
            //right
            glideX(charX,charX+1);
        } else if((e.charCode==119)&&(charY>0)&&(getPassability((pos-7)))){
            //up
            glideY(charY,charY-1);
        } else if((e.charCode==115)&&(charY<6)&&(getPassability((pos+7)))){
            //down
            glideY(charY,(charY+1));
        } else if((e.charCode==13)){
            getAdjacent(pos);
        } else if((e.charCode==97)&&((charX==0)&&(charY==3))&&(thisRoom.leftDoor)){
            //go left room
            transferRooms((currentRoom.coordX)-1,(currentRoom.coordY));
        } else if((e.charCode==100)&&((charX==6)&&(charY==3))&&(thisRoom.rightDoor)){
            //go right room
            transferRooms((currentRoom.coordX)+1,(currentRoom.coordY));
        } else if((e.charCode==119)&&((charX==3)&&(charY==0))&&(thisRoom.topDoor)){
            //go up room
            transferRooms((currentRoom.coordX),(currentRoom.coordY)-1);
        } else if((e.charCode==115)&&((charX==3)&&(charY==6))&&(thisRoom.bottomDoor)){
            //go down room
            transferRooms((currentRoom.coordX),(currentRoom.coordY)+1);
        }
    }
});

function glideX(currentPos,newPos){
    canMove = false;
    var dist = newPos-currentPos;
    dist=dist/25;
    charX+=dist;
    charX*=1000;
    charX = Math.round(charX);
    charX = charX/1000;
    if(charX!=newPos){
        setTimeout(glideX,1,currentPos,newPos);
    }else{
        canMove = true;
    }
}

function glideY(currentPos,newPos){
    canMove=false;
    var dist = newPos-currentPos;
    dist=dist/25;
    charY+=dist;
    charY*=1000;
    charY = Math.round(charY);
    charY = charY/1000;
    if(charY!=newPos){
        setTimeout(glideY,1,currentPos,newPos);
    }else{
        canMove = true;
    }
}

function getPassability(block){
    var prop = "block"+block;
    return currentRoom[prop].passable;
}

function getGrabbability(block){
    var prop = "block"+block;
    return currentRoom[prop].grabbable;
}
function inventory(){
    
}
function getAdjacent(position){
    var above = position-7;
    var left = position-1;
    var right = position+1;
    var below = position+7;
    var resource;
    var prop;
    if(getGrabbability(above)){
        prop = "block"+above;
        resource = currentRoom[prop].invObject;
    } else if(getGrabbability(left)){
        prop = "block"+left;
        resource = currentRoom[prop].invObject;
    } else if(getGrabbability(right)){
        prop = "block"+right;
        resource = currentRoom[prop].invObject;
    } else if(getGrabbability(below)){
        prop = "block"+right;
        resource = currentRoom[prop].invObject;
    }
    if(inventory.length<inventorySpace){
        inventory.push(resource);
        currentRoom[prop] = floor;
    } else {
        console.log("inventoryFull");
    }
}
//make it so that if the user interacts with the door it goes to the next room

function transferRooms(xPos,yPos){
    console.log("x:"+xPos+" y:"+yPos);
    for(var i = 0; i<rooms.length; i++){
        if((rooms[i].coordX==xPos)&&(rooms[i].coordY==yPos)){
            currentRoom = rooms[i];
            thisRoom = {
                leftDoor:false,
                rightDoor:false,
                bottomDoor:false,
                topDoor:false
            }
            charX = (currentRoom.playerSpawn%7);
            charY = (currentRoom.playerSpawn-charX)/7;
        }
    }
}