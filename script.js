const http = require('http');




// 1  Create a server that responds to several paths:
// html should return any HTML code.
// api should return an object such as animals, users, etc.
// time should return the current time in ISO string format.
// Any other request should return "Not Found".



const server = http.createServer((req, res) => {
  if (req.url === "/html") {
    res.setHeader("content-type", "text/html");
    res.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      </head>
      <body>
      <h1>HUGO</h1>
      </body>
      </html>
    `);
    return res.end();
  } else if (req.url === "/api") {
    res.setHeader("content-type", "application/json");
    const data = {
      name: "Hugo",
      breed: "Pitbull",
      age: 3
    };
    return res.end(JSON.stringify(data));
  } else if (req.url === "/time") {
    res.setHeader("content-type", "application/json");
    const timeData = { time: new Date().toISOString() };
    return res.end(JSON.stringify(timeData));
  } else {
    res.setHeader("content-type", "application/json");
    return res.end(JSON.stringify({ error: "404 not found" }));
  }
});

server.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});

