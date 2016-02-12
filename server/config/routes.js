module.exports = function (app) {

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/home.html', function(req, res) {
    res.render('home');
  });

  app.get('/post.html', function(req, res) {
    res.render('post');
  });
};