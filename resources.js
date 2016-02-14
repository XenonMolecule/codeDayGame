// JavaScript File (resources and damk memes arsenal)
function resource(passable, grabbable, texture, hackable, name, invObject, textOnPickup){
    this.passable = passable;
    this.grabbable = grabbable;
    this.texture = texture;
    this.hackable = hackable;
    this.name = name;
    this.invObject = invObject||null;
    this.textOnPickup = textOnPickup||null;
}

var weakWall = new resource(false,false,"bricks",true, "weakWall");
var wall = new resource(false,false,"bricks",false, "wall");
var floor = new resource(true, false, "transparent", false, "floor");
var backpack = new resource(false,true,"chest",false, "backpack");
var key = new resource(false, true, "chest", false,"key",keyInv,"Wow, I found a key!");
var key2 = new resource(false, true, "chest", false,"key2",key2Inv,"Oh No! I don't have enough room for this, \nI better find a backpack.");
var stick = new resource(false, true, "chest", false,"stick", stickInv);
var string = new resource(false, true, "chest", false,"string", stringInv);