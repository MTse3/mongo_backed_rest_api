var mongoose = require('mongoose');
var express = require('express');
var app = express();
var playerRouter = require(__dirname + '/routes/player_routes');

var authRouter = require(__dirname + '/routes/auth_routes');

var fs = require('fs');
var app = require('express')();


mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/mlb_player')

app.get('/:filename', function(req, res, next) {
  fs.stat(__dirname + '/build/' + req.params.filename, function(err, stats) {
    if (err) {
      console.log(err);
      return next();
    }

    if (!stats.isFile()) return next();

    var file = fs.createReadStream(__dirname + '/build/' + req.params.filename);
    file.pipe(res);
  });
});

app.use('/api', playerRouter);
app.use('/api', authRouter);

app.use(function(req, res) {
  res.status(404).send('could not find file')
});

app.listen(process.env.PORT || 3000, function() {
  console.log('server running');
})
