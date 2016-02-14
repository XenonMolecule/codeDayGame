// JavaScript File (resources and damk memes arsenal)
function resource(passable, grabbable, texture, hackable){
    this.passable = passable;
    this.grabbable = grabbable;
    this.texture = texture;
    this.hackable = hackable;
}

var weakWall = new resource(false,false,"bricks",true);
var wall = new resource(false,false,"bricks",false);
var floor = new resource(true, false, "transparent", false);
var backpack = new resource(false,true,"chest",false);
var key = new resource(false, true, "chest", false);
var stick = new resource(false, true, "chest", false);
var string = new resource(false, true, "chest", false);