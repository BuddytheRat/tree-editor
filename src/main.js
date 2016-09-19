define(function(require) {
  var events = require('./modules/pubsub.js');
  var Node = require('./modules/node.js');
  require('./modules/editor.js');
  require('./modules/nodemenu.js');
  require('./modules/nodemanager.js');

  //cache DOM
  var $newLink = document.getElementById('new-link');

  //Bind Event Listeners
  $newLink.addEventListener('click', function () {
    events.emit('newNode');
  });

});
