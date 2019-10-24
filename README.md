## @sdk_cy/http-vs-http2

It is an example for testing HTTP/2 performance

## Installation

```bash
npm install
```


## Usage
Firstly you need to add certificate files to the project and write their paths to `serverOptions` in `serverHttp.js` and `serverHttp2.js` files.
```javascript
const serverOptions = {
    key: fs.readFileSync("YOUR KEY"),
    cert: fs.readFileSync('YOUR CERTIFICATE')
};
```
For testing HTTP:
```bash
node serverHttp.js
```

For testing HTTP/2:
```bash
node serverHttp2.js
```
And inspect network activity from developer tool.


## Author
**Sıdıka Türkan Akkoyun Çay** - [sidikacay@yahoo.com](mailto:sidikacay@yahoo.com)