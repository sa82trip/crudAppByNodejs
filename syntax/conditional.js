//nodejs는 3번째 방부터 입력값을 저장
// node syntax/conditionla.js joon
//이렇게 치면 joon이 나온다
var args = process.argv;
console.log(args[2]);
console.log("A");
console.log("B");
if (args[2] === "1") {
  console.log("the input was 1");
} else {
  console.log("the input was not 1");
}
console.log("D");
