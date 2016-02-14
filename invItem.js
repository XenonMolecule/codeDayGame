// JavaScript File
function invObject(texture,crafting){
    this.texture=texture;
    this.crafting =crafting;
}

var keyInv = new invObject("resources/key.png",[[]]);
var key2Inv = new invObject("resources/key2.png",[[]]);
var stickInv = new invObject("resources/stick.png",[["stringInv","fishingRodInv"]]);
var stringInv = new invObject("resources/string.png",[["stickInv","fishingRodInv"]]);
var fishingRodInv = new invObject("resources/_________.png",[[]]);
