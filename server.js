// Build Static Webserver Here
const express = require('express');
const path = require('path');
const server = express();

server.use(express.static(path.resolve(__dirname)));

server.listen(3001, () => {
    console.log('Server Running at localhost:3001');
}).on('error', (error) =>{
    console.log('Error listening on PORT:3001. Do you already have a server running on 3001?')
});
