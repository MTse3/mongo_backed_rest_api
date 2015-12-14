module.exports = function(app) {
  require('./controllers/players_controller')(app);
  require('./directives/player_directive')(app);
  require('./directives/player_transclude_directive')(app);
  require('./directives/player_form_directive')(app);

};
