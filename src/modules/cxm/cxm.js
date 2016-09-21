define(['../pubsub', 'mustache', 'then-request'],
function(events, mustache, request) {

  var template, menus, pos, prefix, $menu;

  prefix = 'cxm';
  pos = { x: 0, y: 0 };
  menus = {};

  _loadTemplate();

  //load template
  function _loadTemplate() {
    return request('GET', __dirname + '/template.mustache.html')
    .then(function (data) {
      template = data.body;
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  function _addMenuEventListeners(id, data) {
    $buttons = $menu.getElementsByTagName('a');
    menus[id].forEach(function (option, index) {
      var $b = $buttons[index];
      $b.addEventListener('click', function(e) {
        var eventStr = events.getEventString(prefix, id, 'action', option.id);
        events.emit(eventStr, data);
      });
    });
  }

  function _render(id) {
    if ($menu) { $menu.parentNode.removeChild($menu) }
    $menu = document.createElement('div');
    $menu.id = prefix;
    $menu.innerHTML = mustache.render(template, { buttons: menus[id] });
    document.body.appendChild($menu);
  }

  function openMenu(menu, data) {
    _render(menu);
    _addMenuEventListeners(menu, data);
    $menu.style.display = 'block';
    $menu.style.left = data.pos.x + "px";
    $menu.style.top = data.pos.y + "px";
  }

  function closeMenu() {
    if ($menu) { $menu.parentNode.removeChild($menu) }
    $menu = null;
  }

  function addMenu(id, options) {
    if (menus[id]) return false;
    menus[id] = [];
    options.forEach(function(option) {
      addOption(id, option);
    });
    events.on('cxm.' + id + '.open', function(data) {
      openMenu(id, data);
    });
  }

  function addOption(id, option) {
    menus[id].push(option);
  }

  function attach(menu, element, data) {
    data = data || {};
    data.pos = {};
    element.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      e.stopPropagation();
      data.pos.x = e.clientX;
      data.pos.y = e.clientY;
      events.emit(prefix + '.' + menu + '.open', data);
    });
  }

  return {
    addMenu,
    addOption,
    attach,
    closeMenu
  };
});













