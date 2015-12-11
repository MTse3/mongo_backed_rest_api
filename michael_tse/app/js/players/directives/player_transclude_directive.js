module.exports = function(app) {
  app.directive('playerTranscludeDirective', function() {
    return {
      restrict: 'AC',
      templateUrl: '/templates/player_transclude_directive.html',
      transclude: true,
      scope: {
        messageOne: '@'
      }
    }
  });
};
