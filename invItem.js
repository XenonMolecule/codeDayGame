// JavaScript File
var inventoryItems = [];
function invObject(texture,crafting, name, craftingTexture, onCraftText){
    this.texture=texture;
    this.crafting =crafting;
    this.name = name;
    this.onCraftText = onCraftText||null;
    this.craftingTexture = craftingTexture||null;
    inventoryItems.push(this);
}

var keyInv = new invObject("resources/key.png",[[]],"key","key");
var key2Inv = new invObject("resources/key2.png",[[]],"key2","key2");
var stickInv = new invObject("resources/stick.png",[["stringInv","fishingRodInv"]],"stick","stick");
var stringInv = new invObject("resources/string.png",[["stickInv","fishingRodInv"]],"string","string");
var fishingRodInv = new invObject("resources/fishingrod.png",[[]],"fishingRod","fishingRod", "With this rod of the fishing, I will have food for dayzzz");
