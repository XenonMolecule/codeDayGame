//objects
var obj={
     s: 54,
     t: 64,
     y:9
};
//for loops
console.log(obj.s);
console.log(obj["t"]);
obj["y"];
var array = ["a","b","c","d","e"];

for(var i = 0; i<array.length;i++){
     array[i]="c";
}
array[0]="c";
array[1]="c"
var time = 64;
for(var property in obj){
     if(time===obj[property]){
          console.log(property);
     }
}
