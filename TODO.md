# ToDo
+ ~~Nodes should be draggable.~~
+ ~~Add functionality to context menu buttons.~~
+ Save X and Y to editData when node is dropped.
+ Link nodes to eachother.
  - Node object should list link objects which contain pointers to other node
  objects.
  - Links should be visible via a connecting line.
  - Links should have own context menu.
+ Save to JSON file.
+ Load from JSON file.
+ Add node color option to node editor.
+ Node area should be able to be scrolled when nodes leave screen.

## Context menu
- 'addMenu' function.
  - 'addOption' function to add a menu option.
- 'attach' function to attach a menu to an element and bind it's data.
- Events should use 'action' prefix for menu button events.
- Menu should auto-close when mouse gets a certain distance.

## Pub/Sub
- Add hierarchical event names.
  - i.e. 'event.subevent' will trigger two events, itself, plus 'event' by
  itself.