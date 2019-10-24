/**
 * serverHttp2.js
 * http2Performance
 *
 * Created by Sıdıka Çay on 23.10.2019
 * Copyright © 2019 Sıdıka Çay. All rights reserved.
 */

"use strict";

const http2 = require("http2");
const fs = require("fs");
const {pushFile, respondFD} = require("./utils");

const serverOptions = {
    key: fs.readFileSync("YOUR KEY"),
    cert: fs.readFileSync('YOUR CERTIFICATE')
};

const requestHandler = (req, res) => {
    if (req.url === "/") {
        //Read and push style.css
        pushFile(res.stream, "/style.css", "style.css");

        //Read and push images
        const imageFiles = fs.readdirSync(__dirname + "/images");
        for (let i = 0, length = imageFiles.length; i < length; i++) {
            const fileName = __dirname + "/images/" + imageFiles[i];
            const path = "/images/" + imageFiles[i];
            pushFile(res.stream, path, fileName);
        }

        //Send html page
        respondFD(res.stream, "http2Page.html");
    }
};

const server = http2.createSecureServer(serverOptions, requestHandler);

server.on('error', (err) => console.error(err));

server.listen(3000, () => {
    console.log("Server listening....")
});
