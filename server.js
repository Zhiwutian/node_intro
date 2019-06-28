// Build Static Webserver Here
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer(function(request, response){
    let filePath = '.' + request.url;

    if(filePath === './'){
        filePath = './index.html';
    }

    const fileExt = path.extname(filePath);

    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.ico': 'image/x-icon',
        '.jpg': 'image/jpg'
    }

    const contentType = mimeTypes[fileExt];

    fs.readFile(filePath, function(error, content){
        if(error || !contentType){
            console.log('FileLoad Error: ', error);

            if(error.code === 'ENOENT'){
                return fs.readFile('./404.html', function(error, content){
                    response.writeHead(404, {'Content-Type': 'text/html'})
                    response.end(content, 'utf-8');
                });
            }
            response.writeHead(500);
            return response.end('Internal Server Error');
        }
        response.writeHead(200, {'Content-Type': contentType});
        response.end(content, 'utf-8');
    });
});
server.listen(3001);
