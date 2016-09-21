define(['./pubsub.js', 'draggable'],
function (events, Draggable) {
  var nodeIndex = 0;


  var Node = function(gameData, editData) {
    this.gameData = gameData || {
      name: 'new_node',
      title: 'title',
      description: 'A simple description...',
      links: []
    };
    this.editData = editData || {
      index: nodeIndex++,
      color: '#47a',
      x: 0,
      y: 0
    }

    //Setup DOM Element
    this.elem = document.createElement('div');
    this.elem.className = 'node';

    var $p = document.createElement('p');
    $p.textContent = this.gameData.name;
    this.elem.appendChild($p);

    this.drag = new Draggable(this.elem);

    //Methods
    this.setPos = function(pos) {
      this.editData.x = pos.x;
      this.editData.y = pos.y;
      this.drag.set(pos.x, pos.y);
    }
  }


  return Node;
});
