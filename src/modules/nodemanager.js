define(['./pubsub.js', './node.js'],
function(events, Node) {
  var nodes = [];
  //cache DOM
  var $c = document.getElementById('node-container');

  //functions
  function newNode(data) {
    var node = new Node();
    node.setPos(data.pos);
    nodes.push(node);

    $c.appendChild(node.elem);
    events.emit('node.new', {
      elem: node.elem,
      index: node.editData.index
    });
  }

  function editNode(data) {
    var node = nodes[data.index];
    events.emit('edit', {
      gameData: node.gameData,
      editData: node.editData
    });
  }

  return {
    nodes,
    newNode,
    editNode
  };
});

