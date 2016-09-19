define(
['../pubsub', 'mustache', 'then-request'],
function(events, mustache, request) {

  var templateData = {
    buttons: [
      { value: 'new', symbol: '+' },
      { value: 'close', symbol: 'x' }
    ]
  };
  var template;
  var pos = { x: 0, y: 0 };

  //cache DOM
  $div = document.getElementById('node-container');
  $menu = document.createElement('div');
  $menu.id = 'context-menu';

  request('GET', __dirname + '/template.mustache.html')
  .then(function (data) {
    template = data.body;
    render();
    document.body.appendChild($menu);
  })
  .catch(function (err) {
    console.log(err);
  });


  //add event listeners
  $div.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    events.emit('contextmenu.open', {
      x: e.clientX,
      y: e.clientY
    });
  });
  events.on('contextmenu.open', openMenu);

  //functions
  function render() {
    $menu.innerHTML = mustache.render(template, templateData);
  }

  function openMenu(newPos) {
    $menu.style.display = 'block';
    $menu.style.left = newPos.x + "px";
    $menu.style.top = newPos.y + "px";
    pos.x = newPos.x;
    pos.y = newPos.y;
  }

  function closeMenu() {
    $menu.style.display = 'none';
  }

});