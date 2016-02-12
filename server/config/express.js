var express = require('express');

module.exports = function (app, config) {

  // Jade settings
  app.set('view engine', 'jade');
  app.set('views', config.rootPath + '/server/views');

  // Directory for static files, which are accessible on the server
  app.use(express.static(config.rootPath + '/public'));
};