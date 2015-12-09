module.exports = function(app) {
  require('./controllers/players_controller')(app);
  require('./directives/player_directive')(app);

};
