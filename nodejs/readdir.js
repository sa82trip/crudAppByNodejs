var filefolder = "./data";
var fs = require("fs");

fs.readdir(filefolder, function (error, fileList) {
  console.log(fileList);
  console.log(error);
});
