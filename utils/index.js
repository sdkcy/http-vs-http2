/**
 * index.js
 * http2Performance
 *
 * Created by Sıdıka Çay on 24.10.2019
 * Copyright © 2019 Sıdıka Çay. All rights reserved.
 */

"use strict";

const fs = require("fs");
const mime = require("mime");

function respondFD(stream, fileName) {
    const fd = fs.openSync(fileName, "r");
    const stat = fs.fstatSync(fd);
    const headers = {
        "content-length": stat.size,
        "last-modified": stat.mtime.toUTCString(),
        "content-type": mime.getType(fileName)
    };
    stream.respondWithFD(fd, headers);
    stream.on("close", () => {
        fs.closeSync(fd)
    });
    stream.end();
}

function pushFile(stream, path, fileName) {
    stream.pushStream({":path": path}, (err, pushStream) => {
        if (err) {
            throw err;
        }
        respondFD(pushStream, fileName);
    });
}

module.exports = {pushFile, respondFD}