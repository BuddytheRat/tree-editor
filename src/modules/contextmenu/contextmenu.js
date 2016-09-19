define(['../pubsub', 'mustache', 'then-request'],
function(events, mustache, request) {

  var template, buttons, pos, prefix, $div, $menu;

  prefix = 'cm';
  pos = { x: 0, y: 0 };
  buttons = [
      { id: 'add', symbol: 'Add', prefix, data: pos },
      { id: 'close', symbol: 'Close', prefix }
    ];

  //cache DOM
  $div = document.getElementById('node-container');
  $menu = document.createElement('div');
  $menu.id = 'context-menu';

  //load template
  request('GET', __dirname + '/template.mustache.html')
  .then(function (data) {
    template = data.body;
    events.emit('contextmenu.loaded');
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

  events.on('contextmenu.loaded', init);
  events.on('contextmenu.open', openMenu);
  events.on('contextmenu.close', closeMenu);
  events.on('contextmenu.add', closeMenu);

  //functions
  function init() {
    document.body.appendChild($menu);
    render();
    buttons.forEach(function (button) {
      var $b = document.getElementById(prefix + '-' + button.id);
      $b.addEventListener('click', function(e) {
        events.emit('contextmenu.' + button.id, button.data);
      });
    });
  }
  function render() {
    $menu.innerHTML = mustache.render(template, { buttons });
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