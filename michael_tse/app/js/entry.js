require('angular/angular');//don't save into variable! it won't work
var angular = window.angular;

//make angular app
var playerApp = angular.module('mlbplayer', []);
//want $scope as 1st parameter of function. how to do dependency injection
playerApp.controller('GreetingController', ['$scope', function($scope) {
  $scope.greeting = 'Go Mariners';

  $scope.alertGreeting = function() {
    alert($scope.greeting);
  };
}]);
