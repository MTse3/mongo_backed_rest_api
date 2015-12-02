require('angular/angular');
var angular = window.angular;

var mlbplayer = angular.module('mlbplayer', []);
require('./controllers/controllers')(mlbplayer);
require('./players/players')(mlbplayer);
