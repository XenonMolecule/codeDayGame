// JavaScript File
var rooms = [];
function room(block0,block1,block2,block3,block4,block5,block6,block7,block8,block9,block10,block11,block12,block13,block14,block15,block16,block17,block18,block19,block20,block21,block22,block23,block24,block25,block26,block27,block28,block29,block30,block31,block32,block33,block34,block35,block36,block37,block38,block39,block40,block41,block42,block43,block44,block45,block46,block47,block48,coordX,coordY,playerSpawn,leftKey,rightKey,upKey,downKey){
    this.block0 = block0;
    this.block1 = block1;
    this.block2 = block2;
    this.block3 = block3;
    this.block4 = block4;
    this.block5 = block5;
    this.block6 = block6;
    this.block7 = block7;
    this.block8 = block8;
    this.block9 = block9;
    this.block10= block10;
    this.block11= block11;
    this.block12= block12;
    this.block13= block13;
    this.block14= block14;
    this.block15= block15;
    this.block16= block16;
    this.block17= block17;
    this.block18= block18;
    this.block19= block19;
    this.block20= block20;
    this.block21= block21;
    this.block22= block22;
    this.block23= block23;
    this.block24= block24;
    this.block25= block25;
    this.block26= block26;
    this.block27= block27;
    this.block28= block28;
    this.block29= block29;
    this.block30= block30;
    this.block31= block31;
    this.block32= block32;
    this.block33= block33;
    this.block34= block34;
    this.block35= block35;
    this.block36= block36;
    this.block37= block37;
    this.block38 = block38;
    this.block39 = block39;
    this.block40 = block40;
    this.block41 = block41;
    this.block42 = block42;
    this.block43 = block43;
    this.block44 = block44;
    this.block45 = block45;
    this.block46 = block46;
    this.block47 = block47;
    this.block48 = block48;
    
    this.coordX = coordX;
    this.coordY = coordY;
    this.playerSpawn = playerSpawn;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.upKey = upKey;
    this.downKey = downKey;
    rooms.push(this);
}

var firstRoom = new room(wall,wall,wall,floor,wall,wall,wall,wall,floor,floor,floor,floor,floor,wall,wall,floor,floor,key,floor,floor,wall,wall,floor,floor,floor,floor,floor,wall,wall,floor,wall,wall,wall,floor,wall,wall,floor,floor,floor,floor,floor,wall,wall,floor,floor,floor,floor,floor,wall,4,8,45,false,false,false,false);
var secondRoom = new room(wall,wall,wall,floor,wall,wall,wall,wall,backpack,floor,floor,floor,floor,wall,wall,floor,floor,floor,floor,floor,wall,floor,floor,floor,floor, floor, floor, floor,wall,floor,floor,floor, floor, floor,wall,wall,floor,key2,floor,floor,floor,wall,wall,wall,wall,floor,wall,wall,wall,4,7,45,true,true,false,false);
var stickRoom = new room(wall,wall,wall,wall,wall,wall,wall,wall,floor,floor,floor,floor,floor,wall,wall,floor,floor,floor,floor,floor,wall,floor,floor,floor,stick,floor,floor,wall,wall,floor,floor,floor,floor,floor,wall,wall,floor,floor,floor,floor,floor,wall,wall,wall,wall,wall,wall,wall,wall,5,7,21,false,false,false,false);
var stringRoom = new room(wall,wall,wall,wall,wall,wall,wall,wall,floor,floor,floor,floor,floor,wall,wall,floor,floor,floor,floor,floor,wall,wall,floor,floor,string,floor,floor,floor,wall,floor,floor,floor,floor,floor,wall,wall,floor,floor,floor,floor,floor,wall,wall,wall,wall,wall,wall,wall,wall,3,7,27,false,false,false,false);
var leverRoom = new room(wall,wall,wall,floor,wall,wall,wall,wall,floor,floor,floor,floor,floor,wall,wall,floor,floor,floor,floor,floor,wall,wall,wall,wall,wall,wall,wall,wall,wall,floor,floor,floor,floor,floor,wall,wall,floor,floor,floor,floor,floor,wall,wall,wall,wall,floor,wall,wall,wall,4,6,45,false,false,false,false);

