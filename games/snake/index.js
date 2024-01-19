'use strict';

const express = require('express');
const HTTP_SERVER_PORT = process.env.PORT ? process.env.PORT : 9500;

// Basics
let app = express();
let publicFolderPath = __dirname + '/lib';

// Configure and launch the server
app.use('/index.html', express.static(__dirname + '/index.html'));
app.use('/node_modules/rxjs', express.static(__dirname + '/node_modules/rxjs'));
app.use('/lib', express.static(publicFolderPath));

app.get('*', function(req, res) {
    res.redirect('/index.html');
});

app.listen(HTTP_SERVER_PORT, function() {
    console.info('HTTP server run on port', HTTP_SERVER_PORT);
});

// Listen for global exceptions
process.once('uncaughtException', function (error) {
    console.error('Uncaught exception:', error);
    console.error(error.stack);
});

process.on('SIGINT', function () {
    console.info('server stopped.');
    process.exit();
});

process.on('SIGTERM', function () {
    console.info('server stopped.');
    process.exit();
});
