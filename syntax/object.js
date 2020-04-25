var members = ["joon", "hoyong", "yongkyu"];
var i = 0;
while (i < members.length) {
  console.log("array:::" + members[i]);
  i++;
}

var roles = {
  programmer: "joon",
  tactics: "hoyong",
  iosDeveloper: "yongkyu",
};

//이 두가지 방법으로 객체에서 값을 얻을 수 있다.
//console.log (roles.iosDeveloper);
//console.log(roles["iosDeveloper"]);

for (var name in roles) {
  console.log("object:::" + name + "  " + "value:::" + roles[name]);
}
