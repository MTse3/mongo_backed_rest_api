module.exports = function(app) {
  app.directive('dummyDirective', function() {
    return {
      restrict: 'AC',
      template: '<h1>Dummy Directive: {{greeting}}</h1><input type="text" data-ng-model="greeting">',
      scope: {
        greeting: '@'
      }
    }
  });
};
