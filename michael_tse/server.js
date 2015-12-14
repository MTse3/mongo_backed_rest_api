var mongoose = require('mongoose');
var express = require('express');
var app = express();
var playerRouter = require(__dirname + '/routes/player_routes');
var fs = require('fs');
var app = require('express')();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/mlb_player')

app.use(express.static(__dirname + '/build'));


app.use('/api', playerRouter);

app.use(function(req, res) {
  res.status(404).send('could not find file')
});

app.listen(process.env.PORT || 3000, function() {
  console.log('server running');
})
