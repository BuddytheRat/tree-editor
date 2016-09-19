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
    color: '#448',
    x: 0,
    y: 0
  };

  this.elem = document.createElement('div');
  this.elem.className = 'node';

  var $p = document.createElement('p');
  var $a = document.createElement('a');
  $p.textContent = this.gameData.name;

  $a.textContent = 'Edit';
  $a.setAttribute('href', '#');
  $a.addEventListener('click', function() {
    events.emit('edit', {
      gameData: this.gameData,
      editData: this.editData
     });
  }.bind(this));

  this.elem.appendChild($p);
  this.elem.appendChild($a);
}