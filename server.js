var express = require('express');

var env = 'development';

var app = express();
var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/routes')(app);

app.listen(config.port);
console.log("Server running on port: " + config.port);
