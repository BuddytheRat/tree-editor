define(['./pubsub.js', './node.js'], function(events, Node) {
  var nodes = [];
  //cache DOM
  var $c = document.getElementById('node-container');

  //bind event listeners
  events.on('contextmenu.add', newNode);

  //functions
  function newNode(pos) {
    var node = new Node();
    node.setPos(pos);
    nodes.push(node);

    $c.appendChild(node.elem);
  }

  return nodes;
});

