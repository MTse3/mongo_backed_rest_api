var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handleServerError');
var basicHttp = require(__dirname + '/../lib/http_authentication');
var User = require(__dirname + '/../models/user');

var authRouter = module.exports = exports = express.Router();
authRouter.post('/signup', jsonParser, function(req, res) {
  var user = new User();
  user.auth.basic.username = req.body.username;
  user.username = req.body.username;
  user.hashPassword(req.body.password);

  user.save(function(err, data) {
    if (err) return handleError(err, res);
    //profit
    res.json({msg: 'user created'});
  });
});

authRouter.get('/signin', basicHttp, function(req, res) {
  if (!(req.auth.username && req.auth.password)) {
    console.log('no basic auth provided');
    return res.status(401).json({msg: 'NOPE! Not authenticated!'});
  }

  User.findOne({'auth.basic.username': req.auth.username}, function(err, user) {
    if (err) {
      console.log('no basic auth provided');
      return res.status(401).json({msg: 'NOPE! Not authenticated!'});
    }

    if (!user) {
      console.log('no basic auth provided');
      return res.status(401).json({msg: 'NOPE! Not authenticated!'});
    }

    if (!user.checkPassword(req.auth.password)) {
     console.log('no basic auth provided');
     return res.status(401).json({msg: 'NOPE! Not authenticated!'});
    }

    res.json({msg: 'You are who we thought you were!!!!'});
  });
});