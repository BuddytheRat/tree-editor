define(function(require) {
  var events = require('./modules/pubsub');
  var Node = require('./modules/node');
  require('./modules/editor');
  require('./modules/cxm/cxm');
  require('./modules/nodemanager');

  events.on('cxm.*.action', function() {
    console.log('something happening');
  })
});
