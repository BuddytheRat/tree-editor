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

  function _getRegExp(eventName) {
    var nested = eventName.split('.');
    nested.forEach(function (eventName, i) {
      if (eventName == '*') {
        nested[i] = '.+';
      }
    });
    return new RegExp('^' + nested.join('\.') + '$');
  }
  //public
  function on(eventName, fn) {
    events[eventName] = events[eventName] || [];
    events[eventName].push(fn);
  }

  function off(eventName, fn) {
    if(events[eventName]) {
      for (var i = 0; i < events[eventName].length; i++) {
        if (events[eventName][i] === fn) {
          events[eventName].splice(i, 1);
          break;
        }
      }
    }
  }

  function emit(eventName, data) {
    var nested = _getNestedEvents(eventName);
    nested.forEach(function(eventName) {
      for (var name in events) {
        var reg = _getRegExp(name);
        if (reg.test(eventName)) {
          events[name].forEach(function(fn) {
            fn(data);
          });
        }
      }
    }.bind(this));
  }

  function getEventString() {
    var args = Array.prototype.slice.call(arguments);
    return args.join('.');
  }

  return {
    on,
    off,
    emit,
    getEventString
  }
});