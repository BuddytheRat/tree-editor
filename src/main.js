define(function(require) {
  var events = require('./modules/pubsub');
  var Node = require('./modules/node');
  require('./modules/editor');
  require('./modules/contextmenu/contextmenu');
  require('./modules/nodemanager');
});
