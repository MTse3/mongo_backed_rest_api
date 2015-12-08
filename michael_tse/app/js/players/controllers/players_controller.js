var angular = window.angular;
module.exports = function(app) {
  app.controller('PlayersController', ['$scope', '$http', function($scope, $http) {
    $scope.players = [];
    $scope.errors = [];
    $scope.backupPlayer = {};
    var defaults = {position: '-', team: 'free_agent'};
    $scope.newPlayer = Object.create(defaults);

    // $scope.newPlayer = angular.copy($scope.defaults);
    // var playerResource = cfResource('players');

    // using resource
    // $scope.getAll = function() {
    //   playerResource.getAll(function (err, data) {
    //     if (err) return err;

    //     $scope.players = res.data;
    //   })
    // };

    $scope.getAll = function() {
      $http.get('/api/player')
        .then(function(res) {
        $scope.players = res.data;
        }, function(err) {
          console.log(err.data);
        });
    };

    //using resource
    // $scope.create = function(player) {
    //   playerResource.create(player, function (err, data) {
    //     if (err) return err;
    //       $scope.players.push(res.data);
    //       $scope.newPlayer = angular.copy(defaults);

    //   });
    // };

    $scope.create = function(player) {
      $http.post('/api/player', player)
        .then(function(res) {
          $scope.players.push(res.data);
          $scope.newPlayer = angular.copy(defaults);
        }, function(err) {
          console.log(err.data)
        });
    };



    // //sets original
    // $scope.setBackup = function(player) {
    //   player.editing = true;
    //   $scope.original = true;
    //   $http.get('/api/player/' + player._id, player)
    //     .then(function(res) {
    //       console.log(res.data);
    //       $scope.players = res.data;

    //     }, function(err) {
    //       $scope.errors.push('could not find player: ' + player.name + 'and cancel');
    //       console.log(err.data);
    //     });
    // };

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
