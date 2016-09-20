define([], function() {
  //private
  var events = {}

  function _getNestedEvents(eventName) {
    var res = [];
    var nested = eventName.split('.');
    for (var i = nested.length; i > 0; i--) {
        res.push(nested.slice(0, i).join('.'))
    }
    return res;
  }

  //public
  function on(eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  function off(eventName, fn) {
    if(this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  },
  function emit(eventName, data) {
    var nested = getNestedEvents(eventName);
    nested.forEach(function(eventName) {
      if (this.events[eventName]) {
        this.events[eventName].forEach(function(fn) {
          fn(data);
        });
      }
    }.bind(this));
  },
  function getEventString() {
    var args = Array.prototype.slice.call(arguments);
    return args.join('.');
  }
}
  return {
    on,
    off,
    emit,
    getEventString
  }
});