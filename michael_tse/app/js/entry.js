require('angular/angular');
var angular = window.angular;

var playerApp = angular.module('mlbplayer', []);
playerApp.controller('GreetingController', ['$scope', function($scope) {
  $scope.greeting = 'Go Mariners!';

  $scope.alertGreeting = function() {
    alert($scope.greeting);
  };
}]);
