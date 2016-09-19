define(['./pubsub.js', 'draggable', './cxm/cxm'], function (events, Draggable, cxm) {
  var nodeIndex = 0;
  //Create Context Menu
  cxm.addMenu('node', [
    { id: 'edit', symbol: 'Edit' }
  ]);

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

    this.elem = document.createElement('div');
    this.elem.className = 'node';
    this.drag = new Draggable(this.elem);
    cxm.attach('node', this.elem, { index: this.editData.index });

    var $p = document.createElement('p');
    $p.textContent = this.gameData.name;

    // $a.addEventListener('click', function() {
    //   events.emit('edit', {
    //     gameData: this.gameData,
    //     editData: this.editData
    //   });
    // }.bind(this));

    this.elem.appendChild($p);

    this.setPos = function(pos) {
      this.editData.x = pos.x;
      this.editData.y = pos.y;
      this.drag.set(pos.x, pos.y);
    }
  }


  return Node;
});
