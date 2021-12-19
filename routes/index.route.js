var auth = require("./auth");
var abonnement = require("./abonnement");
var song = require("./song");

module.exports = app => {

  app.get('/', function (req, res) {
    res.render('index', { title: 'index.html', message: 'index.html' });
  });

  //all route declared here
  app.use('/api', auth);

  app.use('/api', abonnement);

  app.use('/api', song);


  //si le route n'existe plus
  // app.use(function(req, res, next) {
  //   if (!req.route) {res.render("pageNotFound.html");}
  //   next();
  // });

};