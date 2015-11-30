var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
process.env.MONGOLAB_URI = 'mongodb://localhost/player_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var User = require(__dirname + '/../models/user');
var eatauth = require(__dirname + '/../lib/eat_auth');
var httpAuth = require(__dirname + '/../lib/http_authentication');

var Player = require(__dirname + '/../models/player');

describe('auth routes', function() {
  after(function (done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });



})

