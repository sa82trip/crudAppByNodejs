var fs = require("fs");
fs.readFile("./sample.txt", "UTF8", function (error, data) {
  console.log(data);
});
