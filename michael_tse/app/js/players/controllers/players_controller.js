var angular = window.angular;
module.exports = function(app) {
  app.controller('PlayersController', ['$scope', '$http', 'cfResource', function($scope, $http, cfResource) {
    $scope.players = [];
    $scope.errors = [];
    $scope.backupPlayer = {};
    var defaults = {position: '-', team: 'free_agent'};
    $scope.newPlayer = angular.copy($scope.defaults);
    var playerResource = cfResource('player');

    // displays all players in database
    $scope.getAll = function() {
      playerResource.getAll(function (err, data) {
        if (err) return err;

        $scope.players = data;
      })
    };

    //adds new player to database
    $scope.create = function(player) {
      playerResource.create(player, function (err, data) {
        if (err) return err;

        $scope.players.push(data);
        $scope.newPlayer = angular.copy(defaults);
      });
    };

    //updates existing player in database
    $scope.update = function(player) {
      player.editing = false;
      playerResource.update(player, function (err, data) {
        if (err) return err;
      });
    };

    //removes existing player from database
    $scope.remove = function(player) {
      $scope.players.splice($scope.players.indexOf(player), 1);
      playerResource.remove(player, function (err, data) {
        if (err) return err;

        console.log('player has been retired');
      });
    };

    //stores database values for specific player
    $scope.cancelChanges = function(player) {
      player.editing = true;
      $scope.backupPlayer[player._id] = {
        firstName: player.firstName,
        lastName: player.lastName,
        position: player.position,
        number: player.number,
        team: player.team,
        bat: player.bat,
        throwing: player.throwing
      };
    };

    //restores values to original
    $scope.revertBack = function(player) {
      var backup = $scope.backupPlayer[player._id];
      player.firstName = backup.firstName,
      player.lastName= backup.lastName,
      player.position= backup.position,
      player.number= backup.number,
      player.team= backup.team,
      player.bat= backup.bat,
      player.throwing= backup.throwing
    };

  }]);
};
