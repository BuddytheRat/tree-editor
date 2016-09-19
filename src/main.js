define(function(require) {
  var events = require('./modules/pubsub.js');
  var Node = require('./modules/node.js');
  require('./modules/nodemenu.js');

  //cache DOM
  var nodes = [];
  var $c = document.getElementById('node-container');
  var $e = document.getElementById('editor-container');
  var $form = document.getElementById('editor');
  var $newLink = document.getElementById('new-link');

  //Bind Event Listeners
  $newLink.addEventListener('click', function () {
    var node = new Node();
    nodes.push(node);

    $c.appendChild(node.elem);
  });

  $form.addEventListener('submit', function(e) {
    $e.style.display = 'none';
    e.preventDefault();
    var new_data = {
      gameData: {
        name: $form.elements['name'].value,
        title: $form.elements['title'].value,
        description: $form.elements['description'].value
      },
      editData: {
        index: parseInt($form.elements['index'].value)
      }
    }
    events.emit('save', new_data);
  });

  events.on('save', function(data) {
    var editNode = nodes[data.editData.index];
    editNode.gameData = data.gameData;
    editNode.editData = data.editData;
  });

  events.on('edit', function(data) {
    $e.style.display = 'block';
    $form.elements['index'].value = data.editData.index;
    $form.elements['name'].value = data.gameData.name;
    $form.elements['title'].value = data.gameData.title;
    $form.elements['description'].value = data.gameData.description;
  });

});
