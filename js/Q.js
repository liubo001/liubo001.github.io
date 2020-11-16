(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * Q.js v1.0.12
 * Inspired from vue.js
 * (c) 2016 Daniel Yang
 * Released under the MIT License.
 */

/**
 * Just support modern browser
 */
(function webpackUniversalModuleDefinition(root, factory) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && (typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object') module.exports = factory();else if (typeof define === 'function' && define.amd) define([], factory);else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') exports["Q"] = factory();else root["Q"] = factory();
})(void 0, function () {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId])
          /******/
          return installedModules[moduleId].exports;
        /******/
        // Create a new module (and put it into the cache)

        /******/

        var module = installedModules[moduleId] = {
          /******/
          exports: {},

          /******/
          id: moduleId,

          /******/
          loaded: false
          /******/

        };
        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        // Flag the module as loaded

        /******/

        module.loaded = true;
        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/
      // __webpack_public_path__

      /******/

      __webpack_require__.p = "";
      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(0);
      /******/
    }(
    /************************************************************************/

    /******/
    [
    /* 0 */

    /***/
    function (module, exports, __webpack_require__) {
      var utils = __webpack_require__(1),
          _ = __webpack_require__(3),
          factory = __webpack_require__(4);

      _.extend(utils, _);

      module.exports = factory(utils);
      /***/
    },
    /* 1 */

    /***/
    function (module, exports, __webpack_require__) {
      var noop = function noop() {},
          defer = window.requestAnimationFrame || window.webkitRequestAnimationFrame || setTimeout,
          cache = new (__webpack_require__(2))(1000),
          // priority directives
      priorities = ['vm', 'repeat', 'if'],
          _qtid = 0,
          _slice = [].slice,
          _alpaca = document.getElementsByTagName('html')[0],
          slice = function () {
        try {
          _slice.call(document.body.childNodes);

          return _slice;
        } catch (e) {
          return function (i) {
            i = i || 0;
            var res = [],
                l = this.length;

            for (; i < l; i++) {
              res.push(this[i]);
            }

            return res;
          };
        }
      }();

      _alpaca && (_alpaca = _alpaca.getAttribute('alpaca'));

      function _loopPriority(el, res, setting) {
        var attr, tmp; // TODO need optimization

        for (var j = 0, l = priorities.length; j < l; j++) {
          attr = 'q-' + priorities[j];

          if (tmp = el.getAttribute(attr)) {
            res.push({
              name: attr,
              value: tmp
            });
            el.removeAttribute(attr); // has priority directive

            return true;
          }
        }
      }

      function walk($el, cb, setting) {
        setting = setting || {};
        var i, j, l, el, atts, res, qtid;

        for (i = 0; el = $el[i++];) {
          if (el.nodeType === 1) {
            atts = el.attributes;
            res = []; // loop the priority directive

            if (!_loopPriority(el, res, setting)) {
              // loop other directive
              for (j = 0, l = atts.length; j < l; j++) {
                atts[j].name.indexOf('q-') === 0 && res.push({
                  name: atts[j].name,
                  value: atts[j].value
                });
              }
            }

            res.length > 0 && cb(el, res, setting);
          }

          if (el.childNodes.length && !setting.stop) walk(slice.call(el.childNodes, 0), cb, setting); // reset stop

          setting.stop = false;
        }
      }

      module.exports = {
        slice: slice,
        noop: noop,

        /**
         * Add class with compatibility for IE & SVG
         *
         * @param {Element} el
         * @param {Strong} cls
         */
        addClass: function addClass(el, cls) {
          if (el.classList) {
            el.classList.add(cls);
          } else {
            var cur = ' ' + (el.className || '') + ' ';

            if (cur.indexOf(' ' + cls + ' ') < 0) {
              el.className = (cur + cls).trim();
            }
          }
        },

        /**
         * Remove class with compatibility for IE & SVG
         *
         * @param {Element} el
         * @param {Strong} cls
         */
        removeClass: function removeClass(el, cls) {
          if (el.classList) {
            el.classList.remove(cls);
          } else {
            var cur = ' ' + (el.className || '') + ' ',
                tar = ' ' + cls + ' ';

            while (cur.indexOf(tar) >= 0) {
              cur = cur.replace(tar, ' ');
            }

            el.className = cur.trim();
          }
        },
        noexist: function noexist(vm, name) {
          this.warn(vm);
          throw new Error('Filter ' + name + ' hasn\'t implemented.');
        },
        warn: function () {
          return window.console && console.error ? function () {
            console.error.apply(console, arguments);
          } : noop;
        }(),
        isObject: function isObject(o) {
          return _typeof(o) === 'object';
        },
        nextTick: function nextTick(cb, ctx) {
          return ctx ? defer(function () {
            cb.call(ctx);
          }, 0) : defer(cb, 0);
        },

        /**
         * get
         * @param {String} namespace
         * @param {String} key
         * @returns {String}
         */
        get: function get(namespace, key) {
          var arr = [];
          namespace && arr.push(namespace);
          key && arr.push(key);
          return arr.join('.').replace(/^(.+\.)?\$top\./, '');
        },
        walk: walk,

        /**
         * alpaca
         * just a flag
         */
        alpaca: !!_alpaca
      };
      /***/
    },
    /* 2 */

    /***/
    function (module, exports) {
      /**
       * just a copy of: https://github.com/yyx990803/vue/blob/master/src/cache.js
       *
       * @param {Number} limit
       * @constructor
       */
      function Cache(limit) {
        this.size = 0;
        this.limit = limit;
        this.head = this.tail = undefined;
        this._keymap = {};
      }

      var p = Cache.prototype;
      /**
       * Put <value> into the cache associated with <key>.
       * Returns the entry which was removed to make room for
       * the new entry. Otherwise undefined is returned.
       * (i.e. if there was enough room already).
       *
       * @param {String} key
       * @param {*} value
       * @return {Entry|undefined}
       */

      p.put = function (key, value) {
        var entry = {
          key: key,
          value: value
        };
        this._keymap[key] = entry;

        if (this.tail) {
          this.tail.newer = entry;
          entry.older = this.tail;
        } else {
          this.head = entry;
        }

        this.tail = entry;

        if (this.size === this.limit) {
          return this.shift();
        } else {
          this.size++;
        }
      };
      /**
       * Purge the least recently used (oldest) entry from the
       * cache. Returns the removed entry or undefined if the
       * cache was empty.
       */


      p.shift = function () {
        var entry = this.head;

        if (entry) {
          this.head = this.head.newer;
          this.head.older = undefined;
          entry.newer = entry.older = undefined;
          this._keymap[entry.key] = undefined;
        }

        return entry;
      };
      /**
       * Get and register recent use of <key>. Returns the value
       * associated with <key> or undefined if not in cache.
       *
       * @param {String} key
       * @param {Boolean} returnEntry
       * @return {Entry|*}
       */


      p.get = function (key, returnEntry) {
        var entry = this._keymap[key];
        if (entry === undefined) return;

        if (entry === this.tail) {
          return returnEntry ? entry : entry.value;
        } // HEAD--------------TAIL
        //   <.older   .newer>
        //  <--- add direction --
        //   A  B  C  <D>  E


        if (entry.newer) {
          if (entry === this.head) {
            this.head = entry.newer;
          }

          entry.newer.older = entry.older; // C <-- E.
        }

        if (entry.older) {
          entry.older.newer = entry.newer; // C. --> E
        }

        entry.newer = undefined; // D --x

        entry.older = this.tail; // D. --> E

        if (this.tail) {
          this.tail.newer = entry; // E. <-- D
        }

        this.tail = entry;
        return returnEntry ? entry : entry.value;
      };

      module.exports = Cache;
      /***/
    },
    /* 3 */

    /***/
    function (module, exports) {
      var DELEGATOR_CALLBACKS_KEY = '__cbs__',
          NO_DELEGATOR = {
        // prevent mouseover trigger more than one time
        mouseover: true,
        change: true,
        input: true,
        porpertychange: true
      };

      var _extend = function _extend(target, srcs) {
        srcs = [].splice.call(arguments, 1);
        var i = 0,
            l = srcs.length,
            src,
            key;

        for (; i < l; i++) {
          src = srcs[i];

          for (key in src) {
            target[key] = src[key];
          }
        }

        return target;
      },
          _expando = 'QDataUid',
          _uid = 0,
          _map = {};

      function contains(a, b) {
        return a !== b && a.contains(b);
      }

      function data(el, key, value) {
        var uid = el[_expando] = el[_expando] || ++_uid,
            data = _map[uid] = _map[uid] || {}; // set Data

        if (value === undefined) return data[key];
        return data[key] = value;
      }

      function _add(el, evt, fn) {
        evt.split(' ').forEach(function (e) {
          el.addEventListener(e, fn, false);
        });
      }

      module.exports = {
        find: function find(selector) {
          return this.slice.call(document.querySelectorAll(selector), 0);
        },
        contains: contains,
        data: data,
        cleanData: function cleanData(els) {
          var uid;
          els.forEach(function (el) {
            var uid = el[_expando]; // has data

            uid && uid in _map && delete _map[uid];
          });
        },
        add: function add(el, evt, fn, vm) {
          if (!vm || NO_DELEGATOR[evt]) {
            _add(el, evt, fn);
          } else {
            var $el = vm.$el,
                cbs = data($el, DELEGATOR_CALLBACKS_KEY);

            if (!cbs) {
              cbs = [];
              data($el, DELEGATOR_CALLBACKS_KEY, cbs);

              _add($el, evt, function (e) {
                var target = e.target;
                cbs.forEach(function (cb) {
                  var fn = cb.fn,
                      el = cb.el;

                  if (contains(el, target)) {
                    fn.call(el, e);
                  }
                });
              });
            } // push


            cbs.push({
              el: el,
              fn: fn
            });
          }
        },
        remove: function remove(el, evt, fn) {
          el.removeEventListener(evt, fn, false);
        },
        clone: function clone(ele) {
          return ele.cloneNode(true);
        },
        extend: function extend(target) {
          if (arguments.length === 1) return _extend(this, target);
          return _extend.apply(this, arguments);
        }
      };
      /***/
    },
    /* 4 */

    /***/
    function (module, exports, __webpack_require__) {
      module.exports = function (_) {
        var Seed = __webpack_require__(5),
            events = __webpack_require__(6),
            MARK = /\{\{(.+?)\}\}/,
            mergeOptions = __webpack_require__(7).mergeOptions,
            clas = __webpack_require__(8),
            _doc = document;

        function _inDoc(ele) {
          return _.contains(_doc.documentElement, ele);
        } // lifecycle: created -> compiled

        /**
         * Q
         * @class
         * @param {Object} options
         */


        function Q(options) {
          this._init(options);
        } // exports utils


        Q._ = _;
        Q.options = {
          directives: __webpack_require__(9),
          filters: {}
        };
        /**
         * get
         * @param {String | Element} selector
         * @return {Q}
         */

        Q.get = function (selector) {
          var ele = _.find(selector)[0];

          if (ele) {
            return _.data(ele, 'QI');
          } else {
            return new this({
              el: selector
            });
          }
        };
        /**
         * all
         * @param {Object} options
         */


        Q.all = function (options) {
          var self = this;
          return _.find(options.el).map(function (ele) {
            return new self(_.extend(options, {
              el: ele
            }));
          });
        };

        _.extend(Q, clas);

        _.extend(Q.prototype, {
          _init: function _init(options) {
            options = options || {};
            this.$el = options.el && typeof options.el === 'string' ? _.find(options.el)[0] : options.el; // element references

            this.$$ = {}; // set parent vm

            this.$parent = options._parent; // merge options

            options = this.$options = mergeOptions(this.constructor.options, options, this); // lifecycle state

            this._isCompiled = false;
            this._isAttached = false;
            this._isReady = false; // events bookkeeping

            this._events = {};
            this._watchers = {}; // components

            this._children = []; // components references

            this.$ = {};
            Seed.call(this, options); // this._data = options.data;
            // initialize data and scope inheritance.

            this._initScope(); // call created hook


            this._callHook('created'); // start compilation


            if (this.$el) {
              // cache the instance
              _.data(this.$el, 'QI', this);

              this.$mount(this.$el);
            }
          },

          /**
           * Listen on the given `event` with `fn`.
           *
           * @param {String} event
           * @param {Function} fn
           */
          $on: function $on(event, fn) {
            (this._events[event] || (this._events[event] = [])).push(fn);
            return this;
          },

          /**
           * Adds an `event` listener that will be invoked a single
           * time then automatically removed.
           *
           * @param {String} event
           * @param {Function} fn
           */
          $once: function $once(event, fn) {
            var self = this;

            function on() {
              self.$off(event, on);
              fn.apply(this, arguments);
            }

            on.fn = fn;
            this.$on(event, on);
            return this;
          },

          /**
           * Remove the given callback for `event` or all
           * registered callbacks.
           *
           * @param {String} event
           * @param {Function} fn
           */
          $off: function $off(event, fn) {
            var cbs, cb, i; // all event

            if (!arguments.length) {
              this._events = {};
              return this;
            } // specific event


            cbs = this._events[event];

            if (!cbs) {
              return this;
            }

            if (arguments.length === 1) {
              this._events[event] = null;
              return this;
            } // specific handler


            i = cbs.length;

            while (i--) {
              cb = cbs[i];

              if (cb === fn || cb.fn === fn) {
                cbs.splice(i, 1);
                break;
              }
            }

            return this;
          },

          /**
           * Watch an expression, trigger callback when its
           * value changes.
           *
           * @param {String} exp
           * @param {Function} cb
           * @param {Boolean} [deep]
           * @param {Boolean} [immediate]
           * @return {Function} - unwatchFn
           */
          $watch: function $watch(exp, cb, deep, immediate) {
            var key = deep ? exp + '**deep**' : exp;
            (this._watchers[key] || (this._watchers[key] = [])).push(cb);
            immediate && cb(this.data(exp));
            return this;
          },

          /**
           * Trigger an event on self.
           *
           * @param {String} e
           */
          $emit: function $emit(e) {
            var args = _.slice.call(arguments, 1);

            events.emit.call(this, e, _.slice.call(args, 0)); // emit data change

            if (!e.indexOf('data:')) {
              e = e.substring(5);
              events.callChange.call(this, e, _.slice.call(args, 0));
            }

            if (!e.indexOf('deep:')) {
              e = e.substring(5);
              events.callDeep.call(this, e, _.slice.call(args, 0));
              args.unshift(e);
              events.emit.call(this, 'datachange', args);
            }

            return this;
          },

          /**
           * Setup the scope of an instance, which contains:
           * - observed data
           * - computed properties
           * - user methods
           * - meta properties
           */
          _initScope: function _initScope() {
            this._initMethods();
          },

          /**
           * Setup instance methods. Methods must be bound to the
           * instance since they might be called by children
           * inheriting them.
           */
          _initMethods: function _initMethods() {
            var methods = this.$options.methods,
                key;

            if (methods) {
              for (key in methods) {
                this[key] = methods[key].bind(this);
              }
            }
          },

          /**
           * Set instance target element and kick off the compilation
           * process. The passed in `el` can be a template string, an
           * existing Element, or a DocumentFragment (for block
           * instances).
           *
           * @param {String|Element|DocumentFragment} el
           * @public
           */
          $mount: function $mount(el) {
            if (this._isCompiled) {
              return _.warn('$mount() should be called only once');
            } // TODO for template || we may not do for template
            // if (typeof el === 'string') {
            //
            // }


            this._compile(el);

            this._isCompiled = true;

            this._callHook('compiled');

            if (_inDoc(this.$el)) {
              this._callHook('attached');

              this._ready();
            } else {
              this.$once('hook:attached', this._ready);
            }
          },

          /**
           * ready
           */
          _ready: function _ready() {
            this._isAttached = true;
            this._isReady = true;

            this._callHook('ready');
          },

          /**
           * Transclude, compile and link element.
           *
           * If a pre-compiled linker is available, that means the
           * passed in element will be pre-transcluded and compiled
           * as well - all we need to do is to call the linker.
           *
           * Otherwise we need to call transclude/compile/link here.
           *
           * @param {Element} el
           * @return {Element}
           */
          _compile: function _compile(el) {
            this.transclue(el, this.$options);
          },

          /**
           * Process an element or a DocumentFragment based on a
           * instance option object. This allows us to transclude
           * a template node/fragment before the instance is created,
           * so the processed fragment can then be cloned and reused
           * in v-repeat.
           *
           * @param {Element} el
           * @param {Object} options
           */
          transclue: function transclue(el, options) {
            // just bind template
            this._templateBind(el, options);
          },

          /**
           * bind rendered template
           */
          _templateBind: __webpack_require__(11),

          /**
           * Trigger all handlers for a hook
           *
           * @param {String} hook
           */
          _callHook: function _callHook(hook) {
            var handlers = this.$options[hook];

            if (handlers) {
              for (var i = 0, j = handlers.length; i < j; i++) {
                handlers[i].call(this);
              }
            }

            this.$emit('hook:' + hook);
          },
          _makeReadFilters: function _makeReadFilters(names, $this) {
            if (!names.length) return [];
            var filters = this.$options.filters,
                self = this;
            return names.map(function (args) {
              args = _.slice.call(args, 0);
              var name = args.shift();
              var reader = filters[name] ? filters[name].read || filters[name] : _.noexist(self, name);
              return function (value, oldVal) {
                // don't modify args
                var thisArgs = [value].concat(args || []),
                    i = thisArgs.indexOf('$this');
                thisArgs.push(oldVal); // replace $this

                if (~i) {
                  thisArgs[i] = $this;
                }

                return args ? reader.apply(self, thisArgs) : reader.call(self, value, oldVal);
              };
            });
          },

          /**
           * Apply filters to a value
           *
           * @param {*} value
           * @param {Array} filters
           * @param {*} oldVal
           * @return {*}
           */
          applyFilters: function applyFilters(value, filters, oldVal) {
            if (!filters || !filters.length) {
              return value;
            }

            for (var i = 0, l = filters.length; i < l; i++) {
              value = filters[i].call(this, value, oldVal);
            }

            return value;
          }
        });

        _.extend(Q.prototype, Seed.prototype);

        return Q;
      };
      /***/

    },
    /* 5 */

    /***/
    function (module, exports, __webpack_require__) {
      var _ = __webpack_require__(1);
      /**
       * prefix data
       * @param {Data || DataArray} up
       * @param {String} key
       * @param {*} value
       * @param {Boolean} trigger or not
       */


      function _prefix(up, key, value, trigger) {
        var top = up._top,
            isArray = _isArray(value),
            options = {
          data: value,
          up: up,
          top: top,
          namespace: key + '',
          trigger: isArray ? false : trigger
        },
            // old value
        oldVal = top.data ? top.data(up.$namespace(key)) : undefined;

        if (_typeof(value) === 'object' && value !== null) {
          up[key] = isArray ? new DataArray(options) : new Data(options); // trigger data change

          trigger && up.$change(up.$namespace(key), up[key], oldVal);
        } else if (oldVal !== value) {
          up[key] = value; // trigger data change

          trigger && up.$change(up.$namespace(key), value, oldVal);
        }

        if (!~up._keys.indexOf(key)) up._keys.push(key);
      }

      function _isArray(obj) {
        return Array.isArray(obj) || obj instanceof DataArray;
      }

      function _getLength(keys) {
        return keys.filter(function (key) {
          return typeof key === 'number';
        }).length;
      }
      /**
       * Data
       * @class
       * @param {Object} options
       */


      function Data(options) {
        var data = options.data,
            keys = Object.keys(options.data || {}).filter(function (key) {
          return key.indexOf('_') !== 0;
        }).map(function (num) {
          return +num + '' === num ? +num : num;
        }),
            self = this;

        _.extend(this, data); // all key need to traverse


        this._keys = keys; // parent data container

        this._up = options.up; // the most top parent data container

        this._top = options.top || this; // the namespace of data

        this._namespace = options.namespace || '';
        keys.forEach(function (key) {
          _prefix(self, key, data[key], options.trigger);
        }); // if it is a array

        _isArray(data) && ( // fix the length
        this.length = _getLength(keys));
      }

      _.extend(Data.prototype, {
        /**
         * get the namespace
         */
        $namespace: function $namespace(key) {
          var keys = [],
              self = this;

          for (; self != undefined; self = self._up) {
            self._namespace && keys.unshift(self._namespace);
          }

          if (key) keys.push(key);
          return keys.join('.');
        },

        /**
         * get the key of it's parent
         */
        $key: function $key() {
          var key = this._namespace;
          return +key + '' === key ? +key : key;
        },

        /**
         * get the parent of the data
         */
        $up: function $up(num) {
          num = num || 1;

          for (var src = this; num--;) {
            src = src['_up'];
          }

          return src;
        },

        /**
         * set the value of the key
         */
        $set: function $set(key, value) {
          if (_typeof(key) === 'object') {
            var self = this;
            Object.keys(key).filter(function (k) {
              return k.indexOf('_') !== 0;
            }).forEach(function (k) {
              _prefix(self, k, key[k], true);
            });
            this.$change(this.$namespace(key), this, undefined, 1);
          } else {
            var oldValue = this[key];

            _prefix(this, key, value, true); // just bubble


            this.$change(this.$namespace(key), this[key], oldValue, undefined, -1);
          }

          return this;
        },

        /**
         * get the actual value
         */
        $get: function $get() {
          var res,
              keys = this._keys,
              self = this;

          if (this instanceof Data) {
            res = {};
          } else {
            res = [];
          }

          keys.forEach(function (key) {
            res[key] = self[key] == null ? self[key] : self[key].$get ? self[key].$get() : self[key];
          });
          return res;
        },

        /**
         * change
         * type = 0 just change
         * type = 1 trigger change & deep
         * type = -1 just deep
         */
        $change: function $change(key, value, oldVal, patch, type) {
          type = type || 0;
          var top = this._top;

          if (top.$emit) {
            ~type && this._top.$emit('data:' + key, value, oldVal, patch);
            type && this._top.$emit('deep:' + key, value, oldVal, patch);
          }
        }
      });
      /**
       * DataArray
       * Something just like Array
       * @class
       * @param {Object} options
       */


      function DataArray(options) {
        Data.call(this, options);
      }

      _.extend(DataArray.prototype, Data.prototype, {
        /**
         * push data
         */
        push: function push(values) {
          values = _.slice.call(arguments, 0);
          var res = [];

          for (var i = 0, l = values.length; i < l; i++) {
            _prefix(this, this.length, values[i]);

            this._keys.push(this.length);

            res.push(this[this.length]);
            this.length++;
          } // value, oldValue, patch


          this.$change(this.$namespace(), this, null, {
            method: 'push',
            res: res,
            args: values
          }, 1);
          return this;
        },

        /**
         * pop data
         */
        pop: function pop() {
          var res = this[--this.length];
          delete this[this.length];

          this._keys.pop();

          this.$change(this.$namespace(), this, null, undefined, 1);
          return res;
        },

        /**
         * unshift
         */
        unshift: function unshift(value) {
          this._keys.push(this.length);

          this.length++;

          for (var l = this.length; l--;) {
            this[l] = this[l - 1]; // fixed namespace

            _typeof(this[l]) === 'object' && (this[l]._namespace = l + '');
          }

          _prefix(this, 0, value);

          this.$change(this.$namespace(), this, null, undefined, 1);
          return this;
        },

        /**
         * shift
         */
        shift: function shift() {
          this.length--;
          var res = this[0];

          for (var i = 0, l = this.length; i < l; i++) {
            this[i] = this[i + 1]; // fixed namespace

            _typeof(this[i]) === 'object' && (this[i]._namespace = i + '');
          }

          this._keys.pop();

          delete this[this.length];
          this.$change(this.$namespace(), this, null, undefined, 1);
          return res;
        },

        /**
         * touch
         */
        touch: function touch(key) {
          this.$change(this.$namespace(key), this, null, undefined, 1);
        },

        /**
         * indexOf
         */
        indexOf: function indexOf(item) {
          if (item._up === this) {
            var i = +item._namespace;
            if (this[i] === item) return i;
          } else if (_typeof(item) !== 'object') {
            for (var i = 0, l = this.length; i < l; i++) {
              if (this[i] === item) return i;
            }
          }

          return -1;
        },

        /**
         * splice
         */
        splice: function splice(i, l
        /**, items support later **/
        ) {
          var patch = {
            method: 'splice',
            args: [i, l]
          };

          for (var j = 0, k = l + i, z = this.length - l; i < z; i++, j++) {
            this[i] = this[k + j];
            _typeof(this[i]) === 'object' && (this[i]._namespace = i + '');
          }

          for (; i < this.length; i++) {
            this[i] = null;
            delete this[i];
          }

          this.length -= l;

          this._keys.splice(this.length, l);

          this.$change(this.$namespace(), this, null, patch, 1);
        },

        /**
         * forEach
         */
        forEach: function forEach(foo) {
          for (var i = 0, l = this.length; i < l; i++) {
            foo(this[i], i);
          }
        },

        /**
         * filter
         */
        filter: function filter(foo) {
          var res = [];
          this.forEach(function (item, i) {
            if (foo(item)) res.push(item);
          });
          return res;
        }
      });
      /**
       * Seed
       * @param {Object} options
       */


      function Seed(options) {
        Data.call(this, options);
      }

      _.extend(Seed, {
        Data: Data,
        DataArray: DataArray
      });

      _.extend(Seed.prototype, Data.prototype, {
        /**
         * Set data and Element value
         *
         * @param {String} key
         * @param {*} value
         * @returns {Data}
         */
        data: function data(key, value) {
          if (key === undefined) return this;
          var i = 0,
              l,
              data = this,
              next;

          if (~key.indexOf('.')) {
            var keys = key.split('.');

            for (l = keys.length; i < l - 1; i++) {
              key = keys[i]; // key is number

              if (+key + '' === key) key = +key;

              if (key in data && data[key] != null) {
                data = data[key];
              } else if (value === undefined) {
                // data is undefind
                return undefined;
              } else {
                next = keys[i + 1]; // next is number

                if (+next + '' == next) {
                  // set a array
                  _prefix(data, key, [], true);
                } else {
                  // set a object
                  _prefix(data, key, {}, true);
                }
              }
            }
          }

          l && (key = keys[i]); // if data === undefined, just return

          if (value === undefined) return data && key ? data[key] : data;
          data.$set(key, value);
          return data[key];
        }
      });

      module.exports = Seed;
      /***/
    },
    /* 6 */

    /***/
    function (module, exports, __webpack_require__) {
      var Data = __webpack_require__(5),
          _ = __webpack_require__(1);

      function emit(key, args, target) {
        // set the trigger target is pass in or this
        target = target || this;
        var cbs = this._events[key];

        if (cbs) {
          var i = 0;
          cbs = cbs.length > 1 ? _.slice.call(cbs, 0) : cbs;

          for (var l = cbs.length; i < l; i++) {
            cbs[i].apply(target, args);
          }
        } // emit parent
        // prevent data: event and hook: event trigger


        if (key.indexOf('data:') && key.indexOf('hook:') && key.indexOf('deep:') && this.$parent) {
          emit.call(this.$parent, key, args, target);
        }
      }

      function callChange(key, args) {
        var self = {
          _events: this._watchers
        };
        emit.call(self, key, args);
        emit.call(self, key + '**deep**', args);
      }

      function callDeep(key, args) {
        var props,
            nArgs,
            keys = key.split('.'),
            self = {
          _events: this._watchers
        };

        for (keys.pop(); keys.length > 0; keys.pop()) {
          key = keys.join('.');
          props = key + '**deep**'; // remove the old value

          emit.call(self, props, [this.data(key)]);
        } // emit vm is change


        emit.call(self, '**deep**', [this]);
      }

      module.exports = {
        emit: emit,
        callChange: callChange,
        callDeep: callDeep
      };
      /***/
    },
    /* 7 */

    /***/
    function (module, exports, __webpack_require__) {
      var _ = __webpack_require__(1);

      var strats = {};

      strats.created = strats.ready = strats.attached = strats.detached = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.paramAttributes = function (parentVal, childVal) {
        return childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
      };

      strats.data = strats.filters = strats.methods = strats.directives = function (parentVal, childVal) {
        if (!childVal) return parentVal;
        if (!parentVal) return childVal;
        return _.extend({}, parentVal, childVal);
      };

      var defaultStrat = function defaultStrat(parentVal, childVal) {
        return childVal === undefined ? parentVal : childVal;
      };
      /**
       * Option overwriting strategies are functions that handle
       * how to merge a parent option value and a child option
       * value into the final value.
       *
       * All strategy functions follow the same signature:
       *
       * @param {*} parentVal
       * @param {*} childVal
       * @param {Vue} [vm]
       */


      function mergeOptions(parent, child, vm) {
        var options = {},
            key;

        for (key in parent) {
          merge(key);
        }

        for (key in child) {
          if (!parent.hasOwnProperty(key)) {
            merge(key);
          }
        }

        function merge(key) {
          var strat = strats[key] || defaultStrat;
          options[key] = strat(parent[key], child[key], vm, key);
        }

        return options;
      }

      module.exports = {
        strats: strats,
        mergeOptions: mergeOptions
      };
      /***/
    },
    /* 8 */

    /***/
    function (module, exports, __webpack_require__) {
      // Modules map
      var modules = {},
          mergeOptions = __webpack_require__(7).mergeOptions,
          listeners = {};

      function _define(name, options) {
        if (modules[name]) return false;
        var module = modules[name] = this.extend(options || {});
        return module;
      }

      function _require(name, callback) {
        return modules[name] || this;
      }

      function _create(o) {
        function F() {}

        F.prototype = o;
        return new F();
      }

      function _extend(extendOptions) {
        extendOptions = extendOptions || {};
        var Super = this,
            Sub = createClass(extendOptions.name || 'QComponent');
        Sub.prototype = _create(Super.prototype);
        Sub.prototype.constructor = Sub;
        Sub.options = mergeOptions(Super.options, extendOptions);
        Sub['super'] = Super;
        ['extend', 'get', 'all', 'require', 'define'].forEach(function (key) {
          Sub[key] = Super[key];
        });
        return Sub;
      }

      function createClass(name) {
        return new Function('return function ' + name + ' (options) { this._init(options) }')();
      }

      module.exports = {
        /**
         * define
         * define a component
         * @param {String} name
         * @param {Object} options
         */
        define: _define,

        /**
         * require
         * require(name)
         * require(names, callback)
         * require a component
         * @param {String} name
         * @param {Array} names
         * @param {Function} callback
         */
        require: _require,

        /**
         * extend
         * extend the class
         * @param {Object} options
         */
        extend: _extend
      };
      /***/
    },
    /* 9 */

    /***/
    function (module, exports, __webpack_require__) {
      var _ = __webpack_require__(1),
          strats = __webpack_require__(7);

      var PROP_REG = /^(.*)\.([\w\-]+)$/;
      module.exports = {
        cloak: {
          bind: function bind() {
            var vm = this.vm,
                el = this.el; // after ready

            vm.$once('hook:ready', function () {
              // if data change
              vm.$once('datachange', function () {
                el.removeAttribute('q-cloak');
              });
            });
          }
        },
        show: function show(value) {
          var el = this.el;

          if (value) {
            el.style.display = '';
            var display = el.currentStyle ? el.currentStyle.display : getComputedStyle(el, null).display;

            if (display === 'none') {
              el.style.display = 'block';
            }
          } else {
            el.style.display = 'none';
          }
        },
        'class': function _class(value) {
          var el = this.el,
              arg = this.arg;

          if (arg) {
            value ? _.addClass(el, arg) : _.removeClass(el, arg);
          } else {
            if (this.lastVal) {
              _.removeClass(el, this.lastVal);
            }

            if (value) {
              _.addClass(el, value);

              this.lastVal = value;
            }
          }
        },
        value: function value(_value) {
          var el = this.el;

          if (el.type === 'checkbox') {
            el.checked = _value;
          } else {
            el.value = _value;
          }
        },
        attr: function attr(value) {
          if (value === undefined) return;
          var arg = this.arg,
              el = this.el; // property

          if (arg === 'style') {
            if (_typeof(value) === 'object') {
              for (var k in value) {
                if (value.hasOwnProperty(k)) {
                  el.style[k] = value[k];
                }
              }
            } else {
              el.setAttribute(arg, value);
            }
          } else {
            if (arg in el) {
              el[arg] = value;
            } else {
              el.setAttribute(arg, value);
            }
          }
        },
        text: function text(value) {
          var text;
          value !== undefined && (text = typeof this.el.textContent === 'string' ? 'textContent' : 'innerText') && (this.el[text] = value == null ? '' : value.toString());
        },
        html: function html(value) {
          this.el.innerHTML = value && value.toString() || '';
        },
        on: {
          bind: function bind() {
            var self = this,
                key = this.target,
                param = this.param,
                filters = this.filters,
                vm = this.vm,
                handler = vm.applyFilters(this.vm[key], filters),
                data = param && ~param.indexOf('this') && self.data();

            _.add(this.el, this.arg, function (e) {
              if (!handler || typeof handler !== 'function') {
                return _.warn('You need implement the ' + key + ' method.');
              }

              var args = [];
              param ? param.forEach(function (arg) {
                if (arg === 'e') args.push(e);else if (arg === 'this') args.push(data);else if (arg === 'true') args.push(true);else if (arg === 'false') args.push(false);else if (+arg + '' === arg) args.push(+arg);else if (arg.match(/^(['"]).*\1$/)) args.push(arg.slice(1, -1));else args.push(self.data(arg));
              }) : args.push(e);
              handler.apply(vm, args);
            });
          }
        },
        model: {
          bind: function bind() {
            var keys = ((this.namespace ? this.namespace + '.' : '') + this.target).split('.'),
                key = keys.pop(),
                namespace = keys.join('.'),
                el = this.el,
                vm = this.vm,
                data = vm.data(namespace),
                composing = false;

            _.add(el, 'input propertychange change keypress keyup', function (e) {
              if (composing) return;
              data.$set(key, el.value);
            });

            _.add(el, 'compositionstart', function (e) {
              composing = true;
            });

            _.add(el, 'compositionend', function (e) {
              composing = false;
            });
          },
          update: function update(value) {
            if (this.el.value !== value) {
              this.el.value = value;
            }
          }
        },
        vm: {
          bind: function bind() {
            // stop walk
            this.setting.stop = true; // which component

            var name = this.target,
                vm = this.vm,
                el = this.el,
                // component reference
            ref = el.getAttribute('q-ref') || false,
                Child = vm.constructor.require(name),
                data = Child.options.data,
                options,
                childVm;

            options = {
              el: el,
              data: data,
              _parent: vm
            };
            childVm = new Child(options);

            vm._children.push(childVm);

            ref && !function () {
              var refs = vm.$[ref];
              refs ? refs.length ? refs.push(childVm) : vm.$[ref] = [refs, childVm] : vm.$[ref] = childVm;
            }();
          }
        },
        'if': {
          bind: function bind() {
            // return if el is a template
            if (!this.el.parentNode) return;

            var tpl = this.el,
                parentNode = tpl.parentNode,
                ref = document.createComment('q-if'),
                hasInit = false,
                exist = true,
                key = this.target,
                namespace = this.namespace,
                target = _.get(namespace, key),
                readFilters = this.filters,
                data = this.data(),
                vm = this.vm;

            this.setting.stop = true;

            function _init(value) {
              // no exist no bind
              if (hasInit || !exist || !value) return;
              hasInit = true;

              vm._templateBind(tpl, {
                data: data,
                namespace: namespace,
                immediate: true
              });
            }

            vm.$watch(target, function (value, oldVal) {
              value = vm.applyFilters(value, readFilters, oldVal);

              _init(value); // need to init


              if (value === exist) return; // bind

              if (value === true) {
                parentNode.replaceChild(tpl, ref);
                exist = value; // unbind
              } else if (value === false) {
                parentNode.replaceChild(ref, tpl);
                exist = value;
              }

              _init(value);
            }, _typeof(this.data(key)) === 'object', true);
          }
        },
        el: {
          bind: function bind() {
            this.vm.$$[this.target] = this.el;
          }
        },
        repeat: __webpack_require__(10)
      };
      /***/
    },
    /* 10 */

    /***/
    function (module, exports, __webpack_require__) {
      var _ = __webpack_require__(1);

      var methods = {
        'default': {
          // how to clean the dom
          clean: function clean(parentNode, repeats) {
            if (repeats.length) {
              repeats.forEach(function (node) {
                // repeat element may has been remove
                node.parentNode === parentNode && parentNode.removeChild(node);
              });

              _.cleanData(repeats);

              repeats.length = 0;
            }
          },
          insert: function insert(parentNode, fragment, ref) {
            parentNode.insertBefore(fragment, ref);
          }
        },
        push: {
          insert: function insert(parentNode, fragment, ref) {
            parentNode.insertBefore(fragment, ref);
          },
          dp: function dp(data, patch) {
            return patch.res;
          }
        },
        splice: {
          clean: function clean(parentNode, repeats, value, watchers) {
            var i = value[0],
                l = value[1],
                target = value[2].$namespace(),
                eles = repeats.splice(i, l);
            eles.forEach(function (ele) {
              parentNode.removeChild(ele);
            }); // just splice one time

            if (!value.done) {
              splice(watchers, target, i, l);
              value.done = true;
            }

            return true;
          },
          dp: function dp(data, patch) {
            patch.args.push(data);
            return patch.args;
          }
        }
      };

      function splice(watchers, target, i, l) {
        var length = target.length,
            subKey,
            cur,
            index,
            newKey;
        Object.keys(watchers).forEach(function (key) {
          if (~key.indexOf(target)) {
            subKey = key.substring(length + 1);
            cur = subKey.split('.');

            if (cur.length) {
              index = +cur.shift();

              if ((index -= l) >= i) {
                cur.unshift(index);
                cur.unshift(target);
                newKey = cur.join('.');
                watchers[newKey] = watchers[key];
                delete watchers[key];
              }
            }
          }
        });
      }

      exports.bind = function () {
        var tpl = this.el,
            setting = this.setting,
            parentNode = tpl.parentNode,
            key,
            namespace,
            target,
            readFilters,
            repeats,
            ref,
            vm; // return

        if (!parentNode || setting.stop) return; // stop binding

        setting.stop = true;
        key = this.target;
        namespace = this.namespace;
        target = _.get(namespace, key);
        readFilters = this.filters;
        repeats = [];
        ref = document.createComment('q-repeat');
        vm = this.vm;
        parentNode.replaceChild(ref, tpl);
        vm.$watch(target, function (value, oldVal, patch) {
          value = vm.applyFilters(value, readFilters); // if value is undefined or null just return

          if (value == null) return;
          var method = !readFilters.length && patch ? patch.method : 'default',
              dp = (methods[method] || {}).dp,
              clean = (methods[method] || {}).clean,
              insert = (methods[method] || {}).insert; // if dp exists, proceess data

          dp && (value = dp(value, patch));

          if (clean && clean(parentNode, repeats, value, vm._watchers, target) === true) {
            return;
          }

          var fragment = document.createDocumentFragment(),
              itemNode;
          value.forEach(function (obj, i) {
            itemNode = _.clone(tpl);

            vm._templateBind(itemNode, {
              data: obj,
              namespace: obj.$namespace(),
              immediate: true
            }); // TODO this must refactor


            repeats.push(itemNode);
            fragment.appendChild(itemNode);
          });
          insert && insert(parentNode, fragment, ref);
          vm.$emit('repeat-render');
        }, false, true);
      };
      /***/

    },
    /* 11 */

    /***/
    function (module, exports, __webpack_require__) {
      var parse = __webpack_require__(12),
          _ = __webpack_require__(1);

      module.exports = function (el, options) {
        options = options || {};
        var self = this,
            directives = self.$options.directives,
            index = options.index,
            data = options.data || self,
            namespace = options.namespace;

        _.walk([el], function (node, res, setting) {
          res.forEach(function (obj) {
            var name = obj.name.substring(2),
                directive = directives[name],
                descriptors = parse(obj.value);
            directive && descriptors.forEach(function (descriptor) {
              var readFilters = self._makeReadFilters(descriptor.filters, self.data(namespace)),
                  key = descriptor.target,
                  target = _.get(namespace, key),
                  update = _.isObject(directive) ? directive.update : directive,
                  that = _.extend({
                el: node,
                vm: self,
                data: function data(key) {
                  return self.data(_.get(namespace, key));
                },
                namespace: namespace,
                setting: setting
              }, descriptor, {
                filters: readFilters
              }),
                  tmp = that.data(key);

              update && self.$watch(target, function (value, oldValue) {
                value = self.applyFilters(value, readFilters, oldValue);
                update.call(that, value, oldValue);
              }, _typeof(tmp) === 'object', _.alpaca ? false : typeof options.immediate === 'boolean' ? options.immediate : tmp !== undefined);
              if (_.isObject(directive) && directive.bind) directive.bind.call(that);
            });
          });
        });
      };
      /***/

    },
    /* 12 */

    /***/
    function (module, exports, __webpack_require__) {
      var cache = new (__webpack_require__(2))(1000),
          tokens = [// space
      [/^ +/], // arg
      [/^([\w\-]+):/, function (captures, status) {
        status.token.arg = captures[1];
      }], // function
      [/^([\w]+)\((.+?)\)/, function (captures, status) {
        status.token.target = captures[1];
        status.token.param = captures[2].split(/ *, */);
      }], // target
      [/^([\w\-\.\$]+)/, function (captures, status) {
        status.token.target = captures[1];
      }], // filter
      [/^(?=\|)/, function (captures, status) {
        status.filter = true;
      }], // next
      [/^,/, function (captures, status, res) {
        res.push(status.token);
        status.token = {
          filters: []
        };
      }]],
          filterREG = /^(.+?)(?=,|$)/,
          filterTokens = [// space
      [/^ +/], // filter
      [/^\| *([\w\-\!]+)/, function (captures, filters) {
        filters.push([captures[1]]);
      }], // string
      [/^(['"])(((\\['"])?([^\1])*)+)\1/, function (captures, filters) {
        filters[filters.length - 1].push(captures[3]);
      }], // arg
      [/^([\w\-\$]+)/, function (captures, filters) {
        filters[filters.length - 1].push(captures[1]);
      }]];
      /**
       * click: onclick | filter1 | filter2
       * click: onclick , keydown: onkeydown
       * click: onclick(this)
       * click: onclick(e, this)
       * value1 | filter1 | filter2
       * value - 1 | filter1 | filter2   don't support
       */

      function parse(str) {
        var name = str,
            hit = cache.get(name);
        if (hit) return hit;
        var res = [],
            captures,
            i,
            l = tokens.length,
            foo,
            // if has token or not
        has = false,
            status = {
          // if in filter or not
          filter: false,
          // just token object
          token: {
            filters: []
          }
        };

        while (str.length) {
          for (i = 0; i < l; i++) {
            if (captures = tokens[i][0].exec(str)) {
              var has = true;
              var foo = tokens[i][1];
              foo && foo(captures, status, res);
              str = str.replace(tokens[i][0], '');

              if (status.filter) {
                captures = filterREG.exec(str);
                parseFilter(captures[0].trim(), status.token);
                str = str.replace(filterREG, '');
                status.filter = false;
              }

              break;
            }
          }

          if (has) {
            has = false;
          } else {
            throw new Error('Syntax error at: ' + str);
          }
        }

        res.push(status.token);
        cache.put(name, res);
        return res;
      }

      function parseFilter(str, token) {
        var i,
            l = filterTokens.length,
            has = false;

        while (str.length) {
          for (i = 0; i < l; i++) {
            var captures = filterTokens[i][0].exec(str);

            if (captures) {
              var has = true;
              var foo = filterTokens[i][1];
              foo && foo(captures, token.filters);
              str = str.replace(filterTokens[i][0], '');
              break;
            }
          }

          if (has) {
            has = false;
          } else {
            throw new Error('Syntax error at: ' + str);
          }
        }
      }

      module.exports = parse;
      /***/
    }
    /******/
    ])
  );
});

;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMveWlsaWEvc291cmNlL2pzL1EuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUVBLENBQUMsU0FBUyxnQ0FBVCxDQUEwQyxJQUExQyxFQUFnRCxPQUFoRCxFQUF5RDtBQUN0RCxNQUFHLFFBQU8sT0FBUCx5Q0FBTyxPQUFQLE9BQW1CLFFBQW5CLElBQStCLFFBQU8sTUFBUCx5Q0FBTyxNQUFQLE9BQWtCLFFBQXBELEVBQ0ksTUFBTSxDQUFDLE9BQVAsR0FBaUIsT0FBTyxFQUF4QixDQURKLEtBRUssSUFBRyxPQUFPLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0MsTUFBTSxDQUFDLEdBQTFDLEVBQ0QsTUFBTSxDQUFDLEVBQUQsRUFBSyxPQUFMLENBQU4sQ0FEQyxLQUVBLElBQUcsUUFBTyxPQUFQLHlDQUFPLE9BQVAsT0FBbUIsUUFBdEIsRUFDRCxPQUFPLENBQUMsR0FBRCxDQUFQLEdBQWUsT0FBTyxFQUF0QixDQURDLEtBR0QsSUFBSSxDQUFDLEdBQUQsQ0FBSixHQUFZLE9BQU8sRUFBbkI7QUFDUCxDQVRELFVBU1MsWUFBVztBQUNwQjtBQUFPO0FBQVUsY0FBUyxPQUFULEVBQWtCO0FBQUU7O0FBQ3JDO0FBQVk7O0FBQ1o7QUFBWSxVQUFJLGdCQUFnQixHQUFHLEVBQXZCO0FBRVo7QUFBWTs7QUFDWjs7QUFBWSxlQUFTLG1CQUFULENBQTZCLFFBQTdCLEVBQXVDO0FBRW5EO0FBQWdCOztBQUNoQjtBQUFnQixZQUFHLGdCQUFnQixDQUFDLFFBQUQsQ0FBbkI7QUFDaEI7QUFBb0IsaUJBQU8sZ0JBQWdCLENBQUMsUUFBRCxDQUFoQixDQUEyQixPQUFsQztBQUVwQjtBQUFnQjs7QUFDaEI7O0FBQWdCLFlBQUksTUFBTSxHQUFHLGdCQUFnQixDQUFDLFFBQUQsQ0FBaEIsR0FB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Q1A7QUF0MURVLEtBMUNNO0FBQWhCO0FBaTREQyxDQTM0REQ7O0FBNDREQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qIVxyXG4gKiBRLmpzIHYxLjAuMTJcclxuICogSW5zcGlyZWQgZnJvbSB2dWUuanNcclxuICogKGMpIDIwMTYgRGFuaWVsIFlhbmdcclxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG4gKi9cclxuIFxyXG4vKipcclxuICogSnVzdCBzdXBwb3J0IG1vZGVybiBicm93c2VyXHJcbiAqL1xyXG4gXHJcbihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XHJcbiAgICBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXHJcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XHJcbiAgICBlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcclxuICAgICAgICBkZWZpbmUoW10sIGZhY3RvcnkpO1xyXG4gICAgZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXHJcbiAgICAgICAgZXhwb3J0c1tcIlFcIl0gPSBmYWN0b3J5KCk7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgcm9vdFtcIlFcIl0gPSBmYWN0b3J5KCk7XHJcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xyXG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxyXG4vKioqKioqLyAgICAvLyBUaGUgbW9kdWxlIGNhY2hlXHJcbi8qKioqKiovICAgIHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XHJcbiBcclxuLyoqKioqKi8gICAgLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cclxuLyoqKioqKi8gICAgZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xyXG4gXHJcbi8qKioqKiovICAgICAgICAvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcclxuLyoqKioqKi8gICAgICAgIGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxyXG4vKioqKioqLyAgICAgICAgICAgIHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xyXG4gXHJcbi8qKioqKiovICAgICAgICAvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxyXG4vKioqKioqLyAgICAgICAgdmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xyXG4vKioqKioqLyAgICAgICAgICAgIGV4cG9ydHM6IHt9LFxyXG4vKioqKioqLyAgICAgICAgICAgIGlkOiBtb2R1bGVJZCxcclxuLyoqKioqKi8gICAgICAgICAgICBsb2FkZWQ6IGZhbHNlXHJcbi8qKioqKiovICAgICAgICB9O1xyXG4gXHJcbi8qKioqKiovICAgICAgICAvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cclxuLyoqKioqKi8gICAgICAgIG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xyXG4gXHJcbi8qKioqKiovICAgICAgICAvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXHJcbi8qKioqKiovICAgICAgICBtb2R1bGUubG9hZGVkID0gdHJ1ZTtcclxuIFxyXG4vKioqKioqLyAgICAgICAgLy8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcclxuLyoqKioqKi8gICAgICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cztcclxuLyoqKioqKi8gICAgfVxyXG4gXHJcbiBcclxuLyoqKioqKi8gICAgLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcclxuLyoqKioqKi8gICAgX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcclxuIFxyXG4vKioqKioqLyAgICAvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxyXG4vKioqKioqLyAgICBfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xyXG4gXHJcbi8qKioqKiovICAgIC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXHJcbi8qKioqKiovICAgIF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XHJcbiBcclxuLyoqKioqKi8gICAgLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXHJcbi8qKioqKiovICAgIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xyXG4vKioqKioqLyB9KVxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4vKioqKioqLyAoW1xyXG4vKiAwICovXHJcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG4gXHJcbiAgICB2YXIgdXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpLFxyXG4gICAgICAgIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpLFxyXG4gICAgICAgIGZhY3RvcnkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpXHJcbiBcclxuICAgIF8uZXh0ZW5kKHV0aWxzLCBfKTtcclxuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSh1dGlscyk7XHJcbiBcclxuIFxyXG4vKioqLyB9LFxyXG4vKiAxICovXHJcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG4gXHJcbiAgICB2YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9LFxyXG4gICAgICAgIGRlZmVyID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQsXHJcbiAgICAgICAgY2FjaGUgPSBuZXcgKF9fd2VicGFja19yZXF1aXJlX18oMikpKDEwMDApLFxyXG4gICAgICAgIC8vIHByaW9yaXR5IGRpcmVjdGl2ZXNcclxuICAgICAgICBwcmlvcml0aWVzID0gWyd2bScsICdyZXBlYXQnLCAnaWYnXSxcclxuICAgICAgICBfcXRpZCA9IDAsXHJcbiAgICAgICAgX3NsaWNlID0gW10uc2xpY2UsXHJcbiAgICAgICAgX2FscGFjYSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0sXHJcbiAgICAgICAgc2xpY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBfc2xpY2UuY2FsbChkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9zbGljZTtcclxuICAgICAgICAgICAgfSBjYXRjaChlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpID0gaSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXMgPSBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbCA9IHRoaXMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5wdXNoKHRoaXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0oKTtcclxuIFxyXG4gICAgX2FscGFjYSAmJiAoX2FscGFjYSA9IF9hbHBhY2EuZ2V0QXR0cmlidXRlKCdhbHBhY2EnKSk7XHJcbiBcclxuICAgIGZ1bmN0aW9uIF9sb29wUHJpb3JpdHkoZWwsIHJlcywgc2V0dGluZykge1xyXG4gICAgICAgIHZhciBhdHRyLCB0bXA7XHJcbiBcclxuICAgICAgICAvLyBUT0RPIG5lZWQgb3B0aW1pemF0aW9uXHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGwgPSBwcmlvcml0aWVzLmxlbmd0aDsgaiA8IGw7IGorKykge1xyXG4gICAgICAgICAgICBhdHRyID0gJ3EtJyArIHByaW9yaXRpZXNbal07XHJcbiAgICAgICAgICAgIGlmICh0bXAgPSBlbC5nZXRBdHRyaWJ1dGUoYXR0cikpIHtcclxuICAgICAgICAgICAgICAgIHJlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBhdHRyLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0bXBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gXHJcbiAgICAgICAgICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XHJcbiAgICAgICAgICAgICAgICAvLyBoYXMgcHJpb3JpdHkgZGlyZWN0aXZlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuIFxyXG4gICAgZnVuY3Rpb24gd2FsaygkZWwsIGNiLCBzZXR0aW5nKSB7XHJcbiAgICAgICAgc2V0dGluZyA9IHNldHRpbmcgfHwge307XHJcbiAgICAgICAgdmFyIGksIGosIGwsIGVsLCBhdHRzLCByZXMsIHF0aWQ7XHJcbiAgICAgICAgZm9yIChpID0gMDsgZWwgPSAkZWxbaSsrXTspIHtcclxuICAgICAgICAgICAgaWYgKGVsLm5vZGVUeXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRzID0gZWwuYXR0cmlidXRlcztcclxuICAgICAgICAgICAgICAgIHJlcyA9IFtdO1xyXG4gXHJcbiAgICAgICAgICAgICAgICAvLyBsb29wIHRoZSBwcmlvcml0eSBkaXJlY3RpdmVcclxuICAgICAgICAgICAgICAgIGlmICghX2xvb3BQcmlvcml0eShlbCwgcmVzLCBzZXR0aW5nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvb3Agb3RoZXIgZGlyZWN0aXZlXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMCwgbCA9IGF0dHMubGVuZ3RoOyBqIDwgbDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHNbal0ubmFtZS5pbmRleE9mKCdxLScpID09PSAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogYXR0c1tqXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBhdHRzW2pdLnZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlcy5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgY2IoZWwsIHJlcywgc2V0dGluZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGVsLmNoaWxkTm9kZXMubGVuZ3RoICYmICFzZXR0aW5nLnN0b3ApIHdhbGsoc2xpY2UuY2FsbChlbC5jaGlsZE5vZGVzLCAwKSwgY2IsIHNldHRpbmcpO1xyXG4gICAgICAgICAgICAvLyByZXNldCBzdG9wXHJcbiAgICAgICAgICAgIHNldHRpbmcuc3RvcCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuIFxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAgICAgc2xpY2U6IHNsaWNlLFxyXG4gICAgICAgIG5vb3A6IG5vb3AsXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWRkIGNsYXNzIHdpdGggY29tcGF0aWJpbGl0eSBmb3IgSUUgJiBTVkdcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cm9uZ30gY2xzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYWRkQ2xhc3M6IGZ1bmN0aW9uIChlbCwgY2xzKSB7XHJcbiAgICAgICAgICAgIGlmIChlbC5jbGFzc0xpc3QpIHtcclxuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXIgPSAnICcgKyAoZWwuY2xhc3NOYW1lIHx8ICcnKSArICcgJztcclxuICAgICAgICAgICAgICAgIGlmIChjdXIuaW5kZXhPZignICcgKyBjbHMgKyAnICcpIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTmFtZSA9IChjdXIgKyBjbHMpLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVtb3ZlIGNsYXNzIHdpdGggY29tcGF0aWJpbGl0eSBmb3IgSUUgJiBTVkdcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cm9uZ30gY2xzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uIChlbCwgY2xzKSB7XHJcbiAgICAgICAgICAgIGlmIChlbC5jbGFzc0xpc3QpIHtcclxuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXIgPSAnICcgKyAoZWwuY2xhc3NOYW1lIHx8ICcnKSArICcgJyxcclxuICAgICAgICAgICAgICAgICAgICB0YXIgPSAnICcgKyBjbHMgKyAnICc7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoY3VyLmluZGV4T2YodGFyKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyID0gY3VyLnJlcGxhY2UodGFyLCAnICcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gY3VyLnRyaW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbm9leGlzdDogZnVuY3Rpb24gKHZtLCBuYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2Fybih2bSk7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmlsdGVyICcgKyBuYW1lICsgJyBoYXNuXFwndCBpbXBsZW1lbnRlZC4nKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHdhcm46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICh3aW5kb3cuY29uc29sZSAmJiBjb25zb2xlLmVycm9yKSA/IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICB9IDogbm9vcDtcclxuICAgICAgICB9KCksXHJcbiAgICAgICAgaXNPYmplY3Q6IGZ1bmN0aW9uIChvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgbyA9PT0gJ29iamVjdCc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBuZXh0VGljazogZnVuY3Rpb24gKGNiLCBjdHgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGN0eCA/XHJcbiAgICAgICAgICAgICAgICBkZWZlcihmdW5jdGlvbiAoKSB7IGNiLmNhbGwoY3R4KSB9LCAwKSA6XHJcbiAgICAgICAgICAgICAgICBkZWZlcihjYiwgMCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBnZXRcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAobmFtZXNwYWNlLCBrZXkpIHtcclxuICAgICAgICAgICAgdmFyIGFyciA9IFtdO1xyXG4gICAgICAgICAgICBuYW1lc3BhY2UgJiYgYXJyLnB1c2gobmFtZXNwYWNlKTtcclxuICAgICAgICAgICAga2V5ICYmIGFyci5wdXNoKGtleSk7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnIuam9pbignLicpLnJlcGxhY2UoL14oLitcXC4pP1xcJHRvcFxcLi8sICcnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHdhbGs6IHdhbGssXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogYWxwYWNhXHJcbiAgICAgICAgICoganVzdCBhIGZsYWdcclxuICAgICAgICAgKi9cclxuICAgICAgICBhbHBhY2E6ICEhX2FscGFjYVxyXG4gICAgfTtcclxuIFxyXG4gXHJcbi8qKiovIH0sXHJcbi8qIDIgKi9cclxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XHJcbiBcclxuICAgIC8qKlxyXG4gICAgICoganVzdCBhIGNvcHkgb2Y6IGh0dHBzOi8vZ2l0aHViLmNvbS95eXg5OTA4MDMvdnVlL2Jsb2IvbWFzdGVyL3NyYy9jYWNoZS5qc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsaW1pdFxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuIFxyXG4gICAgZnVuY3Rpb24gQ2FjaGUgKGxpbWl0KSB7XHJcbiAgICAgICAgdGhpcy5zaXplID0gMDtcclxuICAgICAgICB0aGlzLmxpbWl0ID0gbGltaXQ7XHJcbiAgICAgICAgdGhpcy5oZWFkID0gdGhpcy50YWlsID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX2tleW1hcCA9IHt9O1xyXG4gICAgfVxyXG4gXHJcbiAgICB2YXIgcCA9IENhY2hlLnByb3RvdHlwZTtcclxuIFxyXG4gICAgLyoqXHJcbiAgICAgKiBQdXQgPHZhbHVlPiBpbnRvIHRoZSBjYWNoZSBhc3NvY2lhdGVkIHdpdGggPGtleT4uXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBlbnRyeSB3aGljaCB3YXMgcmVtb3ZlZCB0byBtYWtlIHJvb20gZm9yXHJcbiAgICAgKiB0aGUgbmV3IGVudHJ5LiBPdGhlcndpc2UgdW5kZWZpbmVkIGlzIHJldHVybmVkLlxyXG4gICAgICogKGkuZS4gaWYgdGhlcmUgd2FzIGVub3VnaCByb29tIGFscmVhZHkpLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcclxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcclxuICAgICAqIEByZXR1cm4ge0VudHJ5fHVuZGVmaW5lZH1cclxuICAgICAqL1xyXG4gXHJcbiAgICBwLnB1dCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGVudHJ5ID0ge1xyXG4gICAgICAgICAgICBrZXk6a2V5LFxyXG4gICAgICAgICAgICB2YWx1ZTp2YWx1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9rZXltYXBba2V5XSA9IGVudHJ5O1xyXG4gICAgICAgIGlmICh0aGlzLnRhaWwpIHtcclxuICAgICAgICAgICAgdGhpcy50YWlsLm5ld2VyID0gZW50cnk7XHJcbiAgICAgICAgICAgIGVudHJ5Lm9sZGVyID0gdGhpcy50YWlsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVhZCA9IGVudHJ5O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRhaWwgPSBlbnRyeTtcclxuICAgICAgICBpZiAodGhpcy5zaXplID09PSB0aGlzLmxpbWl0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNoaWZ0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaXplKys7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuIFxyXG4gICAgLyoqXHJcbiAgICAgKiBQdXJnZSB0aGUgbGVhc3QgcmVjZW50bHkgdXNlZCAob2xkZXN0KSBlbnRyeSBmcm9tIHRoZVxyXG4gICAgICogY2FjaGUuIFJldHVybnMgdGhlIHJlbW92ZWQgZW50cnkgb3IgdW5kZWZpbmVkIGlmIHRoZVxyXG4gICAgICogY2FjaGUgd2FzIGVtcHR5LlxyXG4gICAgICovXHJcbiBcclxuICAgIHAuc2hpZnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy5oZWFkO1xyXG4gICAgICAgIGlmIChlbnRyeSkge1xyXG4gICAgICAgICAgICB0aGlzLmhlYWQgPSB0aGlzLmhlYWQubmV3ZXI7XHJcbiAgICAgICAgICAgIHRoaXMuaGVhZC5vbGRlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgZW50cnkubmV3ZXIgPSBlbnRyeS5vbGRlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5fa2V5bWFwW2VudHJ5LmtleV0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbnRyeTtcclxuICAgIH07XHJcbiBcclxuICAgIC8qKlxyXG4gICAgICogR2V0IGFuZCByZWdpc3RlciByZWNlbnQgdXNlIG9mIDxrZXk+LiBSZXR1cm5zIHRoZSB2YWx1ZVxyXG4gICAgICogYXNzb2NpYXRlZCB3aXRoIDxrZXk+IG9yIHVuZGVmaW5lZCBpZiBub3QgaW4gY2FjaGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxyXG4gICAgICogQHBhcmFtIHtCb29sZWFufSByZXR1cm5FbnRyeVxyXG4gICAgICogQHJldHVybiB7RW50cnl8Kn1cclxuICAgICAqL1xyXG4gXHJcbiAgICBwLmdldCA9IGZ1bmN0aW9uIChrZXksIHJldHVybkVudHJ5KSB7XHJcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy5fa2V5bWFwW2tleV07XHJcbiAgICAgICAgaWYgKGVudHJ5ID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuICAgICAgICBpZiAoZW50cnkgPT09IHRoaXMudGFpbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuRW50cnkgP1xyXG4gICAgICAgICAgICAgICAgZW50cnkgOlxyXG4gICAgICAgICAgICAgICAgZW50cnkudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAvLyBIRUFELS0tLS0tLS0tLS0tLS1UQUlMXHJcbiAgICAgIC8vICAgPC5vbGRlciAgIC5uZXdlcj5cclxuICAgICAgLy8gIDwtLS0gYWRkIGRpcmVjdGlvbiAtLVxyXG4gICAgICAvLyAgIEEgIEIgIEMgIDxEPiAgRVxyXG4gICAgICAgIGlmIChlbnRyeS5uZXdlcikge1xyXG4gICAgICAgICAgICBpZiAoZW50cnkgPT09IHRoaXMuaGVhZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWFkID0gZW50cnkubmV3ZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZW50cnkubmV3ZXIub2xkZXIgPSBlbnRyeS5vbGRlcjsgLy8gQyA8LS0gRS5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVudHJ5Lm9sZGVyKSB7XHJcbiAgICAgICAgICAgIGVudHJ5Lm9sZGVyLm5ld2VyID0gZW50cnkubmV3ZXI7IC8vIEMuIC0tPiBFXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVudHJ5Lm5ld2VyID0gdW5kZWZpbmVkOyAvLyBEIC0teFxyXG4gICAgICAgIGVudHJ5Lm9sZGVyID0gdGhpcy50YWlsOyAvLyBELiAtLT4gRVxyXG4gICAgICAgIGlmICh0aGlzLnRhaWwpIHtcclxuICAgICAgICAgICAgdGhpcy50YWlsLm5ld2VyID0gZW50cnk7IC8vIEUuIDwtLSBEXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGFpbCA9IGVudHJ5O1xyXG4gICAgICAgIHJldHVybiByZXR1cm5FbnRyeSA/XHJcbiAgICAgICAgICAgIGVudHJ5IDpcclxuICAgICAgICAgICAgZW50cnkudmFsdWU7XHJcbiAgICB9XHJcbiBcclxuICAgIG1vZHVsZS5leHBvcnRzID0gQ2FjaGU7XHJcbiBcclxuIFxyXG4vKioqLyB9LFxyXG4vKiAzICovXHJcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xyXG4gXHJcbiAgICB2YXIgREVMRUdBVE9SX0NBTExCQUNLU19LRVkgPSAnX19jYnNfXycsXHJcbiAgICAgICAgTk9fREVMRUdBVE9SID0ge1xyXG4gICAgICAgICAgICAvLyBwcmV2ZW50IG1vdXNlb3ZlciB0cmlnZ2VyIG1vcmUgdGhhbiBvbmUgdGltZVxyXG4gICAgICAgICAgICBtb3VzZW92ZXI6IHRydWUsXHJcbiAgICAgICAgICAgIGNoYW5nZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW5wdXQ6IHRydWUsXHJcbiAgICAgICAgICAgIHBvcnBlcnR5Y2hhbmdlOiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgIHZhciBfZXh0ZW5kID0gZnVuY3Rpb24gKHRhcmdldCwgc3Jjcykge1xyXG4gICAgICAgICAgICBzcmNzID0gW10uc3BsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcclxuICAgICAgICAgICAgdmFyIGkgPSAwLCBsID0gc3Jjcy5sZW5ndGgsIHNyYywga2V5O1xyXG4gICAgICAgICAgICBmb3IgKDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc3JjID0gc3Jjc1tpXTtcclxuICAgICAgICAgICAgICAgIGZvciAoa2V5IGluIHNyYykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc3JjW2tleV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9leHBhbmRvID0gJ1FEYXRhVWlkJyxcclxuICAgICAgICBfdWlkID0gMCxcclxuICAgICAgICBfbWFwID0ge307XHJcbiBcclxuICAgIGZ1bmN0aW9uIGNvbnRhaW5zKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gYSAhPT0gYiAmJiBhLmNvbnRhaW5zKGIpO1xyXG4gICAgfVxyXG4gXHJcbiAgICBmdW5jdGlvbiBkYXRhKGVsLCBrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIHVpZCA9IGVsW19leHBhbmRvXSA9IGVsW19leHBhbmRvXSB8fCArK191aWQsXHJcbiAgICAgICAgICAgIGRhdGEgPSBfbWFwW3VpZF0gPSBfbWFwW3VpZF0gfHwge307XHJcbiAgICAgICAgLy8gc2V0IERhdGFcclxuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGRhdGFba2V5XTtcclxuICAgICAgICByZXR1cm4gKGRhdGFba2V5XSA9IHZhbHVlKTtcclxuICAgIH1cclxuIFxyXG4gICAgZnVuY3Rpb24gYWRkKGVsLCBldnQsIGZuKSB7XHJcbiAgICAgICAgZXZ0LnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGUsIGZuLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiBcclxuICAgIG1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgICAgIGZpbmQ6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLCAwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbnRhaW5zOiBjb250YWlucyxcclxuICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgIGNsZWFuRGF0YTogZnVuY3Rpb24gKGVscykge1xyXG4gICAgICAgICAgICB2YXIgdWlkXHJcbiAgICAgICAgICAgIGVscy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHVpZCA9IGVsW19leHBhbmRvXTtcclxuICAgICAgICAgICAgICAgIC8vIGhhcyBkYXRhXHJcbiAgICAgICAgICAgICAgICB1aWQgJiYgKHVpZCBpbiBfbWFwKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChkZWxldGUgX21hcFt1aWRdKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZGQ6IGZ1bmN0aW9uIChlbCwgZXZ0LCBmbiwgdm0pIHtcclxuICAgICAgICAgICAgaWYgKCF2bSB8fCBOT19ERUxFR0FUT1JbZXZ0XSkge1xyXG4gICAgICAgICAgICAgICAgYWRkKGVsLCBldnQsIGZuKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciAkZWwgPSB2bS4kZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgY2JzID0gZGF0YSgkZWwsIERFTEVHQVRPUl9DQUxMQkFDS1NfS0VZKTtcclxuICAgICAgICAgICAgICAgIGlmICghY2JzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2JzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSgkZWwsIERFTEVHQVRPUl9DQUxMQkFDS1NfS0VZLCBjYnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZCgkZWwsIGV2dCwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNicy5mb3JFYWNoKGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0gY2IuZm4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwgPSBjYi5lbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250YWlucyhlbCwgdGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLmNhbGwoZWwsIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIHB1c2hcclxuICAgICAgICAgICAgICAgIGNicy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBlbDogZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgZm46IGZuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiAoZWwsIGV2dCwgZm4pIHtcclxuICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGZuLCBmYWxzZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbG9uZTogZnVuY3Rpb24gKGVsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZWxlLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGV4dGVuZDogZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIF9leHRlbmQodGhpcywgdGFyZ2V0KTtcclxuICAgICAgICAgICAgcmV0dXJuIF9leHRlbmQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gXHJcbiBcclxuLyoqKi8gfSxcclxuLyogNCAqL1xyXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuIFxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoXykge1xyXG4gXHJcbiAgICAgICAgdmFyIFNlZWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpLFxyXG4gICAgICAgICAgICBldmVudHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpLFxyXG4gICAgICAgICAgICBNQVJLID0gL1xce1xceyguKz8pXFx9XFx9LyxcclxuICAgICAgICAgICAgbWVyZ2VPcHRpb25zID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KS5tZXJnZU9wdGlvbnMsXHJcbiAgICAgICAgICAgIGNsYXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpLFxyXG4gICAgICAgICAgICBfZG9jID0gZG9jdW1lbnQ7XHJcbiBcclxuICAgICAgICBmdW5jdGlvbiBfaW5Eb2MoZWxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfLmNvbnRhaW5zKF9kb2MuZG9jdW1lbnRFbGVtZW50LCBlbGUpO1xyXG4gICAgICAgIH1cclxuIFxyXG4gICAgICAgIC8vIGxpZmVjeWNsZTogY3JlYXRlZCAtPiBjb21waWxlZFxyXG4gXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUVxyXG4gICAgICAgICAqIEBjbGFzc1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gUShvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luaXQob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGV4cG9ydHMgdXRpbHNcclxuICAgICAgICBRLl8gPSBfO1xyXG4gICAgICAgIFEub3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgZGlyZWN0aXZlczogX193ZWJwYWNrX3JlcXVpcmVfXyg5KSxcclxuICAgICAgICAgICAgZmlsdGVyczoge31cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGdldFxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nIHwgRWxlbWVudH0gc2VsZWN0b3JcclxuICAgICAgICAgKiBAcmV0dXJuIHtRfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFEuZ2V0ID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgIHZhciBlbGUgPSBfLmZpbmQoc2VsZWN0b3IpWzBdO1xyXG4gICAgICAgICAgICBpZiAoZWxlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5kYXRhKGVsZSwgJ1FJJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHRoaXMoeyBlbDogc2VsZWN0b3IgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGFsbFxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUS5hbGwgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBfLmZpbmQob3B0aW9ucy5lbCkubWFwKGZ1bmN0aW9uIChlbGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgc2VsZihfLmV4dGVuZChvcHRpb25zLCB7IGVsOiBlbGUgfSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIF8uZXh0ZW5kKFEsIGNsYXMpO1xyXG4gICAgICAgIF8uZXh0ZW5kKFEucHJvdG90eXBlLCB7XHJcbiAgICAgICAgICAgIF9pbml0OiBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRlbCA9IG9wdGlvbnMuZWwgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIG9wdGlvbnMuZWwgPT09ICdzdHJpbmcnID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uZmluZChvcHRpb25zLmVsKVswXSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmVsO1xyXG4gICAgICAgICAgICAgICAgLy8gZWxlbWVudCByZWZlcmVuY2VzXHJcbiAgICAgICAgICAgICAgICB0aGlzLiQkID0ge307XHJcbiAgICAgICAgICAgICAgICAvLyBzZXQgcGFyZW50IHZtXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQgPSBvcHRpb25zLl9wYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICAvLyBtZXJnZSBvcHRpb25zXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gdGhpcy4kb3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLm9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgLy8gbGlmZWN5Y2xlIHN0YXRlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc0NvbXBpbGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc0F0dGFjaGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1JlYWR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyBldmVudHMgYm9va2tlZXBpbmdcclxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2F0Y2hlcnMgPSB7fTtcclxuIFxyXG4gICAgICAgICAgICAgICAgLy8gY29tcG9uZW50c1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbXBvbmVudHMgcmVmZXJlbmNlc1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kID0ge307XHJcbiBcclxuICAgICAgICAgICAgICAgIFNlZWQuY2FsbCh0aGlzLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuX2RhdGEgPSBvcHRpb25zLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAvLyBpbml0aWFsaXplIGRhdGEgYW5kIHNjb3BlIGluaGVyaXRhbmNlLlxyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5pdFNjb3BlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjYWxsIGNyZWF0ZWQgaG9va1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbEhvb2soJ2NyZWF0ZWQnKTtcclxuICAgICAgICAgICAgICAgIC8vIHN0YXJ0IGNvbXBpbGF0aW9uXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy4kZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjYWNoZSB0aGUgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgICAgICBfLmRhdGEodGhpcy4kZWwsICdRSScsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJG1vdW50KHRoaXMuJGVsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgJG9uOiBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XHJcbiAgICAgICAgICAgICAgICAodGhpcy5fZXZlbnRzW2V2ZW50XSB8fCAodGhpcy5fZXZlbnRzW2V2ZW50XSA9IFtdKSlcclxuICAgICAgICAgICAgICAgICAgICAucHVzaChmbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxyXG4gICAgICAgICAgICAgKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICAgICAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICRvbmNlOiBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLiRvZmYoZXZlbnQsIG9uKTtcclxuICAgICAgICAgICAgICAgICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb24uZm4gPSBmbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuJG9uKGV2ZW50LCBvbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfSxcclxuIFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcclxuICAgICAgICAgICAgICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gICAgICAgICAgICAgKi9cclxuIFxyXG4gICAgICAgICAgICAkb2ZmOiBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2JzLCBjYiwgaTtcclxuICAgICAgICAgICAgICAgIC8vIGFsbCBldmVudFxyXG4gICAgICAgICAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBzcGVjaWZpYyBldmVudFxyXG4gICAgICAgICAgICAgICAgY2JzID0gdGhpcy5fZXZlbnRzW2V2ZW50XTtcclxuICAgICAgICAgICAgICAgIGlmICghY2JzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1tldmVudF0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gc3BlY2lmaWMgaGFuZGxlclxyXG4gICAgICAgICAgICAgICAgaSA9IGNicy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2IgPSBjYnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNiID09PSBmbiB8fCBjYi5mbiA9PT0gZm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2JzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBXYXRjaCBhbiBleHByZXNzaW9uLCB0cmlnZ2VyIGNhbGxiYWNrIHdoZW4gaXRzXHJcbiAgICAgICAgICAgICAqIHZhbHVlIGNoYW5nZXMuXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBleHBcclxuICAgICAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2JcclxuICAgICAgICAgICAgICogQHBhcmFtIHtCb29sZWFufSBbZGVlcF1cclxuICAgICAgICAgICAgICogQHBhcmFtIHtCb29sZWFufSBbaW1tZWRpYXRlXVxyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gLSB1bndhdGNoRm5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICR3YXRjaDogZnVuY3Rpb24gKGV4cCwgY2IsIGRlZXAsIGltbWVkaWF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGRlZXAgPyBleHAgKyAnKipkZWVwKionIDogZXhwO1xyXG4gICAgICAgICAgICAgICAgKHRoaXMuX3dhdGNoZXJzW2tleV0gfHwgKHRoaXMuX3dhdGNoZXJzW2tleV0gPSBbXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLnB1c2goY2IpO1xyXG4gICAgICAgICAgICAgICAgaW1tZWRpYXRlICYmIGNiKHRoaXMuZGF0YShleHApKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogVHJpZ2dlciBhbiBldmVudCBvbiBzZWxmLlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgJGVtaXQ6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXJncyA9IF8uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnRzLmVtaXQuY2FsbCh0aGlzLCBlLCBfLnNsaWNlLmNhbGwoYXJncywgMCkpO1xyXG4gICAgICAgICAgICAgICAgLy8gZW1pdCBkYXRhIGNoYW5nZVxyXG4gICAgICAgICAgICAgICAgaWYgKCFlLmluZGV4T2YoJ2RhdGE6JykpIHtcclxuICAgICAgICAgICAgICAgICAgICBlID0gZS5zdWJzdHJpbmcoNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzLmNhbGxDaGFuZ2UuY2FsbCh0aGlzLCBlLCBfLnNsaWNlLmNhbGwoYXJncywgMCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFlLmluZGV4T2YoJ2RlZXA6JykpIHtcclxuICAgICAgICAgICAgICAgICAgICBlID0gZS5zdWJzdHJpbmcoNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzLmNhbGxEZWVwLmNhbGwodGhpcywgZSwgXy5zbGljZS5jYWxsKGFyZ3MsIDApKTtcclxuICAgICAgICAgICAgICAgICAgICBhcmdzLnVuc2hpZnQoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzLmVtaXQuY2FsbCh0aGlzLCAnZGF0YWNoYW5nZScsIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBTZXR1cCB0aGUgc2NvcGUgb2YgYW4gaW5zdGFuY2UsIHdoaWNoIGNvbnRhaW5zOlxyXG4gICAgICAgICAgICAgKiAtIG9ic2VydmVkIGRhdGFcclxuICAgICAgICAgICAgICogLSBjb21wdXRlZCBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICAgICAqIC0gdXNlciBtZXRob2RzXHJcbiAgICAgICAgICAgICAqIC0gbWV0YSBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBfaW5pdFNjb3BlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbml0TWV0aG9kcygpO1xyXG4gICAgICAgICAgICB9LFxyXG4gXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBTZXR1cCBpbnN0YW5jZSBtZXRob2RzLiBNZXRob2RzIG11c3QgYmUgYm91bmQgdG8gdGhlXHJcbiAgICAgICAgICAgICAqIGluc3RhbmNlIHNpbmNlIHRoZXkgbWlnaHQgYmUgY2FsbGVkIGJ5IGNoaWxkcmVuXHJcbiAgICAgICAgICAgICAqIGluaGVyaXRpbmcgdGhlbS5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIF9pbml0TWV0aG9kczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1ldGhvZHMgPSB0aGlzLiRvcHRpb25zLm1ldGhvZHMsIGtleTtcclxuICAgICAgICAgICAgICAgIGlmIChtZXRob2RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChrZXkgaW4gbWV0aG9kcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBtZXRob2RzW2tleV0uYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiBcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFNldCBpbnN0YW5jZSB0YXJnZXQgZWxlbWVudCBhbmQga2ljayBvZmYgdGhlIGNvbXBpbGF0aW9uXHJcbiAgICAgICAgICAgICAqIHByb2Nlc3MuIFRoZSBwYXNzZWQgaW4gYGVsYCBjYW4gYmUgYSB0ZW1wbGF0ZSBzdHJpbmcsIGFuXHJcbiAgICAgICAgICAgICAqIGV4aXN0aW5nIEVsZW1lbnQsIG9yIGEgRG9jdW1lbnRGcmFnbWVudCAoZm9yIGJsb2NrXHJcbiAgICAgICAgICAgICAqIGluc3RhbmNlcykuXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfEVsZW1lbnR8RG9jdW1lbnRGcmFnbWVudH0gZWxcclxuICAgICAgICAgICAgICogQHB1YmxpY1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgJG1vdW50OiBmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0NvbXBpbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF8ud2FybignJG1vdW50KCkgc2hvdWxkIGJlIGNhbGxlZCBvbmx5IG9uY2UnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIFRPRE8gZm9yIHRlbXBsYXRlIHx8IHdlIG1heSBub3QgZG8gZm9yIHRlbXBsYXRlXHJcbiAgICAgICAgICAgICAgICAvLyBpZiAodHlwZW9mIGVsID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBpbGUoZWwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNDb21waWxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxsSG9vaygnY29tcGlsZWQnKTtcclxuICAgICAgICAgICAgICAgIGlmIChfaW5Eb2ModGhpcy4kZWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FsbEhvb2soJ2F0dGFjaGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVhZHkoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kb25jZSgnaG9vazphdHRhY2hlZCcsIHRoaXMuX3JlYWR5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuIFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogcmVhZHlcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIF9yZWFkeTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNBdHRhY2hlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1JlYWR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxIb29rKCdyZWFkeScpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogVHJhbnNjbHVkZSwgY29tcGlsZSBhbmQgbGluayBlbGVtZW50LlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBJZiBhIHByZS1jb21waWxlZCBsaW5rZXIgaXMgYXZhaWxhYmxlLCB0aGF0IG1lYW5zIHRoZVxyXG4gICAgICAgICAgICAgKiBwYXNzZWQgaW4gZWxlbWVudCB3aWxsIGJlIHByZS10cmFuc2NsdWRlZCBhbmQgY29tcGlsZWRcclxuICAgICAgICAgICAgICogYXMgd2VsbCAtIGFsbCB3ZSBuZWVkIHRvIGRvIGlzIHRvIGNhbGwgdGhlIGxpbmtlci5cclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogT3RoZXJ3aXNlIHdlIG5lZWQgdG8gY2FsbCB0cmFuc2NsdWRlL2NvbXBpbGUvbGluayBoZXJlLlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXHJcbiAgICAgICAgICAgICAqIEByZXR1cm4ge0VsZW1lbnR9XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBfY29tcGlsZTogZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zY2x1ZShlbCwgdGhpcy4kb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBQcm9jZXNzIGFuIGVsZW1lbnQgb3IgYSBEb2N1bWVudEZyYWdtZW50IGJhc2VkIG9uIGFcclxuICAgICAgICAgICAgICogaW5zdGFuY2Ugb3B0aW9uIG9iamVjdC4gVGhpcyBhbGxvd3MgdXMgdG8gdHJhbnNjbHVkZVxyXG4gICAgICAgICAgICAgKiBhIHRlbXBsYXRlIG5vZGUvZnJhZ21lbnQgYmVmb3JlIHRoZSBpbnN0YW5jZSBpcyBjcmVhdGVkLFxyXG4gICAgICAgICAgICAgKiBzbyB0aGUgcHJvY2Vzc2VkIGZyYWdtZW50IGNhbiB0aGVuIGJlIGNsb25lZCBhbmQgcmV1c2VkXHJcbiAgICAgICAgICAgICAqIGluIHYtcmVwZWF0LlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0cmFuc2NsdWU6IGZ1bmN0aW9uIChlbCwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgLy8ganVzdCBiaW5kIHRlbXBsYXRlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl90ZW1wbGF0ZUJpbmQoZWwsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB9LFxyXG4gXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBiaW5kIHJlbmRlcmVkIHRlbXBsYXRlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBfdGVtcGxhdGVCaW5kOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKSxcclxuIFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogVHJpZ2dlciBhbGwgaGFuZGxlcnMgZm9yIGEgaG9va1xyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaG9va1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgX2NhbGxIb29rOiBmdW5jdGlvbiAoaG9vaykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhhbmRsZXJzID0gdGhpcy4kb3B0aW9uc1tob29rXTtcclxuICAgICAgICAgICAgICAgIGlmIChoYW5kbGVycykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gaGFuZGxlcnMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXJzW2ldLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnaG9vazonICsgaG9vayk7XHJcbiAgICAgICAgICAgIH0sXHJcbiBcclxuICAgICAgICAgICAgX21ha2VSZWFkRmlsdGVyczogZnVuY3Rpb24gKG5hbWVzLCAkdGhpcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFuYW1lcy5sZW5ndGgpIHJldHVybiBbXTtcclxuICAgICAgICAgICAgICAgIHZhciBmaWx0ZXJzID0gdGhpcy4kb3B0aW9ucy5maWx0ZXJzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5hbWVzLm1hcChmdW5jdGlvbiAoYXJncykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBfLnNsaWNlLmNhbGwoYXJncywgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBhcmdzLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlYWRlciA9IChmaWx0ZXJzW25hbWVdID8gKGZpbHRlcnNbbmFtZV0ucmVhZCB8fCBmaWx0ZXJzW25hbWVdKSA6IF8ubm9leGlzdChzZWxmLCBuYW1lKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSwgb2xkVmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvbid0IG1vZGlmeSBhcmdzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aGlzQXJncyA9IFt2YWx1ZV0uY29uY2F0KGFyZ3MgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IHRoaXNBcmdzLmluZGV4T2YoJyR0aGlzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNBcmdzLnB1c2gob2xkVmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVwbGFjZSAkdGhpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAofmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNBcmdzW2ldID0gJHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFyZ3MgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZGVyLmFwcGx5KHNlbGYsIHRoaXNBcmdzKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZGVyLmNhbGwoc2VsZiwgdmFsdWUsIG9sZFZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBBcHBseSBmaWx0ZXJzIHRvIGEgdmFsdWVcclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHBhcmFtIHsqfSB2YWx1ZVxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBmaWx0ZXJzXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7Kn0gb2xkVmFsXHJcbiAgICAgICAgICAgICAqIEByZXR1cm4geyp9XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBhcHBseUZpbHRlcnM6IGZ1bmN0aW9uICh2YWx1ZSwgZmlsdGVycywgb2xkVmFsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWZpbHRlcnMgfHwgIWZpbHRlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBmaWx0ZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZmlsdGVyc1tpXS5jYWxsKHRoaXMsIHZhbHVlLCBvbGRWYWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiBcclxuICAgICAgICBfLmV4dGVuZChRLnByb3RvdHlwZSwgU2VlZC5wcm90b3R5cGUpO1xyXG4gXHJcbiAgICAgICAgcmV0dXJuIFE7XHJcbiAgICB9O1xyXG4gXHJcbiBcclxuLyoqKi8gfSxcclxuLyogNSAqL1xyXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuIFxyXG4gICAgdmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xyXG4gXHJcbiAgICAvKipcclxuICAgICAqIHByZWZpeCBkYXRhXHJcbiAgICAgKiBAcGFyYW0ge0RhdGEgfHwgRGF0YUFycmF5fSB1cFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxyXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB0cmlnZ2VyIG9yIG5vdFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBfcHJlZml4KHVwLCBrZXksIHZhbHVlLCB0cmlnZ2VyKSB7XHJcbiAgICAgICAgdmFyIHRvcCA9IHVwLl90b3AsXHJcbiAgICAgICAgICAgIGlzQXJyYXkgPSBfaXNBcnJheSh2YWx1ZSksXHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiB2YWx1ZSxcclxuICAgICAgICAgICAgICAgIHVwOiB1cCxcclxuICAgICAgICAgICAgICAgIHRvcDogdG9wLFxyXG4gICAgICAgICAgICAgICAgbmFtZXNwYWNlOiBrZXkgKyAnJyxcclxuICAgICAgICAgICAgICAgIHRyaWdnZXI6IGlzQXJyYXkgPyBmYWxzZSA6IHRyaWdnZXJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gb2xkIHZhbHVlXHJcbiAgICAgICAgICAgIG9sZFZhbCA9IHRvcC5kYXRhID8gdG9wLmRhdGEodXAuJG5hbWVzcGFjZShrZXkpKSA6IHVuZGVmaW5lZDtcclxuIFxyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHVwW2tleV0gPSAgIGlzQXJyYXkgP1xyXG4gICAgICAgICAgICAgICAgbmV3IERhdGFBcnJheShvcHRpb25zKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IERhdGEob3B0aW9ucyk7XHJcbiBcclxuICAgICAgICAgICAgLy8gdHJpZ2dlciBkYXRhIGNoYW5nZVxyXG4gICAgICAgICAgICB0cmlnZ2VyICYmIHVwLiRjaGFuZ2UodXAuJG5hbWVzcGFjZShrZXkpLCB1cFtrZXldLCBvbGRWYWwpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAob2xkVmFsICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICB1cFtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgIC8vIHRyaWdnZXIgZGF0YSBjaGFuZ2VcclxuICAgICAgICAgICAgdHJpZ2dlciAmJiB1cC4kY2hhbmdlKHVwLiRuYW1lc3BhY2Uoa2V5KSwgdmFsdWUsIG9sZFZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghKH51cC5fa2V5cy5pbmRleE9mKGtleSkpKSB1cC5fa2V5cy5wdXNoKGtleSk7XHJcbiAgICB9XHJcbiBcclxuICAgIGZ1bmN0aW9uIF9pc0FycmF5KG9iaikge1xyXG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KG9iaikgfHwgb2JqIGluc3RhbmNlb2YgRGF0YUFycmF5O1xyXG4gICAgfVxyXG4gXHJcbiAgICBmdW5jdGlvbiBfZ2V0TGVuZ3RoKGtleXMpIHtcclxuICAgICAgICByZXR1cm4ga2V5cy5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIGtleSA9PT0gJ251bWJlcic7XHJcbiAgICAgICAgfSkubGVuZ3RoO1xyXG4gICAgfVxyXG4gXHJcbiAgICAvKipcclxuICAgICAqIERhdGFcclxuICAgICAqIEBjbGFzc1xyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gRGF0YShvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBvcHRpb25zLmRhdGEsXHJcbiAgICAgICAgICAgIGtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zLmRhdGEgfHwge30pXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGtleS5pbmRleE9mKCdfJykgIT09IDA7IH0pXHJcbiAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChudW0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gK251bSArICcnID09PSBudW0gPyArbnVtIDogbnVtO1xyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIHNlbGYgPSB0aGlzO1xyXG4gXHJcbiAgICAgICAgXy5leHRlbmQodGhpcywgZGF0YSk7XHJcbiBcclxuICAgICAgICAvLyBhbGwga2V5IG5lZWQgdG8gdHJhdmVyc2VcclxuICAgICAgICB0aGlzLl9rZXlzID0ga2V5cztcclxuICAgICAgICAvLyBwYXJlbnQgZGF0YSBjb250YWluZXJcclxuICAgICAgICB0aGlzLl91cCA9IG9wdGlvbnMudXA7XHJcbiAgICAgICAgLy8gdGhlIG1vc3QgdG9wIHBhcmVudCBkYXRhIGNvbnRhaW5lclxyXG4gICAgICAgIHRoaXMuX3RvcCA9IG9wdGlvbnMudG9wIHx8IHRoaXM7XHJcbiAgICAgICAgLy8gdGhlIG5hbWVzcGFjZSBvZiBkYXRhXHJcbiAgICAgICAgdGhpcy5fbmFtZXNwYWNlID0gb3B0aW9ucy5uYW1lc3BhY2UgfHwgJyc7XHJcbiAgICAgICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgX3ByZWZpeChzZWxmLCBrZXksIGRhdGFba2V5XSwgb3B0aW9ucy50cmlnZ2VyKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBpZiBpdCBpcyBhIGFycmF5XHJcbiAgICAgICAgX2lzQXJyYXkoZGF0YSkgICYmXHJcbiAgICAgICAgICAgIC8vIGZpeCB0aGUgbGVuZ3RoXHJcbiAgICAgICAgICAgICh0aGlzLmxlbmd0aCA9IF9nZXRMZW5ndGgoa2V5cykpO1xyXG4gICAgfVxyXG4gICAgXy5leHRlbmQoRGF0YS5wcm90b3R5cGUsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBnZXQgdGhlIG5hbWVzcGFjZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgICRuYW1lc3BhY2U6IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgdmFyIGtleXMgPSBbXSxcclxuICAgICAgICAgICAgICAgIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBmb3IgKDsgc2VsZiAhPSB1bmRlZmluZWQ7IHNlbGYgPSBzZWxmLl91cCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fbmFtZXNwYWNlICYmXHJcbiAgICAgICAgICAgICAgICAgICAga2V5cy51bnNoaWZ0KHNlbGYuX25hbWVzcGFjZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGtleSkga2V5cy5wdXNoKGtleSk7XHJcbiAgICAgICAgICAgIHJldHVybiBrZXlzLmpvaW4oJy4nKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGdldCB0aGUga2V5IG9mIGl0J3MgcGFyZW50XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgJGtleTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIga2V5ID0gdGhpcy5fbmFtZXNwYWNlO1xyXG4gICAgICAgICAgICByZXR1cm4gK2tleSArICcnID09PSBrZXkgPyAra2V5IDoga2V5O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogZ2V0IHRoZSBwYXJlbnQgb2YgdGhlIGRhdGFcclxuICAgICAgICAgKi9cclxuICAgICAgICAkdXA6IGZ1bmN0aW9uIChudW0pIHtcclxuICAgICAgICAgICAgbnVtID0gbnVtIHx8IDE7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHNyYyA9IHRoaXM7IG51bS0tOykge1xyXG4gICAgICAgICAgICAgICAgc3JjID0gc3JjWydfdXAnXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc3JjO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogc2V0IHRoZSB2YWx1ZSBvZiB0aGUga2V5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgJHNldDogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhrZXkpLmZpbHRlcihmdW5jdGlvbiAoaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBrLmluZGV4T2YoJ18nKSAhPT0gMDtcclxuICAgICAgICAgICAgICAgIH0pLmZvckVhY2goZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgICAgICAgICBfcHJlZml4KHNlbGYsIGssIGtleVtrXSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGNoYW5nZSh0aGlzLiRuYW1lc3BhY2Uoa2V5KSwgdGhpcywgdW5kZWZpbmVkLCAxKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXNba2V5XTtcclxuICAgICAgICAgICAgICAgIF9wcmVmaXgodGhpcywga2V5LCB2YWx1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBqdXN0IGJ1YmJsZVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kY2hhbmdlKHRoaXMuJG5hbWVzcGFjZShrZXkpLCB0aGlzW2tleV0sIG9sZFZhbHVlLCB1bmRlZmluZWQsIC0xKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGdldCB0aGUgYWN0dWFsIHZhbHVlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgJGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzLCBrZXlzID0gdGhpcy5fa2V5cywgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgcmVzID0ge307XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXMgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICAgICAgcmVzW2tleV0gPSBzZWxmW2tleV0gPT0gbnVsbCA/XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZltrZXldIDpcclxuICAgICAgICAgICAgICAgICAgICBzZWxmW2tleV0uJGdldCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGZba2V5XS4kZ2V0KCkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmW2tleV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogY2hhbmdlXHJcbiAgICAgICAgICogdHlwZSA9IDAganVzdCBjaGFuZ2VcclxuICAgICAgICAgKiB0eXBlID0gMSB0cmlnZ2VyIGNoYW5nZSAmIGRlZXBcclxuICAgICAgICAgKiB0eXBlID0gLTEganVzdCBkZWVwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgJGNoYW5nZTogZnVuY3Rpb24gKGtleSwgdmFsdWUsIG9sZFZhbCwgcGF0Y2gsIHR5cGUpIHtcclxuICAgICAgICAgICAgdHlwZSA9IHR5cGUgfHwgMDtcclxuICAgICAgICAgICAgdmFyIHRvcCA9IHRoaXMuX3RvcDtcclxuICAgICAgICAgICAgaWYgKHRvcC4kZW1pdCkge1xyXG4gICAgICAgICAgICAgICAgfnR5cGUgJiYgdGhpcy5fdG9wLiRlbWl0KCdkYXRhOicgKyBrZXksIHZhbHVlLCBvbGRWYWwsIHBhdGNoKTtcclxuICAgICAgICAgICAgICAgIHR5cGUgJiYgdGhpcy5fdG9wLiRlbWl0KCdkZWVwOicgKyBrZXksIHZhbHVlLCBvbGRWYWwsIHBhdGNoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gXHJcbiAgICAvKipcclxuICAgICAqIERhdGFBcnJheVxyXG4gICAgICogU29tZXRoaW5nIGp1c3QgbGlrZSBBcnJheVxyXG4gICAgICogQGNsYXNzXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBEYXRhQXJyYXkob3B0aW9ucykge1xyXG4gICAgICAgIERhdGEuY2FsbCh0aGlzLCBvcHRpb25zKTtcclxuICAgIH1cclxuICAgIF8uZXh0ZW5kKERhdGFBcnJheS5wcm90b3R5cGUsIERhdGEucHJvdG90eXBlLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogcHVzaCBkYXRhXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVzaDogZnVuY3Rpb24gKHZhbHVlcykge1xyXG4gICAgICAgICAgICB2YWx1ZXMgPSBfLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcclxuICAgICAgICAgICAgdmFyIHJlcyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHZhbHVlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIF9wcmVmaXgodGhpcywgdGhpcy5sZW5ndGgsIHZhbHVlc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9rZXlzLnB1c2godGhpcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgcmVzLnB1c2godGhpc1t0aGlzLmxlbmd0aF0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZW5ndGgrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB2YWx1ZSwgb2xkVmFsdWUsIHBhdGNoXHJcbiAgICAgICAgICAgIHRoaXMuJGNoYW5nZSh0aGlzLiRuYW1lc3BhY2UoKSwgdGhpcywgbnVsbCwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAncHVzaCcsXHJcbiAgICAgICAgICAgICAgICByZXM6IHJlcyxcclxuICAgICAgICAgICAgICAgIGFyZ3M6IHZhbHVlc1xyXG4gICAgICAgICAgICB9LCAxKTtcclxuIFxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHBvcCBkYXRhXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcG9wOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByZXMgPSB0aGlzWy0tdGhpcy5sZW5ndGhdO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpc1t0aGlzLmxlbmd0aF07XHJcbiAgICAgICAgICAgIHRoaXMuX2tleXMucG9wKCk7XHJcbiAgICAgICAgICAgIHRoaXMuJGNoYW5nZSh0aGlzLiRuYW1lc3BhY2UoKSwgdGhpcywgbnVsbCwgdW5kZWZpbmVkLCAxKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHVuc2hpZnRcclxuICAgICAgICAgKi9cclxuICAgICAgICB1bnNoaWZ0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fa2V5cy5wdXNoKHRoaXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgdGhpcy5sZW5ndGgrKztcclxuICAgICAgICAgICAgZm9yICh2YXIgbCA9IHRoaXMubGVuZ3RoOyBsLS07KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzW2xdID0gdGhpc1tsIC0gMV07XHJcbiAgICAgICAgICAgICAgICAvLyBmaXhlZCBuYW1lc3BhY2VcclxuICAgICAgICAgICAgICAgIHR5cGVvZiB0aGlzW2xdID09PSAnb2JqZWN0JyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzW2xdLl9uYW1lc3BhY2UgPSBsICsgJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9wcmVmaXgodGhpcywgMCwgdmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLiRjaGFuZ2UodGhpcy4kbmFtZXNwYWNlKCksIHRoaXMsIG51bGwsIHVuZGVmaW5lZCwgMSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogc2hpZnRcclxuICAgICAgICAgKi9cclxuICAgICAgICBzaGlmdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmxlbmd0aC0tO1xyXG4gICAgICAgICAgICB2YXIgcmVzID0gdGhpc1swXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpc1tpXSA9IHRoaXNbaSArIDFdO1xyXG4gICAgICAgICAgICAgICAgLy8gZml4ZWQgbmFtZXNwYWNlXHJcbiAgICAgICAgICAgICAgICB0eXBlb2YgdGhpc1tpXSA9PT0gJ29iamVjdCcgJiZcclxuICAgICAgICAgICAgICAgICAgICAodGhpc1tpXS5fbmFtZXNwYWNlID0gaSArICcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9rZXlzLnBvcCgpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpc1t0aGlzLmxlbmd0aF07XHJcbiAgICAgICAgICAgIHRoaXMuJGNoYW5nZSh0aGlzLiRuYW1lc3BhY2UoKSwgdGhpcywgbnVsbCwgdW5kZWZpbmVkLCAxKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHRvdWNoXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdG91Y2g6IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgdGhpcy4kY2hhbmdlKHRoaXMuJG5hbWVzcGFjZShrZXkpLCB0aGlzLCBudWxsLCB1bmRlZmluZWQsIDEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogaW5kZXhPZlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGluZGV4T2Y6IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLl91cCA9PT0gdGhpcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGkgPSAraXRlbS5fbmFtZXNwYWNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNbaV0gPT09IGl0ZW0pIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW2ldID09PSBpdGVtKSByZXR1cm4gaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBzcGxpY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBzcGxpY2U6IGZ1bmN0aW9uIChpLCBsIC8qKiwgaXRlbXMgc3VwcG9ydCBsYXRlciAqKi8pIHtcclxuICAgICAgICAgICAgdmFyIHBhdGNoID0ge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnc3BsaWNlJyxcclxuICAgICAgICAgICAgICAgIGFyZ3M6IFtpLCBsXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMCwgayA9IGwgKyBpLCB6ID0gdGhpcy5sZW5ndGggLSBsOyBpIDwgejsgaSsrLCBqKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXNbaV0gPSB0aGlzW2sgKyBqXTtcclxuICAgICAgICAgICAgICAgIHR5cGVvZiB0aGlzW2ldID09PSAnb2JqZWN0JyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzW2ldLl9uYW1lc3BhY2UgPSBpICsgJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoO2kgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzW2ldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoIC09IGw7XHJcbiAgICAgICAgICAgIHRoaXMuX2tleXMuc3BsaWNlKHRoaXMubGVuZ3RoLCBsKTtcclxuICAgICAgICAgICAgdGhpcy4kY2hhbmdlKHRoaXMuJG5hbWVzcGFjZSgpLCB0aGlzLCBudWxsLCBwYXRjaCwgMSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBmb3JFYWNoXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZm9yRWFjaDogZnVuY3Rpb24gKGZvbykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb28odGhpc1tpXSwgaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGZpbHRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGZvbykge1xyXG4gICAgICAgICAgICB2YXIgcmVzID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZvbyhpdGVtKSkgcmVzLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gXHJcbiAgICAvKipcclxuICAgICAqIFNlZWRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFNlZWQob3B0aW9ucykge1xyXG4gICAgICAgIERhdGEuY2FsbCh0aGlzLCBvcHRpb25zKTtcclxuICAgIH1cclxuICAgIF8uZXh0ZW5kKFNlZWQsIHtcclxuICAgICAgICBEYXRhOiBEYXRhLFxyXG4gICAgICAgIERhdGFBcnJheTogRGF0YUFycmF5XHJcbiAgICB9KTtcclxuICAgIF8uZXh0ZW5kKFNlZWQucHJvdG90eXBlLCBEYXRhLnByb3RvdHlwZSwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldCBkYXRhIGFuZCBFbGVtZW50IHZhbHVlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XHJcbiAgICAgICAgICogQHBhcmFtIHsqfSB2YWx1ZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtEYXRhfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGRhdGE6IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBpID0gMCwgbCwgZGF0YSA9IHRoaXMsIG5leHQ7XHJcbiAgICAgICAgICAgIGlmICh+a2V5LmluZGV4T2YoJy4nKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtleXMgPSBrZXkuc3BsaXQoJy4nKTtcclxuICAgICAgICAgICAgICAgIGZvciAobCA9IGtleXMubGVuZ3RoOyBpIDwgbCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IGtleXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8ga2V5IGlzIG51bWJlclxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgra2V5ICsgJycgPT09IGtleSkga2V5ID0gK2tleTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5IGluIGRhdGEgJiYgZGF0YVtrZXldICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGRhdGFba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGF0YSBpcyB1bmRlZmluZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQgPSBrZXlzW2kgKyAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpcyBudW1iZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCtuZXh0ICsgJycgPT0gbmV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0IGEgYXJyYXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9wcmVmaXgoZGF0YSwga2V5LCBbXSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXQgYSBvYmplY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9wcmVmaXgoZGF0YSwga2V5LCB7fSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbCAmJiAoa2V5ID0ga2V5c1tpXSk7XHJcbiAgICAgICAgICAgIC8vIGlmIGRhdGEgPT09IHVuZGVmaW5lZCwganVzdCByZXR1cm5cclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBkYXRhICYmIGtleSA/IGRhdGFba2V5XSA6IGRhdGE7XHJcbiAgICAgICAgICAgIGRhdGEuJHNldChrZXksIHZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGFba2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuIFxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBTZWVkO1xyXG4gXHJcbiBcclxuLyoqKi8gfSxcclxuLyogNiAqL1xyXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuIFxyXG4gICAgdmFyIERhdGEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpLFxyXG4gICAgICAgIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xyXG4gXHJcbiAgICBmdW5jdGlvbiBlbWl0KGtleSwgYXJncywgdGFyZ2V0KSB7XHJcbiAgICAgICAgLy8gc2V0IHRoZSB0cmlnZ2VyIHRhcmdldCBpcyBwYXNzIGluIG9yIHRoaXNcclxuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgfHwgdGhpcztcclxuICAgICAgICB2YXIgY2JzID0gdGhpcy5fZXZlbnRzW2tleV07XHJcbiAgICAgICAgaWYgKGNicykge1xyXG4gICAgICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgICAgICAgIGNicyA9IGNicy5sZW5ndGggPiAxID9cclxuICAgICAgICAgICAgICAgIF8uc2xpY2UuY2FsbChjYnMsIDApIDpcclxuICAgICAgICAgICAgICAgIGNicztcclxuICAgICAgICAgICAgZm9yICh2YXIgbCA9IGNicy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNic1tpXS5hcHBseSh0YXJnZXQsIGFyZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGVtaXQgcGFyZW50XHJcbiAgICAgICAgLy8gcHJldmVudCBkYXRhOiBldmVudCBhbmQgaG9vazogZXZlbnQgdHJpZ2dlclxyXG4gICAgICAgIGlmIChrZXkuaW5kZXhPZignZGF0YTonKSAmJiBrZXkuaW5kZXhPZignaG9vazonKSAmJiBrZXkuaW5kZXhPZignZGVlcDonKSAmJiB0aGlzLiRwYXJlbnQpIHtcclxuICAgICAgICAgICAgZW1pdC5jYWxsKHRoaXMuJHBhcmVudCwga2V5LCBhcmdzLCB0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuIFxyXG4gICAgZnVuY3Rpb24gY2FsbENoYW5nZShrZXksIGFyZ3MpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHtcclxuICAgICAgICAgICAgX2V2ZW50czogdGhpcy5fd2F0Y2hlcnNcclxuICAgICAgICB9O1xyXG4gICAgICAgIGVtaXQuY2FsbChzZWxmLCBrZXksIGFyZ3MpO1xyXG4gICAgICAgIGVtaXQuY2FsbChzZWxmLCBrZXkgKyAnKipkZWVwKionLCBhcmdzKTtcclxuICAgIH1cclxuIFxyXG4gICAgZnVuY3Rpb24gY2FsbERlZXAoa2V5LCBhcmdzKSB7XHJcbiAgICAgICAgdmFyIHByb3BzLCBuQXJncyxcclxuICAgICAgICAgICAga2V5cyA9IGtleS5zcGxpdCgnLicpLFxyXG4gICAgICAgICAgICBzZWxmID0geyBfZXZlbnRzOiB0aGlzLl93YXRjaGVycyB9O1xyXG4gXHJcbiAgICAgICAgZm9yIChrZXlzLnBvcCgpOyBrZXlzLmxlbmd0aCA+IDA7IGtleXMucG9wKCkpIHtcclxuICAgICAgICAgICAga2V5ID0ga2V5cy5qb2luKCcuJyk7XHJcbiAgICAgICAgICAgIHByb3BzID0ga2V5ICsgJyoqZGVlcCoqJztcclxuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBvbGQgdmFsdWVcclxuICAgICAgICAgICAgZW1pdC5jYWxsKHNlbGYsIHByb3BzLCBbdGhpcy5kYXRhKGtleSldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZW1pdCB2bSBpcyBjaGFuZ2VcclxuICAgICAgICBlbWl0LmNhbGwoc2VsZiwgJyoqZGVlcCoqJywgW3RoaXNdKTtcclxuICAgIH1cclxuIFxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAgICAgZW1pdDogZW1pdCxcclxuICAgICAgICBjYWxsQ2hhbmdlOiBjYWxsQ2hhbmdlLFxyXG4gICAgICAgIGNhbGxEZWVwOiBjYWxsRGVlcFxyXG4gICAgfTtcclxuIFxyXG4gXHJcbi8qKiovIH0sXHJcbi8qIDcgKi9cclxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcbiBcclxuICAgIHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcclxuIFxyXG4gICAgdmFyIHN0cmF0cyA9IHt9O1xyXG4gICAgc3RyYXRzLmNyZWF0ZWQgPVxyXG4gICAgc3RyYXRzLnJlYWR5ID1cclxuICAgIHN0cmF0cy5hdHRhY2hlZCA9XHJcbiAgICBzdHJhdHMuZGV0YWNoZWQgPVxyXG4gICAgc3RyYXRzLmNvbXBpbGVkID1cclxuICAgIHN0cmF0cy5iZWZvcmVEZXN0cm95ID1cclxuICAgIHN0cmF0cy5kZXN0cm95ZWQgPVxyXG4gICAgc3RyYXRzLnBhcmFtQXR0cmlidXRlcyA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XHJcbiAgICAgICAgcmV0dXJuIGNoaWxkVmFsID9cclxuICAgICAgICAgICAgcGFyZW50VmFsID9cclxuICAgICAgICAgICAgICAgIHBhcmVudFZhbC5jb25jYXQoY2hpbGRWYWwpIDpcclxuICAgICAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KGNoaWxkVmFsKSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkVmFsIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjaGlsZFZhbF0gOlxyXG4gICAgICAgICAgICBwYXJlbnRWYWw7XHJcbiAgICB9O1xyXG4gICAgc3RyYXRzLmRhdGEgPVxyXG4gICAgc3RyYXRzLmZpbHRlcnMgPVxyXG4gICAgc3RyYXRzLm1ldGhvZHMgPVxyXG4gICAgc3RyYXRzLmRpcmVjdGl2ZXMgPSBmdW5jdGlvbiAocGFyZW50VmFsLCBjaGlsZFZhbCkge1xyXG4gICAgICBpZiAoIWNoaWxkVmFsKSByZXR1cm4gcGFyZW50VmFsO1xyXG4gICAgICBpZiAoIXBhcmVudFZhbCkgcmV0dXJuIGNoaWxkVmFsO1xyXG4gICAgICByZXR1cm4gXy5leHRlbmQoe30sIHBhcmVudFZhbCwgY2hpbGRWYWwpO1xyXG4gICAgfTtcclxuIFxyXG4gICAgdmFyIGRlZmF1bHRTdHJhdCA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XHJcbiAgICAgICAgcmV0dXJuIGNoaWxkVmFsID09PSB1bmRlZmluZWQgP1xyXG4gICAgICAgICAgICBwYXJlbnRWYWwgOlxyXG4gICAgICAgICAgICBjaGlsZFZhbDtcclxuICAgIH07XHJcbiBcclxuICAgIC8qKlxyXG4gICAgICogT3B0aW9uIG92ZXJ3cml0aW5nIHN0cmF0ZWdpZXMgYXJlIGZ1bmN0aW9ucyB0aGF0IGhhbmRsZVxyXG4gICAgICogaG93IHRvIG1lcmdlIGEgcGFyZW50IG9wdGlvbiB2YWx1ZSBhbmQgYSBjaGlsZCBvcHRpb25cclxuICAgICAqIHZhbHVlIGludG8gdGhlIGZpbmFsIHZhbHVlLlxyXG4gICAgICpcclxuICAgICAqIEFsbCBzdHJhdGVneSBmdW5jdGlvbnMgZm9sbG93IHRoZSBzYW1lIHNpZ25hdHVyZTpcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyp9IHBhcmVudFZhbFxyXG4gICAgICogQHBhcmFtIHsqfSBjaGlsZFZhbFxyXG4gICAgICogQHBhcmFtIHtWdWV9IFt2bV1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gbWVyZ2VPcHRpb25zKHBhcmVudCwgY2hpbGQsIHZtKSB7XHJcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7fSwga2V5O1xyXG4gICAgICAgIGZvciAoa2V5IGluIHBhcmVudCkge1xyXG4gICAgICAgICAgICBtZXJnZShrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGtleSBpbiBjaGlsZCkge1xyXG4gICAgICAgICAgICBpZiAoIShwYXJlbnQuaGFzT3duUHJvcGVydHkoa2V5KSkpIHtcclxuICAgICAgICAgICAgICAgIG1lcmdlKGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gbWVyZ2Uoa2V5KSB7XHJcbiAgICAgICAgICAgIHZhciBzdHJhdCA9IHN0cmF0c1trZXldIHx8IGRlZmF1bHRTdHJhdDtcclxuICAgICAgICAgICAgb3B0aW9uc1trZXldID0gc3RyYXQocGFyZW50W2tleV0sIGNoaWxkW2tleV0sIHZtLCBrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3B0aW9ucztcclxuICAgIH1cclxuIFxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAgICAgc3RyYXRzOiBzdHJhdHMsXHJcbiAgICAgICAgbWVyZ2VPcHRpb25zOiBtZXJnZU9wdGlvbnNcclxuICAgIH1cclxuIFxyXG4gXHJcbi8qKiovIH0sXHJcbi8qIDggKi9cclxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcbiBcclxuICAgIC8vIE1vZHVsZXMgbWFwXHJcbiAgICB2YXIgbW9kdWxlcyA9IHt9LFxyXG4gICAgICAgIG1lcmdlT3B0aW9ucyA9IF9fd2VicGFja19yZXF1aXJlX18oNykubWVyZ2VPcHRpb25zLFxyXG4gICAgICAgIGxpc3RlbmVycyA9IHt9O1xyXG4gXHJcbiAgICBmdW5jdGlvbiBfZGVmaW5lKG5hbWUsIG9wdGlvbnMpIHtcclxuICAgICAgICBpZiAobW9kdWxlc1tuYW1lXSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHZhciBtb2R1bGUgPSBtb2R1bGVzW25hbWVdID0gdGhpcy5leHRlbmQob3B0aW9ucyB8fCB7fSk7XHJcbiAgICAgICAgcmV0dXJuIG1vZHVsZTtcclxuICAgIH1cclxuIFxyXG4gICAgZnVuY3Rpb24gX3JlcXVpcmUobmFtZSwgY2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gbW9kdWxlc1tuYW1lXSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gXHJcbiAgICBmdW5jdGlvbiBfY3JlYXRlKG8pIHtcclxuICAgICAgICBmdW5jdGlvbiBGKCkge31cclxuICAgICAgICBGLnByb3RvdHlwZSA9IG87XHJcbiAgICAgICAgcmV0dXJuIG5ldyBGKCk7XHJcbiAgICB9XHJcbiBcclxuICAgIGZ1bmN0aW9uIF9leHRlbmQoZXh0ZW5kT3B0aW9ucykge1xyXG4gICAgICAgIGV4dGVuZE9wdGlvbnMgPSBleHRlbmRPcHRpb25zIHx8IHt9O1xyXG4gICAgICAgIHZhciBTdXBlciA9IHRoaXMsXHJcbiAgICAgICAgICAgIFN1YiA9IGNyZWF0ZUNsYXNzKGV4dGVuZE9wdGlvbnMubmFtZSB8fCAnUUNvbXBvbmVudCcpO1xyXG4gICAgICAgIFN1Yi5wcm90b3R5cGUgPSBfY3JlYXRlKFN1cGVyLnByb3RvdHlwZSk7XHJcbiAgICAgICAgU3ViLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFN1YjtcclxuICAgICAgICBTdWIub3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhcclxuICAgICAgICAgICAgU3VwZXIub3B0aW9ucyxcclxuICAgICAgICAgICAgZXh0ZW5kT3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgU3ViWydzdXBlciddID0gU3VwZXI7XHJcbiAgICAgICAgWydleHRlbmQnLCAnZ2V0JywgJ2FsbCcsICdyZXF1aXJlJywgJ2RlZmluZSddLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICBTdWJba2V5XSA9IFN1cGVyW2tleV07XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gU3ViO1xyXG4gICAgfVxyXG4gXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVDbGFzcyAobmFtZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgRnVuY3Rpb24oXHJcbiAgICAgICAgICAgICdyZXR1cm4gZnVuY3Rpb24gJyArIG5hbWUgK1xyXG4gICAgICAgICAgICAnIChvcHRpb25zKSB7IHRoaXMuX2luaXQob3B0aW9ucykgfSdcclxuICAgICAgICApKCk7XHJcbiAgICB9XHJcbiBcclxuICAgIG1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGRlZmluZVxyXG4gICAgICAgICAqIGRlZmluZSBhIGNvbXBvbmVudFxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBkZWZpbmU6IF9kZWZpbmUsXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogcmVxdWlyZVxyXG4gICAgICAgICAqIHJlcXVpcmUobmFtZSlcclxuICAgICAgICAgKiByZXF1aXJlKG5hbWVzLCBjYWxsYmFjaylcclxuICAgICAgICAgKiByZXF1aXJlIGEgY29tcG9uZW50XHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcclxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBuYW1lc1xyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmVxdWlyZTogX3JlcXVpcmUsXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogZXh0ZW5kXHJcbiAgICAgICAgICogZXh0ZW5kIHRoZSBjbGFzc1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZXh0ZW5kOiBfZXh0ZW5kXHJcbiAgICB9O1xyXG4gXHJcbiBcclxuLyoqKi8gfSxcclxuLyogOSAqL1xyXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuIFxyXG4gICAgdmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpLFxyXG4gICAgICAgIHN0cmF0cyA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XHJcbiBcclxuICAgIHZhciBQUk9QX1JFRyA9IC9eKC4qKVxcLihbXFx3XFwtXSspJC9cclxuIFxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAgICAgY2xvYWs6IHtcclxuICAgICAgICAgICAgYmluZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZtID0gdGhpcy52bSxcclxuICAgICAgICAgICAgICAgICAgICBlbCA9IHRoaXMuZWw7XHJcbiBcclxuICAgICAgICAgICAgICAgIC8vIGFmdGVyIHJlYWR5XHJcbiAgICAgICAgICAgICAgICB2bS4kb25jZSgnaG9vazpyZWFkeScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBkYXRhIGNoYW5nZVxyXG4gICAgICAgICAgICAgICAgICAgIHZtLiRvbmNlKCdkYXRhY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ3EtY2xvYWsnKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaG93OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIGVsID0gdGhpcy5lbDtcclxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlzcGxheSA9IGVsLmN1cnJlbnRTdHlsZSA/XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuY3VycmVudFN0eWxlLmRpc3BsYXkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5kaXNwbGF5O1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpc3BsYXkgPT09ICdub25lJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ2NsYXNzJzogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciBlbCA9IHRoaXMuZWwsXHJcbiAgICAgICAgICAgICAgICBhcmcgPSB0aGlzLmFyZztcclxuICAgICAgICAgICAgaWYgKGFyZykge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgP1xyXG4gICAgICAgICAgICAgICAgICAgIF8uYWRkQ2xhc3MoZWwsIGFyZykgOlxyXG4gICAgICAgICAgICAgICAgICAgIF8ucmVtb3ZlQ2xhc3MoZWwsIGFyZyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sYXN0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXy5yZW1vdmVDbGFzcyhlbCwgdGhpcy5sYXN0VmFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF8uYWRkQ2xhc3MoZWwsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RWYWwgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgZWwgPSB0aGlzLmVsO1xyXG4gICAgICAgICAgICBpZiAoZWwudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xyXG4gICAgICAgICAgICAgICAgZWwuY2hlY2tlZCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWwudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXR0cjogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciBhcmcgPSB0aGlzLmFyZyxcclxuICAgICAgICAgICAgICAgIGVsID0gdGhpcy5lbDtcclxuICAgICAgICAgICAgLy8gcHJvcGVydHlcclxuICAgICAgICAgICAgaWYgKGFyZyA9PT0gJ3N0eWxlJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrIGluIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5oYXNPd25Qcm9wZXJ0eShrKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3R5bGVba10gPSB2YWx1ZVtrXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKGFyZywgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZyBpbiBlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsW2FyZ10gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKGFyZywgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZXh0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIHRleHQ7XHJcbiBcclxuICAgICAgICAgICAgdmFsdWUgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgICAgICAgICAgKHRleHQgPSAodHlwZW9mIHRoaXMuZWwudGV4dENvbnRlbnQgPT09ICdzdHJpbmcnKSA/XHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHRDb250ZW50JyA6ICdpbm5lclRleHQnKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLmVsW3RleHRdID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPT0gbnVsbCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJyA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS50b1N0cmluZygpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGh0bWw6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gdmFsdWUgJiYgdmFsdWUudG9TdHJpbmcoKSB8fCAnJztcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uOiB7XHJcbiAgICAgICAgICAgIGJpbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICBrZXkgPSB0aGlzLnRhcmdldCxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbSA9IHRoaXMucGFyYW0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVycyA9IHRoaXMuZmlsdGVycyxcclxuICAgICAgICAgICAgICAgICAgICB2bSA9IHRoaXMudm0sXHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlciA9IHZtLmFwcGx5RmlsdGVycyh0aGlzLnZtW2tleV0sIGZpbHRlcnMpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBwYXJhbSAmJiAofnBhcmFtLmluZGV4T2YoJ3RoaXMnKSkgJiYgc2VsZi5kYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBfLmFkZCh0aGlzLmVsLCB0aGlzLmFyZywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWhhbmRsZXIgfHwgdHlwZW9mIGhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF8ud2FybignWW91IG5lZWQgaW1wbGVtZW50IHRoZSAnICsga2V5ICsgJyBtZXRob2QuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0gP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbS5mb3JFYWNoKGZ1bmN0aW9uIChhcmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcmcgPT09ICdlJykgYXJncy5wdXNoKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYXJnID09PSAndGhpcycpIGFyZ3MucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGFyZyA9PT0gJ3RydWUnKSBhcmdzLnB1c2godHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChhcmcgPT09ICdmYWxzZScpIGFyZ3MucHVzaChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgrYXJnICsgJycgPT09IGFyZykgYXJncy5wdXNoKCthcmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYXJnLm1hdGNoKC9eKFsnXCJdKS4qXFwxJC8pKSBhcmdzLnB1c2goYXJnLnNsaWNlKDEsIC0xKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGFyZ3MucHVzaChzZWxmLmRhdGEoYXJnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGUpO1xyXG4gXHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlci5hcHBseSh2bSwgYXJncyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbW9kZWw6IHtcclxuICAgICAgICAgICAgYmluZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtleXMgPSAoKHRoaXMubmFtZXNwYWNlID8gdGhpcy5uYW1lc3BhY2UgKyAnLicgOiAnJykgKyB0aGlzLnRhcmdldCkuc3BsaXQoJy4nKSxcclxuICAgICAgICAgICAgICAgICAgICBrZXkgPSBrZXlzLnBvcCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZSA9IGtleXMuam9pbignLicpLFxyXG4gICAgICAgICAgICAgICAgICAgIGVsID0gdGhpcy5lbCxcclxuICAgICAgICAgICAgICAgICAgICB2bSA9IHRoaXMudm0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHZtLmRhdGEobmFtZXNwYWNlKSxcclxuICAgICAgICAgICAgICAgICAgICBjb21wb3NpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIF8uYWRkKGVsLCAnaW5wdXQgcHJvcGVydHljaGFuZ2UgY2hhbmdlIGtleXByZXNzIGtleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcG9zaW5nKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS4kc2V0KGtleSwgZWwudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBfLmFkZChlbCwgJ2NvbXBvc2l0aW9uc3RhcnQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvc2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIF8uYWRkKGVsLCAnY29tcG9zaXRpb25lbmQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvc2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbC52YWx1ZSAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHZtOiB7XHJcbiAgICAgICAgICAgIGJpbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIHN0b3Agd2Fsa1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nLnN0b3AgPSB0cnVlO1xyXG4gXHJcbiAgICAgICAgICAgICAgICAvLyB3aGljaCBjb21wb25lbnRcclxuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gdGhpcy50YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgdm0gPSB0aGlzLnZtLFxyXG4gICAgICAgICAgICAgICAgICAgIGVsID0gdGhpcy5lbCxcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb21wb25lbnQgcmVmZXJlbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgcmVmID0gZWwuZ2V0QXR0cmlidXRlKCdxLXJlZicpIHx8IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIENoaWxkID0gdm0uY29uc3RydWN0b3IucmVxdWlyZShuYW1lKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gQ2hpbGQub3B0aW9ucy5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRWbTtcclxuIFxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBlbDogZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBfcGFyZW50OiB2bVxyXG4gICAgICAgICAgICAgICAgfTtcclxuIFxyXG4gICAgICAgICAgICAgICAgY2hpbGRWbSA9IG5ldyBDaGlsZChvcHRpb25zKTtcclxuIFxyXG4gICAgICAgICAgICAgICAgdm0uX2NoaWxkcmVuLnB1c2goY2hpbGRWbSk7XHJcbiAgICAgICAgICAgICAgICByZWYgJiYgIWZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVmcyA9IHZtLiRbcmVmXTtcclxuICAgICAgICAgICAgICAgICAgICByZWZzID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmcy5sZW5ndGggP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHJlZnMucHVzaChjaGlsZFZtKSkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZtLiRbcmVmXSA9IFtyZWZzLCBjaGlsZFZtXSkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAodm0uJFtyZWZdID0gY2hpbGRWbSk7XHJcbiAgICAgICAgICAgICAgICB9KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgICdpZic6IHtcclxuICAgICAgICAgICAgYmluZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIGlmIGVsIGlzIGEgdGVtcGxhdGVcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lbC5wYXJlbnROb2RlKSByZXR1cm47XHJcbiBcclxuICAgICAgICAgICAgICAgIHZhciB0cGwgPSB0aGlzLmVsLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGUgPSB0cGwucGFyZW50Tm9kZSxcclxuICAgICAgICAgICAgICAgICAgICByZWYgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCdxLWlmJyksXHJcbiAgICAgICAgICAgICAgICAgICAgaGFzSW5pdCA9IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4aXN0ID0gdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBrZXkgPSB0aGlzLnRhcmdldCxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lc3BhY2UgPSB0aGlzLm5hbWVzcGFjZSxcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBfLmdldChuYW1lc3BhY2UsIGtleSksXHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZEZpbHRlcnMgPSB0aGlzLmZpbHRlcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMuZGF0YSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHZtID0gdGhpcy52bTtcclxuIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nLnN0b3AgPSB0cnVlO1xyXG4gXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBfaW5pdCh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5vIGV4aXN0IG5vIGJpbmRcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFzSW5pdCB8fCAhZXhpc3QgfHwgIXZhbHVlKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzSW5pdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uX3RlbXBsYXRlQmluZCh0cGwsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZXNwYWNlOiBuYW1lc3BhY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltbWVkaWF0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgICAgICAgICB2bS4kd2F0Y2godGFyZ2V0LCBmdW5jdGlvbiAodmFsdWUsIG9sZFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdm0uYXBwbHlGaWx0ZXJzKHZhbHVlLCByZWFkRmlsdGVycywgb2xkVmFsKTtcclxuIFxyXG4gICAgICAgICAgICAgICAgICAgIF9pbml0KHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuZWVkIHRvIGluaXRcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IGV4aXN0KSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYmluZFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh0cGwsIHJlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdW5iaW5kXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQocmVmLCB0cGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBleGlzdCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuIFxyXG4gICAgICAgICAgICAgICAgICAgIF9pbml0KHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH0sIHR5cGVvZiB0aGlzLmRhdGEoa2V5KSA9PT0gJ29iamVjdCcsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbDoge1xyXG4gICAgICAgICAgICBiaW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZtLiQkW3RoaXMudGFyZ2V0XSA9IHRoaXMuZWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlcGVhdDogX193ZWJwYWNrX3JlcXVpcmVfXygxMClcclxuICAgIH07XHJcbiBcclxuIFxyXG4vKioqLyB9LFxyXG4vKiAxMCAqL1xyXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuIFxyXG4gICAgdmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xyXG4gICAgICAgIHZhciBtZXRob2RzID0ge1xyXG4gICAgICAgICAgICAnZGVmYXVsdCc6IHtcclxuICAgICAgICAgICAgICAgIC8vIGhvdyB0byBjbGVhbiB0aGUgZG9tXHJcbiAgICAgICAgICAgICAgICBjbGVhbjogZnVuY3Rpb24gKHBhcmVudE5vZGUsIHJlcGVhdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVwZWF0cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwZWF0cy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZXBlYXQgZWxlbWVudCBtYXkgaGFzIGJlZW4gcmVtb3ZlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudE5vZGUgPT09IHBhcmVudE5vZGUgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXy5jbGVhbkRhdGEocmVwZWF0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdHMubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaW5zZXJ0OiBmdW5jdGlvbiAocGFyZW50Tm9kZSwgZnJhZ21lbnQsIHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGZyYWdtZW50LCByZWYpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwdXNoOiB7XHJcbiAgICAgICAgICAgICAgICBpbnNlcnQ6IGZ1bmN0aW9uIChwYXJlbnROb2RlLCBmcmFnbWVudCwgcmVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZnJhZ21lbnQsIHJlZik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZHA6IGZ1bmN0aW9uIChkYXRhLCBwYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXRjaC5yZXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNwbGljZToge1xyXG4gICAgICAgICAgICAgICAgY2xlYW46IGZ1bmN0aW9uIChwYXJlbnROb2RlLCByZXBlYXRzLCB2YWx1ZSwgd2F0Y2hlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IHZhbHVlWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsID0gdmFsdWVbMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IHZhbHVlWzJdLiRuYW1lc3BhY2UoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlcyA9IHJlcGVhdHMuc3BsaWNlKGksIGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZXMuZm9yRWFjaChmdW5jdGlvbiAoZWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBqdXN0IHNwbGljZSBvbmUgdGltZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdmFsdWUuZG9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGxpY2Uod2F0Y2hlcnMsIHRhcmdldCwgaSwgbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLmRvbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkcDogZnVuY3Rpb24gKGRhdGEsIHBhdGNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0Y2guYXJncy5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXRjaC5hcmdzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuIFxyXG4gXHJcbiAgICBmdW5jdGlvbiBzcGxpY2Uod2F0Y2hlcnMsIHRhcmdldCwgaSwgbCkge1xyXG4gICAgICAgIHZhciBsZW5ndGggPSB0YXJnZXQubGVuZ3RoLFxyXG4gICAgICAgICAgICBzdWJLZXksXHJcbiAgICAgICAgICAgIGN1cixcclxuICAgICAgICAgICAgaW5kZXgsXHJcbiAgICAgICAgICAgIG5ld0tleTtcclxuICAgICAgICBPYmplY3Qua2V5cyh3YXRjaGVycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIGlmICh+a2V5LmluZGV4T2YodGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgc3ViS2V5ID0ga2V5LnN1YnN0cmluZyhsZW5ndGggKyAxKTtcclxuICAgICAgICAgICAgICAgIGN1ciA9IHN1YktleS5zcGxpdCgnLicpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1ci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9ICtjdXIuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGluZGV4IC09IGwpID49IGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyLnVuc2hpZnQoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXIudW5zaGlmdCh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdLZXkgPSBjdXIuam9pbignLicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3YXRjaGVyc1tuZXdLZXldID0gd2F0Y2hlcnNba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHdhdGNoZXJzW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiBcclxuICAgIGV4cG9ydHMuYmluZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdHBsID0gdGhpcy5lbCxcclxuICAgICAgICAgICAgc2V0dGluZyA9IHRoaXMuc2V0dGluZyxcclxuICAgICAgICAgICAgcGFyZW50Tm9kZSA9IHRwbC5wYXJlbnROb2RlLFxyXG4gICAgICAgICAgICBrZXksIG5hbWVzcGFjZSwgdGFyZ2V0LCByZWFkRmlsdGVycywgcmVwZWF0cywgcmVmLCB2bTtcclxuICAgICAgICAvLyByZXR1cm5cclxuICAgICAgICBpZiAoIXBhcmVudE5vZGUgfHwgc2V0dGluZy5zdG9wKSByZXR1cm47XHJcbiBcclxuICAgICAgICAvLyBzdG9wIGJpbmRpbmdcclxuICAgICAgICBzZXR0aW5nLnN0b3AgPSB0cnVlO1xyXG4gXHJcbiAgICAgICAga2V5ID0gdGhpcy50YXJnZXQ7XHJcbiAgICAgICAgbmFtZXNwYWNlID0gdGhpcy5uYW1lc3BhY2U7XHJcbiAgICAgICAgdGFyZ2V0ID0gXy5nZXQobmFtZXNwYWNlLCBrZXkpO1xyXG4gICAgICAgIHJlYWRGaWx0ZXJzID0gdGhpcy5maWx0ZXJzO1xyXG4gICAgICAgIHJlcGVhdHMgPSBbXTtcclxuICAgICAgICByZWYgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCdxLXJlcGVhdCcpO1xyXG4gICAgICAgIHZtID0gdGhpcy52bTtcclxuIFxyXG4gICAgICAgIHBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHJlZiwgdHBsKTtcclxuIFxyXG4gICAgICAgIHZtLiR3YXRjaCh0YXJnZXQsIGZ1bmN0aW9uICh2YWx1ZSwgb2xkVmFsLCBwYXRjaCkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHZtLmFwcGx5RmlsdGVycyh2YWx1ZSwgcmVhZEZpbHRlcnMpO1xyXG4gICAgICAgICAgICAvLyBpZiB2YWx1ZSBpcyB1bmRlZmluZWQgb3IgbnVsbCBqdXN0IHJldHVyblxyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB2YXIgbWV0aG9kID0gKCFyZWFkRmlsdGVycy5sZW5ndGggJiYgcGF0Y2gpID8gcGF0Y2gubWV0aG9kIDogJ2RlZmF1bHQnLFxyXG4gICAgICAgICAgICAgICAgZHAgPSAobWV0aG9kc1ttZXRob2RdIHx8IHt9KS5kcCxcclxuICAgICAgICAgICAgICAgIGNsZWFuID0gKG1ldGhvZHNbbWV0aG9kXSB8fCB7fSkuY2xlYW4sXHJcbiAgICAgICAgICAgICAgICBpbnNlcnQgPSAobWV0aG9kc1ttZXRob2RdIHx8IHt9KS5pbnNlcnQ7XHJcbiBcclxuICAgICAgICAgICAgLy8gaWYgZHAgZXhpc3RzLCBwcm9jZWVzcyBkYXRhXHJcbiAgICAgICAgICAgIGRwICYmICh2YWx1ZSA9IGRwKHZhbHVlLCBwYXRjaCkpO1xyXG4gXHJcbiAgICAgICAgICAgIGlmIChjbGVhbiAmJiBjbGVhbihwYXJlbnROb2RlLCByZXBlYXRzLCB2YWx1ZSwgdm0uX3dhdGNoZXJzLCB0YXJnZXQpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuIFxyXG4gICAgICAgICAgICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXHJcbiAgICAgICAgICAgICAgICBpdGVtTm9kZTtcclxuIFxyXG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChvYmosIGkpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1Ob2RlID0gXy5jbG9uZSh0cGwpO1xyXG4gICAgICAgICAgICAgICAgdm0uX3RlbXBsYXRlQmluZChpdGVtTm9kZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG9iaixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lc3BhY2U6IG9iai4kbmFtZXNwYWNlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgaW1tZWRpYXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIFRPRE8gdGhpcyBtdXN0IHJlZmFjdG9yXHJcbiAgICAgICAgICAgICAgICByZXBlYXRzLnB1c2goaXRlbU5vZGUpO1xyXG4gICAgICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoaXRlbU5vZGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuIFxyXG4gICAgICAgICAgICBpbnNlcnQgJiYgaW5zZXJ0KHBhcmVudE5vZGUsIGZyYWdtZW50LCByZWYpO1xyXG4gICAgICAgICAgICB2bS4kZW1pdCgncmVwZWF0LXJlbmRlcicpO1xyXG4gICAgICAgIH0sIGZhbHNlLCB0cnVlKTtcclxuICAgIH1cclxuIFxyXG4gXHJcbi8qKiovIH0sXHJcbi8qIDExICovXHJcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG4gXHJcbiAgICB2YXIgcGFyc2UgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKSxcclxuICAgICAgICBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcclxuIFxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWwsIG9wdGlvbnMpIHtcclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuIFxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICAgICAgZGlyZWN0aXZlcyA9IHNlbGYuJG9wdGlvbnMuZGlyZWN0aXZlcyxcclxuICAgICAgICAgICAgaW5kZXggPSBvcHRpb25zLmluZGV4LFxyXG4gICAgICAgICAgICBkYXRhID0gb3B0aW9ucy5kYXRhIHx8IHNlbGYsXHJcbiAgICAgICAgICAgIG5hbWVzcGFjZSA9IG9wdGlvbnMubmFtZXNwYWNlO1xyXG4gXHJcbiAgICAgICAgXy53YWxrKFtlbF0sIGZ1bmN0aW9uIChub2RlLCByZXMsIHNldHRpbmcpIHtcclxuICAgICAgICAgICAgcmVzLmZvckVhY2goZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBvYmoubmFtZS5zdWJzdHJpbmcoMiksXHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlID0gZGlyZWN0aXZlc1tuYW1lXSxcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdG9ycyA9IHBhcnNlKG9iai52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmUgJiZcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChkZXNjcmlwdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWFkRmlsdGVycyA9IHNlbGYuX21ha2VSZWFkRmlsdGVycyhkZXNjcmlwdG9yLmZpbHRlcnMsIHNlbGYuZGF0YShuYW1lc3BhY2UpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleSA9IGRlc2NyaXB0b3IudGFyZ2V0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gXy5nZXQobmFtZXNwYWNlLCBrZXkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlID0gXy5pc09iamVjdChkaXJlY3RpdmUpID8gZGlyZWN0aXZlLnVwZGF0ZSA6IGRpcmVjdGl2ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQgPSBfLmV4dGVuZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWw6IG5vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm06IHNlbGYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5kYXRhKF8uZ2V0KG5hbWVzcGFjZSwga2V5KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lc3BhY2U6IG5hbWVzcGFjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nOiBzZXR0aW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBkZXNjcmlwdG9yLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogcmVhZEZpbHRlcnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wID0gdGhhdC5kYXRhKGtleSk7XHJcbiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlICYmIHNlbGYuJHdhdGNoKHRhcmdldCwgZnVuY3Rpb24gKHZhbHVlLCBvbGRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBzZWxmLmFwcGx5RmlsdGVycyh2YWx1ZSwgcmVhZEZpbHRlcnMsIG9sZFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZS5jYWxsKHRoYXQsIHZhbHVlLCBvbGRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHR5cGVvZiB0bXAgPT09ICdvYmplY3QnLCBfLmFscGFjYSA/IGZhbHNlIDogdHlwZW9mIG9wdGlvbnMuaW1tZWRpYXRlID09PSAnYm9vbGVhbicgPyBvcHRpb25zLmltbWVkaWF0ZSA6ICh0bXAgIT09IHVuZGVmaW5lZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXy5pc09iamVjdChkaXJlY3RpdmUpICYmIGRpcmVjdGl2ZS5iaW5kKSBkaXJlY3RpdmUuYmluZC5jYWxsKHRoYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiBcclxuIFxyXG4vKioqLyB9LFxyXG4vKiAxMiAqL1xyXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuIFxyXG4gICAgdmFyIGNhY2hlID0gbmV3IChfX3dlYnBhY2tfcmVxdWlyZV9fKDIpKSgxMDAwKSxcclxuICAgICAgICB0b2tlbnMgPSBbXHJcbiAgICAgICAgICAgIC8vIHNwYWNlXHJcbiAgICAgICAgICAgIFsvXiArL10sXHJcbiAgICAgICAgICAgIC8vIGFyZ1xyXG4gICAgICAgICAgICBbL14oW1xcd1xcLV0rKTovLCBmdW5jdGlvbiAoY2FwdHVyZXMsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLnRva2VuLmFyZyA9IGNhcHR1cmVzWzFdO1xyXG4gICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgLy8gZnVuY3Rpb25cclxuICAgICAgICAgICAgWy9eKFtcXHddKylcXCgoLis/KVxcKS8sIGZ1bmN0aW9uIChjYXB0dXJlcywgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMudG9rZW4udGFyZ2V0ID0gY2FwdHVyZXNbMV07XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMudG9rZW4ucGFyYW0gPSBjYXB0dXJlc1syXS5zcGxpdCgvICosICovKTtcclxuICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgIC8vIHRhcmdldFxyXG4gICAgICAgICAgICBbL14oW1xcd1xcLVxcLlxcJF0rKS8sIGZ1bmN0aW9uIChjYXB0dXJlcywgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMudG9rZW4udGFyZ2V0ID0gY2FwdHVyZXNbMV07XHJcbiAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICAvLyBmaWx0ZXJcclxuICAgICAgICAgICAgWy9eKD89XFx8KS8sIGZ1bmN0aW9uIChjYXB0dXJlcywgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMuZmlsdGVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgIC8vIG5leHRcclxuICAgICAgICAgICAgWy9eLC8sIGZ1bmN0aW9uIChjYXB0dXJlcywgc3RhdHVzLCByZXMpIHtcclxuICAgICAgICAgICAgICAgIHJlcy5wdXNoKHN0YXR1cy50b2tlbik7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMudG9rZW4gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogW11cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgXSxcclxuICAgICAgICBmaWx0ZXJSRUcgPSAvXiguKz8pKD89LHwkKS8sXHJcbiAgICAgICAgZmlsdGVyVG9rZW5zID0gW1xyXG4gICAgICAgICAgICAvLyBzcGFjZVxyXG4gICAgICAgICAgICBbL14gKy9dLFxyXG4gICAgICAgICAgICAvLyBmaWx0ZXJcclxuICAgICAgICAgICAgWy9eXFx8ICooW1xcd1xcLVxcIV0rKS8sIGZ1bmN0aW9uIChjYXB0dXJlcywgZmlsdGVycykge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVycy5wdXNoKFtjYXB0dXJlc1sxXV0pO1xyXG4gICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgLy8gc3RyaW5nXHJcbiAgICAgICAgICAgIFsvXihbJ1wiXSkoKChcXFxcWydcIl0pPyhbXlxcMV0pKikrKVxcMS8sIGZ1bmN0aW9uIChjYXB0dXJlcywgZmlsdGVycykge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyc1tmaWx0ZXJzLmxlbmd0aCAtIDFdLnB1c2goY2FwdHVyZXNbM10pO1xyXG4gICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgLy8gYXJnXHJcbiAgICAgICAgICAgIFsvXihbXFx3XFwtXFwkXSspLywgZnVuY3Rpb24gKGNhcHR1cmVzLCBmaWx0ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJzW2ZpbHRlcnMubGVuZ3RoIC0gMV0ucHVzaChjYXB0dXJlc1sxXSk7XHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgXTtcclxuICAgIC8qKlxyXG4gICAgICogY2xpY2s6IG9uY2xpY2sgfCBmaWx0ZXIxIHwgZmlsdGVyMlxyXG4gICAgICogY2xpY2s6IG9uY2xpY2sgLCBrZXlkb3duOiBvbmtleWRvd25cclxuICAgICAqIGNsaWNrOiBvbmNsaWNrKHRoaXMpXHJcbiAgICAgKiBjbGljazogb25jbGljayhlLCB0aGlzKVxyXG4gICAgICogdmFsdWUxIHwgZmlsdGVyMSB8IGZpbHRlcjJcclxuICAgICAqIHZhbHVlIC0gMSB8IGZpbHRlcjEgfCBmaWx0ZXIyICAgZG9uJ3Qgc3VwcG9ydFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBwYXJzZShzdHIpIHtcclxuICAgICAgICB2YXIgbmFtZSA9IHN0cixcclxuICAgICAgICAgICAgaGl0ID0gY2FjaGUuZ2V0KG5hbWUpO1xyXG4gICAgICAgIGlmIChoaXQpIHJldHVybiBoaXQ7XHJcbiBcclxuICAgICAgICB2YXIgcmVzID0gW10sXHJcbiAgICAgICAgICAgIGNhcHR1cmVzLFxyXG4gICAgICAgICAgICBpLFxyXG4gICAgICAgICAgICBsID0gdG9rZW5zLmxlbmd0aCxcclxuICAgICAgICAgICAgZm9vLFxyXG4gICAgICAgICAgICAvLyBpZiBoYXMgdG9rZW4gb3Igbm90XHJcbiAgICAgICAgICAgIGhhcyA9IGZhbHNlLFxyXG4gICAgICAgICAgICBzdGF0dXMgPSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBpbiBmaWx0ZXIgb3Igbm90XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8ganVzdCB0b2tlbiBvYmplY3RcclxuICAgICAgICAgICAgICAgIHRva2VuOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogW11cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuIFxyXG4gICAgICAgIHdoaWxlIChzdHIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChjYXB0dXJlcyA9IHRva2Vuc1tpXVswXS5leGVjKHN0cikpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaGFzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9vID0gdG9rZW5zW2ldWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbyAmJiBmb28oY2FwdHVyZXMsIHN0YXR1cywgcmVzKTtcclxuICAgICAgICAgICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSh0b2tlbnNbaV1bMF0sICcnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzLmZpbHRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0dXJlcyA9IGZpbHRlclJFRy5leGVjKHN0cik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlRmlsdGVyKGNhcHR1cmVzWzBdLnRyaW0oKSwgc3RhdHVzLnRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoZmlsdGVyUkVHLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5maWx0ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGhhcykge1xyXG4gICAgICAgICAgICAgICAgaGFzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N5bnRheCBlcnJvciBhdDogJyArIHN0cik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiBcclxuICAgICAgICByZXMucHVzaChzdGF0dXMudG9rZW4pO1xyXG4gICAgICAgIGNhY2hlLnB1dChuYW1lLCByZXMpO1xyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcbiBcclxuICAgIGZ1bmN0aW9uIHBhcnNlRmlsdGVyKHN0ciwgdG9rZW4pIHtcclxuICAgICAgICB2YXIgaSwgbCA9IGZpbHRlclRva2Vucy5sZW5ndGgsXHJcbiAgICAgICAgICAgIGhhcyA9IGZhbHNlO1xyXG4gICAgICAgIHdoaWxlIChzdHIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgXHR2YXIgY2FwdHVyZXMgPSBmaWx0ZXJUb2tlbnNbaV1bMF0uZXhlYyhzdHIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhcHR1cmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhhcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvbyA9IGZpbHRlclRva2Vuc1tpXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICBmb28gJiYgZm9vKGNhcHR1cmVzLCB0b2tlbi5maWx0ZXJzKTtcclxuICAgICAgICAgICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShmaWx0ZXJUb2tlbnNbaV1bMF0sICcnKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaGFzKSB7XHJcbiAgICAgICAgICAgICAgICBoYXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3ludGF4IGVycm9yIGF0OiAnICsgc3RyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuIFxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBwYXJzZTtcclxuIFxyXG4gXHJcbi8qKiovIH1cclxuLyoqKioqKi8gXSlcclxufSk7XHJcbjsiXX0=
