module.exports = function(app) {
  app.directive('playerDirective', function() {
    return {
      restrict: 'AC',
      // replace: true,
      templateUrl: '/templates/player_directive_template.html',
      scope: {
        player: '=',
      }
    }
  });
};
