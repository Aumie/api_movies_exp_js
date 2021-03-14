const express = require('express');
const app = express();
const { logger } = require('./startup/logging');
const path = require('path');
const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt'),
    pfx: fs.readFileSync('server.pfx'),
    passphrase: '1234'
}

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
//app.listen(port, () => logger.info(`Listening on port ${port}...`));

https.createServer(options, app).listen(port, () => logger.info(`Listening on port ${port}...`));

app.get('/', async (req, res) => {
    res.writeHead(200);
    //res.send("Hi to " + req.device.type.toUpperCase() + " user.");
    res.sendFile(path.join(__dirname + '/home.html'));
});