var angular = window.angular;
module.exports = function(app) {
  app.controller('PlayersController', ['$scope', '$http', 'cfResource', function($scope, $http, cfResource) {
    $scope.players = [];
    $scope.errors = [];
    $scope.backupPlayer = {};
    var defaults = {position: '-', team: 'free_agent'};
    $scope.newPlayer = angular.copy($scope.defaults);
    var playerResource = cfResource('player');

    // using services
    $scope.getAll = function() {
      playerResource.getAll(function (err, data) {
        if (err) return err;

        $scope.players = data;
      })
    };

    //using services
    $scope.create = function(player) {
      playerResource.create(player, function (err, data) {
        if (err) return err;
          $scope.players.push(data);
          $scope.newPlayer = angular.copy(defaults);

      });
    };

    $scope.update = function(player) {
      player.editing = false;
      $http.put('/api/player/' + player._id, player)
        .then(function(res) {
          console.log('this player wants a change');
        }, function(err) {
          $scope.errors.push('could not get player: ' + player.name + ' to player trial');
          console.log(err.data);
        });
    };

    $scope.remove = function(player) {
      $scope.players.splice($scope.players.indexOf(player), 1);
      $http.delete('/api/player/' + player._id)
        .then(function(res) {
          console.log('player has been retired');
        }, function(err) {
          console.log(err.data);
          $scope.errors.push('could not retire: ' + player.name);
          $scope.getAll();
        });
    };

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

    // restores values to original
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
