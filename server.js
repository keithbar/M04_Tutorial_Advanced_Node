const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
    console.log(request.url, request.method);

    //set header content type
    response.setHeader("Content-Type", "text/html");
    
    let path = "./views/";
    switch(request.url){
        case "/":
            path += "index.html";
            response.statusCode = 200;
            break;
        case "/about":
            path += "about.html";
            response.statusCode = 200;
            break;
        case "/about-me":
            response.statusCode = 301;
            response.setHeader("Location", "/about");
            response.end();
            break;
        default:
            path += "404.html";
            response.statusCode = 404;
            break;
    }

    //send html file
    fs.readFile(path, (err, data) => {
        if (err){
            console.log(err);
            response.end();
        }
        else{
            response.end(data);
        }
    });
});

server.listen(3000, "localhost", () => {
    console.log("listening for requests on port 3000");
});