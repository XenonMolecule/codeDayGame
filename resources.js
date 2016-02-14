// JavaScript File (resources and damk memes arsenal)
function resource(passable, grabbable, texture, hackable, invObject, textOnPickup){
    this.passable = passable;
    this.grabbable = grabbable;
    this.texture = texture;
    this.hackable = hackable;
    this.invObject = invObject||null;
    this.textOnPickup = textOnPickup||null;
}

var weakWall = new resource(false,false,"bricks",true);
var wall = new resource(false,false,"bricks",false);
var floor = new resource(true, false, "transparent", false);
var backpack = new resource(false,true,"chest",false);
var key = new resource(false, true, "chest", false,keyInv,"Wow, I found a key");
var key2 = new resource(false, true, "chest", false,keyInv);
var stick = new resource(false, true, "chest", false, stickInv);
var string = new resource(false, true, "chest", false, stringInv);