require('angular/angular');
var angular = window.angular;

var playerApp = angular.module('playerApp', []);
require('./controllers/controllers')(playerApp)
require('./players/players')(playerApp);


