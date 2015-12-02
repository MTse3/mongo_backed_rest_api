module.exports = function(app) {
  app.controller('PlayersController', ['$scope', '$http', function($scope, $http) {
    $scope.players = [];
    $scope.errors = [];
    var defaults = {position: '-', team: 'free_agent'};
    $scope.newPlayer = Object.create(defaults);

    $scope.getAll = function() {
      $http.get('/api/player')
        .then(function(res) {
          $scope.players = res.data;
        }, function(err) {
          console.log(err.data);
        });
    };

    $scope.create = function(player) {
      $http.post('/api/player', player)
        .then(function(res) {
          $scope.players.push(res.data);
          $scope.newPlayer = Object.create(defaults);
        }, function(err) {
          console.log(err.data)
        });
    };

    $scope.update = function(player) {
      player.editing = false;
      $http.put('/api/player/' + player._id, player)
        .then(function(res) {
          console.log('this player wants a new name on the back of their jersey');
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
  }]);
};
