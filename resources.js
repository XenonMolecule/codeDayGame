// JavaScript File (resources and damk memes arsenal)
var resourceList = [];

function resource(passable, grabbable, texture, hackable, name, invObject, textOnPickup, onClickFunction){
    this.passable = passable;
    this.grabbable = grabbable;
    this.texture = texture;
    this.hackable = hackable;
    this.name = name;
    this.invObject = invObject||null;
    this.textOnPickup = textOnPickup||null;
    this.onClickFunction = onClickFunction|| function(){};
    resourceList.push(this);
}

var weakWall = new resource(false,false,"bricks",true, "weakWall");
var wall = new resource(false,false,"bricks",false, "wall");
var floor = new resource(true, false, "transparent", false, "floor");
var backpack = new resource(false,true,"chest",false, "backpack");
var key = new resource(false, true, "chest", false,"key",keyInv,"Wow, I found a key!");
var key2 = new resource(false, true, "chest", false,"key2",key2Inv,"Oh No! I don't have enough room for this, \nI better find a backpack.");
var stick = new resource(false, true, "chest", false,"stick", stickInv,"What am I going to do with a stick?");
var string = new resource(false, true, "chest", false,"string", stringInv,"Oh, a string!");
var lever = new resource(false, false, "switchUp", false, "lever",null,null,function(){});
lever.upPos = true;