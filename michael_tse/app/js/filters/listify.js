module.exports = function(app) {
  app.filter('listify', function() {
    return function(input) {
      return input[0].toLowerCase() + input.slice(1, input.length) + ' List';
    };
  });
};
