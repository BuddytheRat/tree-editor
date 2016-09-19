define(['./pubsub.js', './node.js'], function(events, Node) {
  var nodes = [];
  //cache DOM
  var $c = document.getElementById('node-container');

  //bind event listeners
  events.on('newNode', newNode);

  //functions
  function newNode() {
    var node = new Node();
    nodes.push(node);

    $c.appendChild(node.elem);
  }

  return nodes;
});

