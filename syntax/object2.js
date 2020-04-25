// array, object

var f = function f1() {
  console.log(1 + 1);
  console.log(1 + 2);
};
console.log(f);
f();

//if(true){console.log(1)}
// if문과 while문은 변수에 대입 할 수 없다 그래서 값이 아니라는 것을 유추할 수있다.

//이렇게 배열에 넣어서 사용도 가능
var a = [f];
a[0]();

//이렇게 객체에 넣어서 사용 가능
var o = {
  func: f,
};

o.func();
