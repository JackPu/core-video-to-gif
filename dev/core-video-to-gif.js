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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // core-video-to-gif: https://github.com/JackPu/core-video-to-gif

	// import './gif-worker'


	var _gif = __webpack_require__(2);

	var _gif2 = _interopRequireDefault(_gif);

	var _daycaca = __webpack_require__(3);

	var _daycaca2 = _interopRequireDefault(_daycaca);

	var _util = __webpack_require__(5);

	var _icon = __webpack_require__(6);

	__webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DEFAULT_OPTIONS = {
	  skip: false, // weather seek video
	  shotAnimation: true,
	  maxTime: 10,
	  fps: 6, // how many frame per second
	  quality: 10,
	  worker: 2,
	  // workerScript: 'http://s1.vued.vanthink.cn/6b20b2cd4809/gif-worker.js',
	  // some events
	  onGifProcess: function onGifProcess() {},
	  onGifFinished: function onGifFinished() {},
	  onStartShot: function onStartShot() {}
	};

	var i = 0;

	var CoreVideoToGif = function () {
	  function CoreVideoToGif(args) {
	    _classCallCheck(this, CoreVideoToGif);

	    if (!this._checkLimits()) {
	      console.error('Browser not support!');
	      console.info('Please view: https://caniuse.com/#search=worker');
	    }
	    if (!args.el || args.el.tagName !== 'VIDEO') {
	      return this._error('Must set video element!');
	    }
	    this.video = this._el = args.el;
	    this._bindVideoEvents();
	    this.options = _extends(DEFAULT_OPTIONS, args);
	    if (this.options.parentEl) {
	      this._buildShotAnim();
	    }
	    this._gif = new _gif2.default(this.options);
	    this.getVideoInfo();
	  }

	  _createClass(CoreVideoToGif, [{
	    key: '_bindVideoEvents',
	    value: function _bindVideoEvents() {
	      var _this = this;

	      this.video.addEventListener('ended', function () {
	        _this._stopScreentshot();
	      });
	    }
	  }, {
	    key: '_buildShotAnim',
	    value: function _buildShotAnim() {
	      var html = '<div class="cvg-preset-container"><div class="icon-camera">';
	      html += _icon.camera;
	      html += '</div></div>';
	      this._loadinglayer = (0, _util.htmlToEl)(html);
	      this.options.parentEl.appendChild(this._loadinglayer);
	    }
	  }, {
	    key: '_startShotAnimation',
	    value: function _startShotAnimation() {
	      this.options.shotAnimation && this._loadinglayer.classList.add('fadein');
	    }
	  }, {
	    key: '_stopShotAnimation',
	    value: function _stopShotAnimation() {
	      this.options.shotAnimation && this._loadinglayer.classList.remove('fadein');
	    }
	  }, {
	    key: 'shot',
	    value: function shot(options, callback) {
	      if (this.video.paused) {
	        this.video.play();
	      }
	      if ((0, _util.isFunction)(options)) {
	        return _daycaca2.default.base64(this.video, function (image) {
	          options(image);
	        });
	      }
	      if ((0, _util.isNumber)(options.start) && (0, _util.isNumber)(options.end) && options.end - options.start < this.options.maxTime) {
	        this._seek(options.start);
	        if ((0, _util.isNumber)(options.fps)) {
	          this.options.fps = parseInt(options.fps);
	        }
	        options._duration = options.end - options.start;
	        options.callback = callback;
	        this._startScreenshot(options);
	      } else {
	        this._error('crop(params) params ... error');
	      }
	    }
	  }, {
	    key: '_startScreenshot',
	    value: function _startScreenshot(options) {
	      var _this2 = this;

	      var intvalTime = Math.ceil(1000 / this.options.fps);
	      if (!this._startShotTime) {
	        this._startShotTime = new Date().getTime();
	      }
	      this._intval = window.setInterval(function () {
	        // 待优化
	        _this2._startShotAnimation();
	        _daycaca2.default.base64(_this2.video, function (source, canvas) {
	          var time = new Date().getTime();
	          if (time - _this2._startShotTime > options._duration * 1000) {
	            _this2._stopScreentshot(options);
	            return;
	          }
	          _this2._gif.addFrame(canvas, { delay: intvalTime });
	        });
	      }, intvalTime);
	    }
	  }, {
	    key: '_startGifEvent',
	    value: function _startGifEvent(options) {
	      this._gif.on('finished', function (blob) {
	        var _this3 = this;

	        _daycaca2.default.base64(blob, function (image) {
	          _this3.options.onGifFinished(image);
	          options.callback(image);
	        });
	      });
	    }
	  }, {
	    key: '_stopScreentshot',
	    value: function _stopScreentshot(options) {
	      this._startGifEvent(options);
	      this._stopShotAnimation();
	      // gif start render
	      this._gif.render();
	      this.options.onGifProcess();
	      this._startShotTime = null;
	      window.clearInterval(this._intval);
	    }
	  }, {
	    key: '_error',
	    value: function _error(msg) {
	      console.error(msg);
	    }
	  }, {
	    key: '_checkLimits',
	    value: function _checkLimits() {
	      return window.Worker && window.FileReader;
	    }
	  }, {
	    key: 'getVideoInfo',
	    value: function getVideoInfo() {
	      var _this4 = this;

	      this.video.onloadedmetadata = function (e) {
	        _this4.width = e.target.videoWidth;
	        _this4.height = e.target.videoHieght;
	        if (!_this4.options.width) {
	          _this4.options.width = _this4.width;
	        }
	        if (!_this4.options.height) {
	          _this4.options.height = _this4.height;
	        }
	        _this4.duration = e.target.duration;
	      };
	      if (this.video.paused) {
	        this.video.play();
	      }
	    }
	  }, {
	    key: '_seek',
	    value: function _seek(time) {
	      this.video.currentTime = time;
	    }
	  }]);

	  return CoreVideoToGif;
	}();
	// alias name


	window._coreVideoToGif = CoreVideoToGif;
	window.CoreVideo2Gif = CoreVideoToGif;
	window.CoreVideoToGif = CoreVideoToGif;

	module.exports = CoreVideoToGif;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;// gif.js 0.2.0 - https://github.com/jnordberg/gif.js
	(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GIF=f()}})(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){function EventEmitter(){this._events=this._events||{};this._maxListeners=this._maxListeners||undefined}module.exports=EventEmitter;EventEmitter.EventEmitter=EventEmitter;EventEmitter.prototype._events=undefined;EventEmitter.prototype._maxListeners=undefined;EventEmitter.defaultMaxListeners=10;EventEmitter.prototype.setMaxListeners=function(n){if(!isNumber(n)||n<0||isNaN(n))throw TypeError("n must be a positive number");this._maxListeners=n;return this};EventEmitter.prototype.emit=function(type){var er,handler,len,args,i,listeners;if(!this._events)this._events={};if(type==="error"){if(!this._events.error||isObject(this._events.error)&&!this._events.error.length){er=arguments[1];if(er instanceof Error){throw er}else{var err=new Error('Uncaught, unspecified "error" event. ('+er+")");err.context=er;throw err}}}handler=this._events[type];if(isUndefined(handler))return false;if(isFunction(handler)){switch(arguments.length){case 1:handler.call(this);break;case 2:handler.call(this,arguments[1]);break;case 3:handler.call(this,arguments[1],arguments[2]);break;default:args=Array.prototype.slice.call(arguments,1);handler.apply(this,args)}}else if(isObject(handler)){args=Array.prototype.slice.call(arguments,1);listeners=handler.slice();len=listeners.length;for(i=0;i<len;i++)listeners[i].apply(this,args)}return true};EventEmitter.prototype.addListener=function(type,listener){var m;if(!isFunction(listener))throw TypeError("listener must be a function");if(!this._events)this._events={};if(this._events.newListener)this.emit("newListener",type,isFunction(listener.listener)?listener.listener:listener);if(!this._events[type])this._events[type]=listener;else if(isObject(this._events[type]))this._events[type].push(listener);else this._events[type]=[this._events[type],listener];if(isObject(this._events[type])&&!this._events[type].warned){if(!isUndefined(this._maxListeners)){m=this._maxListeners}else{m=EventEmitter.defaultMaxListeners}if(m&&m>0&&this._events[type].length>m){this._events[type].warned=true;console.error("(node) warning: possible EventEmitter memory "+"leak detected. %d listeners added. "+"Use emitter.setMaxListeners() to increase limit.",this._events[type].length);if(typeof console.trace==="function"){console.trace()}}}return this};EventEmitter.prototype.on=EventEmitter.prototype.addListener;EventEmitter.prototype.once=function(type,listener){if(!isFunction(listener))throw TypeError("listener must be a function");var fired=false;function g(){this.removeListener(type,g);if(!fired){fired=true;listener.apply(this,arguments)}}g.listener=listener;this.on(type,g);return this};EventEmitter.prototype.removeListener=function(type,listener){var list,position,length,i;if(!isFunction(listener))throw TypeError("listener must be a function");if(!this._events||!this._events[type])return this;list=this._events[type];length=list.length;position=-1;if(list===listener||isFunction(list.listener)&&list.listener===listener){delete this._events[type];if(this._events.removeListener)this.emit("removeListener",type,listener)}else if(isObject(list)){for(i=length;i-- >0;){if(list[i]===listener||list[i].listener&&list[i].listener===listener){position=i;break}}if(position<0)return this;if(list.length===1){list.length=0;delete this._events[type]}else{list.splice(position,1)}if(this._events.removeListener)this.emit("removeListener",type,listener)}return this};EventEmitter.prototype.removeAllListeners=function(type){var key,listeners;if(!this._events)return this;if(!this._events.removeListener){if(arguments.length===0)this._events={};else if(this._events[type])delete this._events[type];return this}if(arguments.length===0){for(key in this._events){if(key==="removeListener")continue;this.removeAllListeners(key)}this.removeAllListeners("removeListener");this._events={};return this}listeners=this._events[type];if(isFunction(listeners)){this.removeListener(type,listeners)}else if(listeners){while(listeners.length)this.removeListener(type,listeners[listeners.length-1])}delete this._events[type];return this};EventEmitter.prototype.listeners=function(type){var ret;if(!this._events||!this._events[type])ret=[];else if(isFunction(this._events[type]))ret=[this._events[type]];else ret=this._events[type].slice();return ret};EventEmitter.prototype.listenerCount=function(type){if(this._events){var evlistener=this._events[type];if(isFunction(evlistener))return 1;else if(evlistener)return evlistener.length}return 0};EventEmitter.listenerCount=function(emitter,type){return emitter.listenerCount(type)};function isFunction(arg){return typeof arg==="function"}function isNumber(arg){return typeof arg==="number"}function isObject(arg){return typeof arg==="object"&&arg!==null}function isUndefined(arg){return arg===void 0}},{}],2:[function(require,module,exports){var UA,browser,mode,platform,ua;ua=navigator.userAgent.toLowerCase();platform=navigator.platform.toLowerCase();UA=ua.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/)||[null,"unknown",0];mode=UA[1]==="ie"&&document.documentMode;browser={name:UA[1]==="version"?UA[3]:UA[1],version:mode||parseFloat(UA[1]==="opera"&&UA[4]?UA[4]:UA[2]),platform:{name:ua.match(/ip(?:ad|od|hone)/)?"ios":(ua.match(/(?:webos|android)/)||platform.match(/mac|win|linux/)||["other"])[0]}};browser[browser.name]=true;browser[browser.name+parseInt(browser.version,10)]=true;browser.platform[browser.platform.name]=true;module.exports=browser},{}],3:[function(require,module,exports){var EventEmitter,GIF,browser,extend=function(child,parent){for(var key in parent){if(hasProp.call(parent,key))child[key]=parent[key]}function ctor(){this.constructor=child}ctor.prototype=parent.prototype;child.prototype=new ctor;child.__super__=parent.prototype;return child},hasProp={}.hasOwnProperty,indexOf=[].indexOf||function(item){for(var i=0,l=this.length;i<l;i++){if(i in this&&this[i]===item)return i}return-1},slice=[].slice;EventEmitter=require("events").EventEmitter;browser=require("./browser.coffee");GIF=function(superClass){var defaults,frameDefaults;extend(GIF,superClass);defaults={workerScript:"gif.worker.js",workers:2,repeat:0,background:"#fff",quality:10,width:null,height:null,transparent:null,debug:false,dither:false};frameDefaults={delay:500,copy:false};function GIF(options){var base,key,value;this.running=false;this.options={};this.frames=[];this.freeWorkers=[];this.activeWorkers=[];this.setOptions(options);for(key in defaults){value=defaults[key];if((base=this.options)[key]==null){base[key]=value}}}GIF.prototype.setOption=function(key,value){this.options[key]=value;if(this._canvas!=null&&(key==="width"||key==="height")){return this._canvas[key]=value}};GIF.prototype.setOptions=function(options){var key,results,value;results=[];for(key in options){if(!hasProp.call(options,key))continue;value=options[key];results.push(this.setOption(key,value))}return results};GIF.prototype.addFrame=function(image,options){var frame,key;if(options==null){options={}}frame={};frame.transparent=this.options.transparent;for(key in frameDefaults){frame[key]=options[key]||frameDefaults[key]}if(this.options.width==null){this.setOption("width",image.width)}if(this.options.height==null){this.setOption("height",image.height)}if(typeof ImageData!=="undefined"&&ImageData!==null&&image instanceof ImageData){frame.data=image.data}else if(typeof CanvasRenderingContext2D!=="undefined"&&CanvasRenderingContext2D!==null&&image instanceof CanvasRenderingContext2D||typeof WebGLRenderingContext!=="undefined"&&WebGLRenderingContext!==null&&image instanceof WebGLRenderingContext){if(options.copy){frame.data=this.getContextData(image)}else{frame.context=image}}else if(image.childNodes!=null){if(options.copy){frame.data=this.getImageData(image)}else{frame.image=image}}else{throw new Error("Invalid image")}return this.frames.push(frame)};GIF.prototype.render=function(){var i,j,numWorkers,ref;if(this.running){throw new Error("Already running")}if(this.options.width==null||this.options.height==null){throw new Error("Width and height must be set prior to rendering")}this.running=true;this.nextFrame=0;this.finishedFrames=0;this.imageParts=function(){var j,ref,results;results=[];for(i=j=0,ref=this.frames.length;0<=ref?j<ref:j>ref;i=0<=ref?++j:--j){results.push(null)}return results}.call(this);numWorkers=this.spawnWorkers();if(this.options.globalPalette===true){this.renderNextFrame()}else{for(i=j=0,ref=numWorkers;0<=ref?j<ref:j>ref;i=0<=ref?++j:--j){this.renderNextFrame()}}this.emit("start");return this.emit("progress",0)};GIF.prototype.abort=function(){var worker;while(true){worker=this.activeWorkers.shift();if(worker==null){break}this.log("killing active worker");worker.terminate()}this.running=false;return this.emit("abort")};GIF.prototype.spawnWorkers=function(){var j,numWorkers,ref,results;numWorkers=Math.min(this.options.workers,this.frames.length);(function(){results=[];for(var j=ref=this.freeWorkers.length;ref<=numWorkers?j<numWorkers:j>numWorkers;ref<=numWorkers?j++:j--){results.push(j)}return results}).apply(this).forEach(function(_this){return function(i){var worker;_this.log("spawning worker "+i);worker=new Worker(_this.options.workerScript);worker.onmessage=function(event){_this.activeWorkers.splice(_this.activeWorkers.indexOf(worker),1);_this.freeWorkers.push(worker);return _this.frameFinished(event.data)};return _this.freeWorkers.push(worker)}}(this));return numWorkers};GIF.prototype.frameFinished=function(frame){var i,j,ref;this.log("frame "+frame.index+" finished - "+this.activeWorkers.length+" active");this.finishedFrames++;this.emit("progress",this.finishedFrames/this.frames.length);this.imageParts[frame.index]=frame;if(this.options.globalPalette===true){this.options.globalPalette=frame.globalPalette;this.log("global palette analyzed");if(this.frames.length>2){for(i=j=1,ref=this.freeWorkers.length;1<=ref?j<ref:j>ref;i=1<=ref?++j:--j){this.renderNextFrame()}}}if(indexOf.call(this.imageParts,null)>=0){return this.renderNextFrame()}else{return this.finishRendering()}};GIF.prototype.finishRendering=function(){var data,frame,i,image,j,k,l,len,len1,len2,len3,offset,page,ref,ref1,ref2;len=0;ref=this.imageParts;for(j=0,len1=ref.length;j<len1;j++){frame=ref[j];len+=(frame.data.length-1)*frame.pageSize+frame.cursor}len+=frame.pageSize-frame.cursor;this.log("rendering finished - filesize "+Math.round(len/1e3)+"kb");data=new Uint8Array(len);offset=0;ref1=this.imageParts;for(k=0,len2=ref1.length;k<len2;k++){frame=ref1[k];ref2=frame.data;for(i=l=0,len3=ref2.length;l<len3;i=++l){page=ref2[i];data.set(page,offset);if(i===frame.data.length-1){offset+=frame.cursor}else{offset+=frame.pageSize}}}image=new Blob([data],{type:"image/gif"});return this.emit("finished",image,data)};GIF.prototype.renderNextFrame=function(){var frame,task,worker;if(this.freeWorkers.length===0){throw new Error("No free workers")}if(this.nextFrame>=this.frames.length){return}frame=this.frames[this.nextFrame++];worker=this.freeWorkers.shift();task=this.getTask(frame);this.log("starting frame "+(task.index+1)+" of "+this.frames.length);this.activeWorkers.push(worker);return worker.postMessage(task)};GIF.prototype.getContextData=function(ctx){return ctx.getImageData(0,0,this.options.width,this.options.height).data};GIF.prototype.getImageData=function(image){var ctx;if(this._canvas==null){this._canvas=document.createElement("canvas");this._canvas.width=this.options.width;this._canvas.height=this.options.height}ctx=this._canvas.getContext("2d");ctx.setFill=this.options.background;ctx.fillRect(0,0,this.options.width,this.options.height);ctx.drawImage(image,0,0);return this.getContextData(ctx)};GIF.prototype.getTask=function(frame){var index,task;index=this.frames.indexOf(frame);task={index:index,last:index===this.frames.length-1,delay:frame.delay,transparent:frame.transparent,width:this.options.width,height:this.options.height,quality:this.options.quality,dither:this.options.dither,globalPalette:this.options.globalPalette,repeat:this.options.repeat,canTransfer:browser.name==="chrome"};if(frame.data!=null){task.data=frame.data}else if(frame.context!=null){task.data=this.getContextData(frame.context)}else if(frame.image!=null){task.data=this.getImageData(frame.image)}else{throw new Error("Invalid frame")}return task};GIF.prototype.log=function(){var args;args=1<=arguments.length?slice.call(arguments,0):[];if(!this.options.debug){return}return console.log.apply(console,args)};return GIF}(EventEmitter);module.exports=GIF},{"./browser.coffee":2,events:1}]},{},[3])(3)});
	//# sourceMappingURL=gif.js.map


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	(function webpackUniversalModuleDefinition(root, factory) {
	  if (( false ? 'undefined' : _typeof2(exports)) === 'object' && ( false ? 'undefined' : _typeof2(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) === 'object') exports["daycaca"] = factory();else root["daycaca"] = factory();
	})(typeof self !== 'undefined' ? self : undefined, function () {
	  return (/******/function (modules) {
	      // webpackBootstrap
	      /******/ // The module cache
	      /******/var installedModules = {};
	      /******/
	      /******/ // The require function
	      /******/function __webpack_require__(moduleId) {
	        /******/
	        /******/ // Check if module is in cache
	        /******/if (installedModules[moduleId]) {
	          /******/return installedModules[moduleId].exports;
	          /******/
	        }
	        /******/ // Create a new module (and put it into the cache)
	        /******/var module = installedModules[moduleId] = {
	          /******/i: moduleId,
	          /******/l: false,
	          /******/exports: {}
	          /******/ };
	        /******/
	        /******/ // Execute the module function
	        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	        /******/
	        /******/ // Flag the module as loaded
	        /******/module.l = true;
	        /******/
	        /******/ // Return the exports of the module
	        /******/return module.exports;
	        /******/
	      }
	      /******/
	      /******/
	      /******/ // expose the modules object (__webpack_modules__)
	      /******/__webpack_require__.m = modules;
	      /******/
	      /******/ // expose the module cache
	      /******/__webpack_require__.c = installedModules;
	      /******/
	      /******/ // define getter function for harmony exports
	      /******/__webpack_require__.d = function (exports, name, getter) {
	        /******/if (!__webpack_require__.o(exports, name)) {
	          /******/Object.defineProperty(exports, name, {
	            /******/configurable: false,
	            /******/enumerable: true,
	            /******/get: getter
	            /******/ });
	          /******/
	        }
	        /******/
	      };
	      /******/
	      /******/ // getDefaultExport function for compatibility with non-harmony modules
	      /******/__webpack_require__.n = function (module) {
	        /******/var getter = module && module.__esModule ?
	        /******/function getDefault() {
	          return module['default'];
	        } :
	        /******/function getModuleExports() {
	          return module;
	        };
	        /******/__webpack_require__.d(getter, 'a', getter);
	        /******/return getter;
	        /******/
	      };
	      /******/
	      /******/ // Object.prototype.hasOwnProperty.call
	      /******/__webpack_require__.o = function (object, property) {
	        return Object.prototype.hasOwnProperty.call(object, property);
	      };
	      /******/
	      /******/ // __webpack_public_path__
	      /******/__webpack_require__.p = "";
	      /******/
	      /******/ // Load entry module and return exports
	      /******/return __webpack_require__(__webpack_require__.s = 0);
	      /******/
	    }(
	    /************************************************************************/
	    /******/[
	    /* 0 */
	    /***/function (module, exports, __webpack_require__) {

	      "use strict";

	      var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	        return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
	      } : function (obj) {
	        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
	      };

	      var _extends = Object.assign || function (target) {
	        for (var i = 1; i < arguments.length; i++) {
	          var source = arguments[i];for (var key in source) {
	            if (Object.prototype.hasOwnProperty.call(source, key)) {
	              target[key] = source[key];
	            }
	          }
	        }return target;
	      };

	      // a canvas lib to compress or crop images

	      var isNumber = function isNumber(num) {
	        return typeof num === 'number';
	      };
	      var imageReg = /\.(png|jpeg|jpg|gif|bmp)/;

	      var defaultConfig = {
	        ratio: 1,
	        enableWebWorker: false
	      };

	      module.exports = {
	        setConfig: function setConfig(config) {
	          this._config = _extends(defaultConfig, config);
	        },

	        /**
	        * init image for reset size and rotation
	        */
	        init: function init(src, callback) {
	          var _this = this;

	          var image = this._createImage(src);
	          image.onload = function () {
	            var cvs = _this._getCanvas(image.naturalWidth, image.naturalHeight);
	            var ctx = cvs.getContext('2d');
	            ctx.drawImage(image, 0, 0);
	            var newImageData = cvs.toDataURL();
	            callback(newImageData);
	          };
	        },

	        /**
	         * encode image to base64
	         * @param {Element|String} el
	         * @param {Function} callback
	         */
	        base64: function base64(el, callback) {
	          var _getSrc = this._getSrc(el),
	              src = _getSrc.src,
	              type = _getSrc.type;

	          if (type === 'file') {
	            return this._readFile(src, callback);
	          } else if (type === 'video') {
	            var video = el;
	            var cvs = this._getCanvas(video.videoWidth, video.videoHeight);
	            var ctx = cvs.getContext('2d');
	            ctx.drawImage(video, 0, 0);
	            var newImageData = cvs.toDataURL();
	            callback(newImageData, cvs);
	          }
	          return this.init(src, callback);
	        },

	        /**
	         * compress image
	         * @param {el|String} src the source of image
	         * @param {Number} the quality of image ( 100 = the highest quality)
	         * @param {Function} callback
	         */
	        compress: function compress(source, quality, callback) {
	          var _this2 = this;

	          var _getSrc2 = this._getSrc(source),
	              src = _getSrc2.src,
	              type = _getSrc2.type;

	          if (type === 'file') {
	            return this._readFile(src, function (data) {
	              _this2._compress(data, source, quality, callback);
	            });
	          }
	          this._compress(src, source, quality, callback);
	        },
	        _compress: function _compress(src, source, quality, callback) {
	          var _this3 = this;

	          this._loadImage(src, function (image) {
	            var mimeType = _this3._getImageType(source);
	            var cvs = _this3._getCanvas(image.naturalWidth, image.naturalHeight);
	            var ctx = cvs.getContext('2d');
	            ctx.drawImage(image, 0, 0);
	            var newImageData = cvs.toDataURL(mimeType, quality / 100);
	            callback(newImageData);
	          });
	        },
	        _readFile: function _readFile(file, callback) {
	          var reader = new FileReader();
	          reader.onload = function (event) {
	            var data = event.target.result;
	            callback(data);
	          };
	          reader.readAsDataURL(file);
	        },

	        /**
	        * crop image via canvas and generate data
	        */
	        crop: function crop(source, options, callback) {
	          var _this4 = this;

	          var _getSrc3 = this._getSrc(source),
	              src = _getSrc3.src,
	              type = _getSrc3.type;

	          console.log(source);
	          if (type === 'file') {
	            console.log(1111);
	            return this._readFile(src, function (data) {
	              _this4._crop(src, source, options, callback);
	            });
	          }
	          this._crop(src, source, options, callback);
	        },
	        _crop: function _crop(src, source, options, callback) {
	          var _this5 = this;

	          this._loadImage(src, function (image) {
	            // check crop options
	            if (isNumber(options.x) && isNumber(options.y) && options.w > 0 && options.h > 0) {
	              var w = options.w;
	              var h = options.h;
	              if (options.maxWidth && options.maxWidth < w) {
	                w = options.maxWidth;
	                h = options.h * w / options.w;
	              }
	              if (options.maxHeight && options.maxHeight < h) {
	                h = options.maxHeight;
	              }
	              var cvs = _this5._getCanvas(w, h);
	              var ctx = cvs.getContext('2d').drawImage(image, options.x, options.y, options.w, options.h, 0, 0, w, h);
	              var mimeType = _this5._getImageType(source);
	              var data = cvs.toDataURL(mimeType, options.compress / 100);
	              callback(data);
	            }
	          });
	        },
	        resize: function resize(source, ratio, callback) {
	          var _this6 = this;

	          var _getSrc4 = this._getSrc(source),
	              src = _getSrc4.src,
	              type = _getSrc4.type;

	          if (type === 'file') {
	            return this._readFile(src, function (data) {
	              _this6._resize(src, source, options, callback);
	            });
	          }
	          this._resize(src, source, options, callback);
	        },
	        _resize: function _resize(src, source, options, callback) {
	          var _this7 = this;

	          this._loadImage(src, function (image) {
	            if (isNumber(options.toCropImgX) && isNumber(options.toCropImgY) && options.toCropImgW > 0 && options.toCropImgH > 0) {
	              var w = options.toCropImgW * options.imgChangeRatio;
	              var h = options.toCropImgH * options.imgChangeRatio;
	              var cvs = _this7._getCanvas(w, h);
	              var ctx = cvs.getContext('2d').drawImage(image, 0, 0, options.toCropImgW, options.toCropImgH, 0, 0, w, h);
	              var mimeType = _this7._getImageType(source);
	              var data = cvs.toDataURL(mimeType, options.compress / 100);
	              callback(data);
	            }
	          });
	        },

	        /**
	         * rotate image
	         */
	        rotate: function rotate(source, degree, callback) {
	          var _this8 = this;

	          var _getSrc5 = this._getSrc(source),
	              src = _getSrc5.src,
	              type = _getSrc5.type;

	          if (type === 'file') {
	            return this._readFile(src, function (data) {
	              _this8._rotate(src, source, degree, callback);
	            });
	          }
	          if (degree % 360 === 0) {
	            return callback(src);
	          }
	          this._rotate(src, source, degree, callback);
	        },
	        _rotate: function _rotate(src, source, degree, callback) {
	          var _this9 = this;

	          this._loadImage(src, function (image) {
	            var w = image.naturalWidth;
	            var h = image.naturalHeight;
	            degree %= 360;
	            if (degree == 90 || degree == 270) {
	              w = image.naturalHeight;
	              h = image.naturalWidth;
	            }
	            var cvs = _this9._getCanvas(w, h);
	            var ctx = cvs.getContext('2d');
	            ctx.clearRect(0, 0, w, h);
	            ctx.fillStyle = 'white';
	            ctx.fillRect(0, 0, w, h);
	            ctx.translate(w / 2, h / 2);
	            ctx.rotate(degree * Math.PI / 180);
	            ctx.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);
	            var mimeType = _this9._getImageType(source);
	            var data = cvs.toDataURL(mimeType, 1);
	            callback(data, w, h);
	            cvs = null;
	            ctx = null;
	          });
	        },
	        _loadImage: function _loadImage(src, callback) {
	          var image = this._createImage(src);
	          image.onload = function () {
	            callback(image);
	          };
	        },
	        _getCanvas: function _getCanvas(width, height) {
	          var canvas = document.createElement('canvas');
	          canvas.width = width;
	          canvas.height = height;
	          return canvas;
	        },
	        _createImage: function _createImage(src) {
	          var image = new Image();
	          image.src = src;
	          return image;
	        },
	        _getSrc: function _getSrc(source) {
	          var src = source;
	          var type = 'url';
	          if (this._isImageElement(source)) {
	            var imgSrc = source.src;
	            if (!imgSrc) {
	              return console.error('Element must hava src');
	            }
	            src = imgSrc;
	            type = 'element';
	          } else if (this._isVideoElement(source)) {
	            src = source;
	            type = 'video';
	          } else if (this._isFileObject(source)) {
	            src = source;
	            type = 'file';
	          }
	          return {
	            src: src,
	            type: type
	          };
	        },
	        _isFileObject: function _isFileObject(file) {
	          return (typeof file === 'undefined' ? 'undefined' : _typeof(file)) === 'object' && file.type && file.size > 0;
	        },
	        _isImageElement: function _isImageElement(el) {
	          return (typeof el === 'undefined' ? 'undefined' : _typeof(el)) === 'object' && el.tagName === 'IMG';
	        },
	        _isVideoElement: function _isVideoElement(el) {
	          return (typeof el === 'undefined' ? 'undefined' : _typeof(el)) === 'object' && el.tagName === 'VIDEO';
	        },
	        _getImageType: function _getImageType(source) {
	          var _getSrc6 = this._getSrc(source),
	              src = _getSrc6.src,
	              type = _getSrc6.type;

	          var mimeType = 'image/jpeg';
	          if (type === 'file') {
	            var fileType = source.type;
	            var outputType = fileType.match(/(image\/[\w]+)\.*/)[0];
	            if (typeof outputType !== 'undefined') {
	              mimeType = outputType;
	            }
	          } else {
	            var arr = imageReg.exec(src);
	            if (arr && arr[1]) {
	              mimeType = 'image/' + arr[1];
	            }
	          }
	          return mimeType;
	        }
	      };

	      /***/
	    }]
	    /******/)
	  );
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  isFunction: function isFunction(fn) {
	    return typeof fn === 'function';
	  },
	  isNumber: function isNumber(num) {
	    return typeof num === 'number';
	  },
	  htmlToEl: function htmlToEl(html) {
	    var div = document.createElement('div');
	    div.innerHTML = html;
	    return div.children[0];
	  }
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	    camera: "\n    <svg version=\"1.1\" width=\"50\" height=\"50\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n    viewBox=\"0 0 490 490\" style=\"enable-background:new 0 0 490 490;\" xml:space=\"preserve\">\n<g>\n   <g>\n       <path d=\"M0,167.85v216.2c0,33,26.8,59.8,59.8,59.8h370.4c33,0,59.8-26.8,59.8-59.8v-216.2c0-31.4-25.5-56.9-56.9-56.9h-79.6\n           l-1.9-8.3c-7.7-33.3-37-56.5-71.2-56.5h-70.9c-34.1,0-63.4,23.2-71.2,56.5l-1.9,8.3H56.9C25.5,110.95,0,136.55,0,167.85z\n            M146.2,135.45c5.7,0,10.6-3.9,11.9-9.5l4.1-17.8c5.2-22.1,24.6-37.5,47.3-37.5h70.9c22.7,0,42.1,15.4,47.3,37.5l4.1,17.8\n           c1.3,5.5,6.2,9.5,11.9,9.5H433c17.9,0,32.4,14.5,32.4,32.4v216.2c0,19.5-15.8,35.3-35.3,35.3H59.8c-19.5,0-35.3-15.8-35.3-35.3\n           v-216.2c0-17.9,14.5-32.4,32.4-32.4H146.2z\"/>\n       <circle cx=\"82.9\" cy=\"187.75\" r=\"16.4\"/>\n       <path d=\"M245,380.95c56.7,0,102.9-46.2,102.9-102.9s-46.2-102.9-102.9-102.9s-102.9,46.1-102.9,102.9S188.3,380.95,245,380.95z\n            M245,199.65c43.2,0,78.4,35.2,78.4,78.4s-35.2,78.4-78.4,78.4s-78.4-35.2-78.4-78.4S201.8,199.65,245,199.65z\"/>\n   </g>\n</g>\n\n</svg>\n    "
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	
	var content = __webpack_require__(8);

	if(typeof content === 'string') content = [[module.id, content, '']];

	var transform;
	var insertInto;



	var options = {"hmr":true}

	options.transform = transform
	options.insertInto = undefined;

	var update = __webpack_require__(10)(content, options);

	if(content.locals) module.exports = content.locals;

	if(false) {
		module.hot.accept("!!../node_modules/_css-loader@0.28.11@css-loader/index.js?sourceMap!../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js?sourceMap!./style.less", function() {
			var newContent = require("!!../node_modules/_css-loader@0.28.11@css-loader/index.js?sourceMap!../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js?sourceMap!./style.less");

			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

			var locals = (function(a, b) {
				var key, idx = 0;

				for(key in a) {
					if(!b || a[key] !== b[key]) return false;
					idx++;
				}

				for(key in b) idx--;

				return idx === 0;
			}(content.locals, newContent.locals));

			if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

			update(newContent);
		});

		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)(true);
	// imports


	// module
	exports.push([module.id, ".cvg-preset-container {\n  display: none;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: #fff;\n  opacity: .85;\n}\n.cvg-preset-container.fadein {\n  display: block;\n  -webkit-animation-duration: .5s;\n  animation-duration: .5s;\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n  -webkit-animation-iteration-count: infinite;\n  animation-iteration-count: infinite;\n}\n.cvg-preset-container .icon-camera {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 50px;\n  height: 50px;\n  margin-left: -25px;\n  margin-top: -25px;\n}\n.cvg-preset-container .icon-camera svg {\n  width: 50px;\n  height: 50px;\n}\n@-webkit-keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  10% {\n    opacity: 0;\n  }\n  15% {\n    opacity: .5;\n  }\n  18% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  10% {\n    opacity: 0;\n  }\n  15% {\n    opacity: .5;\n  }\n  18% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n.fadein {\n  -webkit-animation-name: fadeIn;\n  animation-name: fadeIn;\n}\n", "", {"version":3,"sources":["/Users/ali-130257n/www/core-video-to-gif/src/style.less","/Users/ali-130257n/www/core-video-to-gif/src/style.less"],"names":[],"mappings":"AAKA;EACI,cAAA;EACA,mBAAA;EACA,OAAA;EACA,QAAA;EACA,YAAA;EACA,aAAA;EACA,uBAAA;EACA,aAAA;CCJH;ADMG;EACI,eAAA;EACA,gCAAA;EACA,wBAAA;EACA,kCAAA;EACA,0BAAA;EACA,4CAAA;EACA,oCAAA;CCJP;ADbD;EAsBQ,mBAAA;EACA,SAAA;EACA,UAAA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,kBAAA;CCNP;ADtBD;EA+BY,YAAA;EACA,aAAA;CCNX;ADWD;EACI;IACE,WAAA;GCTH;EDWC;IACI,WAAA;GCTL;EDWC;IACI,YAAA;GCTL;EDWC;IACI,WAAA;GCTL;EDYC;IACI,WAAA;GCVL;CACF;ADaC;EACI;IACE,WAAA;GCXL;EDaG;IACI,WAAA;GCXP;EDaG;IACE,YAAA;GCXL;EDaK;IACI,WAAA;GCXT;EDcG;IACI,WAAA;GCZP;CACF;ADeD;EACI,+BAAA;EACA,uBAAA;CCbH","file":"style.less","sourcesContent":["// some style we need preset\n@offset: 188.8;\n@duration: 1.4s;\n\n\n.cvg-preset-container{\n    display: none;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: #fff;\n    opacity: .85;\n\n    &.fadein {\n        display: block;\n        -webkit-animation-duration: .5s;\n        animation-duration: .5s;\n        -webkit-animation-fill-mode: both;\n        animation-fill-mode: both;\n        -webkit-animation-iteration-count: infinite;\n        animation-iteration-count: infinite;\n    }\n\n\n    .icon-camera {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        width: 50px;\n        height: 50px;\n        margin-left: -25px;\n        margin-top: -25px;\n\n        svg {\n            width: 50px;\n            height: 50px;\n        }\n    }\n}\n\n@-webkit-keyframes fadeIn {\n    0% {\n      opacity: 0;\n    }\n    10% {\n        opacity: 0;\n    }\n    15% {\n        opacity: .5;\n    }\n    18% {\n        opacity: 0;\n    }\n\n    100% {\n        opacity: 0;\n    }\n  }\n\n  @keyframes fadeIn {\n      0% {\n        opacity: 0;\n      }\n      10% {\n          opacity: 0;\n      }\n      15% {\n        opacity: .5;\n        }\n        18% {\n            opacity: 0;\n        }\n  \n      100% {\n          opacity: 0;\n      }\n  }\n\n.fadein {\n    -webkit-animation-name: fadeIn;\n    animation-name: fadeIn;\n}\n\n",".cvg-preset-container {\n  display: none;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: #fff;\n  opacity: .85;\n}\n.cvg-preset-container.fadein {\n  display: block;\n  -webkit-animation-duration: .5s;\n  animation-duration: .5s;\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n  -webkit-animation-iteration-count: infinite;\n  animation-iteration-count: infinite;\n}\n.cvg-preset-container .icon-camera {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 50px;\n  height: 50px;\n  margin-left: -25px;\n  margin-top: -25px;\n}\n.cvg-preset-container .icon-camera svg {\n  width: 50px;\n  height: 50px;\n}\n@-webkit-keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  10% {\n    opacity: 0;\n  }\n  15% {\n    opacity: .5;\n  }\n  18% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  10% {\n    opacity: 0;\n  }\n  15% {\n    opacity: .5;\n  }\n  18% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n.fadein {\n  -webkit-animation-name: fadeIn;\n  animation-name: fadeIn;\n}\n"],"sourceRoot":""}]);

	// exports


/***/ },
/* 9 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function(useSourceMap) {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			return this.map(function (item) {
				var content = cssWithMappingToString(item, useSourceMap);
				if(item[2]) {
					return "@media " + item[2] + "{" + content + "}";
				} else {
					return content;
				}
			}).join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

	function cssWithMappingToString(item, useSourceMap) {
		var content = item[1] || '';
		var cssMapping = item[3];
		if (!cssMapping) {
			return content;
		}

		if (useSourceMap && typeof btoa === 'function') {
			var sourceMapping = toComment(cssMapping);
			var sourceURLs = cssMapping.sources.map(function (source) {
				return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
			});

			return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
		}

		return [content].join('\n');
	}

	// Adapted from convert-source-map (MIT)
	function toComment(sourceMap) {
		// eslint-disable-next-line no-undef
		var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
		var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

		return '/*# ' + data + ' */';
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/

	var stylesInDom = {};

	var	memoize = function (fn) {
		var memo;

		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	};

	var isOldIE = memoize(function () {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	});

	var getTarget = function (target) {
	  return document.querySelector(target);
	};

	var getElement = (function (fn) {
		var memo = {};

		return function(target) {
	                // If passing function in options, then use it for resolve "head" element.
	                // Useful for Shadow Root style i.e
	                // {
	                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
	                // }
	                if (typeof target === 'function') {
	                        return target();
	                }
	                if (typeof memo[target] === "undefined") {
				var styleTarget = getTarget.call(this, target);
				// Special case to return head of iframe instead of iframe itself
				if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
					try {
						// This will throw an exception if access to iframe is blocked
						// due to cross-origin restrictions
						styleTarget = styleTarget.contentDocument.head;
					} catch(e) {
						styleTarget = null;
					}
				}
				memo[target] = styleTarget;
			}
			return memo[target]
		};
	})();

	var singleton = null;
	var	singletonCounter = 0;
	var	stylesInsertedAtTop = [];

	var	fixUrls = __webpack_require__(11);

	module.exports = function(list, options) {
		if (false) {
			if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};

		options.attrs = typeof options.attrs === "object" ? options.attrs : {};

		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

		// By default, add <style> tags to the <head> element
	        if (!options.insertInto) options.insertInto = "head";

		// By default, add <style> tags to the bottom of the target
		if (!options.insertAt) options.insertAt = "bottom";

		var styles = listToStyles(list, options);

		addStylesToDom(styles, options);

		return function update (newList) {
			var mayRemove = [];

			for (var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];

				domStyle.refs--;
				mayRemove.push(domStyle);
			}

			if(newList) {
				var newStyles = listToStyles(newList, options);
				addStylesToDom(newStyles, options);
			}

			for (var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];

				if(domStyle.refs === 0) {
					for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

					delete stylesInDom[domStyle.id];
				}
			}
		};
	};

	function addStylesToDom (styles, options) {
		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			if(domStyle) {
				domStyle.refs++;

				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}

				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];

				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}

				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles (list, options) {
		var styles = [];
		var newStyles = {};

		for (var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = options.base ? item[0] + options.base : item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};

			if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
			else newStyles[id].parts.push(part);
		}

		return styles;
	}

	function insertStyleElement (options, style) {
		var target = getElement(options.insertInto)

		if (!target) {
			throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
		}

		var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

		if (options.insertAt === "top") {
			if (!lastStyleElementInsertedAtTop) {
				target.insertBefore(style, target.firstChild);
			} else if (lastStyleElementInsertedAtTop.nextSibling) {
				target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				target.appendChild(style);
			}
			stylesInsertedAtTop.push(style);
		} else if (options.insertAt === "bottom") {
			target.appendChild(style);
		} else if (typeof options.insertAt === "object" && options.insertAt.before) {
			var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
			target.insertBefore(style, nextSibling);
		} else {
			throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
		}
	}

	function removeStyleElement (style) {
		if (style.parentNode === null) return false;
		style.parentNode.removeChild(style);

		var idx = stylesInsertedAtTop.indexOf(style);
		if(idx >= 0) {
			stylesInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement (options) {
		var style = document.createElement("style");

		options.attrs.type = "text/css";

		addAttrs(style, options.attrs);
		insertStyleElement(options, style);

		return style;
	}

	function createLinkElement (options) {
		var link = document.createElement("link");

		options.attrs.type = "text/css";
		options.attrs.rel = "stylesheet";

		addAttrs(link, options.attrs);
		insertStyleElement(options, link);

		return link;
	}

	function addAttrs (el, attrs) {
		Object.keys(attrs).forEach(function (key) {
			el.setAttribute(key, attrs[key]);
		});
	}

	function addStyle (obj, options) {
		var style, update, remove, result;

		// If a transform function was defined, run it on the css
		if (options.transform && obj.css) {
		    result = options.transform(obj.css);

		    if (result) {
		    	// If transform returns a value, use that instead of the original css.
		    	// This allows running runtime transformations on the css.
		    	obj.css = result;
		    } else {
		    	// If the transform function returns a falsy value, don't add this css.
		    	// This allows conditional loading of css
		    	return function() {
		    		// noop
		    	};
		    }
		}

		if (options.singleton) {
			var styleIndex = singletonCounter++;

			style = singleton || (singleton = createStyleElement(options));

			update = applyToSingletonTag.bind(null, style, styleIndex, false);
			remove = applyToSingletonTag.bind(null, style, styleIndex, true);

		} else if (
			obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function"
		) {
			style = createLinkElement(options);
			update = updateLink.bind(null, style, options);
			remove = function () {
				removeStyleElement(style);

				if(style.href) URL.revokeObjectURL(style.href);
			};
		} else {
			style = createStyleElement(options);
			update = applyToTag.bind(null, style);
			remove = function () {
				removeStyleElement(style);
			};
		}

		update(obj);

		return function updateStyle (newObj) {
			if (newObj) {
				if (
					newObj.css === obj.css &&
					newObj.media === obj.media &&
					newObj.sourceMap === obj.sourceMap
				) {
					return;
				}

				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;

			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag (style, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (style.styleSheet) {
			style.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = style.childNodes;

			if (childNodes[index]) style.removeChild(childNodes[index]);

			if (childNodes.length) {
				style.insertBefore(cssNode, childNodes[index]);
			} else {
				style.appendChild(cssNode);
			}
		}
	}

	function applyToTag (style, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			style.setAttribute("media", media)
		}

		if(style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			while(style.firstChild) {
				style.removeChild(style.firstChild);
			}

			style.appendChild(document.createTextNode(css));
		}
	}

	function updateLink (link, options, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		/*
			If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
			and there is no publicPath defined then lets turn convertToAbsoluteUrls
			on by default.  Otherwise default to the convertToAbsoluteUrls option
			directly
		*/
		var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

		if (options.convertToAbsoluteUrls || autoFixUrls) {
			css = fixUrls(css);
		}

		if (sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = link.href;

		link.href = URL.createObjectURL(blob);

		if(oldSrc) URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	
	/**
	 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
	 * embed the css on the page. This breaks all relative urls because now they are relative to a
	 * bundle instead of the current page.
	 *
	 * One solution is to only use full urls, but that may be impossible.
	 *
	 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
	 *
	 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
	 *
	 */

	module.exports = function (css) {
	  // get current location
	  var location = typeof window !== "undefined" && window.location;

	  if (!location) {
	    throw new Error("fixUrls requires window.location");
	  }

		// blank or null?
		if (!css || typeof css !== "string") {
		  return css;
	  }

	  var baseUrl = location.protocol + "//" + location.host;
	  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

		// convert each url(...)
		/*
		This regular expression is just a way to recursively match brackets within
		a string.

		 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
		   (  = Start a capturing group
		     (?:  = Start a non-capturing group
		         [^)(]  = Match anything that isn't a parentheses
		         |  = OR
		         \(  = Match a start parentheses
		             (?:  = Start another non-capturing groups
		                 [^)(]+  = Match anything that isn't a parentheses
		                 |  = OR
		                 \(  = Match a start parentheses
		                     [^)(]*  = Match anything that isn't a parentheses
		                 \)  = Match a end parentheses
		             )  = End Group
	              *\) = Match anything and then a close parens
	          )  = Close non-capturing group
	          *  = Match anything
	       )  = Close capturing group
		 \)  = Match a close parens

		 /gi  = Get all matches, not the first.  Be case insensitive.
		 */
		var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
			// strip quotes (if they exist)
			var unquotedOrigUrl = origUrl
				.trim()
				.replace(/^"(.*)"$/, function(o, $1){ return $1; })
				.replace(/^'(.*)'$/, function(o, $1){ return $1; });

			// already a full url? no change
			if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
			  return fullMatch;
			}

			// convert the url to a full url
			var newUrl;

			if (unquotedOrigUrl.indexOf("//") === 0) {
			  	//TODO: should we add protocol?
				newUrl = unquotedOrigUrl;
			} else if (unquotedOrigUrl.indexOf("/") === 0) {
				// path should be relative to the base url
				newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
			} else {
				// path should be relative to current directory
				newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
			}

			// send back the fixed url(...)
			return "url(" + JSON.stringify(newUrl) + ")";
		});

		// send back the fixed css
		return fixedCss;
	};


/***/ }
/******/ ]);
//# sourceMappingURL=core-video-to-gif.js.map