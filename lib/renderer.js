var sanitizeHTML = require("sanitize-html");

module.exports = {
  //페이지를 rendering하는 함수
  page: function (title, description, list, isPage) {
    var control = "";
    var sanitizedTitle = sanitizeHTML(title);
    var sanitizedDescription = sanitizeHTML(description);
    var tempString = `
      <a href="/create">create</a>
      <a href="/update?id=${sanitizedTitle}">update</a> 
      <form action="delete_process" method="post">
        <input type="hidden" name ="id" value="${sanitizedTitle}"> 
        <input type="submit" value="delete"></input>
      </form>
      `;
    if (isPage) {
      control = tempString;
    } else {
      control = "";
    }
    var document = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${sanitizedTitle}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ul>
          ${list}
        </ul>
       ${control}
        <h2>${sanitizedTitle}</h2>
        <p>
          ${sanitizedDescription}    
        </p>
      </body>
      </html>
      `;

    return document;
  },
  //filelist를 렌더링 하는 함수
  listtag: function (filelist) {
    var list = "<ul>";
    var i = 0;
    while (i < filelist.length) {
      list = list + `<li><a href="?id=${filelist[i]}">${filelist[i]}</a></li>`;
      i++;
    }
    list = list + "</ul>";
    return list;
  },
};
