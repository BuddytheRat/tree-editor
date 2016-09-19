define(['./pubsub.js', './node.js', './cxm/cxm'], function(events, Node, cxm) {
  var nodes = [];
  //cache DOM
  var $c = document.getElementById('node-container');

  //bind event listeners
  events.on('cxm.n-mngr.action.add', newNode);
  events.on('cxm.node.action.edit', editNode);

  //Add context menus
  cxm.addMenu('n-mngr', [
        { id: 'add', symbol: 'Add' }
  ]);
  cxm.attach('n-mngr', $c);

  //functions
  function newNode(data) {
    var node = new Node();
    node.setPos(data.pos);
    nodes.push(node);

    $c.appendChild(node.elem);
    cxm.closeMenu();
  }

  function editNode(data) {
    var node = nodes[data.index];
    events.emit('edit', {
      gameData: node.gameData,
      editData: node.editData
    });
    cxm.closeMenu();
  }

  return nodes;
});

