/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/app";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	var events = {
	  events: {},
	  on: function (eventName, fn) {
	    this.events[eventName] = this.events[eventName] || [];
	    this.events[eventName].push(fn);
	  },
	  off: function(eventName, fn) {
	    if(this.events[eventName]) {
	      for (var i = 0; i < this.events[eventName].length; i++) {
	        if (this.events[eventName][i] === fn) {
	          this.events[eventName].splice(i, 1);
	          break;
	        }
	      }
	    }
	  },
	  emit: function (eventName, data) {
	    if (this.events[eventName]) {
	      this.events[eventName].forEach(function(fn) {
	        fn(data);
	      });
	    }
	  }
	}

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

	var nodes = [];
	var $c = document.getElementById('node-container');
	var $e = document.getElementById('editor-container');
	var $form = document.getElementById('editor');

	//Bind Event Listeners
	document.getElementById('new-link').addEventListener('click', function () {
	  var node = new Node();
	  nodes.push(node);

	  $c.appendChild(node.elem);
	});

	events.on('save', function(data) {
	  var editNode = nodes[data.editData.index];
	  editNode.gameData = data.gameData;
	  editNode.editData = data.editData;
	  console.log(nodes);
	});


	events.on('edit', function(data) {
	  $e.style.display = 'block';
	  $form.elements['index'].value = data.editData.index;
	  $form.elements['name'].value = data.gameData.name;
	  $form.elements['title'].value = data.gameData.title;
	  $form.elements['description'].value = data.gameData.description;

	});

	$form.addEventListener('submit', function save(e) {
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
	})




















/***/ }
/******/ ]);