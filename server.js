const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
let app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
app.get(/.*/, function(req, res){
    res.dendfile(__dirname + "dist/index.html");
})
const port = process.env.PORT || 80;
app.listen(port);
console.log("server started..");
