module.exports = function(app) {
  require('./dummy_directive')(app);
  require('./list_directive')(app);
  // require('./../players/directives/player_directive')(app);
  // require('./../players/directives/player_form_directive')(app);
  // require('./../players/directives/player_transclude_directive')(app);
};
