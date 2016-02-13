// JavaScript File
function resource(passable, grabbable, texture, hackable){
    this.passable = passable;
    this.grabbable = grabbable;
    this.texture = texture;
    this.hackable = hackable;
}

var weakWall = new resource(false,false,"",true);
var wall = new resource(false,false,"",false);
var floor = new resource(true, false, "", false);
var backpack = new resource(true,true,"",false);