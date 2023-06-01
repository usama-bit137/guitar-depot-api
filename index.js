const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate =  require("./modules/replaceTemplate");

const guitar = fs.readFileSync(`${__dirname}/devdata/data.json`, "utf-8");
const dataObj = JSON.parse(guitar);
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempStack = fs.readFileSync(`${__dirname}/templates/template-stack.html`, "utf-8");
const tempGuitar = fs.readFileSync(`${__dirname}/templates/template-guitar.html`, "utf-8")

const server = http.createServer((req, res) => {

    const { query, pathname } = url.parse(req.url, true);
    if (pathname === "/" || pathname === "/overview"){

        const guitarHTML = dataObj.map(item => replaceTemplate(tempStack, item)).join("");
        const output = tempOverview.replace("{%GUITAR_CARDS%}", guitarHTML); 
        res.writeHead(200, {
            "Content-type": "text/html",
            "my-own-header": "hello-world"
        });
        res.end(output);

    } else if (pathname === "/guitar") {

        const guitar = dataObj[query.id];
        const output = replaceTemplate(tempGuitar, guitar);
        res.writeHead(200, {"Content-type": "text/html"});
        res.end(output);
    
    } else if (pathname === "/api") {
    
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(guitar);
    
    } else {
    
        res.writeHead(404, {
            "Content-Type": "text/html",
            "header": "API",
        })
        res.end("<h1>404 error. This page could not be found!</h1>")
          
    }
})

server.listen(8000, "127.0.0.1", () => {
    console.log("Listening to requests on port 8000");
})