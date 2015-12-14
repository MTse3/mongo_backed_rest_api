require('angular/angular');
require('angular-route')
var angular = window.angular;

var mlbplayer = angular.module('mlbplayer', ['ngRoute']);
require('./filters/filters')(mlbplayer);
require('./services/services')(mlbplayer);
require('./controllers/controllers')(mlbplayer);
require('./directives/directives')(mlbplayer);

require('./players/players')(mlbplayer);

mlbplayer.config(['$routeProvider', function($route) {
  $route
    .when('/player', {
      templateUrl: '/templates/players_view.html',
      controller: 'PlayersController'
    })
    .otherwise({
      redirectTo: '/player'
    })
}]);
