var express = require('express');
var bodyParser = require('body-parser');
var Player = require(__dirname + '/../models/player')
var handleError = require(__dirname + '/../lib/handleServerError');
var eatAuth = require(__dirname + '/../lib/eat_auth');

var playerRouter = module.exports = exports = express.Router();

playerRouter.use(bodyParser.json());
playerRouter.get('/player', eatAuth, function(req, res, next) {
  Player.find().count(function(err, count) {
    if (err) return handleError(err, res);

    res.send('The total number of stored players is: ' + count);
    next();
  });
});

//get request to see the total number of players stored in the database
playerRouter.get('/player', function(req, res, next) {
  Player.find().count(function(err, count) {
    if (err) return handleError(err, res);

    res.send('The total number of stored players is: ' + count);
    next();
  });
});

//get request to get players by team name(team name must start with upper case)
playerRouter.get('/player/:team', bodyParser.json(), function(req, res) {
  Player.find({team: req.params.team.toString() }, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

playerRouter.post('/player', bodyParser.json(), eatAuth, function(req, res) {
  var newPlayer = new Player(req.body);
  newPlayer.adminId = req.user._id;
  newPlayer.admin = req.user.username;
  newPlayer.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

//put requests require a player's id
playerRouter.put('/player/:id', bodyParser.json(), eatAuth, function(req, res) {
  var playerData = req.body;
  delete playerData._id;
  Player.update({_id: req.params.id.toString()}, playerData, function(err, data) {
    if (err) handleError(err, res);

    res.json({msg: 'update success!'});
  });
});

//delete requests require a player's id
playerRouter.delete('/player/:id', function(req, res) {
  Player.remove({_id: req.params.id}, function(err) {
    if(err) return handleError(err, res);

    res.json({msg: 'delete success!'})
  })
})
