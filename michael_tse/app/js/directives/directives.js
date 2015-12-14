module.exports = function(app) {
  require('./dummy_directive')(app);
  require('./list_directive')(app);
};
