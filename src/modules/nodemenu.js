define(['./pubsub.js'], function(events) {
  $div = document.getElementById('node-container');
  $menu = document.createElement('div');
  $menu.id = 'context-menu';
  document.body.appendChild($menu);

  $div.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    var data = {
      x: e.clientX,
      y: e.clientY
    };
    events.emit('openNodeMenu', data);
  });

  function openMenu(pos) {
    $menu.style.display = 'block';
    $menu.style.top = pos.y + "px";
    $menu.style.left = pos.x + "px";
  }

  events.on('openNodeMenu', openMenu);
});