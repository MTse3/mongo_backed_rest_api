var mongoose = require('mongoose');
var express = require('express');
var app = express();
var playerRouter = require(__dirname + '/routes/player_routes');
var authRouter = require(__dirname + '/routes/auth_routes');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/mlb_player')

app.use('/api', playerRouter);
app.use('/api', authRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server running');
})
