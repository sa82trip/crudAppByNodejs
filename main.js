var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
var render = require("./lib/renderer.js");
var path = require("path");
var sanitizeHTML = require("sanitize-html");

//서버 만드는 부분인듯
var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var title = queryData.id;

  //pathname이라는 개념
  //    /?id=HTML 이렇게 하면 path인가..?
  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("./data", (error, filelist) => {
        var title = "Welcome";
        var description = "Welcome page";
        var list = render.listtag(filelist);
        var renderedPage = render.page(title, description, list, false);
        response.writeHead(200);
        response.end(renderedPage);
      });
    } else {
      fs.readdir("./data", (error, filelist) => {
        var list = render.listtag(filelist);
        var filteredQueryData = path.parse(queryData.id).base;
        fs.readFile(`./data/${filteredQueryData}`, "utf8", function (
          err,
          description
        ) {
          //file list 구현 해야함
          var renderedPage = render.page(title, description, list, true);
          response.writeHead(200);
          response.end(renderedPage);
        });
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("./data", (error, filelist) => {
      var title = "Web-create";
      var list = render.listtag(filelist);
      var description = `
      <form action="http://localhost:8888/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
      `;
      var renderedPage = render.page(title, description, list, false);
      response.writeHead(200);
      response.end(renderedPage);
    });
    //post로 클라이언트부터 받은 정보를 처리하는 부분
  } else if (pathname === "/update") {
    fs.readdir("./data", (error, filelist) => {
      var filteredQueryData = path.parse(queryData.id).base;
      fs.readFile(`data/${filteredQueryData}`, "utf8", function (
        err,
        description
      ) {
        var title = queryData.id;
        var list = render.listtag(filelist);
        var description = `
        <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `;
        var renderedPage = render.page(title, description, list, false);
        console.log(renderedPage);
        response.writeHead(200);
        response.end(renderedPage);
      });
    });
  } else if (pathname === "/update_process") {
    var body = "";
    request.on("data", function (data) {
      body += data;
    });
    request.on("end", function () {
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, function () {});
      fs.writeFile(`data/${title}`, description, function (error) {
        console.log(description);
        if (error) {
          console.log(error);
        }
        response.writeHead(302, {
          Location: `/?id=${title}`,
        });
        response.end(`success!!`);
      });
    });
  } else if (pathname === "/create_process") {
    var body = "";
    request.on("data", function (data) {
      body += data;
    });
    request.on("end", function () {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, function (error) {
        if (error) {
          console.log(error);
        }
        response.writeHead(302, {
          Location: `/?id=${title}`,
        });
        response.end(`success!!`);
      });
    });
  } else if (pathname === "/delete_process") {
    var body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      var post = qs.parse(body);
      var id = post.id;
      var filteredQueryData = path.parse(queryData.id).base;

      fs.unlink(`data/${filteredQueryData}`, (error) => {
        console.log(`${ifilteredQueryDatad}file is deleted!!`);
        response.writeHead(302, {
          Location: `/`,
        });
        response.end();
      });
    });
  } else {
    response.writeHead(404);
    response.end("not found");
  }
});

//서버 포트 정하는 부분
app.listen(8888);
