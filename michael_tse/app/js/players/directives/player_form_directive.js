module.exports =function(app) {
  app.directive('playerFormDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/player_form_template.html',
      transclude: true,
      scope: {
        buttonText: '@',
        headingText: '@',
        formName: '@',
        player: '=',
        save: '&'
      },
      // controller: function($scope) {
      //   console.log($scope)
      // }
    }
  });
};
