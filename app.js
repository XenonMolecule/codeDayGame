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
var displayText="";
var enableDisable=false;
var stageOfTutorial=0;
var craftingAnimCanvas = "<canvas id='craftCanvas' height = '700' width = '700'></canvas>";
var $craftCanvas = $(craftingAnimCanvas);
$("#game").after($craftCanvas);
var craftContext = $craftCanvas[0].getContext("2d");
var craftingRect1 = {
    x:-349,
    y:175,
    image:"DIS IS A GLITCH MON",
    imageToCraft:"HOI I'M A GLITCH"
}
var craftingRect2 = {
    x:699,
    y:175,
    image:"YOU'RE GONNA HAVE A BAD TIME, WITH THIS GLITCH"
}
$craftCanvas.prop("hidden",true);
var craftHelpGiven = false;
var displayQueue = [];
var noSayList = [];
var globalTextAccess = "";
var globalTextPositionAccess = 0;
var terminalContext = $("#terminal")[0].getContext("2d");
var terminalOpened = false;
var lastLines = [];
var currentLine = "";
var termElapsedMSec = 0;
var backupCurrentLine = "";
var lineBrowsingPos = 0;

//var love???

$(window).on("resize",function(){
    $("#game").attr("width",700);
    $("#game").attr("height",700);
    setTimeout($("#game").css("margin-left",((window.innerWidth/2)-400)),100);
    $("#sidebar").css("margin-left",(window.innerWidth/2)+300);
    $("#sidebarDiv").css("margin-left",(window.innerWidth/2)+300);
    $(".rpgText").css("margin-top",500);
    $(".rpgText").css("margin-left",(window.innerWidth/2)-400);
    $("#toggleTerminal").css("margin-left",((window.innerWidth/2)-350));
    $("#terminal").css("margin-left",((window.innerWidth/2)-400));
    console.log(((window.innerWidth/2)-400));
});

$("#game").css("margin-left",((window.innerWidth/2)-400));
$("#sidebar").css("margin-left",(window.innerWidth/2)+300);
$("#sidebarDiv").css("margin-left",(window.innerWidth/2)+300);
$(".rpgText").css("margin-top",500);
$(".rpgText").css("margin-left",(window.innerWidth/2)-400);
$("#craftCanvas").css("margin-left","-700px");
$("#craftCanvas").css("margin-top","0px");
$("#toggleTerminal").css("margin-left",((window.innerWidth/2)-350));
$("#terminal").css("margin-left",((window.innerWidth/2)-400));

//Task: Click Responsivness
//call function on click
$("#game").on("click",function(e){
    var x;
    var y;
    //figure out the x position block
    x = e.offsetX;
    y = e.offsetY;
    x = Math.floor(x/100);
    //figure out the y position block
    y = Math.floor(y/100);
    y*=7;
    //calculate the actual block
    console.log(x+y);
    clickedOn(x+y);
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
    drawInventory();
    miscellaneousFunctions();
    if(terminalOpened){
        drawTerminal();
    }
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
            if(!currentRoom.leftKey){
                charX=6;
                charY=3;
                transferRooms((currentRoom.coordX)-1,(currentRoom.coordY));
                if(currentRoom.textOnFirstEntry!=undefined&&currentRoom.firstEntry===true){
                    displayHelpText(currentRoom.textOnFirstEntry);
                }
                currentRoom.firstEntry = false;
            }  else if(($(".selected").children().attr("src")==="resources/key.png")||($(".selected").children().attr("src")==="resources/key2.png")){
                var theIndex=-1;
                var selectedTexture = $(".selected").children().attr("src");
                var selectedItem = getItemName(selectedTexture);
                for(var i=0; i<inventory.length;i++){
                        if(selectedItem === "key"){
                            if((inventory[i].texture)==(keyInv.texture)){
                                theIndex=i;
                            }
                        } else if(selectedItem === "key2"){
                            if((inventory[i].texture)==(key2Inv.texture)){
                                theIndex=i;
                            }
                        }
                }
                if(theIndex>=0){
                    inventory.splice(theIndex,1);
                }
                var newInv = [];
                $(".itemHolder").children().each(function(){
                    $(this).attr("src","resources/transparent.png");
                });
                for(var i=0;i<inventory.length;i++){
                    newInv[i]=inventory[i];
                    $("#slot"+i).attr("src",inventory[i].texture);
                }
                currentRoom.leftKey = false;
                $(".selected").children().attr("src","resources/transparent.png");
                $(".selected").removeClass("selected");
            }
        } else if((e.charCode==100)&&((charX==6)&&(charY==3))&&(thisRoom.rightDoor)){
            //go right room
            if(!currentRoom.rightKey){
                charX=0;
                charY=3;
                transferRooms((currentRoom.coordX)+1,(currentRoom.coordY));
                if(currentRoom.textOnFirstEntry!=undefined&&currentRoom.firstEntry===true){
                    displayHelpText(currentRoom.textOnFirstEntry);
                }
                currentRoom.firstEntry = false;
            } else if(($(".selected").children().attr("src")==="resources/key.png")||($(".selected").children().attr("src")==="resources/key2.png")){
                var selectedTexture = $(".selected").children().attr("src");
                var theIndex=-1;
                var selectedItem = getItemName(selectedTexture);
                for(var i=0; i<inventory.length;i++){
                       if(selectedItem === "key"){
                            if((inventory[i].texture)==(keyInv.texture)){
                                theIndex=i;
                            }
                        } else if(selectedItem === "key2"){
                            if((inventory[i].texture)==(key2Inv.texture)){
                                theIndex=i;
                            }
                        }
                }
                if(theIndex>=0){
                    inventory.splice(theIndex,1);
                }
                var newInv = [];
                $(".itemHolder").children().each(function(){
                    $(this).attr("src","resources/transparent.png");
                });
                for(var i=0;i<inventory.length;i++){
                    newInv[i]=inventory[i];
                    $("#slot"+i).attr("src",inventory[i].texture);
                }
                currentRoom.rightKey=false;
                $(".selected").children().attr("src","resources/transparent.png");
                $(".selected").removeClass("selected");
            }
        } else if((e.charCode==119)&&((charX==3)&&(charY==0))&&(thisRoom.topDoor)){
            //go up room
            if(!currentRoom.upKey){
                charX=3;
                charY=6;
                transferRooms((currentRoom.coordX),(currentRoom.coordY)-1);
                if(currentRoom.textOnFirstEntry!=undefined&&currentRoom.firstEntry===true){
                    displayHelpText(currentRoom.textOnFirstEntry);
                }
                currentRoom.firstEntry = false;
            } else if(($(".selected").children().attr("src")==="resources/key.png")||($(".selected").children().attr("src")==="resources/key2.png")){
                var selectedTexture = $(".selected").children().attr("src");
                var theIndex=-1;
                var selectedItem = getItemName(selectedTexture);
                for(var i=0; i<inventory.length;i++){
                       if(selectedItem === "key"){
                            if((inventory[i].texture)==(keyInv.texture)){
                                theIndex=i;
                            }
                        } else if(selectedItem === "key2"){
                            if((inventory[i].texture)==(key2Inv.texture)){
                                theIndex=i;
                            }
                        }
                }
                if(theIndex>=0){
                    inventory.splice(theIndex,1);
                }
                var newInv = [];
                $(".itemHolder").children().each(function(){
                    $(this).attr("src","resources/transparent.png");
                });
                for(var i=0;i<inventory.length;i++){
                    newInv[i]=inventory[i];
                    $("#slot"+i).attr("src",inventory[i].texture);
                }
                currentRoom.upKey=false;
                $(".selected").children().attr("src","resources/transparent.png");
                $(".selected").removeClass("selected");
            }
        } else if((e.charCode==115)&&((charX==3)&&(charY==6))&&(thisRoom.bottomDoor)){
            //go down room
            if(!currentRoom.downKey){
                charX=3;
                charY=0;
                transferRooms((currentRoom.coordX),(currentRoom.coordY)+1);
                if(currentRoom.textOnFirstEntry!=undefined&&currentRoom.firstEntry===true){
                    displayHelpText(currentRoom.textOnFirstEntry);
                }
                currentRoom.firstEntry = false;
            }  else if(($(".selected").children().attr("src")==="resources/key.png")||($(".selected").children().attr("src")==="resources/key2.png")){
                var theIndex=-1;
                var selectedTexture = $(".selected").children().attr("src");
                var selectedItem = getItemName(selectedTexture);
                for(var i=0; i<inventory.length;i++){
                       if(selectedItem === "key"){
                            if((inventory[i].texture)==(keyInv.texture)){
                                theIndex=i;
                            }
                        } else if(selectedItem === "key2"){
                            if((inventory[i].texture)==(key2Inv.texture)){
                                theIndex=i;
                            }
                        }
                }
                if(theIndex>=0){
                    inventory.splice(theIndex,1);
                }
                var newInv = [];
                $(".itemHolder").children().each(function(){
                    $(this).attr("src","resources/transparent.png");
                });
                for(var i=0;i<inventory.length;i++){
                    newInv[i]=inventory[i];
                    $("#slot"+i).attr("src",inventory[i].texture);
                }
                currentRoom.downKey=false;
                $(".selected").children().attr("src","resources/transparent.png");
                $(".selected").removeClass("selected");
            }
        }
    }
    if((e.charCode==13)&&(enableDisable)){
        //make rpg text disappear
        console.log("disappear");
        enableDisable =false;
        $("#textRPG").text("");
        displayText = "";
        $(".rpgText").attr("hidden",true);
        if(!terminalOpened){
            canMove = true;
        }
        stageOfTutorial++;
    } else if((e.charCode==122)&&(displayText!="")){
        globalTextPositionAccess = globalTextAccess.length-1;
    }
    
    if(terminalOpened&&terminalContext.measureText(currentLine).width<360){
        currentLine += String.fromCharCode(e.charCode);
    }
    if(e.charCode==13&&terminalOpened){
        //send command based on submitted text
        saveLine(currentLine);
        currentLine = "";
        lineBrowsingPos = -1;
        backupCurrentLine = null;
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
    console.log(prop);
    return currentRoom[prop].grabbable;
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
        prop = "block"+below;
        resource = currentRoom[prop].invObject;
    }
    if(currentRoom[prop].name==="backpack"){
        inventorySpace+=3;
        removeLocks(3);
        displayHelpText("Woooooo! I got a backpack! Now I can carry more items to school AND look scholarly!")
        currentRoom[prop] = floor;
    } else if(currentRoom[prop].name==="earbuds"){
        $("#character").attr("src","resources/spriteEarbuds.png");
        displayHelpText(currentRoom[prop].textOnPickup);
        currentRoom[prop] = floor;
        playSound(backgroundMusicOne);
        for(var i = 0; i < 7; i ++){
            maps[i].music = backgroundMusicOne;
        }
    } else if(currentRoom[prop].name==="hackComputer"){
        displayHelpText(currentRoom[prop].textOnPickup);
        currentRoom[prop] = floor;
        $("#toggleTerminal").prop("hidden",false);
    } else {
        if(inventory.length<inventorySpace){
            if(currentRoom[prop].name=="key2"){
                if(inventory.length==inventorySpace){
                    displayHelpText(currentRoom[prop].textOnPickup);
                } else {
                    displayHelpText("I wonder what I can do with this key?");
                }
            }else {
                console.log(currentRoom[prop].textOnPickup);
                displayHelpText(currentRoom[prop].textOnPickup);
            }
            inventory.push(resource);
            
            $("#slot"+(inventory.length-1)).attr("src",currentRoom[prop].invObject.texture);
            currentRoom[prop] = floor;
            
        } else {
            console.log("inventoryFull");
            if(currentRoom[prop].name=="key2"){
                displayHelpText(currentRoom[prop].textOnPickup);
            } else {
                displayHelpText("Oh no, I don't have enough room for this! I better look for a backpack.");
            }
        }
    }
}
//make it so that if the user interacts with the door it goes to the next room

function transferRooms(xPos,yPos){
    console.log("x:"+xPos+" y:"+yPos);
    var lastSong = currentRoom.music;
    for(var i = 0; i<rooms.length; i++){
        if((rooms[i].coordX==xPos)&&(rooms[i].coordY==yPos)){
            currentRoom = rooms[i];
            thisRoom = {
                leftDoor:false,
                rightDoor:false,
                bottomDoor:false,
                topDoor:false
            }
            //charX = (currentRoom.playerSpawn%7);
            //charY = (currentRoom.playerSpawn-charX)/7;
        }
    }
    if(currentRoom.music!=lastSong){
        transitionSongs(lastSong,currentRoom.music);
    }
}

function funText(textString, position){
    if(globalTextPositionAccess>position){
        position = globalTextPositionAccess;
    } else {
        globalTextPositionAccess = position;
    }
    textArray=[];
    canMove=false;
    var actualName = "";
    if($(".face").attr("src")!="resources/face.png"){
        actualName = "~"+$(".face").attr("src")+"~"+textString;
    } else {
        actualName = textString;
    }
    if(displayQueue.length>0){
        if(displayQueue.length==1){
            if(searchArray(displayQueue,actualName)){
                displayQueue = [];
                noSayList.push(actualName);
            }
        }
        if(searchArray(displayQueue,actualName)){
            displayQueue.splice((displayQueue.indexOf(actualName)),1);
            noSayList.push(actualName);
        }
    }
    if(noSayList.length>5){
        var newList = [];
        for(var i = 0; i < noSayList.length; i++){
            if(i===0){
                newList[i] = noSayList[5];
            } else {
                newList[i] = noSayList[i-1];
            }
        }
        noSayList = newList;
    }
    var textArray = textString.split("");
    //displayText=displayText+textArray[position];
    displayText = textString.slice(0,position+1);
    $("#textRPG").text(displayText);
    if(position<(textArray.length-1)){
        setTimeout(funText,40,textString,(position+1));
    } else {
        enableDisable=true;
    }
}

function displayHelpText(string, texture){
    var thingsToSay = string.split("*N");
    $(".rpgText").attr("hidden",false);
    if(displayText===""){
        if(displayQueue.length>0){
            calcDisplay(displayQueue[0]);
        } else {
            calcDisplay(thingsToSay[0]);
            for(var i = 1; i < thingsToSay.length; i++){
                if(texture!=undefined){
                    thingsToSay[i] = "~"+texture+"~"+thingsToSay[i];
                }
                displayQueue.push(thingsToSay[i]);
            }
        }
    } else {
        for(var i = 0; i < thingsToSay.length; i++){
            if(!searchArray(displayQueue, thingsToSay[i])&&(!searchArray(noSayList, thingsToSay[i]))){
                if(texture!=undefined){
                    thingsToSay[i] = "~"+texture+"~"+thingsToSay[i];
                }
                displayQueue.push(thingsToSay[i]);
            }
        }
    }
    if(displayQueue.length>0){
        setTimeout(displayHelpText, 100, displayQueue[0]);
    }
}

function calcDisplay(textToDisplay){
    var trueText = textToDisplay.split("~");
    if(trueText.length>1){
        $(".face").attr("src",trueText[1]);
    } else {
        $(".face").attr("src","resources/face.png");  
    }
    var realText = trueText[(trueText.length-1)];
    globalTextAccess = realText;
    globalTextPositionAccess = 0;
    displayText="";
    funText(realText,0);
}

function tutorial(run,run1,run2,run3){
    if(run){
        if(run3){
            displayHelpText("Woah, where am I?");
            run3=false;
        }
        if(stageOfTutorial==1){
            if(run1){
                displayHelpText("Maybe I should look for chests to open by pressing enter");
                run1=false;
            }
        }
        if(stageOfTutorial==2){
            if(run2){
                displayHelpText("I think I can move with the w,a,s, and d keys");
                run2=false;
            }
        }
        if(stageOfTutorial<3){
            setTimeout(tutorial,10,true,run1,run2,run3);
        }
    }
}

tutorial(true,true,true,true);

function removeLocks(amt){
    for(var i=0; i<amt;i++){
        $("#slot"+((inventorySpace-3)+i)).hide(500);
        setTimeout(setResources,500,i);
    }
}

function setResources(looped){
    $("#slot"+((inventorySpace-3)+looped)).attr("src","resources/transparent.png");
    $("#slot"+((inventorySpace-3)+looped)).show(500);
}

$(".itemHolder").on("click",function(){
    var previouslySelectedTexture = $(".selected img").attr("src");
    var previouslySelected = getItemName(previouslySelectedTexture);
    var previouslySelectedWithInv = previouslySelected + "Inv";
    var on = $(this).hasClass("selected");
    $(".itemHolder").each(function(){
       $(this).removeClass("selected"); 
    });
    if(!on&&(!($(this).children("img").attr("src")==="resources/lock.png"))){
        $(this).addClass("selected");
    }
    var selectedItemTexture = $(".selected img").attr("src");
    var selectedItemName = getItemName(selectedItemTexture);
    var selectedItemNameWithInv = selectedItemName+"Inv";
    for(var z = 0; z < inventoryItems.length; z++){
        for(var i = 0; i < inventoryItems[z].crafting.length; i++){
            if((inventoryItems[z].crafting[i][0]===previouslySelectedWithInv)&&(inventoryItems[z].name===selectedItemName)){
                removeFromInventory(nameToObject(previouslySelected));
                removeFromInventory(nameToObject(selectedItemName));
                var craftedItemObj = nameToObject((inventoryItems[z].crafting[i][1]).split("Inv")[0]);
                inventory.push(nameToObject((inventoryItems[z].crafting[i][1]).split("Inv")[0]));
                $(".selected").removeClass("selected");
                continueCraftAnim = true;
                craftingRect1.image = (nameToObject(selectedItemName)).craftingTexture;
                craftingRect1.imageToCraft = craftedItemObj.craftingTexture;
                craftingRect2.image = (nameToObject(previouslySelected)).craftingTexture;
                craftingAnimation();
                setTimeout(function(){continueCraftAnim=false},2000);
                displayHelpText((nameToObject((inventoryItems[z].crafting[i][1]).split("Inv")[0])).onCraftText);
                break;
            }
        }
    }
    
});

function drawInventory(){
    for(var i = 0; i < inventorySpace; i++){
        if(i<inventory.length){
            $("#slot"+i).attr("src",inventory[i].texture);
        } else {
            $("#slot"+i).attr("src","resources/transparent.png");
        }
    }
    for(var i = inventorySpace; i<8; i++){
        $("#slot"+i).attr("src","resources/lock.png");
    }
}

function getItemName(texture){
    for(var i = 0; i < inventoryItems.length; i ++){
        if(texture === inventoryItems[i].texture){
            return inventoryItems[i].name;
        }
    }
    return null;
}

function removeFromInventory(name){
    var theIndex = -1;
    for(var i=0; i<inventory.length;i++){
        if(name === inventory[i]){
            theIndex=i;
        }
    }
    if(theIndex>=0){
        inventory.splice(theIndex,1);
    }
}

function nameToTexture(name){
    for(var i = 0; i < inventoryItems.length; i ++){
        if(name === inventoryItems[i].name){
            return inventoryItems[i].texture;
        }
    }
    return null;
}

function nameToObject(name){
    for(var i=0; i<inventoryItems.length;i++){
        if(name===inventoryItems[i].name){
            return inventoryItems[i];
        }
    }
}

function clickedOn(block){
    var blockName = "block"+block;
    if(currentRoom[blockName].onClickFunction!=undefined){
        currentRoom[blockName].onClickFunction.call(currentRoom[blockName]);
    }
}

function makeLeverDropWalls(){
    if($(".selected img").attr("src") === "resources/fishingrod.png"){
        leverRoom.block31 = floor;
        setTimeout(removeBlock,500,32,leverRoom);
        setTimeout(removeBlock,500,30,leverRoom);
        setTimeout(removeBlock,1000,29,leverRoom);
        setTimeout(removeBlock,1000,33,leverRoom);
        lever.texture = "switchDown";
        lever.upPos = false;
        removeFromInventory(fishingRodInv);
        $(".selected").removeClass("selected");
        displayHelpText("Wow, that is super nerf! I made it through");
    }
}

function removeBlock(block,room){
    if(room!=undefined){
        room["block"+block] = floor;
    } else {
        currentRoom["block"+block] = floor;
    }
}
lever.onClickFunction = makeLeverDropWalls;

var continueCraftAnim = true;

function craftingAnimation(){
    craftContext.clearRect(0, 0, $craftCanvas.attr("width"), $craftCanvas.attr("height"));
    if(continueCraftAnim){
        $craftCanvas.prop("hidden",false);
        updateCraftingFrame();
        craftContext.beginPath();
        craftContext.rect(craftingRect1.x,craftingRect1.y,350,350);
        craftContext.rect(craftingRect2.x,craftingRect2.y,350,350);
        craftContext.fillStyle = "rgb(255,255,255)";
        craftContext.fill();
        var img = document.getElementById(craftingRect1.imageToCraft);
        var img1 = document.getElementById(craftingRect1.image);
        var img2 = document.getElementById(craftingRect2.image);
        if(craftingRect1.x<175){
            craftContext.drawImage(img1,(craftingRect1.x+88),(craftingRect1.y+88),175,175);
            craftContext.drawImage(img2,(craftingRect2.x+88),(craftingRect2.y+88),175,175);
        } else {
            craftContext.drawImage(img,(craftingRect1.x+88),(craftingRect1.y+88),175,175);
        }
        craftContext.closePath();
        setTimeout(craftingAnimation,1);
    } else {
       resetCraftingAnimation();
    }
}

function updateCraftingFrame(){
    if(craftingRect1.x<175){
        craftingRect1.x+=10;
        craftingRect2.x-=10;
    }
}

function resetCraftingAnimation(){
    setTimeout(function(){continueCraftAnim = true},100);
    craftingRect1.x = -349;
    craftingRect2.x = 699;
    $craftCanvas.prop("hidden",true);
}

function invToResource(inventoryObject){
    for(var i = 0; i < resourceList.length; i++){
        if(resourceList[i].invObject!=undefined){
            if(inventoryObject === resourceList[i].invObject){
                return resourceList[i];
            }
        }
    }
    return false;
}

function inventoryContains(item){
    if(typeof item === "string"){
        item = nameToObject(item);
    } else if(typeof item != "object"){
        console.log("You trying to glitch the game?")
        return false;
    }
    for(var i = 0; i < inventory.length; i++){
        if(item === inventory[i]){
            return true;
        }
    }
    return false;
}

function miscellaneousFunctions(){
    if(!(craftHelpGiven)&&inventoryContains(stringInv)&&inventoryContains(stickInv)){
        craftHelpGiven = true;
        displayHelpText("Oh look at this!  I bet I could combine this stick and string by clicking on one then the other in my inventory!");
    }
}

function searchArray(array, content){
    return(array.indexOf(content)!=-1);
}

function playSound(audio){
    if(audio.name!=undefined){
        audio = audio.audio;
    }
    audio.volume = 1;
    audio.play();
}

function transitionSongs(old,newSnd){
    if(old.name!=undefined){
        old= old.audio;
    }
    if(newSnd.name!=undefined){
        newSnd = newSnd.audio;
    }
    if(old.volume>=0.1){
        old.volume-=0.1;
        setTimeout(transitionSongs,100,old,newSnd);
    } else if(newSnd.volume===0){
        old.pause();
        old.currentTime = 0;
        newSnd.play()
        newSnd.volume+=0.1;
        setTimeout(transitionSongs,100,old,newSnd);
    } else if(newSnd.volume<1){
        newSnd.volume+=0.1;
        setTimeout(transitionSongs,100,old,newSnd);
    } else {
        old.pause();
        old.currentTime = 0;
    }
}

$("#toggleTerminal").on("click",function(){
    if($(this).hasClass("termClosed")){
        $(this).removeClass("termClosed");
        $(this).addClass("termOpened");
        $(this).text("Close Hack Terminal");
        $(this).css("font-size","64px");
        $("#terminal").prop("hidden",false);
        terminalOpened = true;
        canMove = false;
    } else {
        $(this).removeClass("termOpened");
        $(this).addClass("termClosed");
        $(this).text("Open Hack Terminal");
        $(this).css("font-size","72px");
        $("#terminal").prop("hidden",true);
        terminalOpened = false;
        if(enableDisable){
            canMove = true;
        }
    }
});

var drawTextPosBox = true;

function drawTerminal(){
    clearTermCanvas();
    drawTermSeperators();
    termConsole();
}

function drawTermSeperators(){
    terminalContext.beginPath();
    terminalContext.moveTo(0,5);
    terminalContext.strokeStyle = "#001a4d";
    terminalContext.lineTo(395,5);
    terminalContext.lineWidth=10;
    terminalContext.moveTo(395,0);
    terminalContext.lineTo(395,400);
    terminalContext.moveTo(0,300);
    terminalContext.lineTo(400,300);
    terminalContext.moveTo(5,0);
    terminalContext.lineTo(5,400);
    terminalContext.stroke();
}

function clearTermCanvas(){
    terminalContext.clearRect(0, 0, $("#terminal").attr("width"), $("#terminal").attr("height"));
}
function termConsole(){
    var fontSize = 20;
    terminalContext.fillStyle = "#FFF";
    terminalContext.font= fontSize+"px font";
    for(var i = 0; i < lastLines.length; i ++){
        terminalContext.fillText(lastLines[i],15,(370-(i*fontSize)));
    }
    if(drawTextPosBox){
        terminalContext.beginPath();
        terminalContext.rect((15+(terminalContext.measureText(currentLine).width)),375,fontSize/2,fontSize);
        terminalContext.fill();
        terminalContext.closePath();
    }
    terminalContext.fillText(currentLine,15, 393);
}

function saveLine(line){
    var backupArray = [];
    backupArray.push(line);
    for(var i = 0; i < lastLines.length; i++){
        backupArray.push(lastLines[i]);
    }
    if(backupArray.length>3){
        backupArray.pop();
    }
    lastLines = backupArray;
}

function manipulateElapsedMSecs(){
    termElapsedMSec++;
    if((termElapsedMSec%100)===0){
        drawTextPosBox = !drawTextPosBox;
    }
    setTimeout(manipulateElapsedMSecs,1);
}

manipulateElapsedMSecs();

$(window).on("keydown",function(e){
    if(e.keyCode === 8 && terminalOpened && currentLine.length > 0){
        e.preventDefault();
        var tempLine = currentLine.split("");
        currentLine = "";
        tempLine.pop();
        for(var i = 0; i < tempLine.length; i ++){
            currentLine += tempLine[i];
        }
    } else if(e.keyCode === 38 && terminalOpened){
        if(backupCurrentLine == null){
            backupCurrentLine = currentLine;
        }
        if(lineBrowsingPos<lastLines.length-1){
            lineBrowsingPos++;
        }
        currentLine = (lastLines[lineBrowsingPos]).trim();
    } else if (e.keyCode === 40 && terminalOpened){
        if(lineBrowsingPos>0){
            lineBrowsingPos--;
            currentLine = (lastLines[lineBrowsingPos]).trim();
        } else {
            if(lineBrowsingPos>-1){
                lineBrowsingPos--;
            }
            currentLine = backupCurrentLine;
        }
    } else if(e.keyCode === 8){
        e.preventDefault();
    }
});