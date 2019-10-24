/**
 * serverHttp.js
 * http2Performance
 *
 * Created by Sıdıka Çay on 23.10.2019
 * Copyright © 2019 Sıdıka Çay. All rights reserved.
 */

"use strict";

const https = require("https");
const fs = require("fs");
const mime = require("mime");

const serverOptions = {
    key: fs.readFileSync("YOUR KEY"),
    cert: fs.readFileSync('YOUR CERTIFICATE')
};

const requestHandler = (req, res) => {
    const fileName = req.url === "/" ? "/httpPage.html" : req.url;
    fs.readFile("." + fileName, (err, data) => {
        if (err) {
            const code = err.code === "ENOENT" ? 404 : 500;

            res.writeHead(code);
            res.end("Error occurred while reading file", fileName);
            return;
        }
        res.writeHead(200, {"Content-Type": mime.getType(fileName)});
        res.end(data);
    });
};

const server = https.createServer(serverOptions, requestHandler);

server.on('error', (err) => console.error(err));

server.listen(3001, () => {
    console.log("Server listening....")
});