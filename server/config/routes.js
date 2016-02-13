module.exports = function (app) {

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/about', function(req, res) {
    res.render('about');
  });

  app.get('/post', function(req, res) {
    res.render('post');
  });

  app.get('/blog', function(req, res) {
    res.render('blog');
  });

  app.get('/contact', function(req, res) {
    res.render('contact');
  });

  app.get('/shortcodes', function(req, res) {
    res.render('shortcodes');
  });

  app.get('/templates', function(req, res) {
    res.render('templates');
  });

  app.get('*', function (req, res) {
    res.render('error');
  });
};