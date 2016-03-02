// JavaScript File
var inventoryItems = [];
function invObject(texture,crafting, name, onCraftText){
    this.texture=texture;
    this.crafting =crafting;
    this.name = name;
    this.onCraftText = onCraftText||null;
    inventoryItems.push(this);
}

var keyInv = new invObject("resources/key.png",[[]],"key");
var key2Inv = new invObject("resources/key2.png",[[]],"key2");
var stickInv = new invObject("resources/stick.png",[["stringInv","fishingRodInv"]],"stick");
var stringInv = new invObject("resources/string.png",[["stickInv","fishingRodInv"]],"string");
var fishingRodInv = new invObject("resources/fishingrod.png",[[]],"fishingRod", "With this rod of the fishing, I will have food for dayzzz");
