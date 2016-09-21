define(['./cxm', '../pubsub'],
function (cxm, events) {

  var nmgr = require('../nodemanager');
  //nmgr menu
  cxm.addMenu('nmgr', [
        { id: 'add', symbol: 'Add' }
  ]);
  cxm.attach('nmgr', document.getElementById('node-container'));
  events.on('cxm.nmgr.action.add', nmgr.newNode);

  //node menu
  cxm.addMenu('node', [
    { id: 'edit', symbol: 'Edit' }
  ]);
  events.on('cxm.node.action.edit', nmgr.editNode);
  events.on('node.new', function(data) {
    cxm.attach('node', data.elem, { index: data.index });
  });

  events.on('cxm.*.action', function() {
    cxm.closeMenu();
  })
});