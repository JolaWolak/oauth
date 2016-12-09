'use strict'; 

var app = require('express')();
var path = require('path');
var User = require('../api/users/user.model');
var session = require('express-session');

app.use(require('./logging.middleware'));
app.use(require('./request-state.middleware'));
app.use(require('./statics.middleware'));
app.use(session({
	secret: 'Grace Hopper rules'
}));


// counter middleware
app.use('/api', function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  console.log('counter', ++req.session.counter);
  next();
});

// session logging middleware
app.use(function (req, res, next) {
  console.log('session', req.session);
  next();
});

app.post('/login', function (req, res, next) {
  User.findOne({
    where: req.body
  })
  .then(function (user) {
    if (!user) {
      res.sendStatus(401);
    } else {
      req.session.userId = user.id;
      res.json(user);
    }
  })
  .catch(next);
});

app.post('/signup', function(req,res,next){
	User.create(req.body)
	.then(function(user){
		req.session.userId = user.id;
		res.json(user)
	})
	.catch(next)
})

app.post('/logout', function(req, res, next){
	if(req.session) req.session.destroy();
	res.sendStatus(200);

})

app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'browser', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
