// JavaScript File
var currentRoom = customRoom;
var currentResource = wall;
var thisRoom = {
    leftDoor:false,
    rightDoor:false,
    topDoor:false,
    bottomDoor:false
};
var context = $("canvas")[0].getContext("2d");

$(window).on("resize",function(){
    $("#game").attr("width",700);
    $("#game").attr("height",700);
    setTimeout($("#game").css("margin-left",((window.innerWidth/2)-350)),100);
});

$("#game").css("margin-left",((window.innerWidth/2)-400));

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
    var block = "block"+(x+y);
    //set block to the current block
    if(currentRoom[block]!=currentResource){
        currentRoom[block] = currentResource;
    } else {
        currentRoom[block] = floor;
    }
});

function draw(){
    clear();
    drawRoom(currentRoom);
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

function clear(){
    context.clearRect(0, 0, $("#game").attr("width"), $("#game").attr("height"));
}

draw();

function printRoom(){
    var roomString = "var NAME = new room(";
    var loops = 0;
    for(var prop in currentRoom){
        if(loops>=49){
            roomString+=currentRoom[prop];
        } else {
            roomString+=currentRoom[prop].name;
        }
        roomString+=","
        loops++;
    }
    roomString = roomString.slice(0,roomString.length-1);
    roomString+=");"
    console.log(roomString);
}