module.exports = function(app) {
  app.controller('PlayersController', ['$scope', '$http', function($scope) {
    $scope.players = [];
    // $scope.errors = [];

    $scope.getAll = function() {
      $http.get('/api/players')
        .then(function(res) {
          $scope.bears = res.data;
        }, function(err) {
          console.log(err.data);
        });
    };

    $scope.create = function(player) {
      $http.post('/api/players', player)
        .then(function(res) {
          $scope.players.push(res.data);
        }, function(err) {
          console.log(err.data);
        });
    };
  }]);
}
