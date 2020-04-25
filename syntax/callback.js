/*
function a(){
  console.log('A');
}
*/
var a = function () {
  console.log("A");
};

function slowfunc(callback) {
  //callback의 개념을 알기 위해
  callback();
  //stack의 개념을 알기 위해
  console.log("slowfunc");
}

slowfunc(a);
