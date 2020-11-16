(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */
;

(function (window, document, $, undefined) {
  "use strict";

  var H = $("html"),
      W = $(window),
      D = $(document),
      F = $.fancybox = function () {
    F.open.apply(this, arguments);
  },
      IE = navigator.userAgent.match(/msie/i),
      didUpdate = null,
      isTouch = document.createTouch !== undefined,
      isQuery = function isQuery(obj) {
    return obj && obj.hasOwnProperty && obj instanceof $;
  },
      isString = function isString(str) {
    return str && $.type(str) === "string";
  },
      isPercentage = function isPercentage(str) {
    return isString(str) && str.indexOf('%') > 0;
  },
      isScrollable = function isScrollable(el) {
    return el && !(el.style.overflow && el.style.overflow === 'hidden') && (el.clientWidth && el.scrollWidth > el.clientWidth || el.clientHeight && el.scrollHeight > el.clientHeight);
  },
      getScalar = function getScalar(orig, dim) {
    var value = parseInt(orig, 10) || 0;

    if (dim && isPercentage(orig)) {
      value = F.getViewport()[dim] / 100 * value;
    }

    return Math.ceil(value);
  },
      getValue = function getValue(value, dim) {
    return getScalar(value, dim) + 'px';
  };

  $.extend(F, {
    // The current version of fancyBox
    version: '2.1.5',
    defaults: {
      padding: 15,
      margin: 20,
      width: 800,
      height: 600,
      minWidth: 100,
      minHeight: 100,
      maxWidth: 9999,
      maxHeight: 9999,
      pixelRatio: 1,
      // Set to 2 for retina display support
      autoSize: true,
      autoHeight: false,
      autoWidth: false,
      autoResize: true,
      autoCenter: !isTouch,
      fitToView: true,
      aspectRatio: false,
      topRatio: 0.5,
      leftRatio: 0.5,
      scrolling: 'auto',
      // 'auto', 'yes' or 'no'
      wrapCSS: '',
      arrows: true,
      closeBtn: true,
      closeClick: false,
      nextClick: false,
      mouseWheel: true,
      autoPlay: false,
      playSpeed: 3000,
      preload: 3,
      modal: false,
      loop: true,
      ajax: {
        dataType: 'html',
        headers: {
          'X-fancyBox': true
        }
      },
      iframe: {
        scrolling: 'auto',
        preload: true
      },
      swf: {
        wmode: 'transparent',
        allowfullscreen: 'true',
        allowscriptaccess: 'always'
      },
      keys: {
        next: {
          13: 'left',
          // enter
          34: 'up',
          // page down
          39: 'left',
          // right arrow
          40: 'up' // down arrow

        },
        prev: {
          8: 'right',
          // backspace
          33: 'down',
          // page up
          37: 'right',
          // left arrow
          38: 'down' // up arrow

        },
        close: [27],
        // escape key
        play: [32],
        // space - start/stop slideshow
        toggle: [70] // letter "f" - toggle fullscreen

      },
      direction: {
        next: 'left',
        prev: 'right'
      },
      scrollOutside: true,
      // Override some properties
      index: 0,
      type: null,
      href: null,
      content: null,
      title: null,
      // HTML templates
      tpl: {
        wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
        image: '<img class="fancybox-image" src="{href}" alt="" />',
        iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (IE ? ' allowtransparency="true"' : '') + '></iframe>',
        error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
        closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
        next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
        prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
      },
      // Properties for each animation type
      // Opening fancyBox
      openEffect: 'fade',
      // 'elastic', 'fade' or 'none'
      openSpeed: 250,
      openEasing: 'swing',
      openOpacity: true,
      openMethod: 'zoomIn',
      // Closing fancyBox
      closeEffect: 'fade',
      // 'elastic', 'fade' or 'none'
      closeSpeed: 250,
      closeEasing: 'swing',
      closeOpacity: true,
      closeMethod: 'zoomOut',
      // Changing next gallery item
      nextEffect: 'elastic',
      // 'elastic', 'fade' or 'none'
      nextSpeed: 250,
      nextEasing: 'swing',
      nextMethod: 'changeIn',
      // Changing previous gallery item
      prevEffect: 'elastic',
      // 'elastic', 'fade' or 'none'
      prevSpeed: 250,
      prevEasing: 'swing',
      prevMethod: 'changeOut',
      // Enable default helpers
      helpers: {
        overlay: true,
        title: true
      },
      // Callbacks
      onCancel: $.noop,
      // If canceling
      beforeLoad: $.noop,
      // Before loading
      afterLoad: $.noop,
      // After loading
      beforeShow: $.noop,
      // Before changing in current item
      afterShow: $.noop,
      // After opening
      beforeChange: $.noop,
      // Before changing gallery item
      beforeClose: $.noop,
      // Before closing
      afterClose: $.noop // After closing

    },
    //Current state
    group: {},
    // Selected group
    opts: {},
    // Group options
    previous: null,
    // Previous element
    coming: null,
    // Element being loaded
    current: null,
    // Currently loaded element
    isActive: false,
    // Is activated
    isOpen: false,
    // Is currently open
    isOpened: false,
    // Have been fully opened at least once
    wrap: null,
    skin: null,
    outer: null,
    inner: null,
    player: {
      timer: null,
      isActive: false
    },
    // Loaders
    ajaxLoad: null,
    imgPreload: null,
    // Some collections
    transitions: {},
    helpers: {},

    /*
     *	Static methods
     */
    open: function open(group, opts) {
      if (!group) {
        return;
      }

      if (!$.isPlainObject(opts)) {
        opts = {};
      } // Close if already active


      if (false === F.close(true)) {
        return;
      } // Normalize group


      if (!$.isArray(group)) {
        group = isQuery(group) ? $(group).get() : [group];
      } // Recheck if the type of each element is `object` and set content type (image, ajax, etc)


      $.each(group, function (i, element) {
        var obj = {},
            href,
            title,
            content,
            type,
            rez,
            hrefParts,
            selector;

        if ($.type(element) === "object") {
          // Check if is DOM element
          if (element.nodeType) {
            element = $(element);
          }

          if (isQuery(element)) {
            obj = {
              href: element.data('fancybox-href') || element.attr('href'),
              title: $('<div/>').text(element.data('fancybox-title') || element.attr('title')).html(),
              isDom: true,
              element: element
            };

            if ($.metadata) {
              $.extend(true, obj, element.metadata());
            }
          } else {
            obj = element;
          }
        }

        href = opts.href || obj.href || (isString(element) ? element : null);
        title = opts.title !== undefined ? opts.title : obj.title || '';
        content = opts.content || obj.content;
        type = content ? 'html' : opts.type || obj.type;

        if (!type && obj.isDom) {
          type = element.data('fancybox-type');

          if (!type) {
            rez = element.prop('class').match(/fancybox\.(\w+)/);
            type = rez ? rez[1] : null;
          }
        }

        if (isString(href)) {
          // Try to guess the content type
          if (!type) {
            if (F.isImage(href)) {
              type = 'image';
            } else if (F.isSWF(href)) {
              type = 'swf';
            } else if (href.charAt(0) === '#') {
              type = 'inline';
            } else if (isString(element)) {
              type = 'html';
              content = element;
            }
          } // Split url into two pieces with source url and content selector, e.g,
          // "/mypage.html #my_id" will load "/mypage.html" and display element having id "my_id"


          if (type === 'ajax') {
            hrefParts = href.split(/\s+/, 2);
            href = hrefParts.shift();
            selector = hrefParts.shift();
          }
        }

        if (!content) {
          if (type === 'inline') {
            if (href) {
              content = $(isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href); //strip for ie7
            } else if (obj.isDom) {
              content = element;
            }
          } else if (type === 'html') {
            content = href;
          } else if (!type && !href && obj.isDom) {
            type = 'inline';
            content = element;
          }
        }

        $.extend(obj, {
          href: href,
          type: type,
          content: content,
          title: title,
          selector: selector
        });
        group[i] = obj;
      }); // Extend the defaults

      F.opts = $.extend(true, {}, F.defaults, opts); // All options are merged recursive except keys

      if (opts.keys !== undefined) {
        F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
      }

      F.group = group;
      return F._start(F.opts.index);
    },
    // Cancel image loading or abort ajax request
    cancel: function cancel() {
      var coming = F.coming;

      if (coming && false === F.trigger('onCancel')) {
        return;
      }

      F.hideLoading();

      if (!coming) {
        return;
      }

      if (F.ajaxLoad) {
        F.ajaxLoad.abort();
      }

      F.ajaxLoad = null;

      if (F.imgPreload) {
        F.imgPreload.onload = F.imgPreload.onerror = null;
      }

      if (coming.wrap) {
        coming.wrap.stop(true, true).trigger('onReset').remove();
      }

      F.coming = null; // If the first item has been canceled, then clear everything

      if (!F.current) {
        F._afterZoomOut(coming);
      }
    },
    // Start closing animation if is open; remove immediately if opening/closing
    close: function close(event) {
      F.cancel();

      if (false === F.trigger('beforeClose')) {
        return;
      }

      F.unbindEvents();

      if (!F.isActive) {
        return;
      }

      if (!F.isOpen || event === true) {
        $('.fancybox-wrap').stop(true).trigger('onReset').remove();

        F._afterZoomOut();
      } else {
        F.isOpen = F.isOpened = false;
        F.isClosing = true;
        $('.fancybox-item, .fancybox-nav').remove();
        F.wrap.stop(true, true).removeClass('fancybox-opened');
        F.transitions[F.current.closeMethod]();
      }
    },
    // Manage slideshow:
    //   $.fancybox.play(); - toggle slideshow
    //   $.fancybox.play( true ); - start
    //   $.fancybox.play( false ); - stop
    play: function play(action) {
      var clear = function clear() {
        clearTimeout(F.player.timer);
      },
          set = function set() {
        clear();

        if (F.current && F.player.isActive) {
          F.player.timer = setTimeout(F.next, F.current.playSpeed);
        }
      },
          stop = function stop() {
        clear();
        D.unbind('.player');
        F.player.isActive = false;
        F.trigger('onPlayEnd');
      },
          start = function start() {
        if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
          F.player.isActive = true;
          D.bind({
            'onCancel.player beforeClose.player': stop,
            'onUpdate.player': set,
            'beforeLoad.player': clear
          });
          set();
          F.trigger('onPlayStart');
        }
      };

      if (action === true || !F.player.isActive && action !== false) {
        start();
      } else {
        stop();
      }
    },
    // Navigate to next gallery item
    next: function next(direction) {
      var current = F.current;

      if (current) {
        if (!isString(direction)) {
          direction = current.direction.next;
        }

        F.jumpto(current.index + 1, direction, 'next');
      }
    },
    // Navigate to previous gallery item
    prev: function prev(direction) {
      var current = F.current;

      if (current) {
        if (!isString(direction)) {
          direction = current.direction.prev;
        }

        F.jumpto(current.index - 1, direction, 'prev');
      }
    },
    // Navigate to gallery item by index
    jumpto: function jumpto(index, direction, router) {
      var current = F.current;

      if (!current) {
        return;
      }

      index = getScalar(index);
      F.direction = direction || current.direction[index >= current.index ? 'next' : 'prev'];
      F.router = router || 'jumpto';

      if (current.loop) {
        if (index < 0) {
          index = current.group.length + index % current.group.length;
        }

        index = index % current.group.length;
      }

      if (current.group[index] !== undefined) {
        F.cancel();

        F._start(index);
      }
    },
    // Center inside viewport and toggle position type to fixed or absolute if needed
    reposition: function reposition(e, onlyAbsolute) {
      var current = F.current,
          wrap = current ? current.wrap : null,
          pos;

      if (wrap) {
        pos = F._getPosition(onlyAbsolute);

        if (e && e.type === 'scroll') {
          delete pos.position;
          wrap.stop(true, true).animate(pos, 200);
        } else {
          wrap.css(pos);
          current.pos = $.extend({}, current.dim, pos);
        }
      }
    },
    update: function update(e) {
      var type = e && e.originalEvent && e.originalEvent.type,
          anyway = !type || type === 'orientationchange';

      if (anyway) {
        clearTimeout(didUpdate);
        didUpdate = null;
      }

      if (!F.isOpen || didUpdate) {
        return;
      }

      didUpdate = setTimeout(function () {
        var current = F.current;

        if (!current || F.isClosing) {
          return;
        }

        F.wrap.removeClass('fancybox-tmp');

        if (anyway || type === 'load' || type === 'resize' && current.autoResize) {
          F._setDimension();
        }

        if (!(type === 'scroll' && current.canShrink)) {
          F.reposition(e);
        }

        F.trigger('onUpdate');
        didUpdate = null;
      }, anyway && !isTouch ? 0 : 300);
    },
    // Shrink content to fit inside viewport or restore if resized
    toggle: function toggle(action) {
      if (F.isOpen) {
        F.current.fitToView = $.type(action) === "boolean" ? action : !F.current.fitToView; // Help browser to restore document dimensions

        if (isTouch) {
          F.wrap.removeAttr('style').addClass('fancybox-tmp');
          F.trigger('onUpdate');
        }

        F.update();
      }
    },
    hideLoading: function hideLoading() {
      D.unbind('.loading');
      $('#fancybox-loading').remove();
    },
    showLoading: function showLoading() {
      var el, viewport;
      F.hideLoading();
      el = $('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo('body'); // If user will press the escape-button, the request will be canceled

      D.bind('keydown.loading', function (e) {
        if ((e.which || e.keyCode) === 27) {
          e.preventDefault();
          F.cancel();
        }
      });

      if (!F.defaults.fixed) {
        viewport = F.getViewport();
        el.css({
          position: 'absolute',
          top: viewport.h * 0.5 + viewport.y,
          left: viewport.w * 0.5 + viewport.x
        });
      }

      F.trigger('onLoading');
    },
    getViewport: function getViewport() {
      var locked = F.current && F.current.locked || false,
          rez = {
        x: W.scrollLeft(),
        y: W.scrollTop()
      };

      if (locked && locked.length) {
        rez.w = locked[0].clientWidth;
        rez.h = locked[0].clientHeight;
      } else {
        // See http://bugs.jquery.com/ticket/6724
        rez.w = isTouch && window.innerWidth ? window.innerWidth : W.width();
        rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
      }

      return rez;
    },
    // Unbind the keyboard / clicking actions
    unbindEvents: function unbindEvents() {
      if (F.wrap && isQuery(F.wrap)) {
        F.wrap.unbind('.fb');
      }

      D.unbind('.fb');
      W.unbind('.fb');
    },
    bindEvents: function bindEvents() {
      var current = F.current,
          keys;

      if (!current) {
        return;
      } // Changing document height on iOS devices triggers a 'resize' event,
      // that can change document height... repeating infinitely


      W.bind('orientationchange.fb' + (isTouch ? '' : ' resize.fb') + (current.autoCenter && !current.locked ? ' scroll.fb' : ''), F.update);
      keys = current.keys;

      if (keys) {
        D.bind('keydown.fb', function (e) {
          var code = e.which || e.keyCode,
              target = e.target || e.srcElement; // Skip esc key if loading, because showLoading will cancel preloading

          if (code === 27 && F.coming) {
            return false;
          } // Ignore key combinations and key events within form elements


          if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is('[contenteditable]')))) {
            $.each(keys, function (i, val) {
              if (current.group.length > 1 && val[code] !== undefined) {
                F[i](val[code]);
                e.preventDefault();
                return false;
              }

              if ($.inArray(code, val) > -1) {
                F[i]();
                e.preventDefault();
                return false;
              }
            });
          }
        });
      }

      if ($.fn.mousewheel && current.mouseWheel) {
        F.wrap.bind('mousewheel.fb', function (e, delta, deltaX, deltaY) {
          var target = e.target || null,
              parent = $(target),
              canScroll = false;

          while (parent.length) {
            if (canScroll || parent.is('.fancybox-skin') || parent.is('.fancybox-wrap')) {
              break;
            }

            canScroll = isScrollable(parent[0]);
            parent = $(parent).parent();
          }

          if (delta !== 0 && !canScroll) {
            if (F.group.length > 1 && !current.canShrink) {
              if (deltaY > 0 || deltaX > 0) {
                F.prev(deltaY > 0 ? 'down' : 'left');
              } else if (deltaY < 0 || deltaX < 0) {
                F.next(deltaY < 0 ? 'up' : 'right');
              }

              e.preventDefault();
            }
          }
        });
      }
    },
    trigger: function trigger(event, o) {
      var ret,
          obj = o || F.coming || F.current;

      if (obj) {
        if ($.isFunction(obj[event])) {
          ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
        }

        if (ret === false) {
          return false;
        }

        if (obj.helpers) {
          $.each(obj.helpers, function (helper, opts) {
            if (opts && F.helpers[helper] && $.isFunction(F.helpers[helper][event])) {
              F.helpers[helper][event]($.extend(true, {}, F.helpers[helper].defaults, opts), obj);
            }
          });
        }
      }

      D.trigger(event);
    },
    isImage: function isImage(str) {
      return isString(str) && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
    },
    isSWF: function isSWF(str) {
      return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
    },
    _start: function _start(index) {
      var coming = {},
          obj,
          href,
          type,
          margin,
          padding;
      index = getScalar(index);
      obj = F.group[index] || null;

      if (!obj) {
        return false;
      }

      coming = $.extend(true, {}, F.opts, obj); // Convert margin and padding properties to array - top, right, bottom, left

      margin = coming.margin;
      padding = coming.padding;

      if ($.type(margin) === 'number') {
        coming.margin = [margin, margin, margin, margin];
      }

      if ($.type(padding) === 'number') {
        coming.padding = [padding, padding, padding, padding];
      } // 'modal' propery is just a shortcut


      if (coming.modal) {
        $.extend(true, coming, {
          closeBtn: false,
          closeClick: false,
          nextClick: false,
          arrows: false,
          mouseWheel: false,
          keys: null,
          helpers: {
            overlay: {
              closeClick: false
            }
          }
        });
      } // 'autoSize' property is a shortcut, too


      if (coming.autoSize) {
        coming.autoWidth = coming.autoHeight = true;
      }

      if (coming.width === 'auto') {
        coming.autoWidth = true;
      }

      if (coming.height === 'auto') {
        coming.autoHeight = true;
      }
      /*
       * Add reference to the group, so it`s possible to access from callbacks, example:
       * afterLoad : function() {
       *     this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
       * }
       */


      coming.group = F.group;
      coming.index = index; // Give a chance for callback or helpers to update coming item (type, title, etc)

      F.coming = coming;

      if (false === F.trigger('beforeLoad')) {
        F.coming = null;
        return;
      }

      type = coming.type;
      href = coming.href;

      if (!type) {
        F.coming = null; //If we can not determine content type then drop silently or display next/prev item if looping through gallery

        if (F.current && F.router && F.router !== 'jumpto') {
          F.current.index = index;
          return F[F.router](F.direction);
        }

        return false;
      }

      F.isActive = true;

      if (type === 'image' || type === 'swf') {
        coming.autoHeight = coming.autoWidth = false;
        coming.scrolling = 'visible';
      }

      if (type === 'image') {
        coming.aspectRatio = true;
      }

      if (type === 'iframe' && isTouch) {
        coming.scrolling = 'scroll';
      } // Build the neccessary markup


      coming.wrap = $(coming.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + type + ' fancybox-tmp ' + coming.wrapCSS).appendTo(coming.parent || 'body');
      $.extend(coming, {
        skin: $('.fancybox-skin', coming.wrap),
        outer: $('.fancybox-outer', coming.wrap),
        inner: $('.fancybox-inner', coming.wrap)
      });
      $.each(["Top", "Right", "Bottom", "Left"], function (i, v) {
        coming.skin.css('padding' + v, getValue(coming.padding[i]));
      });
      F.trigger('onReady'); // Check before try to load; 'inline' and 'html' types need content, others - href

      if (type === 'inline' || type === 'html') {
        if (!coming.content || !coming.content.length) {
          return F._error('content');
        }
      } else if (!href) {
        return F._error('href');
      }

      if (type === 'image') {
        F._loadImage();
      } else if (type === 'ajax') {
        F._loadAjax();
      } else if (type === 'iframe') {
        F._loadIframe();
      } else {
        F._afterLoad();
      }
    },
    _error: function _error(type) {
      $.extend(F.coming, {
        type: 'html',
        autoWidth: true,
        autoHeight: true,
        minWidth: 0,
        minHeight: 0,
        scrolling: 'no',
        hasError: type,
        content: F.coming.tpl.error
      });

      F._afterLoad();
    },
    _loadImage: function _loadImage() {
      // Reset preload image so it is later possible to check "complete" property
      var img = F.imgPreload = new Image();

      img.onload = function () {
        this.onload = this.onerror = null;
        F.coming.width = this.width / F.opts.pixelRatio;
        F.coming.height = this.height / F.opts.pixelRatio;

        F._afterLoad();
      };

      img.onerror = function () {
        this.onload = this.onerror = null;

        F._error('image');
      };

      img.src = F.coming.href;

      if (img.complete !== true) {
        F.showLoading();
      }
    },
    _loadAjax: function _loadAjax() {
      var coming = F.coming;
      F.showLoading();
      F.ajaxLoad = $.ajax($.extend({}, coming.ajax, {
        url: coming.href,
        error: function error(jqXHR, textStatus) {
          if (F.coming && textStatus !== 'abort') {
            F._error('ajax', jqXHR);
          } else {
            F.hideLoading();
          }
        },
        success: function success(data, textStatus) {
          if (textStatus === 'success') {
            coming.content = data;

            F._afterLoad();
          }
        }
      }));
    },
    _loadIframe: function _loadIframe() {
      var coming = F.coming,
          iframe = $(coming.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime())).attr('scrolling', isTouch ? 'auto' : coming.iframe.scrolling).attr('src', coming.href); // This helps IE

      $(coming.wrap).bind('onReset', function () {
        try {
          $(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
        } catch (e) {}
      });

      if (coming.iframe.preload) {
        F.showLoading();
        iframe.one('load', function () {
          $(this).data('ready', 1); // iOS will lose scrolling if we resize

          if (!isTouch) {
            $(this).bind('load.fb', F.update);
          } // Without this trick:
          //   - iframe won't scroll on iOS devices
          //   - IE7 sometimes displays empty iframe


          $(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();

          F._afterLoad();
        });
      }

      coming.content = iframe.appendTo(coming.inner);

      if (!coming.iframe.preload) {
        F._afterLoad();
      }
    },
    _preloadImages: function _preloadImages() {
      var group = F.group,
          current = F.current,
          len = group.length,
          cnt = current.preload ? Math.min(current.preload, len - 1) : 0,
          item,
          i;

      for (i = 1; i <= cnt; i += 1) {
        item = group[(current.index + i) % len];

        if (item.type === 'image' && item.href) {
          new Image().src = item.href;
        }
      }
    },
    _afterLoad: function _afterLoad() {
      var coming = F.coming,
          previous = F.current,
          placeholder = 'fancybox-placeholder',
          current,
          content,
          type,
          scrolling,
          href,
          embed;
      F.hideLoading();

      if (!coming || F.isActive === false) {
        return;
      }

      if (false === F.trigger('afterLoad', coming, previous)) {
        coming.wrap.stop(true).trigger('onReset').remove();
        F.coming = null;
        return;
      }

      if (previous) {
        F.trigger('beforeChange', previous);
        previous.wrap.stop(true).removeClass('fancybox-opened').find('.fancybox-item, .fancybox-nav').remove();
      }

      F.unbindEvents();
      current = coming;
      content = coming.content;
      type = coming.type;
      scrolling = coming.scrolling;
      $.extend(F, {
        wrap: current.wrap,
        skin: current.skin,
        outer: current.outer,
        inner: current.inner,
        current: current,
        previous: previous
      });
      href = current.href;

      switch (type) {
        case 'inline':
        case 'ajax':
        case 'html':
          if (current.selector) {
            content = $('<div>').html(content).find(current.selector);
          } else if (isQuery(content)) {
            if (!content.data(placeholder)) {
              content.data(placeholder, $('<div class="' + placeholder + '"></div>').insertAfter(content).hide());
            }

            content = content.show().detach();
            current.wrap.bind('onReset', function () {
              if ($(this).find(content).length) {
                content.hide().replaceAll(content.data(placeholder)).data(placeholder, false);
              }
            });
          }

          break;

        case 'image':
          content = current.tpl.image.replace(/\{href\}/g, href);
          break;

        case 'swf':
          content = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
          embed = '';
          $.each(current.swf, function (name, val) {
            content += '<param name="' + name + '" value="' + val + '"></param>';
            embed += ' ' + name + '="' + val + '"';
          });
          content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + '></embed></object>';
          break;
      }

      if (!(isQuery(content) && content.parent().is(current.inner))) {
        current.inner.append(content);
      } // Give a chance for helpers or callbacks to update elements


      F.trigger('beforeShow'); // Set scrolling before calculating dimensions

      current.inner.css('overflow', scrolling === 'yes' ? 'scroll' : scrolling === 'no' ? 'hidden' : scrolling); // Set initial dimensions and start position

      F._setDimension();

      F.reposition();
      F.isOpen = false;
      F.coming = null;
      F.bindEvents();

      if (!F.isOpened) {
        $('.fancybox-wrap').not(current.wrap).stop(true).trigger('onReset').remove();
      } else if (previous.prevMethod) {
        F.transitions[previous.prevMethod]();
      }

      F.transitions[F.isOpened ? current.nextMethod : current.openMethod]();

      F._preloadImages();
    },
    _setDimension: function _setDimension() {
      var viewport = F.getViewport(),
          steps = 0,
          canShrink = false,
          canExpand = false,
          wrap = F.wrap,
          skin = F.skin,
          inner = F.inner,
          current = F.current,
          width = current.width,
          height = current.height,
          minWidth = current.minWidth,
          minHeight = current.minHeight,
          maxWidth = current.maxWidth,
          maxHeight = current.maxHeight,
          scrolling = current.scrolling,
          scrollOut = current.scrollOutside ? current.scrollbarWidth : 0,
          margin = current.margin,
          wMargin = getScalar(margin[1] + margin[3]),
          hMargin = getScalar(margin[0] + margin[2]),
          wPadding,
          hPadding,
          wSpace,
          hSpace,
          origWidth,
          origHeight,
          origMaxWidth,
          origMaxHeight,
          ratio,
          width_,
          height_,
          maxWidth_,
          maxHeight_,
          iframe,
          body; // Reset dimensions so we could re-check actual size

      wrap.add(skin).add(inner).width('auto').height('auto').removeClass('fancybox-tmp');
      wPadding = getScalar(skin.outerWidth(true) - skin.width());
      hPadding = getScalar(skin.outerHeight(true) - skin.height()); // Any space between content and viewport (margin, padding, border, title)

      wSpace = wMargin + wPadding;
      hSpace = hMargin + hPadding;
      origWidth = isPercentage(width) ? (viewport.w - wSpace) * getScalar(width) / 100 : width;
      origHeight = isPercentage(height) ? (viewport.h - hSpace) * getScalar(height) / 100 : height;

      if (current.type === 'iframe') {
        iframe = current.content;

        if (current.autoHeight && iframe.data('ready') === 1) {
          try {
            if (iframe[0].contentWindow.document.location) {
              inner.width(origWidth).height(9999);
              body = iframe.contents().find('body');

              if (scrollOut) {
                body.css('overflow-x', 'hidden');
              }

              origHeight = body.outerHeight(true);
            }
          } catch (e) {}
        }
      } else if (current.autoWidth || current.autoHeight) {
        inner.addClass('fancybox-tmp'); // Set width or height in case we need to calculate only one dimension

        if (!current.autoWidth) {
          inner.width(origWidth);
        }

        if (!current.autoHeight) {
          inner.height(origHeight);
        }

        if (current.autoWidth) {
          origWidth = inner.width();
        }

        if (current.autoHeight) {
          origHeight = inner.height();
        }

        inner.removeClass('fancybox-tmp');
      }

      width = getScalar(origWidth);
      height = getScalar(origHeight);
      ratio = origWidth / origHeight; // Calculations for the content

      minWidth = getScalar(isPercentage(minWidth) ? getScalar(minWidth, 'w') - wSpace : minWidth);
      maxWidth = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, 'w') - wSpace : maxWidth);
      minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, 'h') - hSpace : minHeight);
      maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, 'h') - hSpace : maxHeight); // These will be used to determine if wrap can fit in the viewport

      origMaxWidth = maxWidth;
      origMaxHeight = maxHeight;

      if (current.fitToView) {
        maxWidth = Math.min(viewport.w - wSpace, maxWidth);
        maxHeight = Math.min(viewport.h - hSpace, maxHeight);
      }

      maxWidth_ = viewport.w - wMargin;
      maxHeight_ = viewport.h - hMargin;

      if (current.aspectRatio) {
        if (width > maxWidth) {
          width = maxWidth;
          height = getScalar(width / ratio);
        }

        if (height > maxHeight) {
          height = maxHeight;
          width = getScalar(height * ratio);
        }

        if (width < minWidth) {
          width = minWidth;
          height = getScalar(width / ratio);
        }

        if (height < minHeight) {
          height = minHeight;
          width = getScalar(height * ratio);
        }
      } else {
        width = Math.max(minWidth, Math.min(width, maxWidth));

        if (current.autoHeight && current.type !== 'iframe') {
          inner.width(width);
          height = inner.height();
        }

        height = Math.max(minHeight, Math.min(height, maxHeight));
      } // Try to fit inside viewport (including the title)


      if (current.fitToView) {
        inner.width(width).height(height);
        wrap.width(width + wPadding); // Real wrap dimensions

        width_ = wrap.width();
        height_ = wrap.height();

        if (current.aspectRatio) {
          while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
            if (steps++ > 19) {
              break;
            }

            height = Math.max(minHeight, Math.min(maxHeight, height - 10));
            width = getScalar(height * ratio);

            if (width < minWidth) {
              width = minWidth;
              height = getScalar(width / ratio);
            }

            if (width > maxWidth) {
              width = maxWidth;
              height = getScalar(width / ratio);
            }

            inner.width(width).height(height);
            wrap.width(width + wPadding);
            width_ = wrap.width();
            height_ = wrap.height();
          }
        } else {
          width = Math.max(minWidth, Math.min(width, width - (width_ - maxWidth_)));
          height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
        }
      }

      if (scrollOut && scrolling === 'auto' && height < origHeight && width + wPadding + scrollOut < maxWidth_) {
        width += scrollOut;
      }

      inner.width(width).height(height);
      wrap.width(width + wPadding);
      width_ = wrap.width();
      height_ = wrap.height();
      canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
      canExpand = current.aspectRatio ? width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight : (width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight);
      $.extend(current, {
        dim: {
          width: getValue(width_),
          height: getValue(height_)
        },
        origWidth: origWidth,
        origHeight: origHeight,
        canShrink: canShrink,
        canExpand: canExpand,
        wPadding: wPadding,
        hPadding: hPadding,
        wrapSpace: height_ - skin.outerHeight(true),
        skinSpace: skin.height() - height
      });

      if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) {
        inner.height('auto');
      }
    },
    _getPosition: function _getPosition(onlyAbsolute) {
      var current = F.current,
          viewport = F.getViewport(),
          margin = current.margin,
          width = F.wrap.width() + margin[1] + margin[3],
          height = F.wrap.height() + margin[0] + margin[2],
          rez = {
        position: 'absolute',
        top: margin[0],
        left: margin[3]
      };

      if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
        rez.position = 'fixed';
      } else if (!current.locked) {
        rez.top += viewport.y;
        rez.left += viewport.x;
      }

      rez.top = getValue(Math.max(rez.top, rez.top + (viewport.h - height) * current.topRatio));
      rez.left = getValue(Math.max(rez.left, rez.left + (viewport.w - width) * current.leftRatio));
      return rez;
    },
    _afterZoomIn: function _afterZoomIn() {
      var current = F.current;

      if (!current) {
        return;
      }

      F.isOpen = F.isOpened = true;
      F.wrap.css('overflow', 'visible').addClass('fancybox-opened').hide().show(0);
      F.update(); // Assign a click event

      if (current.closeClick || current.nextClick && F.group.length > 1) {
        F.inner.css('cursor', 'pointer').bind('click.fb', function (e) {
          if (!$(e.target).is('a') && !$(e.target).parent().is('a')) {
            e.preventDefault();
            F[current.closeClick ? 'close' : 'next']();
          }
        });
      } // Create a close button


      if (current.closeBtn) {
        $(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb', function (e) {
          e.preventDefault();
          F.close();
        });
      } // Create navigation arrows


      if (current.arrows && F.group.length > 1) {
        if (current.loop || current.index > 0) {
          $(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
        }

        if (current.loop || current.index < F.group.length - 1) {
          $(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
        }
      }

      F.trigger('afterShow'); // Stop the slideshow if this is the last item

      if (!current.loop && current.index === current.group.length - 1) {
        F.play(false);
      } else if (F.opts.autoPlay && !F.player.isActive) {
        F.opts.autoPlay = false;
        F.play(true);
      }
    },
    _afterZoomOut: function _afterZoomOut(obj) {
      obj = obj || F.current;
      $('.fancybox-wrap').trigger('onReset').remove();
      $.extend(F, {
        group: {},
        opts: {},
        router: false,
        current: null,
        isActive: false,
        isOpened: false,
        isOpen: false,
        isClosing: false,
        wrap: null,
        skin: null,
        outer: null,
        inner: null
      });
      F.trigger('afterClose', obj);
    }
  });
  /*
   *	Default transitions
   */

  F.transitions = {
    getOrigPosition: function getOrigPosition() {
      var current = F.current,
          element = current.element,
          orig = current.orig,
          pos = {},
          width = 50,
          height = 50,
          hPadding = current.hPadding,
          wPadding = current.wPadding,
          viewport = F.getViewport();

      if (!orig && current.isDom && element.is(':visible')) {
        orig = element.find('img:first');

        if (!orig.length) {
          orig = element;
        }
      }

      if (isQuery(orig)) {
        pos = orig.offset();

        if (orig.is('img')) {
          width = orig.outerWidth();
          height = orig.outerHeight();
        }
      } else {
        pos.top = viewport.y + (viewport.h - height) * current.topRatio;
        pos.left = viewport.x + (viewport.w - width) * current.leftRatio;
      }

      if (F.wrap.css('position') === 'fixed' || current.locked) {
        pos.top -= viewport.y;
        pos.left -= viewport.x;
      }

      pos = {
        top: getValue(pos.top - hPadding * current.topRatio),
        left: getValue(pos.left - wPadding * current.leftRatio),
        width: getValue(width + wPadding),
        height: getValue(height + hPadding)
      };
      return pos;
    },
    step: function step(now, fx) {
      var ratio,
          padding,
          value,
          prop = fx.prop,
          current = F.current,
          wrapSpace = current.wrapSpace,
          skinSpace = current.skinSpace;

      if (prop === 'width' || prop === 'height') {
        ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);

        if (F.isClosing) {
          ratio = 1 - ratio;
        }

        padding = prop === 'width' ? current.wPadding : current.hPadding;
        value = now - padding;
        F.skin[prop](getScalar(prop === 'width' ? value : value - wrapSpace * ratio));
        F.inner[prop](getScalar(prop === 'width' ? value : value - wrapSpace * ratio - skinSpace * ratio));
      }
    },
    zoomIn: function zoomIn() {
      var current = F.current,
          startPos = current.pos,
          effect = current.openEffect,
          elastic = effect === 'elastic',
          endPos = $.extend({
        opacity: 1
      }, startPos); // Remove "position" property that breaks older IE

      delete endPos.position;

      if (elastic) {
        startPos = this.getOrigPosition();

        if (current.openOpacity) {
          startPos.opacity = 0.1;
        }
      } else if (effect === 'fade') {
        startPos.opacity = 0.1;
      }

      F.wrap.css(startPos).animate(endPos, {
        duration: effect === 'none' ? 0 : current.openSpeed,
        easing: current.openEasing,
        step: elastic ? this.step : null,
        complete: F._afterZoomIn
      });
    },
    zoomOut: function zoomOut() {
      var current = F.current,
          effect = current.closeEffect,
          elastic = effect === 'elastic',
          endPos = {
        opacity: 0.1
      };

      if (elastic) {
        endPos = this.getOrigPosition();

        if (current.closeOpacity) {
          endPos.opacity = 0.1;
        }
      }

      F.wrap.animate(endPos, {
        duration: effect === 'none' ? 0 : current.closeSpeed,
        easing: current.closeEasing,
        step: elastic ? this.step : null,
        complete: F._afterZoomOut
      });
    },
    changeIn: function changeIn() {
      var current = F.current,
          effect = current.nextEffect,
          startPos = current.pos,
          endPos = {
        opacity: 1
      },
          direction = F.direction,
          distance = 200,
          field;
      startPos.opacity = 0.1;

      if (effect === 'elastic') {
        field = direction === 'down' || direction === 'up' ? 'top' : 'left';

        if (direction === 'down' || direction === 'right') {
          startPos[field] = getValue(getScalar(startPos[field]) - distance);
          endPos[field] = '+=' + distance + 'px';
        } else {
          startPos[field] = getValue(getScalar(startPos[field]) + distance);
          endPos[field] = '-=' + distance + 'px';
        }
      } // Workaround for http://bugs.jquery.com/ticket/12273


      if (effect === 'none') {
        F._afterZoomIn();
      } else {
        F.wrap.css(startPos).animate(endPos, {
          duration: current.nextSpeed,
          easing: current.nextEasing,
          complete: F._afterZoomIn
        });
      }
    },
    changeOut: function changeOut() {
      var previous = F.previous,
          effect = previous.prevEffect,
          endPos = {
        opacity: 0.1
      },
          direction = F.direction,
          distance = 200;

      if (effect === 'elastic') {
        endPos[direction === 'down' || direction === 'up' ? 'top' : 'left'] = (direction === 'up' || direction === 'left' ? '-' : '+') + '=' + distance + 'px';
      }

      previous.wrap.animate(endPos, {
        duration: effect === 'none' ? 0 : previous.prevSpeed,
        easing: previous.prevEasing,
        complete: function complete() {
          $(this).trigger('onReset').remove();
        }
      });
    }
  };
  /*
   *	Overlay helper
   */

  F.helpers.overlay = {
    defaults: {
      closeClick: true,
      // if true, fancyBox will be closed when user clicks on the overlay
      speedOut: 200,
      // duration of fadeOut animation
      showEarly: true,
      // indicates if should be opened immediately or wait until the content is ready
      css: {},
      // custom CSS properties
      locked: !isTouch,
      // if true, the content will be locked into overlay
      fixed: true // if false, the overlay CSS position property will not be set to "fixed"

    },
    overlay: null,
    // current handle
    fixed: false,
    // indicates if the overlay has position "fixed"
    el: $('html'),
    // element that contains "the lock"
    // Public methods
    create: function create(opts) {
      var parent;
      opts = $.extend({}, this.defaults, opts);

      if (this.overlay) {
        this.close();
      }

      parent = F.coming ? F.coming.parent : opts.parent;
      this.overlay = $('<div class="fancybox-overlay"></div>').appendTo(parent && parent.lenth ? parent : 'body');
      this.fixed = false;

      if (opts.fixed && F.defaults.fixed) {
        this.overlay.addClass('fancybox-overlay-fixed');
        this.fixed = true;
      }
    },
    open: function open(opts) {
      var that = this;
      opts = $.extend({}, this.defaults, opts);

      if (this.overlay) {
        this.overlay.unbind('.overlay').width('auto').height('auto');
      } else {
        this.create(opts);
      }

      if (!this.fixed) {
        W.bind('resize.overlay', $.proxy(this.update, this));
        this.update();
      }

      if (opts.closeClick) {
        this.overlay.bind('click.overlay', function (e) {
          if ($(e.target).hasClass('fancybox-overlay')) {
            if (F.isActive) {
              F.close();
            } else {
              that.close();
            }

            return false;
          }
        });
      }

      this.overlay.css(opts.css).show();
    },
    close: function close() {
      W.unbind('resize.overlay');

      if (this.el.hasClass('fancybox-lock')) {
        $('.fancybox-margin').removeClass('fancybox-margin');
        this.el.removeClass('fancybox-lock');
        W.scrollTop(this.scrollV).scrollLeft(this.scrollH);
      }

      $('.fancybox-overlay').remove().hide();
      $.extend(this, {
        overlay: null,
        fixed: false
      });
    },
    // Private, callbacks
    update: function update() {
      var width = '100%',
          offsetWidth; // Reset width/height so it will not mess

      this.overlay.width(width).height('100%'); // jQuery does not return reliable result for IE

      if (IE) {
        offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);

        if (D.width() > offsetWidth) {
          width = D.width();
        }
      } else if (D.width() > W.width()) {
        width = D.width();
      }

      this.overlay.width(width).height(D.height());
    },
    // This is where we can manipulate DOM, because later it would cause iframes to reload
    onReady: function onReady(opts, obj) {
      var overlay = this.overlay;
      $('.fancybox-overlay').stop(true, true);

      if (!overlay) {
        this.create(opts);
      }

      if (opts.locked && this.fixed && obj.fixed) {
        obj.locked = this.overlay.append(obj.wrap);
        obj.fixed = false;
      }

      if (opts.showEarly === true) {
        this.beforeShow.apply(this, arguments);
      }
    },
    beforeShow: function beforeShow(opts, obj) {
      if (obj.locked && !this.el.hasClass('fancybox-lock')) {
        if (this.fixPosition !== false) {
          $('*').filter(function () {
            return $(this).css('position') === 'fixed' && !$(this).hasClass("fancybox-overlay") && !$(this).hasClass("fancybox-wrap");
          }).addClass('fancybox-margin');
        }

        this.el.addClass('fancybox-margin');
        this.scrollV = W.scrollTop();
        this.scrollH = W.scrollLeft();
        this.el.addClass('fancybox-lock');
        W.scrollTop(this.scrollV).scrollLeft(this.scrollH);
      }

      this.open(opts);
    },
    onUpdate: function onUpdate() {
      if (!this.fixed) {
        this.update();
      }
    },
    afterClose: function afterClose(opts) {
      // Remove overlay if exists and fancyBox is not opening
      // (e.g., it is not being open using afterClose callback)
      if (this.overlay && !F.coming) {
        this.overlay.fadeOut(opts.speedOut, $.proxy(this.close, this));
      }
    }
  };
  /*
   *	Title helper
   */

  F.helpers.title = {
    defaults: {
      type: 'float',
      // 'float', 'inside', 'outside' or 'over',
      position: 'bottom' // 'top' or 'bottom'

    },
    beforeShow: function beforeShow(opts) {
      var current = F.current,
          text = current.title,
          type = opts.type,
          title,
          target;

      if ($.isFunction(text)) {
        text = text.call(current.element, current);
      }

      if (!isString(text) || $.trim(text) === '') {
        return;
      }

      title = $('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + '</div>');

      switch (type) {
        case 'inside':
          target = F.skin;
          break;

        case 'outside':
          target = F.wrap;
          break;

        case 'over':
          target = F.inner;
          break;

        default:
          // 'float'
          target = F.skin;
          title.appendTo('body');

          if (IE) {
            title.width(title.width());
          }

          title.wrapInner('<span class="child"></span>'); //Increase bottom margin so this title will also fit into viewport

          F.current.margin[2] += Math.abs(getScalar(title.css('margin-bottom')));
          break;
      }

      title[opts.position === 'top' ? 'prependTo' : 'appendTo'](target);
    }
  }; // jQuery plugin initialization

  $.fn.fancybox = function (options) {
    var index,
        that = $(this),
        selector = this.selector || '',
        run = function run(e) {
      var what = $(this).blur(),
          idx = index,
          relType,
          relVal;

      if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is('.fancybox-wrap')) {
        relType = options.groupAttr || 'data-fancybox-group';
        relVal = what.attr(relType);

        if (!relVal) {
          relType = 'rel';
          relVal = what.get(0)[relType];
        }

        if (relVal && relVal !== '' && relVal !== 'nofollow') {
          what = selector.length ? $(selector) : that;
          what = what.filter('[' + relType + '="' + relVal + '"]');
          idx = what.index(this);
        }

        options.index = idx; // Stop an event from bubbling if everything is fine

        if (F.open(what, options) !== false) {
          e.preventDefault();
        }
      }
    };

    options = options || {};
    index = options.index || 0;

    if (!selector || options.live === false) {
      that.unbind('click.fb-start').bind('click.fb-start', run);
    } else {
      D.undelegate(selector, 'click.fb-start').delegate(selector + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', run);
    }

    this.filter('[data-fancybox-start=1]').trigger('click');
    return this;
  }; // Tests that need a body at doc ready


  D.ready(function () {
    var w1, w2;

    if ($.scrollbarWidth === undefined) {
      // http://benalman.com/projects/jquery-misc-plugins/#scrollbarwidth
      $.scrollbarWidth = function () {
        var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
            child = parent.children(),
            width = child.innerWidth() - child.height(99).innerWidth();
        parent.remove();
        return width;
      };
    }

    if ($.support.fixedPosition === undefined) {
      $.support.fixedPosition = function () {
        var elem = $('<div style="position:fixed;top:20px;"></div>').appendTo('body'),
            fixed = elem[0].offsetTop === 20 || elem[0].offsetTop === 15;
        elem.remove();
        return fixed;
      }();
    }

    $.extend(F.defaults, {
      scrollbarWidth: $.scrollbarWidth(),
      fixed: $.support.fixedPosition,
      parent: $('body')
    }); //Get real width of page scroll-bar

    w1 = $(window).width();
    H.addClass('fancybox-lock-test');
    w2 = $(window).width();
    H.removeClass('fancybox-lock-test');
    $("<style type='text/css'>.fancybox-margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
  });
})(window, document, jQuery);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMvbGFuZHNjYXBlL3NvdXJjZS9mYW5jeWJveC9qcXVlcnkuZmFuY3lib3guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFBRSxXQUFVLE1BQVYsRUFBa0IsUUFBbEIsRUFBNEIsQ0FBNUIsRUFBK0IsU0FBL0IsRUFBMEM7QUFDM0M7O0FBRUEsTUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQUQsQ0FBVDtBQUFBLE1BQ0MsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFELENBRE47QUFBQSxNQUVDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBRCxDQUZOO0FBQUEsTUFHQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQUYsR0FBYSxZQUFZO0FBQzVCLElBQUEsQ0FBQyxDQUFDLElBQUYsQ0FBTyxLQUFQLENBQWMsSUFBZCxFQUFvQixTQUFwQjtBQUNBLEdBTEY7QUFBQSxNQU1DLEVBQUUsR0FBSSxTQUFTLENBQUMsU0FBVixDQUFvQixLQUFwQixDQUEwQixPQUExQixDQU5QO0FBQUEsTUFPQyxTQUFTLEdBQUcsSUFQYjtBQUFBLE1BUUMsT0FBTyxHQUFJLFFBQVEsQ0FBQyxXQUFULEtBQXlCLFNBUnJDO0FBQUEsTUFVQyxPQUFPLEdBQUcsU0FBVixPQUFVLENBQVMsR0FBVCxFQUFjO0FBQ3ZCLFdBQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxjQUFYLElBQTZCLEdBQUcsWUFBWSxDQUFuRDtBQUNBLEdBWkY7QUFBQSxNQWFDLFFBQVEsR0FBRyxTQUFYLFFBQVcsQ0FBUyxHQUFULEVBQWM7QUFDeEIsV0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUYsQ0FBTyxHQUFQLE1BQWdCLFFBQTlCO0FBQ0EsR0FmRjtBQUFBLE1BZ0JDLFlBQVksR0FBRyxTQUFmLFlBQWUs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UUFBbEQsQ0FBMkQsTUFBM0QsQ0FBWjtBQUFBLFlBQ0MsS0FBSyxHQUFLLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUSxTQUFSLEtBQXNCLEVBQXRCLElBQTRCLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUSxTQUFSLEtBQXNCLEVBRDdEO0FBR0EsUUFBQSxJQUFJLENBQUMsTUFBTDtBQUVBLGVBQU8sS0FBUDtBQUNBLE9BUDBCLEVBQTNCO0FBUUE7O0FBRUQsSUFBQSxDQUFDLENBQUMsTUFBRixDQUFTLENBQUMsQ0FBQyxRQUFYLEVBQXFCO0FBQ3BCLE1BQUEsY0FBYyxFQUFHLENBQUMsQ0FBQyxjQUFGLEVBREc7QUFFcEIsTUFBQSxLQUFLLEVBQUksQ0FBQyxDQUFDLE9BQUYsQ0FBVSxhQUZDO0FBR3BCLE1BQUEsTUFBTSxFQUFHLENBQUMsQ0FBQyxNQUFEO0FBSFUsS0FBckIsRUEzQmtCLENBaUNsQjs7QUFDQSxJQUFBLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBRCxDQUFELENBQVUsS0FBVixFQUFMO0FBRUEsSUFBQSxDQUFDLENBQUMsUUFBRixDQUFXLG9CQUFYO0FBRUEsSUFBQSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVLEtBQVYsRUFBTDtBQUVBLElBQUEsQ0FBQyxDQUFDLFdBQUYsQ0FBYyxvQkFBZDtBQUVBLElBQUEsQ0FBQyxDQUFDLDJEQUEyRCxFQUFFLEdBQUcsRUFBaEUsSUFBc0UsY0FBdkUsQ0FBRCxDQUF3RixRQUF4RixDQUFpRyxNQUFqRztBQUNBLEdBM0NEO0FBNkNBLENBcDlEQyxFQW85REEsTUFwOURBLEVBbzlEUSxRQXA5RFIsRUFvOURrQixNQXA5RGxCLENBQUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKiFcclxuICogZmFuY3lCb3ggLSBqUXVlcnkgUGx1Z2luXHJcbiAqIHZlcnNpb246IDIuMS41IChGcmksIDE0IEp1biAyMDEzKVxyXG4gKiByZXF1aXJlcyBqUXVlcnkgdjEuNiBvciBsYXRlclxyXG4gKlxyXG4gKiBFeGFtcGxlcyBhdCBodHRwOi8vZmFuY3lhcHBzLmNvbS9mYW5jeWJveC9cclxuICogTGljZW5zZTogd3d3LmZhbmN5YXBwcy5jb20vZmFuY3lib3gvI2xpY2Vuc2VcclxuICpcclxuICogQ29weXJpZ2h0IDIwMTIgSmFuaXMgU2thcm5lbGlzIC0gamFuaXNAZmFuY3lhcHBzLmNvbVxyXG4gKlxyXG4gKi9cclxuXHJcbjsoZnVuY3Rpb24gKHdpbmRvdywgZG9jdW1lbnQsICQsIHVuZGVmaW5lZCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHR2YXIgSCA9ICQoXCJodG1sXCIpLFxyXG5cdFx0VyA9ICQod2luZG93KSxcclxuXHRcdEQgPSAkKGRvY3VtZW50KSxcclxuXHRcdEYgPSAkLmZhbmN5Ym94ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRGLm9wZW4uYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xyXG5cdFx0fSxcclxuXHRcdElFID0gIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL21zaWUvaSksXHJcblx0XHRkaWRVcGRhdGVcdD0gbnVsbCxcclxuXHRcdGlzVG91Y2hcdFx0PSBkb2N1bWVudC5jcmVhdGVUb3VjaCAhPT0gdW5kZWZpbmVkLFxyXG5cclxuXHRcdGlzUXVlcnlcdD0gZnVuY3Rpb24ob2JqKSB7XHJcblx0XHRcdHJldHVybiBvYmogJiYgb2JqLmhhc093blByb3BlcnR5ICYmIG9iaiBpbnN0YW5jZW9mICQ7XHJcblx0XHR9LFxyXG5cdFx0aXNTdHJpbmcgPSBmdW5jdGlvbihzdHIpIHtcclxuXHRcdFx0cmV0dXJuIHN0ciAmJiAkLnR5cGUoc3RyKSA9PT0gXCJzdHJpbmdcIjtcclxuXHRcdH0sXHJcblx0XHRpc1BlcmNlbnRhZ2UgPSBmdW5jdGlvbihzdHIpIHtcclxuXHRcdFx0cmV0dXJuIGlzU3RyaW5nKHN0cikgJiYgc3RyLmluZGV4T2YoJyUnKSA+IDA7XHJcblx0XHR9LFxyXG5cdFx0aXNTY3JvbGxhYmxlID0gZnVuY3Rpb24oZWwpIHtcclxuXHRcdFx0cmV0dXJuIChlbCAmJiAhKGVsLnN0eWxlLm92ZXJmbG93ICYmIGVsLnN0eWxlLm92ZXJmbG93ID09PSAnaGlkZGVuJykgJiYgKChlbC5jbGllbnRXaWR0aCAmJiBlbC5zY3JvbGxXaWR0aCA+IGVsLmNsaWVudFdpZHRoKSB8fCAoZWwuY2xpZW50SGVpZ2h0ICYmIGVsLnNjcm9sbEhlaWdodCA+IGVsLmNsaWVudEhlaWdodCkpKTtcclxuXHRcdH0sXHJcblx0XHRnZXRTY2FsYXIgPSBmdW5jdGlvbihvcmlnLCBkaW0pIHtcclxuXHRcdFx0dmFyIHZhbHVlID0gcGFyc2VJbnQob3JpZywgMTApIHx8IDA7XHJcblxyXG5cdFx0XHRpZiAoZGltICYmIGlzUGVyY2VudGFnZShvcmlnKSkge1xyXG5cdFx0XHRcdHZhbHVlID0gRi5nZXRWaWV3cG9ydCgpWyBkaW0gXSAvIDEwMCAqIHZhbHVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gTWF0aC5jZWlsKHZhbHVlKTtcclxuXHRcdH0sXHJcblx0XHRnZXRWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlLCBkaW0pIHtcclxuXHRcdFx0cmV0dXJuIGdldFNjYWxhcih2YWx1ZSwgZGltKSArICdweCc7XHJcblx0XHR9O1xyXG5cclxuXHQkLmV4dGVuZChGLCB7XHJcblx0XHQvLyBUaGUgY3VycmVudCB2ZXJzaW9uIG9mIGZhbmN5Qm94XHJcblx0XHR2ZXJzaW9uOiAnMi4xLjUnLFxyXG5cclxuXHRcdGRlZmF1bHRzOiB7XHJcblx0XHRcdHBhZGRpbmcgOiAxNSxcclxuXHRcdFx0bWFyZ2luICA6IDIwLFxyXG5cclxuXHRcdFx0d2lkdGggICAgIDogODAwLFxyXG5cdFx0XHRoZWlnaHQgICAgOiA2MDAsXHJcblx0XHRcdG1pbldpZHRoICA6IDEwMCxcclxuXHRcdFx0bWluSGVpZ2h0IDogMTAwLFxyXG5cdFx0XHRtYXhXaWR0aCAgOiA5OTk5LFxyXG5cdFx0XHRtYXhIZWlnaHQgOiA5OTk5LFxyXG5cdFx0XHRwaXhlbFJhdGlvOiAxLCAvLyBTZXQgdG8gMiBmb3IgcmV0aW5hIGRpc3BsYXkgc3VwcG9ydFxyXG5cclxuXHRcdFx0YXV0b1NpemUgICA6IHRydWUsXHJcblx0XHRcdGF1dG9IZWlnaHQgOiBmYWxzZSxcclxuXHRcdFx0YXV0b1dpZHRoICA6IGZhbHNlLFxyXG5cclxuXHRcdFx0YXV0b1Jlc2l6ZSAgOiB0cnVlLFxyXG5cdFx0XHRhdXRvQ2VudGVyICA6ICFpc1RvdWNoLFxyXG5cdFx0XHRmaXRUb1ZpZXcgICA6IHRydWUsXHJcblx0XHRcdGFzcGVjdFJhdGlvIDogZmFsc2UsXHJcblx0XHRcdHRvcFJhdGlvICAgIDogMC41LFxyXG5cdFx0XHRsZWZ0UmF0aW8gICA6IDAuNSxcclxuXHJcblx0XHRcdHNjcm9sbGluZyA6ICdhdXRvJywgLy8gJ2F1dG8nLCAneWVzJyBvciAnbm8nXHJcblx0XHRcdHdyYXBDU1MgICA6ICcnLFxyXG5cclxuXHRcdFx0YXJyb3dzICAgICA6IHRydWUsXHJcblx0XHRcdGNsb3NlQnRuICAgOiB0cnVlLFxyXG5cdFx0XHRjbG9zZUNsaWNrIDogZmFsc2UsXHJcblx0XHRcdG5leHRDbGljayAgOiBmYWxzZSxcclxuXHRcdFx0bW91c2VXaGVlbCA6IHRydWUsXHJcblx0XHRcdGF1dG9QbGF5ICAgOiBmYWxzZSxcclxuXHRcdFx0cGxheVNwZWVkICA6IDMwMDAsXHJcblx0XHRcdHByZWxvYWQgICAgOiAzLFxyXG5cdFx0XHRtb2RhbCAgICAgIDogZmFsc2UsXHJcblx0XHRcdGxvb3AgICAgICAgOiB0cnVlLFxyXG5cclxuXHRcdFx0YWpheCAgOiB7XHJcblx0XHRcdFx0ZGF0YVR5cGUgOiAnaHRtbCcsXHJcblx0XHRcdFx0aGVhZGVycyAgOiB7ICdYLWZhbmN5Qm94JzogdHJ1ZSB9XHJcblx0XHRcdH0sXHJcblx0XHRcdGlmcmFtZSA6IHtcclxuXHRcdFx0XHRzY3JvbGxpbmcgOiAnYXV0bycsXHJcblx0XHRcdFx0cHJlbG9hZCAgIDogdHJ1ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzd2YgOiB7XHJcblx0XHRcdFx0d21vZGU6ICd0cmFuc3BhcmVudCcsXHJcblx0XHRcdFx0YWxsb3dmdWxsc2NyZWVuICAgOiAndHJ1ZScsXHJcblx0XHRcdFx0YWxsb3dzY3JpcHRhY2Nlc3MgOiAnYWx3YXlzJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0a2V5cyAgOiB7XHJcblx0XHRcdFx0bmV4dCA6IHtcclxuXHRcdFx0XHRcdDEzIDogJ2xlZnQnLCAvLyBlbnRlclxyXG5cdFx0XHRcdFx0MzQgOiAndXAnLCAgIC8vIHBhZ2UgZG93blxyXG5cdFx0XHRcdFx0MzkgOiAnbGVmdCcsIC8vIHJpZ2h0IGFycm93XHJcblx0XHRcdFx0XHQ0MCA6ICd1cCcgICAgLy8gZG93biBhcnJvd1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0cHJldiA6IHtcclxuXHRcdFx0XHRcdDggIDogJ3JpZ2h0JywgIC8vIGJhY2tzcGFjZVxyXG5cdFx0XHRcdFx0MzMgOiAnZG93bicsICAgLy8gcGFnZSB1cFxyXG5cdFx0XHRcdFx0MzcgOiAncmlnaHQnLCAgLy8gbGVmdCBhcnJvd1xyXG5cdFx0XHRcdFx0MzggOiAnZG93bicgICAgLy8gdXAgYXJyb3dcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGNsb3NlICA6IFsyN10sIC8vIGVzY2FwZSBrZXlcclxuXHRcdFx0XHRwbGF5ICAgOiBbMzJdLCAvLyBzcGFjZSAtIHN0YXJ0L3N0b3Agc2xpZGVzaG93XHJcblx0XHRcdFx0dG9nZ2xlIDogWzcwXSAgLy8gbGV0dGVyIFwiZlwiIC0gdG9nZ2xlIGZ1bGxzY3JlZW5cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGRpcmVjdGlvbiA6IHtcclxuXHRcdFx0XHRuZXh0IDogJ2xlZnQnLFxyXG5cdFx0XHRcdHByZXYgOiAncmlnaHQnXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRzY3JvbGxPdXRzaWRlICA6IHRydWUsXHJcblxyXG5cdFx0XHQvLyBPdmVycmlkZSBzb21lIHByb3BlcnRpZXNcclxuXHRcdFx0aW5kZXggICA6IDAsXHJcblx0XHRcdHR5cGUgICAgOiBudWxsLFxyXG5cdFx0XHRocmVmICAgIDogbnVsbCxcclxuXHRcdFx0Y29udGVudCA6IG51bGwsXHJcblx0XHRcdHRpdGxlICAgOiBudWxsLFxyXG5cclxuXHRcdFx0Ly8gSFRNTCB0ZW1wbGF0ZXNcclxuXHRcdFx0dHBsOiB7XHJcblx0XHRcdFx0d3JhcCAgICAgOiAnPGRpdiBjbGFzcz1cImZhbmN5Ym94LXdyYXBcIiB0YWJJbmRleD1cIi0xXCI+PGRpdiBjbGFzcz1cImZhbmN5Ym94LXNraW5cIj48ZGl2IGNsYXNzPVwiZmFuY3lib3gtb3V0ZXJcIj48ZGl2IGNsYXNzPVwiZmFuY3lib3gtaW5uZXJcIj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj4nLFxyXG5cdFx0XHRcdGltYWdlICAgIDogJzxpbWcgY2xhc3M9XCJmYW5jeWJveC1pbWFnZVwiIHNyYz1cIntocmVmfVwiIGFsdD1cIlwiIC8+JyxcclxuXHRcdFx0XHRpZnJhbWUgICA6ICc8aWZyYW1lIGlkPVwiZmFuY3lib3gtZnJhbWV7cm5kfVwiIG5hbWU9XCJmYW5jeWJveC1mcmFtZXtybmR9XCIgY2xhc3M9XCJmYW5jeWJveC1pZnJhbWVcIiBmcmFtZWJvcmRlcj1cIjBcIiB2c3BhY2U9XCIwXCIgaHNwYWNlPVwiMFwiIHdlYmtpdEFsbG93RnVsbFNjcmVlbiBtb3phbGxvd2Z1bGxzY3JlZW4gYWxsb3dGdWxsU2NyZWVuJyArIChJRSA/ICcgYWxsb3d0cmFuc3BhcmVuY3k9XCJ0cnVlXCInIDogJycpICsgJz48L2lmcmFtZT4nLFxyXG5cdFx0XHRcdGVycm9yICAgIDogJzxwIGNsYXNzPVwiZmFuY3lib3gtZXJyb3JcIj5UaGUgcmVxdWVzdGVkIGNvbnRlbnQgY2Fubm90IGJlIGxvYWRlZC48YnIvPlBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuPC9wPicsXHJcblx0XHRcdFx0Y2xvc2VCdG4gOiAnPGEgdGl0bGU9XCJDbG9zZVwiIGNsYXNzPVwiZmFuY3lib3gtaXRlbSBmYW5jeWJveC1jbG9zZVwiIGhyZWY9XCJqYXZhc2NyaXB0OjtcIj48L2E+JyxcclxuXHRcdFx0XHRuZXh0ICAgICA6ICc8YSB0aXRsZT1cIk5leHRcIiBjbGFzcz1cImZhbmN5Ym94LW5hdiBmYW5jeWJveC1uZXh0XCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiPjxzcGFuPjwvc3Bhbj48L2E+JyxcclxuXHRcdFx0XHRwcmV2ICAgICA6ICc8YSB0aXRsZT1cIlByZXZpb3VzXCIgY2xhc3M9XCJmYW5jeWJveC1uYXYgZmFuY3lib3gtcHJldlwiIGhyZWY9XCJqYXZhc2NyaXB0OjtcIj48c3Bhbj48L3NwYW4+PC9hPidcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIFByb3BlcnRpZXMgZm9yIGVhY2ggYW5pbWF0aW9uIHR5cGVcclxuXHRcdFx0Ly8gT3BlbmluZyBmYW5jeUJveFxyXG5cdFx0XHRvcGVuRWZmZWN0ICA6ICdmYWRlJywgLy8gJ2VsYXN0aWMnLCAnZmFkZScgb3IgJ25vbmUnXHJcblx0XHRcdG9wZW5TcGVlZCAgIDogMjUwLFxyXG5cdFx0XHRvcGVuRWFzaW5nICA6ICdzd2luZycsXHJcblx0XHRcdG9wZW5PcGFjaXR5IDogdHJ1ZSxcclxuXHRcdFx0b3Blbk1ldGhvZCAgOiAnem9vbUluJyxcclxuXHJcblx0XHRcdC8vIENsb3NpbmcgZmFuY3lCb3hcclxuXHRcdFx0Y2xvc2VFZmZlY3QgIDogJ2ZhZGUnLCAvLyAnZWxhc3RpYycsICdmYWRlJyBvciAnbm9uZSdcclxuXHRcdFx0Y2xvc2VTcGVlZCAgIDogMjUwLFxyXG5cdFx0XHRjbG9zZUVhc2luZyAgOiAnc3dpbmcnLFxyXG5cdFx0XHRjbG9zZU9wYWNpdHkgOiB0cnVlLFxyXG5cdFx0XHRjbG9zZU1ldGhvZCAgOiAnem9vbU91dCcsXHJcblxyXG5cdFx0XHQvLyBDaGFuZ2luZyBuZXh0IGdhbGxlcnkgaXRlbVxyXG5cdFx0XHRuZXh0RWZmZWN0IDogJ2VsYXN0aWMnLCAvLyAnZWxhc3RpYycsICdmYWRlJyBvciAnbm9uZSdcclxuXHRcdFx0bmV4dFNwZWVkICA6IDI1MCxcclxuXHRcdFx0bmV4dEVhc2luZyA6ICdzd2luZycsXHJcblx0XHRcdG5leHRNZXRob2QgOiAnY2hhbmdlSW4nLFxyXG5cclxuXHRcdFx0Ly8gQ2hhbmdpbmcgcHJldmlvdXMgZ2FsbGVyeSBpdGVtXHJcblx0XHRcdHByZXZFZmZlY3QgOiAnZWxhc3RpYycsIC8vICdlbGFzdGljJywgJ2ZhZGUnIG9yICdub25lJ1xyXG5cdFx0XHRwcmV2U3BlZWQgIDogMjUwLFxyXG5cdFx0XHRwcmV2RWFzaW5nIDogJ3N3aW5nJyxcclxuXHRcdFx0cHJldk1ldGhvZCA6ICdjaGFuZ2VPdXQnLFxyXG5cclxuXHRcdFx0Ly8gRW5hYmxlIGRlZmF1bHQgaGVscGVyc1xyXG5cdFx0XHRoZWxwZXJzIDoge1xyXG5cdFx0XHRcdG92ZXJsYXkgOiB0cnVlLFxyXG5cdFx0XHRcdHRpdGxlICAgOiB0cnVlXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBDYWxsYmFja3NcclxuXHRcdFx0b25DYW5jZWwgICAgIDogJC5ub29wLCAvLyBJZiBjYW5jZWxpbmdcclxuXHRcdFx0YmVmb3JlTG9hZCAgIDogJC5ub29wLCAvLyBCZWZvcmUgbG9hZGluZ1xyXG5cdFx0XHRhZnRlckxvYWQgICAgOiAkLm5vb3AsIC8vIEFmdGVyIGxvYWRpbmdcclxuXHRcdFx0YmVmb3JlU2hvdyAgIDogJC5ub29wLCAvLyBCZWZvcmUgY2hhbmdpbmcgaW4gY3VycmVudCBpdGVtXHJcblx0XHRcdGFmdGVyU2hvdyAgICA6ICQubm9vcCwgLy8gQWZ0ZXIgb3BlbmluZ1xyXG5cdFx0XHRiZWZvcmVDaGFuZ2UgOiAkLm5vb3AsIC8vIEJlZm9yZSBjaGFuZ2luZyBnYWxsZXJ5IGl0ZW1cclxuXHRcdFx0YmVmb3JlQ2xvc2UgIDogJC5ub29wLCAvLyBCZWZvcmUgY2xvc2luZ1xyXG5cdFx0XHRhZnRlckNsb3NlICAgOiAkLm5vb3AgIC8vIEFmdGVyIGNsb3NpbmdcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly9DdXJyZW50IHN0YXRlXHJcblx0XHRncm91cCAgICA6IHt9LCAvLyBTZWxlY3RlZCBncm91cFxyXG5cdFx0b3B0cyAgICAgOiB7fSwgLy8gR3JvdXAgb3B0aW9uc1xyXG5cdFx0cHJldmlvdXMgOiBudWxsLCAgLy8gUHJldmlvdXMgZWxlbWVudFxyXG5cdFx0Y29taW5nICAgOiBudWxsLCAgLy8gRWxlbWVudCBiZWluZyBsb2FkZWRcclxuXHRcdGN1cnJlbnQgIDogbnVsbCwgIC8vIEN1cnJlbnRseSBsb2FkZWQgZWxlbWVudFxyXG5cdFx0aXNBY3RpdmUgOiBmYWxzZSwgLy8gSXMgYWN0aXZhdGVkXHJcblx0XHRpc09wZW4gICA6IGZhbHNlLCAvLyBJcyBjdXJyZW50bHkgb3BlblxyXG5cdFx0aXNPcGVuZWQgOiBmYWxzZSwgLy8gSGF2ZSBiZWVuIGZ1bGx5IG9wZW5lZCBhdCBsZWFzdCBvbmNlXHJcblxyXG5cdFx0d3JhcCAgOiBudWxsLFxyXG5cdFx0c2tpbiAgOiBudWxsLFxyXG5cdFx0b3V0ZXIgOiBudWxsLFxyXG5cdFx0aW5uZXIgOiBudWxsLFxyXG5cclxuXHRcdHBsYXllciA6IHtcclxuXHRcdFx0dGltZXIgICAgOiBudWxsLFxyXG5cdFx0XHRpc0FjdGl2ZSA6IGZhbHNlXHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIExvYWRlcnNcclxuXHRcdGFqYXhMb2FkICAgOiBudWxsLFxyXG5cdFx0aW1nUHJlbG9hZCA6IG51bGwsXHJcblxyXG5cdFx0Ly8gU29tZSBjb2xsZWN0aW9uc1xyXG5cdFx0dHJhbnNpdGlvbnMgOiB7fSxcclxuXHRcdGhlbHBlcnMgICAgIDoge30sXHJcblxyXG5cdFx0LypcclxuXHRcdCAqXHRTdGF0aWMgbWV0aG9kc1xyXG5cdFx0ICovXHJcblxyXG5cdFx0b3BlbjogZnVuY3Rpb24gKGdyb3VwLCBvcHRzKSB7XHJcblx0XHRcdGlmICghZ3JvdXApIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghJC5pc1BsYWluT2JqZWN0KG9wdHMpKSB7XHJcblx0XHRcdFx0b3B0cyA9IHt9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBDbG9zZSBpZiBhbHJlYWR5IGFjdGl2ZVxyXG5cdFx0XHRpZiAoZmFsc2UgPT09IEYuY2xvc2UodHJ1ZSkpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIE5vcm1hbGl6ZSBncm91cFxyXG5cdFx0XHRpZiAoISQuaXNBcnJheShncm91cCkpIHtcclxuXHRcdFx0XHRncm91cCA9IGlzUXVlcnkoZ3JvdXApID8gJChncm91cCkuZ2V0KCkgOiBbZ3JvdXBdO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBSZWNoZWNrIGlmIHRoZSB0eXBlIG9mIGVhY2ggZWxlbWVudCBpcyBgb2JqZWN0YCBhbmQgc2V0IGNvbnRlbnQgdHlwZSAoaW1hZ2UsIGFqYXgsIGV0YylcclxuXHRcdFx0JC5lYWNoKGdyb3VwLCBmdW5jdGlvbihpLCBlbGVtZW50KSB7XHJcblx0XHRcdFx0dmFyIG9iaiA9IHt9LFxyXG5cdFx0XHRcdFx0aHJlZixcclxuXHRcdFx0XHRcdHRpdGxlLFxyXG5cdFx0XHRcdFx0Y29udGVudCxcclxuXHRcdFx0XHRcdHR5cGUsXHJcblx0XHRcdFx0XHRyZXosXHJcblx0XHRcdFx0XHRocmVmUGFydHMsXHJcblx0XHRcdFx0XHRzZWxlY3RvcjtcclxuXHJcblx0XHRcdFx0aWYgKCQudHlwZShlbGVtZW50KSA9PT0gXCJvYmplY3RcIikge1xyXG5cdFx0XHRcdFx0Ly8gQ2hlY2sgaWYgaXMgRE9NIGVsZW1lbnRcclxuXHRcdFx0XHRcdGlmIChlbGVtZW50Lm5vZGVUeXBlKSB7XHJcblx0XHRcdFx0XHRcdGVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChpc1F1ZXJ5KGVsZW1lbnQpKSB7XHJcblx0XHRcdFx0XHRcdG9iaiA9IHtcclxuXHRcdFx0XHRcdFx0XHRocmVmICAgIDogZWxlbWVudC5kYXRhKCdmYW5jeWJveC1ocmVmJykgfHwgZWxlbWVudC5hdHRyKCdocmVmJyksXHJcblx0XHRcdFx0XHRcdFx0dGl0bGUgICA6ICQoJzxkaXYvPicpLnRleHQoIGVsZW1lbnQuZGF0YSgnZmFuY3lib3gtdGl0bGUnKSB8fCBlbGVtZW50LmF0dHIoJ3RpdGxlJykgKS5odG1sKCksXHJcblx0XHRcdFx0XHRcdFx0aXNEb20gICA6IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0ZWxlbWVudCA6IGVsZW1lbnRcclxuXHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdGlmICgkLm1ldGFkYXRhKSB7XHJcblx0XHRcdFx0XHRcdFx0JC5leHRlbmQodHJ1ZSwgb2JqLCBlbGVtZW50Lm1ldGFkYXRhKCkpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0b2JqID0gZWxlbWVudDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGhyZWYgID0gb3B0cy5ocmVmICB8fCBvYmouaHJlZiB8fCAoaXNTdHJpbmcoZWxlbWVudCkgPyBlbGVtZW50IDogbnVsbCk7XHJcblx0XHRcdFx0dGl0bGUgPSBvcHRzLnRpdGxlICE9PSB1bmRlZmluZWQgPyBvcHRzLnRpdGxlIDogb2JqLnRpdGxlIHx8ICcnO1xyXG5cclxuXHRcdFx0XHRjb250ZW50ID0gb3B0cy5jb250ZW50IHx8IG9iai5jb250ZW50O1xyXG5cdFx0XHRcdHR5cGUgICAgPSBjb250ZW50ID8gJ2h0bWwnIDogKG9wdHMudHlwZSAgfHwgb2JqLnR5cGUpO1xyXG5cclxuXHRcdFx0XHRpZiAoIXR5cGUgJiYgb2JqLmlzRG9tKSB7XHJcblx0XHRcdFx0XHR0eXBlID0gZWxlbWVudC5kYXRhKCdmYW5jeWJveC10eXBlJyk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCF0eXBlKSB7XHJcblx0XHRcdFx0XHRcdHJleiAgPSBlbGVtZW50LnByb3AoJ2NsYXNzJykubWF0Y2goL2ZhbmN5Ym94XFwuKFxcdyspLyk7XHJcblx0XHRcdFx0XHRcdHR5cGUgPSByZXogPyByZXpbMV0gOiBudWxsO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGlzU3RyaW5nKGhyZWYpKSB7XHJcblx0XHRcdFx0XHQvLyBUcnkgdG8gZ3Vlc3MgdGhlIGNvbnRlbnQgdHlwZVxyXG5cdFx0XHRcdFx0aWYgKCF0eXBlKSB7XHJcblx0XHRcdFx0XHRcdGlmIChGLmlzSW1hZ2UoaHJlZikpIHtcclxuXHRcdFx0XHRcdFx0XHR0eXBlID0gJ2ltYWdlJztcclxuXHJcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoRi5pc1NXRihocmVmKSkge1xyXG5cdFx0XHRcdFx0XHRcdHR5cGUgPSAnc3dmJztcclxuXHJcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoaHJlZi5jaGFyQXQoMCkgPT09ICcjJykge1xyXG5cdFx0XHRcdFx0XHRcdHR5cGUgPSAnaW5saW5lJztcclxuXHJcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoaXNTdHJpbmcoZWxlbWVudCkpIHtcclxuXHRcdFx0XHRcdFx0XHR0eXBlICAgID0gJ2h0bWwnO1xyXG5cdFx0XHRcdFx0XHRcdGNvbnRlbnQgPSBlbGVtZW50O1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gU3BsaXQgdXJsIGludG8gdHdvIHBpZWNlcyB3aXRoIHNvdXJjZSB1cmwgYW5kIGNvbnRlbnQgc2VsZWN0b3IsIGUuZyxcclxuXHRcdFx0XHRcdC8vIFwiL215cGFnZS5odG1sICNteV9pZFwiIHdpbGwgbG9hZCBcIi9teXBhZ2UuaHRtbFwiIGFuZCBkaXNwbGF5IGVsZW1lbnQgaGF2aW5nIGlkIFwibXlfaWRcIlxyXG5cdFx0XHRcdFx0aWYgKHR5cGUgPT09ICdhamF4Jykge1xyXG5cdFx0XHRcdFx0XHRocmVmUGFydHMgPSBocmVmLnNwbGl0KC9cXHMrLywgMik7XHJcblx0XHRcdFx0XHRcdGhyZWYgICAgICA9IGhyZWZQYXJ0cy5zaGlmdCgpO1xyXG5cdFx0XHRcdFx0XHRzZWxlY3RvciAgPSBocmVmUGFydHMuc2hpZnQoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICghY29udGVudCkge1xyXG5cdFx0XHRcdFx0aWYgKHR5cGUgPT09ICdpbmxpbmUnKSB7XHJcblx0XHRcdFx0XHRcdGlmIChocmVmKSB7XHJcblx0XHRcdFx0XHRcdFx0Y29udGVudCA9ICQoIGlzU3RyaW5nKGhyZWYpID8gaHJlZi5yZXBsYWNlKC8uKig/PSNbXlxcc10rJCkvLCAnJykgOiBocmVmICk7IC8vc3RyaXAgZm9yIGllN1xyXG5cclxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChvYmouaXNEb20pIHtcclxuXHRcdFx0XHRcdFx0XHRjb250ZW50ID0gZWxlbWVudDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZSA9PT0gJ2h0bWwnKSB7XHJcblx0XHRcdFx0XHRcdGNvbnRlbnQgPSBocmVmO1xyXG5cclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoIXR5cGUgJiYgIWhyZWYgJiYgb2JqLmlzRG9tKSB7XHJcblx0XHRcdFx0XHRcdHR5cGUgICAgPSAnaW5saW5lJztcclxuXHRcdFx0XHRcdFx0Y29udGVudCA9IGVsZW1lbnQ7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQkLmV4dGVuZChvYmosIHtcclxuXHRcdFx0XHRcdGhyZWYgICAgIDogaHJlZixcclxuXHRcdFx0XHRcdHR5cGUgICAgIDogdHlwZSxcclxuXHRcdFx0XHRcdGNvbnRlbnQgIDogY29udGVudCxcclxuXHRcdFx0XHRcdHRpdGxlICAgIDogdGl0bGUsXHJcblx0XHRcdFx0XHRzZWxlY3RvciA6IHNlbGVjdG9yXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGdyb3VwWyBpIF0gPSBvYmo7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gRXh0ZW5kIHRoZSBkZWZhdWx0c1xyXG5cdFx0XHRGLm9wdHMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgRi5kZWZhdWx0cywgb3B0cyk7XHJcblxyXG5cdFx0XHQvLyBBbGwgb3B0aW9ucyBhcmUgbWVyZ2VkIHJlY3Vyc2l2ZSBleGNlcHQga2V5c1xyXG5cdFx0XHRpZiAob3B0cy5rZXlzICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRGLm9wdHMua2V5cyA9IG9wdHMua2V5cyA/ICQuZXh0ZW5kKHt9LCBGLmRlZmF1bHRzLmtleXMsIG9wdHMua2V5cykgOiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ri5ncm91cCA9IGdyb3VwO1xyXG5cclxuXHRcdFx0cmV0dXJuIEYuX3N0YXJ0KEYub3B0cy5pbmRleCk7XHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIENhbmNlbCBpbWFnZSBsb2FkaW5nIG9yIGFib3J0IGFqYXggcmVxdWVzdFxyXG5cdFx0Y2FuY2VsOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBjb21pbmcgPSBGLmNvbWluZztcclxuXHJcblx0XHRcdGlmIChjb21pbmcgJiYgZmFsc2UgPT09IEYudHJpZ2dlcignb25DYW5jZWwnKSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ri5oaWRlTG9hZGluZygpO1xyXG5cclxuXHRcdFx0aWYgKCFjb21pbmcpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChGLmFqYXhMb2FkKSB7XHJcblx0XHRcdFx0Ri5hamF4TG9hZC5hYm9ydCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRGLmFqYXhMb2FkID0gbnVsbDtcclxuXHJcblx0XHRcdGlmIChGLmltZ1ByZWxvYWQpIHtcclxuXHRcdFx0XHRGLmltZ1ByZWxvYWQub25sb2FkID0gRi5pbWdQcmVsb2FkLm9uZXJyb3IgPSBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY29taW5nLndyYXApIHtcclxuXHRcdFx0XHRjb21pbmcud3JhcC5zdG9wKHRydWUsIHRydWUpLnRyaWdnZXIoJ29uUmVzZXQnKS5yZW1vdmUoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ri5jb21pbmcgPSBudWxsO1xyXG5cclxuXHRcdFx0Ly8gSWYgdGhlIGZpcnN0IGl0ZW0gaGFzIGJlZW4gY2FuY2VsZWQsIHRoZW4gY2xlYXIgZXZlcnl0aGluZ1xyXG5cdFx0XHRpZiAoIUYuY3VycmVudCkge1xyXG5cdFx0XHRcdEYuX2FmdGVyWm9vbU91dCggY29taW5nICk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8gU3RhcnQgY2xvc2luZyBhbmltYXRpb24gaWYgaXMgb3BlbjsgcmVtb3ZlIGltbWVkaWF0ZWx5IGlmIG9wZW5pbmcvY2xvc2luZ1xyXG5cdFx0Y2xvc2U6IGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRGLmNhbmNlbCgpO1xyXG5cclxuXHRcdFx0aWYgKGZhbHNlID09PSBGLnRyaWdnZXIoJ2JlZm9yZUNsb3NlJykpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdEYudW5iaW5kRXZlbnRzKCk7XHJcblxyXG5cdFx0XHRpZiAoIUYuaXNBY3RpdmUpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghRi5pc09wZW4gfHwgZXZlbnQgPT09IHRydWUpIHtcclxuXHRcdFx0XHQkKCcuZmFuY3lib3gtd3JhcCcpLnN0b3AodHJ1ZSkudHJpZ2dlcignb25SZXNldCcpLnJlbW92ZSgpO1xyXG5cclxuXHRcdFx0XHRGLl9hZnRlclpvb21PdXQoKTtcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ri5pc09wZW4gPSBGLmlzT3BlbmVkID0gZmFsc2U7XHJcblx0XHRcdFx0Ri5pc0Nsb3NpbmcgPSB0cnVlO1xyXG5cclxuXHRcdFx0XHQkKCcuZmFuY3lib3gtaXRlbSwgLmZhbmN5Ym94LW5hdicpLnJlbW92ZSgpO1xyXG5cclxuXHRcdFx0XHRGLndyYXAuc3RvcCh0cnVlLCB0cnVlKS5yZW1vdmVDbGFzcygnZmFuY3lib3gtb3BlbmVkJyk7XHJcblxyXG5cdFx0XHRcdEYudHJhbnNpdGlvbnNbIEYuY3VycmVudC5jbG9zZU1ldGhvZCBdKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8gTWFuYWdlIHNsaWRlc2hvdzpcclxuXHRcdC8vICAgJC5mYW5jeWJveC5wbGF5KCk7IC0gdG9nZ2xlIHNsaWRlc2hvd1xyXG5cdFx0Ly8gICAkLmZhbmN5Ym94LnBsYXkoIHRydWUgKTsgLSBzdGFydFxyXG5cdFx0Ly8gICAkLmZhbmN5Ym94LnBsYXkoIGZhbHNlICk7IC0gc3RvcFxyXG5cdFx0cGxheTogZnVuY3Rpb24gKCBhY3Rpb24gKSB7XHJcblx0XHRcdHZhciBjbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGNsZWFyVGltZW91dChGLnBsYXllci50aW1lcik7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRzZXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRjbGVhcigpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChGLmN1cnJlbnQgJiYgRi5wbGF5ZXIuaXNBY3RpdmUpIHtcclxuXHRcdFx0XHRcdFx0Ri5wbGF5ZXIudGltZXIgPSBzZXRUaW1lb3V0KEYubmV4dCwgRi5jdXJyZW50LnBsYXlTcGVlZCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRzdG9wID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0Y2xlYXIoKTtcclxuXHJcblx0XHRcdFx0XHRELnVuYmluZCgnLnBsYXllcicpO1xyXG5cclxuXHRcdFx0XHRcdEYucGxheWVyLmlzQWN0aXZlID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdFx0Ri50cmlnZ2VyKCdvblBsYXlFbmQnKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHN0YXJ0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0aWYgKEYuY3VycmVudCAmJiAoRi5jdXJyZW50Lmxvb3AgfHwgRi5jdXJyZW50LmluZGV4IDwgRi5ncm91cC5sZW5ndGggLSAxKSkge1xyXG5cdFx0XHRcdFx0XHRGLnBsYXllci5pc0FjdGl2ZSA9IHRydWU7XHJcblxyXG5cdFx0XHRcdFx0XHRELmJpbmQoe1xyXG5cdFx0XHRcdFx0XHRcdCdvbkNhbmNlbC5wbGF5ZXIgYmVmb3JlQ2xvc2UucGxheWVyJyA6IHN0b3AsXHJcblx0XHRcdFx0XHRcdFx0J29uVXBkYXRlLnBsYXllcicgICA6IHNldCxcclxuXHRcdFx0XHRcdFx0XHQnYmVmb3JlTG9hZC5wbGF5ZXInIDogY2xlYXJcclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHRzZXQoKTtcclxuXHJcblx0XHRcdFx0XHRcdEYudHJpZ2dlcignb25QbGF5U3RhcnQnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYgKGFjdGlvbiA9PT0gdHJ1ZSB8fCAoIUYucGxheWVyLmlzQWN0aXZlICYmIGFjdGlvbiAhPT0gZmFsc2UpKSB7XHJcblx0XHRcdFx0c3RhcnQoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzdG9wKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8gTmF2aWdhdGUgdG8gbmV4dCBnYWxsZXJ5IGl0ZW1cclxuXHRcdG5leHQ6IGZ1bmN0aW9uICggZGlyZWN0aW9uICkge1xyXG5cdFx0XHR2YXIgY3VycmVudCA9IEYuY3VycmVudDtcclxuXHJcblx0XHRcdGlmIChjdXJyZW50KSB7XHJcblx0XHRcdFx0aWYgKCFpc1N0cmluZyhkaXJlY3Rpb24pKSB7XHJcblx0XHRcdFx0XHRkaXJlY3Rpb24gPSBjdXJyZW50LmRpcmVjdGlvbi5uZXh0O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ri5qdW1wdG8oY3VycmVudC5pbmRleCArIDEsIGRpcmVjdGlvbiwgJ25leHQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHJcblx0XHQvLyBOYXZpZ2F0ZSB0byBwcmV2aW91cyBnYWxsZXJ5IGl0ZW1cclxuXHRcdHByZXY6IGZ1bmN0aW9uICggZGlyZWN0aW9uICkge1xyXG5cdFx0XHR2YXIgY3VycmVudCA9IEYuY3VycmVudDtcclxuXHJcblx0XHRcdGlmIChjdXJyZW50KSB7XHJcblx0XHRcdFx0aWYgKCFpc1N0cmluZyhkaXJlY3Rpb24pKSB7XHJcblx0XHRcdFx0XHRkaXJlY3Rpb24gPSBjdXJyZW50LmRpcmVjdGlvbi5wcmV2O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ri5qdW1wdG8oY3VycmVudC5pbmRleCAtIDEsIGRpcmVjdGlvbiwgJ3ByZXYnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHJcblx0XHQvLyBOYXZpZ2F0ZSB0byBnYWxsZXJ5IGl0ZW0gYnkgaW5kZXhcclxuXHRcdGp1bXB0bzogZnVuY3Rpb24gKCBpbmRleCwgZGlyZWN0aW9uLCByb3V0ZXIgKSB7XHJcblx0XHRcdHZhciBjdXJyZW50ID0gRi5jdXJyZW50O1xyXG5cclxuXHRcdFx0aWYgKCFjdXJyZW50KSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpbmRleCA9IGdldFNjYWxhcihpbmRleCk7XHJcblxyXG5cdFx0XHRGLmRpcmVjdGlvbiA9IGRpcmVjdGlvbiB8fCBjdXJyZW50LmRpcmVjdGlvblsgKGluZGV4ID49IGN1cnJlbnQuaW5kZXggPyAnbmV4dCcgOiAncHJldicpIF07XHJcblx0XHRcdEYucm91dGVyICAgID0gcm91dGVyIHx8ICdqdW1wdG8nO1xyXG5cclxuXHRcdFx0aWYgKGN1cnJlbnQubG9vcCkge1xyXG5cdFx0XHRcdGlmIChpbmRleCA8IDApIHtcclxuXHRcdFx0XHRcdGluZGV4ID0gY3VycmVudC5ncm91cC5sZW5ndGggKyAoaW5kZXggJSBjdXJyZW50Lmdyb3VwLmxlbmd0aCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpbmRleCA9IGluZGV4ICUgY3VycmVudC5ncm91cC5sZW5ndGg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjdXJyZW50Lmdyb3VwWyBpbmRleCBdICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRGLmNhbmNlbCgpO1xyXG5cclxuXHRcdFx0XHRGLl9zdGFydChpbmRleCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8gQ2VudGVyIGluc2lkZSB2aWV3cG9ydCBhbmQgdG9nZ2xlIHBvc2l0aW9uIHR5cGUgdG8gZml4ZWQgb3IgYWJzb2x1dGUgaWYgbmVlZGVkXHJcblx0XHRyZXBvc2l0aW9uOiBmdW5jdGlvbiAoZSwgb25seUFic29sdXRlKSB7XHJcblx0XHRcdHZhciBjdXJyZW50ID0gRi5jdXJyZW50LFxyXG5cdFx0XHRcdHdyYXAgICAgPSBjdXJyZW50ID8gY3VycmVudC53cmFwIDogbnVsbCxcclxuXHRcdFx0XHRwb3M7XHJcblxyXG5cdFx0XHRpZiAod3JhcCkge1xyXG5cdFx0XHRcdHBvcyA9IEYuX2dldFBvc2l0aW9uKG9ubHlBYnNvbHV0ZSk7XHJcblxyXG5cdFx0XHRcdGlmIChlICYmIGUudHlwZSA9PT0gJ3Njcm9sbCcpIHtcclxuXHRcdFx0XHRcdGRlbGV0ZSBwb3MucG9zaXRpb247XHJcblxyXG5cdFx0XHRcdFx0d3JhcC5zdG9wKHRydWUsIHRydWUpLmFuaW1hdGUocG9zLCAyMDApO1xyXG5cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0d3JhcC5jc3MocG9zKTtcclxuXHJcblx0XHRcdFx0XHRjdXJyZW50LnBvcyA9ICQuZXh0ZW5kKHt9LCBjdXJyZW50LmRpbSwgcG9zKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0dXBkYXRlOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHR2YXIgdHlwZSA9IChlICYmIGUub3JpZ2luYWxFdmVudCAmJiBlLm9yaWdpbmFsRXZlbnQudHlwZSksXHJcblx0XHRcdFx0YW55d2F5ID0gIXR5cGUgfHwgdHlwZSA9PT0gJ29yaWVudGF0aW9uY2hhbmdlJztcclxuXHJcblx0XHRcdGlmIChhbnl3YXkpIHtcclxuXHRcdFx0XHRjbGVhclRpbWVvdXQoZGlkVXBkYXRlKTtcclxuXHJcblx0XHRcdFx0ZGlkVXBkYXRlID0gbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCFGLmlzT3BlbiB8fCBkaWRVcGRhdGUpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRpZFVwZGF0ZSA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnQgPSBGLmN1cnJlbnQ7XHJcblxyXG5cdFx0XHRcdGlmICghY3VycmVudCB8fCBGLmlzQ2xvc2luZykge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ri53cmFwLnJlbW92ZUNsYXNzKCdmYW5jeWJveC10bXAnKTtcclxuXHJcblx0XHRcdFx0aWYgKGFueXdheSB8fCB0eXBlID09PSAnbG9hZCcgfHwgKHR5cGUgPT09ICdyZXNpemUnICYmIGN1cnJlbnQuYXV0b1Jlc2l6ZSkpIHtcclxuXHRcdFx0XHRcdEYuX3NldERpbWVuc2lvbigpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKCEodHlwZSA9PT0gJ3Njcm9sbCcgJiYgY3VycmVudC5jYW5TaHJpbmspKSB7XHJcblx0XHRcdFx0XHRGLnJlcG9zaXRpb24oZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRGLnRyaWdnZXIoJ29uVXBkYXRlJyk7XHJcblxyXG5cdFx0XHRcdGRpZFVwZGF0ZSA9IG51bGw7XHJcblxyXG5cdFx0XHR9LCAoYW55d2F5ICYmICFpc1RvdWNoID8gMCA6IDMwMCkpO1xyXG5cdFx0fSxcclxuXHJcblx0XHQvLyBTaHJpbmsgY29udGVudCB0byBmaXQgaW5zaWRlIHZpZXdwb3J0IG9yIHJlc3RvcmUgaWYgcmVzaXplZFxyXG5cdFx0dG9nZ2xlOiBmdW5jdGlvbiAoIGFjdGlvbiApIHtcclxuXHRcdFx0aWYgKEYuaXNPcGVuKSB7XHJcblx0XHRcdFx0Ri5jdXJyZW50LmZpdFRvVmlldyA9ICQudHlwZShhY3Rpb24pID09PSBcImJvb2xlYW5cIiA/IGFjdGlvbiA6ICFGLmN1cnJlbnQuZml0VG9WaWV3O1xyXG5cclxuXHRcdFx0XHQvLyBIZWxwIGJyb3dzZXIgdG8gcmVzdG9yZSBkb2N1bWVudCBkaW1lbnNpb25zXHJcblx0XHRcdFx0aWYgKGlzVG91Y2gpIHtcclxuXHRcdFx0XHRcdEYud3JhcC5yZW1vdmVBdHRyKCdzdHlsZScpLmFkZENsYXNzKCdmYW5jeWJveC10bXAnKTtcclxuXHJcblx0XHRcdFx0XHRGLnRyaWdnZXIoJ29uVXBkYXRlJyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRGLnVwZGF0ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdGhpZGVMb2FkaW5nOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdEQudW5iaW5kKCcubG9hZGluZycpO1xyXG5cclxuXHRcdFx0JCgnI2ZhbmN5Ym94LWxvYWRpbmcnKS5yZW1vdmUoKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0c2hvd0xvYWRpbmc6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGVsLCB2aWV3cG9ydDtcclxuXHJcblx0XHRcdEYuaGlkZUxvYWRpbmcoKTtcclxuXHJcblx0XHRcdGVsID0gJCgnPGRpdiBpZD1cImZhbmN5Ym94LWxvYWRpbmdcIj48ZGl2PjwvZGl2PjwvZGl2PicpLmNsaWNrKEYuY2FuY2VsKS5hcHBlbmRUbygnYm9keScpO1xyXG5cclxuXHRcdFx0Ly8gSWYgdXNlciB3aWxsIHByZXNzIHRoZSBlc2NhcGUtYnV0dG9uLCB0aGUgcmVxdWVzdCB3aWxsIGJlIGNhbmNlbGVkXHJcblx0XHRcdEQuYmluZCgna2V5ZG93bi5sb2FkaW5nJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdGlmICgoZS53aGljaCB8fCBlLmtleUNvZGUpID09PSAyNykge1xyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0XHRcdEYuY2FuY2VsKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGlmICghRi5kZWZhdWx0cy5maXhlZCkge1xyXG5cdFx0XHRcdHZpZXdwb3J0ID0gRi5nZXRWaWV3cG9ydCgpO1xyXG5cclxuXHRcdFx0XHRlbC5jc3Moe1xyXG5cdFx0XHRcdFx0cG9zaXRpb24gOiAnYWJzb2x1dGUnLFxyXG5cdFx0XHRcdFx0dG9wICA6ICh2aWV3cG9ydC5oICogMC41KSArIHZpZXdwb3J0LnksXHJcblx0XHRcdFx0XHRsZWZ0IDogKHZpZXdwb3J0LncgKiAwLjUpICsgdmlld3BvcnQueFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRGLnRyaWdnZXIoJ29uTG9hZGluZycpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRnZXRWaWV3cG9ydDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgbG9ja2VkID0gKEYuY3VycmVudCAmJiBGLmN1cnJlbnQubG9ja2VkKSB8fCBmYWxzZSxcclxuXHRcdFx0XHRyZXogICAgPSB7XHJcblx0XHRcdFx0XHR4OiBXLnNjcm9sbExlZnQoKSxcclxuXHRcdFx0XHRcdHk6IFcuc2Nyb2xsVG9wKClcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYgKGxvY2tlZCAmJiBsb2NrZWQubGVuZ3RoKSB7XHJcblx0XHRcdFx0cmV6LncgPSBsb2NrZWRbMF0uY2xpZW50V2lkdGg7XHJcblx0XHRcdFx0cmV6LmggPSBsb2NrZWRbMF0uY2xpZW50SGVpZ2h0O1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBTZWUgaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvNjcyNFxyXG5cdFx0XHRcdHJlei53ID0gaXNUb3VjaCAmJiB3aW5kb3cuaW5uZXJXaWR0aCAgPyB3aW5kb3cuaW5uZXJXaWR0aCAgOiBXLndpZHRoKCk7XHJcblx0XHRcdFx0cmV6LmggPSBpc1RvdWNoICYmIHdpbmRvdy5pbm5lckhlaWdodCA/IHdpbmRvdy5pbm5lckhlaWdodCA6IFcuaGVpZ2h0KCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiByZXo7XHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIFVuYmluZCB0aGUga2V5Ym9hcmQgLyBjbGlja2luZyBhY3Rpb25zXHJcblx0XHR1bmJpbmRFdmVudHM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKEYud3JhcCAmJiBpc1F1ZXJ5KEYud3JhcCkpIHtcclxuXHRcdFx0XHRGLndyYXAudW5iaW5kKCcuZmInKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0RC51bmJpbmQoJy5mYicpO1xyXG5cdFx0XHRXLnVuYmluZCgnLmZiJyk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGJpbmRFdmVudHM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGN1cnJlbnQgPSBGLmN1cnJlbnQsXHJcblx0XHRcdFx0a2V5cztcclxuXHJcblx0XHRcdGlmICghY3VycmVudCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQ2hhbmdpbmcgZG9jdW1lbnQgaGVpZ2h0IG9uIGlPUyBkZXZpY2VzIHRyaWdnZXJzIGEgJ3Jlc2l6ZScgZXZlbnQsXHJcblx0XHRcdC8vIHRoYXQgY2FuIGNoYW5nZSBkb2N1bWVudCBoZWlnaHQuLi4gcmVwZWF0aW5nIGluZmluaXRlbHlcclxuXHRcdFx0Vy5iaW5kKCdvcmllbnRhdGlvbmNoYW5nZS5mYicgKyAoaXNUb3VjaCA/ICcnIDogJyByZXNpemUuZmInKSArIChjdXJyZW50LmF1dG9DZW50ZXIgJiYgIWN1cnJlbnQubG9ja2VkID8gJyBzY3JvbGwuZmInIDogJycpLCBGLnVwZGF0ZSk7XHJcblxyXG5cdFx0XHRrZXlzID0gY3VycmVudC5rZXlzO1xyXG5cclxuXHRcdFx0aWYgKGtleXMpIHtcclxuXHRcdFx0XHRELmJpbmQoJ2tleWRvd24uZmInLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdFx0dmFyIGNvZGUgICA9IGUud2hpY2ggfHwgZS5rZXlDb2RlLFxyXG5cdFx0XHRcdFx0XHR0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XHJcblxyXG5cdFx0XHRcdFx0Ly8gU2tpcCBlc2Mga2V5IGlmIGxvYWRpbmcsIGJlY2F1c2Ugc2hvd0xvYWRpbmcgd2lsbCBjYW5jZWwgcHJlbG9hZGluZ1xyXG5cdFx0XHRcdFx0aWYgKGNvZGUgPT09IDI3ICYmIEYuY29taW5nKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBJZ25vcmUga2V5IGNvbWJpbmF0aW9ucyBhbmQga2V5IGV2ZW50cyB3aXRoaW4gZm9ybSBlbGVtZW50c1xyXG5cdFx0XHRcdFx0aWYgKCFlLmN0cmxLZXkgJiYgIWUuYWx0S2V5ICYmICFlLnNoaWZ0S2V5ICYmICFlLm1ldGFLZXkgJiYgISh0YXJnZXQgJiYgKHRhcmdldC50eXBlIHx8ICQodGFyZ2V0KS5pcygnW2NvbnRlbnRlZGl0YWJsZV0nKSkpKSB7XHJcblx0XHRcdFx0XHRcdCQuZWFjaChrZXlzLCBmdW5jdGlvbihpLCB2YWwpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoY3VycmVudC5ncm91cC5sZW5ndGggPiAxICYmIHZhbFsgY29kZSBdICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdEZbIGkgXSggdmFsWyBjb2RlIF0gKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoJC5pbkFycmF5KGNvZGUsIHZhbCkgPiAtMSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0RlsgaSBdICgpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoJC5mbi5tb3VzZXdoZWVsICYmIGN1cnJlbnQubW91c2VXaGVlbCkge1xyXG5cdFx0XHRcdEYud3JhcC5iaW5kKCdtb3VzZXdoZWVsLmZiJywgZnVuY3Rpb24gKGUsIGRlbHRhLCBkZWx0YVgsIGRlbHRhWSkge1xyXG5cdFx0XHRcdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IG51bGwsXHJcblx0XHRcdFx0XHRcdHBhcmVudCA9ICQodGFyZ2V0KSxcclxuXHRcdFx0XHRcdFx0Y2FuU2Nyb2xsID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdFx0d2hpbGUgKHBhcmVudC5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGNhblNjcm9sbCB8fCBwYXJlbnQuaXMoJy5mYW5jeWJveC1za2luJykgfHwgcGFyZW50LmlzKCcuZmFuY3lib3gtd3JhcCcpKSB7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGNhblNjcm9sbCA9IGlzU2Nyb2xsYWJsZSggcGFyZW50WzBdICk7XHJcblx0XHRcdFx0XHRcdHBhcmVudCAgICA9ICQocGFyZW50KS5wYXJlbnQoKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoZGVsdGEgIT09IDAgJiYgIWNhblNjcm9sbCkge1xyXG5cdFx0XHRcdFx0XHRpZiAoRi5ncm91cC5sZW5ndGggPiAxICYmICFjdXJyZW50LmNhblNocmluaykge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChkZWx0YVkgPiAwIHx8IGRlbHRhWCA+IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdEYucHJldiggZGVsdGFZID4gMCA/ICdkb3duJyA6ICdsZWZ0JyApO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGRlbHRhWSA8IDAgfHwgZGVsdGFYIDwgMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Ri5uZXh0KCBkZWx0YVkgPCAwID8gJ3VwJyA6ICdyaWdodCcgKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdHRyaWdnZXI6IGZ1bmN0aW9uIChldmVudCwgbykge1xyXG5cdFx0XHR2YXIgcmV0LCBvYmogPSBvIHx8IEYuY29taW5nIHx8IEYuY3VycmVudDtcclxuXHJcblx0XHRcdGlmIChvYmopIHtcclxuXHRcdFx0XHRpZiAoJC5pc0Z1bmN0aW9uKCBvYmpbZXZlbnRdICkpIHtcclxuXHRcdFx0XHRcdHJldCA9IG9ialtldmVudF0uYXBwbHkob2JqLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChyZXQgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAob2JqLmhlbHBlcnMpIHtcclxuXHRcdFx0XHRcdCQuZWFjaChvYmouaGVscGVycywgZnVuY3Rpb24gKGhlbHBlciwgb3B0cykge1xyXG5cdFx0XHRcdFx0XHRpZiAob3B0cyAmJiBGLmhlbHBlcnNbaGVscGVyXSAmJiAkLmlzRnVuY3Rpb24oRi5oZWxwZXJzW2hlbHBlcl1bZXZlbnRdKSkge1xyXG5cdFx0XHRcdFx0XHRcdEYuaGVscGVyc1toZWxwZXJdW2V2ZW50XSgkLmV4dGVuZCh0cnVlLCB7fSwgRi5oZWxwZXJzW2hlbHBlcl0uZGVmYXVsdHMsIG9wdHMpLCBvYmopO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdEQudHJpZ2dlcihldmVudCk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGlzSW1hZ2U6IGZ1bmN0aW9uIChzdHIpIHtcclxuXHRcdFx0cmV0dXJuIGlzU3RyaW5nKHN0cikgJiYgc3RyLm1hdGNoKC8oXmRhdGE6aW1hZ2VcXC8uKiwpfChcXC4oanAoZXxnfGVnKXxnaWZ8cG5nfGJtcHx3ZWJwfHN2ZykoKFxcP3wjKS4qKT8kKS9pKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0aXNTV0Y6IGZ1bmN0aW9uIChzdHIpIHtcclxuXHRcdFx0cmV0dXJuIGlzU3RyaW5nKHN0cikgJiYgc3RyLm1hdGNoKC9cXC4oc3dmKSgoXFw/fCMpLiopPyQvaSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdF9zdGFydDogZnVuY3Rpb24gKGluZGV4KSB7XHJcblx0XHRcdHZhciBjb21pbmcgPSB7fSxcclxuXHRcdFx0XHRvYmosXHJcblx0XHRcdFx0aHJlZixcclxuXHRcdFx0XHR0eXBlLFxyXG5cdFx0XHRcdG1hcmdpbixcclxuXHRcdFx0XHRwYWRkaW5nO1xyXG5cclxuXHRcdFx0aW5kZXggPSBnZXRTY2FsYXIoIGluZGV4ICk7XHJcblx0XHRcdG9iaiAgID0gRi5ncm91cFsgaW5kZXggXSB8fCBudWxsO1xyXG5cclxuXHRcdFx0aWYgKCFvYmopIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNvbWluZyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBGLm9wdHMsIG9iaik7XHJcblxyXG5cdFx0XHQvLyBDb252ZXJ0IG1hcmdpbiBhbmQgcGFkZGluZyBwcm9wZXJ0aWVzIHRvIGFycmF5IC0gdG9wLCByaWdodCwgYm90dG9tLCBsZWZ0XHJcblx0XHRcdG1hcmdpbiAgPSBjb21pbmcubWFyZ2luO1xyXG5cdFx0XHRwYWRkaW5nID0gY29taW5nLnBhZGRpbmc7XHJcblxyXG5cdFx0XHRpZiAoJC50eXBlKG1hcmdpbikgPT09ICdudW1iZXInKSB7XHJcblx0XHRcdFx0Y29taW5nLm1hcmdpbiA9IFttYXJnaW4sIG1hcmdpbiwgbWFyZ2luLCBtYXJnaW5dO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoJC50eXBlKHBhZGRpbmcpID09PSAnbnVtYmVyJykge1xyXG5cdFx0XHRcdGNvbWluZy5wYWRkaW5nID0gW3BhZGRpbmcsIHBhZGRpbmcsIHBhZGRpbmcsIHBhZGRpbmddO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyAnbW9kYWwnIHByb3BlcnkgaXMganVzdCBhIHNob3J0Y3V0XHJcblx0XHRcdGlmIChjb21pbmcubW9kYWwpIHtcclxuXHRcdFx0XHQkLmV4dGVuZCh0cnVlLCBjb21pbmcsIHtcclxuXHRcdFx0XHRcdGNsb3NlQnRuICAgOiBmYWxzZSxcclxuXHRcdFx0XHRcdGNsb3NlQ2xpY2sgOiBmYWxzZSxcclxuXHRcdFx0XHRcdG5leHRDbGljayAgOiBmYWxzZSxcclxuXHRcdFx0XHRcdGFycm93cyAgICAgOiBmYWxzZSxcclxuXHRcdFx0XHRcdG1vdXNlV2hlZWwgOiBmYWxzZSxcclxuXHRcdFx0XHRcdGtleXMgICAgICAgOiBudWxsLFxyXG5cdFx0XHRcdFx0aGVscGVyczoge1xyXG5cdFx0XHRcdFx0XHRvdmVybGF5IDoge1xyXG5cdFx0XHRcdFx0XHRcdGNsb3NlQ2xpY2sgOiBmYWxzZVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vICdhdXRvU2l6ZScgcHJvcGVydHkgaXMgYSBzaG9ydGN1dCwgdG9vXHJcblx0XHRcdGlmIChjb21pbmcuYXV0b1NpemUpIHtcclxuXHRcdFx0XHRjb21pbmcuYXV0b1dpZHRoID0gY29taW5nLmF1dG9IZWlnaHQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY29taW5nLndpZHRoID09PSAnYXV0bycpIHtcclxuXHRcdFx0XHRjb21pbmcuYXV0b1dpZHRoID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNvbWluZy5oZWlnaHQgPT09ICdhdXRvJykge1xyXG5cdFx0XHRcdGNvbWluZy5hdXRvSGVpZ2h0ID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LypcclxuXHRcdFx0ICogQWRkIHJlZmVyZW5jZSB0byB0aGUgZ3JvdXAsIHNvIGl0YHMgcG9zc2libGUgdG8gYWNjZXNzIGZyb20gY2FsbGJhY2tzLCBleGFtcGxlOlxyXG5cdFx0XHQgKiBhZnRlckxvYWQgOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0ICogICAgIHRoaXMudGl0bGUgPSAnSW1hZ2UgJyArICh0aGlzLmluZGV4ICsgMSkgKyAnIG9mICcgKyB0aGlzLmdyb3VwLmxlbmd0aCArICh0aGlzLnRpdGxlID8gJyAtICcgKyB0aGlzLnRpdGxlIDogJycpO1xyXG5cdFx0XHQgKiB9XHJcblx0XHRcdCAqL1xyXG5cclxuXHRcdFx0Y29taW5nLmdyb3VwICA9IEYuZ3JvdXA7XHJcblx0XHRcdGNvbWluZy5pbmRleCAgPSBpbmRleDtcclxuXHJcblx0XHRcdC8vIEdpdmUgYSBjaGFuY2UgZm9yIGNhbGxiYWNrIG9yIGhlbHBlcnMgdG8gdXBkYXRlIGNvbWluZyBpdGVtICh0eXBlLCB0aXRsZSwgZXRjKVxyXG5cdFx0XHRGLmNvbWluZyA9IGNvbWluZztcclxuXHJcblx0XHRcdGlmIChmYWxzZSA9PT0gRi50cmlnZ2VyKCdiZWZvcmVMb2FkJykpIHtcclxuXHRcdFx0XHRGLmNvbWluZyA9IG51bGw7XHJcblxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dHlwZSA9IGNvbWluZy50eXBlO1xyXG5cdFx0XHRocmVmID0gY29taW5nLmhyZWY7XHJcblxyXG5cdFx0XHRpZiAoIXR5cGUpIHtcclxuXHRcdFx0XHRGLmNvbWluZyA9IG51bGw7XHJcblxyXG5cdFx0XHRcdC8vSWYgd2UgY2FuIG5vdCBkZXRlcm1pbmUgY29udGVudCB0eXBlIHRoZW4gZHJvcCBzaWxlbnRseSBvciBkaXNwbGF5IG5leHQvcHJldiBpdGVtIGlmIGxvb3BpbmcgdGhyb3VnaCBnYWxsZXJ5XHJcblx0XHRcdFx0aWYgKEYuY3VycmVudCAmJiBGLnJvdXRlciAmJiBGLnJvdXRlciAhPT0gJ2p1bXB0bycpIHtcclxuXHRcdFx0XHRcdEYuY3VycmVudC5pbmRleCA9IGluZGV4O1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiBGWyBGLnJvdXRlciBdKCBGLmRpcmVjdGlvbiApO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRGLmlzQWN0aXZlID0gdHJ1ZTtcclxuXHJcblx0XHRcdGlmICh0eXBlID09PSAnaW1hZ2UnIHx8IHR5cGUgPT09ICdzd2YnKSB7XHJcblx0XHRcdFx0Y29taW5nLmF1dG9IZWlnaHQgPSBjb21pbmcuYXV0b1dpZHRoID0gZmFsc2U7XHJcblx0XHRcdFx0Y29taW5nLnNjcm9sbGluZyAgPSAndmlzaWJsZSc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0eXBlID09PSAnaW1hZ2UnKSB7XHJcblx0XHRcdFx0Y29taW5nLmFzcGVjdFJhdGlvID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHR5cGUgPT09ICdpZnJhbWUnICYmIGlzVG91Y2gpIHtcclxuXHRcdFx0XHRjb21pbmcuc2Nyb2xsaW5nID0gJ3Njcm9sbCc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEJ1aWxkIHRoZSBuZWNjZXNzYXJ5IG1hcmt1cFxyXG5cdFx0XHRjb21pbmcud3JhcCA9ICQoY29taW5nLnRwbC53cmFwKS5hZGRDbGFzcygnZmFuY3lib3gtJyArIChpc1RvdWNoID8gJ21vYmlsZScgOiAnZGVza3RvcCcpICsgJyBmYW5jeWJveC10eXBlLScgKyB0eXBlICsgJyBmYW5jeWJveC10bXAgJyArIGNvbWluZy53cmFwQ1NTKS5hcHBlbmRUbyggY29taW5nLnBhcmVudCB8fCAnYm9keScgKTtcclxuXHJcblx0XHRcdCQuZXh0ZW5kKGNvbWluZywge1xyXG5cdFx0XHRcdHNraW4gIDogJCgnLmZhbmN5Ym94LXNraW4nLCAgY29taW5nLndyYXApLFxyXG5cdFx0XHRcdG91dGVyIDogJCgnLmZhbmN5Ym94LW91dGVyJywgY29taW5nLndyYXApLFxyXG5cdFx0XHRcdGlubmVyIDogJCgnLmZhbmN5Ym94LWlubmVyJywgY29taW5nLndyYXApXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0JC5lYWNoKFtcIlRvcFwiLCBcIlJpZ2h0XCIsIFwiQm90dG9tXCIsIFwiTGVmdFwiXSwgZnVuY3Rpb24oaSwgdikge1xyXG5cdFx0XHRcdGNvbWluZy5za2luLmNzcygncGFkZGluZycgKyB2LCBnZXRWYWx1ZShjb21pbmcucGFkZGluZ1sgaSBdKSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ri50cmlnZ2VyKCdvblJlYWR5Jyk7XHJcblxyXG5cdFx0XHQvLyBDaGVjayBiZWZvcmUgdHJ5IHRvIGxvYWQ7ICdpbmxpbmUnIGFuZCAnaHRtbCcgdHlwZXMgbmVlZCBjb250ZW50LCBvdGhlcnMgLSBocmVmXHJcblx0XHRcdGlmICh0eXBlID09PSAnaW5saW5lJyB8fCB0eXBlID09PSAnaHRtbCcpIHtcclxuXHRcdFx0XHRpZiAoIWNvbWluZy5jb250ZW50IHx8ICFjb21pbmcuY29udGVudC5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdHJldHVybiBGLl9lcnJvciggJ2NvbnRlbnQnICk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fSBlbHNlIGlmICghaHJlZikge1xyXG5cdFx0XHRcdHJldHVybiBGLl9lcnJvciggJ2hyZWYnICk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0eXBlID09PSAnaW1hZ2UnKSB7XHJcblx0XHRcdFx0Ri5fbG9hZEltYWdlKCk7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKHR5cGUgPT09ICdhamF4Jykge1xyXG5cdFx0XHRcdEYuX2xvYWRBamF4KCk7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKHR5cGUgPT09ICdpZnJhbWUnKSB7XHJcblx0XHRcdFx0Ri5fbG9hZElmcmFtZSgpO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRGLl9hZnRlckxvYWQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHJcblx0XHRfZXJyb3I6IGZ1bmN0aW9uICggdHlwZSApIHtcclxuXHRcdFx0JC5leHRlbmQoRi5jb21pbmcsIHtcclxuXHRcdFx0XHR0eXBlICAgICAgIDogJ2h0bWwnLFxyXG5cdFx0XHRcdGF1dG9XaWR0aCAgOiB0cnVlLFxyXG5cdFx0XHRcdGF1dG9IZWlnaHQgOiB0cnVlLFxyXG5cdFx0XHRcdG1pbldpZHRoICAgOiAwLFxyXG5cdFx0XHRcdG1pbkhlaWdodCAgOiAwLFxyXG5cdFx0XHRcdHNjcm9sbGluZyAgOiAnbm8nLFxyXG5cdFx0XHRcdGhhc0Vycm9yICAgOiB0eXBlLFxyXG5cdFx0XHRcdGNvbnRlbnQgICAgOiBGLmNvbWluZy50cGwuZXJyb3JcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRGLl9hZnRlckxvYWQoKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0X2xvYWRJbWFnZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQvLyBSZXNldCBwcmVsb2FkIGltYWdlIHNvIGl0IGlzIGxhdGVyIHBvc3NpYmxlIHRvIGNoZWNrIFwiY29tcGxldGVcIiBwcm9wZXJ0eVxyXG5cdFx0XHR2YXIgaW1nID0gRi5pbWdQcmVsb2FkID0gbmV3IEltYWdlKCk7XHJcblxyXG5cdFx0XHRpbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHRoaXMub25sb2FkID0gdGhpcy5vbmVycm9yID0gbnVsbDtcclxuXHJcblx0XHRcdFx0Ri5jb21pbmcud2lkdGggID0gdGhpcy53aWR0aCAvIEYub3B0cy5waXhlbFJhdGlvO1xyXG5cdFx0XHRcdEYuY29taW5nLmhlaWdodCA9IHRoaXMuaGVpZ2h0IC8gRi5vcHRzLnBpeGVsUmF0aW87XHJcblxyXG5cdFx0XHRcdEYuX2FmdGVyTG9hZCgpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aW1nLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0dGhpcy5vbmxvYWQgPSB0aGlzLm9uZXJyb3IgPSBudWxsO1xyXG5cclxuXHRcdFx0XHRGLl9lcnJvciggJ2ltYWdlJyApO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aW1nLnNyYyA9IEYuY29taW5nLmhyZWY7XHJcblxyXG5cdFx0XHRpZiAoaW1nLmNvbXBsZXRlICE9PSB0cnVlKSB7XHJcblx0XHRcdFx0Ri5zaG93TG9hZGluZygpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdF9sb2FkQWpheDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgY29taW5nID0gRi5jb21pbmc7XHJcblxyXG5cdFx0XHRGLnNob3dMb2FkaW5nKCk7XHJcblxyXG5cdFx0XHRGLmFqYXhMb2FkID0gJC5hamF4KCQuZXh0ZW5kKHt9LCBjb21pbmcuYWpheCwge1xyXG5cdFx0XHRcdHVybDogY29taW5nLmhyZWYsXHJcblx0XHRcdFx0ZXJyb3I6IGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cykge1xyXG5cdFx0XHRcdFx0aWYgKEYuY29taW5nICYmIHRleHRTdGF0dXMgIT09ICdhYm9ydCcpIHtcclxuXHRcdFx0XHRcdFx0Ri5fZXJyb3IoICdhamF4JywganFYSFIgKTtcclxuXHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRGLmhpZGVMb2FkaW5nKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSwgdGV4dFN0YXR1cykge1xyXG5cdFx0XHRcdFx0aWYgKHRleHRTdGF0dXMgPT09ICdzdWNjZXNzJykge1xyXG5cdFx0XHRcdFx0XHRjb21pbmcuY29udGVudCA9IGRhdGE7XHJcblxyXG5cdFx0XHRcdFx0XHRGLl9hZnRlckxvYWQoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0X2xvYWRJZnJhbWU6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgY29taW5nID0gRi5jb21pbmcsXHJcblx0XHRcdFx0aWZyYW1lID0gJChjb21pbmcudHBsLmlmcmFtZS5yZXBsYWNlKC9cXHtybmRcXH0vZywgbmV3IERhdGUoKS5nZXRUaW1lKCkpKVxyXG5cdFx0XHRcdFx0LmF0dHIoJ3Njcm9sbGluZycsIGlzVG91Y2ggPyAnYXV0bycgOiBjb21pbmcuaWZyYW1lLnNjcm9sbGluZylcclxuXHRcdFx0XHRcdC5hdHRyKCdzcmMnLCBjb21pbmcuaHJlZik7XHJcblxyXG5cdFx0XHQvLyBUaGlzIGhlbHBzIElFXHJcblx0XHRcdCQoY29taW5nLndyYXApLmJpbmQoJ29uUmVzZXQnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdCQodGhpcykuZmluZCgnaWZyYW1lJykuaGlkZSgpLmF0dHIoJ3NyYycsICcvL2Fib3V0OmJsYW5rJykuZW5kKCkuZW1wdHkoKTtcclxuXHRcdFx0XHR9IGNhdGNoIChlKSB7fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGlmIChjb21pbmcuaWZyYW1lLnByZWxvYWQpIHtcclxuXHRcdFx0XHRGLnNob3dMb2FkaW5nKCk7XHJcblxyXG5cdFx0XHRcdGlmcmFtZS5vbmUoJ2xvYWQnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdCQodGhpcykuZGF0YSgncmVhZHknLCAxKTtcclxuXHJcblx0XHRcdFx0XHQvLyBpT1Mgd2lsbCBsb3NlIHNjcm9sbGluZyBpZiB3ZSByZXNpemVcclxuXHRcdFx0XHRcdGlmICghaXNUb3VjaCkge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLmJpbmQoJ2xvYWQuZmInLCBGLnVwZGF0ZSk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gV2l0aG91dCB0aGlzIHRyaWNrOlxyXG5cdFx0XHRcdFx0Ly8gICAtIGlmcmFtZSB3b24ndCBzY3JvbGwgb24gaU9TIGRldmljZXNcclxuXHRcdFx0XHRcdC8vICAgLSBJRTcgc29tZXRpbWVzIGRpc3BsYXlzIGVtcHR5IGlmcmFtZVxyXG5cdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnRzKCcuZmFuY3lib3gtd3JhcCcpLndpZHRoKCcxMDAlJykucmVtb3ZlQ2xhc3MoJ2ZhbmN5Ym94LXRtcCcpLnNob3coKTtcclxuXHJcblx0XHRcdFx0XHRGLl9hZnRlckxvYWQoKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29taW5nLmNvbnRlbnQgPSBpZnJhbWUuYXBwZW5kVG8oIGNvbWluZy5pbm5lciApO1xyXG5cclxuXHRcdFx0aWYgKCFjb21pbmcuaWZyYW1lLnByZWxvYWQpIHtcclxuXHRcdFx0XHRGLl9hZnRlckxvYWQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHJcblx0XHRfcHJlbG9hZEltYWdlczogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBncm91cCAgID0gRi5ncm91cCxcclxuXHRcdFx0XHRjdXJyZW50ID0gRi5jdXJyZW50LFxyXG5cdFx0XHRcdGxlbiAgICAgPSBncm91cC5sZW5ndGgsXHJcblx0XHRcdFx0Y250ICAgICA9IGN1cnJlbnQucHJlbG9hZCA/IE1hdGgubWluKGN1cnJlbnQucHJlbG9hZCwgbGVuIC0gMSkgOiAwLFxyXG5cdFx0XHRcdGl0ZW0sXHJcblx0XHRcdFx0aTtcclxuXHJcblx0XHRcdGZvciAoaSA9IDE7IGkgPD0gY250OyBpICs9IDEpIHtcclxuXHRcdFx0XHRpdGVtID0gZ3JvdXBbIChjdXJyZW50LmluZGV4ICsgaSApICUgbGVuIF07XHJcblxyXG5cdFx0XHRcdGlmIChpdGVtLnR5cGUgPT09ICdpbWFnZScgJiYgaXRlbS5ocmVmKSB7XHJcblx0XHRcdFx0XHRuZXcgSW1hZ2UoKS5zcmMgPSBpdGVtLmhyZWY7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdF9hZnRlckxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGNvbWluZyAgID0gRi5jb21pbmcsXHJcblx0XHRcdFx0cHJldmlvdXMgPSBGLmN1cnJlbnQsXHJcblx0XHRcdFx0cGxhY2Vob2xkZXIgPSAnZmFuY3lib3gtcGxhY2Vob2xkZXInLFxyXG5cdFx0XHRcdGN1cnJlbnQsXHJcblx0XHRcdFx0Y29udGVudCxcclxuXHRcdFx0XHR0eXBlLFxyXG5cdFx0XHRcdHNjcm9sbGluZyxcclxuXHRcdFx0XHRocmVmLFxyXG5cdFx0XHRcdGVtYmVkO1xyXG5cclxuXHRcdFx0Ri5oaWRlTG9hZGluZygpO1xyXG5cclxuXHRcdFx0aWYgKCFjb21pbmcgfHwgRi5pc0FjdGl2ZSA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChmYWxzZSA9PT0gRi50cmlnZ2VyKCdhZnRlckxvYWQnLCBjb21pbmcsIHByZXZpb3VzKSkge1xyXG5cdFx0XHRcdGNvbWluZy53cmFwLnN0b3AodHJ1ZSkudHJpZ2dlcignb25SZXNldCcpLnJlbW92ZSgpO1xyXG5cclxuXHRcdFx0XHRGLmNvbWluZyA9IG51bGw7XHJcblxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHByZXZpb3VzKSB7XHJcblx0XHRcdFx0Ri50cmlnZ2VyKCdiZWZvcmVDaGFuZ2UnLCBwcmV2aW91cyk7XHJcblxyXG5cdFx0XHRcdHByZXZpb3VzLndyYXAuc3RvcCh0cnVlKS5yZW1vdmVDbGFzcygnZmFuY3lib3gtb3BlbmVkJylcclxuXHRcdFx0XHRcdC5maW5kKCcuZmFuY3lib3gtaXRlbSwgLmZhbmN5Ym94LW5hdicpXHJcblx0XHRcdFx0XHQucmVtb3ZlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdEYudW5iaW5kRXZlbnRzKCk7XHJcblxyXG5cdFx0XHRjdXJyZW50ICAgPSBjb21pbmc7XHJcblx0XHRcdGNvbnRlbnQgICA9IGNvbWluZy5jb250ZW50O1xyXG5cdFx0XHR0eXBlICAgICAgPSBjb21pbmcudHlwZTtcclxuXHRcdFx0c2Nyb2xsaW5nID0gY29taW5nLnNjcm9sbGluZztcclxuXHJcblx0XHRcdCQuZXh0ZW5kKEYsIHtcclxuXHRcdFx0XHR3cmFwICA6IGN1cnJlbnQud3JhcCxcclxuXHRcdFx0XHRza2luICA6IGN1cnJlbnQuc2tpbixcclxuXHRcdFx0XHRvdXRlciA6IGN1cnJlbnQub3V0ZXIsXHJcblx0XHRcdFx0aW5uZXIgOiBjdXJyZW50LmlubmVyLFxyXG5cdFx0XHRcdGN1cnJlbnQgIDogY3VycmVudCxcclxuXHRcdFx0XHRwcmV2aW91cyA6IHByZXZpb3VzXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aHJlZiA9IGN1cnJlbnQuaHJlZjtcclxuXHJcblx0XHRcdHN3aXRjaCAodHlwZSkge1xyXG5cdFx0XHRcdGNhc2UgJ2lubGluZSc6XHJcblx0XHRcdFx0Y2FzZSAnYWpheCc6XHJcblx0XHRcdFx0Y2FzZSAnaHRtbCc6XHJcblx0XHRcdFx0XHRpZiAoY3VycmVudC5zZWxlY3Rvcikge1xyXG5cdFx0XHRcdFx0XHRjb250ZW50ID0gJCgnPGRpdj4nKS5odG1sKGNvbnRlbnQpLmZpbmQoY3VycmVudC5zZWxlY3Rvcik7XHJcblxyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChpc1F1ZXJ5KGNvbnRlbnQpKSB7XHJcblx0XHRcdFx0XHRcdGlmICghY29udGVudC5kYXRhKHBsYWNlaG9sZGVyKSkge1xyXG5cdFx0XHRcdFx0XHRcdGNvbnRlbnQuZGF0YShwbGFjZWhvbGRlciwgJCgnPGRpdiBjbGFzcz1cIicgKyBwbGFjZWhvbGRlciArICdcIj48L2Rpdj4nKS5pbnNlcnRBZnRlciggY29udGVudCApLmhpZGUoKSApO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRjb250ZW50ID0gY29udGVudC5zaG93KCkuZGV0YWNoKCk7XHJcblxyXG5cdFx0XHRcdFx0XHRjdXJyZW50LndyYXAuYmluZCgnb25SZXNldCcsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoJCh0aGlzKS5maW5kKGNvbnRlbnQpLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGVudC5oaWRlKCkucmVwbGFjZUFsbCggY29udGVudC5kYXRhKHBsYWNlaG9sZGVyKSApLmRhdGEocGxhY2Vob2xkZXIsIGZhbHNlKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdpbWFnZSc6XHJcblx0XHRcdFx0XHRjb250ZW50ID0gY3VycmVudC50cGwuaW1hZ2UucmVwbGFjZSgvXFx7aHJlZlxcfS9nLCBocmVmKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSAnc3dmJzpcclxuXHRcdFx0XHRcdGNvbnRlbnQgPSAnPG9iamVjdCBpZD1cImZhbmN5Ym94LXN3ZlwiIGNsYXNzaWQ9XCJjbHNpZDpEMjdDREI2RS1BRTZELTExY2YtOTZCOC00NDQ1NTM1NDAwMDBcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+PHBhcmFtIG5hbWU9XCJtb3ZpZVwiIHZhbHVlPVwiJyArIGhyZWYgKyAnXCI+PC9wYXJhbT4nO1xyXG5cdFx0XHRcdFx0ZW1iZWQgICA9ICcnO1xyXG5cclxuXHRcdFx0XHRcdCQuZWFjaChjdXJyZW50LnN3ZiwgZnVuY3Rpb24obmFtZSwgdmFsKSB7XHJcblx0XHRcdFx0XHRcdGNvbnRlbnQgKz0gJzxwYXJhbSBuYW1lPVwiJyArIG5hbWUgKyAnXCIgdmFsdWU9XCInICsgdmFsICsgJ1wiPjwvcGFyYW0+JztcclxuXHRcdFx0XHRcdFx0ZW1iZWQgICArPSAnICcgKyBuYW1lICsgJz1cIicgKyB2YWwgKyAnXCInO1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0Y29udGVudCArPSAnPGVtYmVkIHNyYz1cIicgKyBocmVmICsgJ1wiIHR5cGU9XCJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaFwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIicgKyBlbWJlZCArICc+PC9lbWJlZD48L29iamVjdD4nO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIShpc1F1ZXJ5KGNvbnRlbnQpICYmIGNvbnRlbnQucGFyZW50KCkuaXMoY3VycmVudC5pbm5lcikpKSB7XHJcblx0XHRcdFx0Y3VycmVudC5pbm5lci5hcHBlbmQoIGNvbnRlbnQgKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gR2l2ZSBhIGNoYW5jZSBmb3IgaGVscGVycyBvciBjYWxsYmFja3MgdG8gdXBkYXRlIGVsZW1lbnRzXHJcblx0XHRcdEYudHJpZ2dlcignYmVmb3JlU2hvdycpO1xyXG5cclxuXHRcdFx0Ly8gU2V0IHNjcm9sbGluZyBiZWZvcmUgY2FsY3VsYXRpbmcgZGltZW5zaW9uc1xyXG5cdFx0XHRjdXJyZW50LmlubmVyLmNzcygnb3ZlcmZsb3cnLCBzY3JvbGxpbmcgPT09ICd5ZXMnID8gJ3Njcm9sbCcgOiAoc2Nyb2xsaW5nID09PSAnbm8nID8gJ2hpZGRlbicgOiBzY3JvbGxpbmcpKTtcclxuXHJcblx0XHRcdC8vIFNldCBpbml0aWFsIGRpbWVuc2lvbnMgYW5kIHN0YXJ0IHBvc2l0aW9uXHJcblx0XHRcdEYuX3NldERpbWVuc2lvbigpO1xyXG5cclxuXHRcdFx0Ri5yZXBvc2l0aW9uKCk7XHJcblxyXG5cdFx0XHRGLmlzT3BlbiA9IGZhbHNlO1xyXG5cdFx0XHRGLmNvbWluZyA9IG51bGw7XHJcblxyXG5cdFx0XHRGLmJpbmRFdmVudHMoKTtcclxuXHJcblx0XHRcdGlmICghRi5pc09wZW5lZCkge1xyXG5cdFx0XHRcdCQoJy5mYW5jeWJveC13cmFwJykubm90KCBjdXJyZW50LndyYXAgKS5zdG9wKHRydWUpLnRyaWdnZXIoJ29uUmVzZXQnKS5yZW1vdmUoKTtcclxuXHJcblx0XHRcdH0gZWxzZSBpZiAocHJldmlvdXMucHJldk1ldGhvZCkge1xyXG5cdFx0XHRcdEYudHJhbnNpdGlvbnNbIHByZXZpb3VzLnByZXZNZXRob2QgXSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRGLnRyYW5zaXRpb25zWyBGLmlzT3BlbmVkID8gY3VycmVudC5uZXh0TWV0aG9kIDogY3VycmVudC5vcGVuTWV0aG9kIF0oKTtcclxuXHJcblx0XHRcdEYuX3ByZWxvYWRJbWFnZXMoKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0X3NldERpbWVuc2lvbjogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgdmlld3BvcnQgICA9IEYuZ2V0Vmlld3BvcnQoKSxcclxuXHRcdFx0XHRzdGVwcyAgICAgID0gMCxcclxuXHRcdFx0XHRjYW5TaHJpbmsgID0gZmFsc2UsXHJcblx0XHRcdFx0Y2FuRXhwYW5kICA9IGZhbHNlLFxyXG5cdFx0XHRcdHdyYXAgICAgICAgPSBGLndyYXAsXHJcblx0XHRcdFx0c2tpbiAgICAgICA9IEYuc2tpbixcclxuXHRcdFx0XHRpbm5lciAgICAgID0gRi5pbm5lcixcclxuXHRcdFx0XHRjdXJyZW50ICAgID0gRi5jdXJyZW50LFxyXG5cdFx0XHRcdHdpZHRoICAgICAgPSBjdXJyZW50LndpZHRoLFxyXG5cdFx0XHRcdGhlaWdodCAgICAgPSBjdXJyZW50LmhlaWdodCxcclxuXHRcdFx0XHRtaW5XaWR0aCAgID0gY3VycmVudC5taW5XaWR0aCxcclxuXHRcdFx0XHRtaW5IZWlnaHQgID0gY3VycmVudC5taW5IZWlnaHQsXHJcblx0XHRcdFx0bWF4V2lkdGggICA9IGN1cnJlbnQubWF4V2lkdGgsXHJcblx0XHRcdFx0bWF4SGVpZ2h0ICA9IGN1cnJlbnQubWF4SGVpZ2h0LFxyXG5cdFx0XHRcdHNjcm9sbGluZyAgPSBjdXJyZW50LnNjcm9sbGluZyxcclxuXHRcdFx0XHRzY3JvbGxPdXQgID0gY3VycmVudC5zY3JvbGxPdXRzaWRlID8gY3VycmVudC5zY3JvbGxiYXJXaWR0aCA6IDAsXHJcblx0XHRcdFx0bWFyZ2luICAgICA9IGN1cnJlbnQubWFyZ2luLFxyXG5cdFx0XHRcdHdNYXJnaW4gICAgPSBnZXRTY2FsYXIobWFyZ2luWzFdICsgbWFyZ2luWzNdKSxcclxuXHRcdFx0XHRoTWFyZ2luICAgID0gZ2V0U2NhbGFyKG1hcmdpblswXSArIG1hcmdpblsyXSksXHJcblx0XHRcdFx0d1BhZGRpbmcsXHJcblx0XHRcdFx0aFBhZGRpbmcsXHJcblx0XHRcdFx0d1NwYWNlLFxyXG5cdFx0XHRcdGhTcGFjZSxcclxuXHRcdFx0XHRvcmlnV2lkdGgsXHJcblx0XHRcdFx0b3JpZ0hlaWdodCxcclxuXHRcdFx0XHRvcmlnTWF4V2lkdGgsXHJcblx0XHRcdFx0b3JpZ01heEhlaWdodCxcclxuXHRcdFx0XHRyYXRpbyxcclxuXHRcdFx0XHR3aWR0aF8sXHJcblx0XHRcdFx0aGVpZ2h0XyxcclxuXHRcdFx0XHRtYXhXaWR0aF8sXHJcblx0XHRcdFx0bWF4SGVpZ2h0XyxcclxuXHRcdFx0XHRpZnJhbWUsXHJcblx0XHRcdFx0Ym9keTtcclxuXHJcblx0XHRcdC8vIFJlc2V0IGRpbWVuc2lvbnMgc28gd2UgY291bGQgcmUtY2hlY2sgYWN0dWFsIHNpemVcclxuXHRcdFx0d3JhcC5hZGQoc2tpbikuYWRkKGlubmVyKS53aWR0aCgnYXV0bycpLmhlaWdodCgnYXV0bycpLnJlbW92ZUNsYXNzKCdmYW5jeWJveC10bXAnKTtcclxuXHJcblx0XHRcdHdQYWRkaW5nID0gZ2V0U2NhbGFyKHNraW4ub3V0ZXJXaWR0aCh0cnVlKSAgLSBza2luLndpZHRoKCkpO1xyXG5cdFx0XHRoUGFkZGluZyA9IGdldFNjYWxhcihza2luLm91dGVySGVpZ2h0KHRydWUpIC0gc2tpbi5oZWlnaHQoKSk7XHJcblxyXG5cdFx0XHQvLyBBbnkgc3BhY2UgYmV0d2VlbiBjb250ZW50IGFuZCB2aWV3cG9ydCAobWFyZ2luLCBwYWRkaW5nLCBib3JkZXIsIHRpdGxlKVxyXG5cdFx0XHR3U3BhY2UgPSB3TWFyZ2luICsgd1BhZGRpbmc7XHJcblx0XHRcdGhTcGFjZSA9IGhNYXJnaW4gKyBoUGFkZGluZztcclxuXHJcblx0XHRcdG9yaWdXaWR0aCAgPSBpc1BlcmNlbnRhZ2Uod2lkdGgpICA/ICh2aWV3cG9ydC53IC0gd1NwYWNlKSAqIGdldFNjYWxhcih3aWR0aCkgIC8gMTAwIDogd2lkdGg7XHJcblx0XHRcdG9yaWdIZWlnaHQgPSBpc1BlcmNlbnRhZ2UoaGVpZ2h0KSA/ICh2aWV3cG9ydC5oIC0gaFNwYWNlKSAqIGdldFNjYWxhcihoZWlnaHQpIC8gMTAwIDogaGVpZ2h0O1xyXG5cclxuXHRcdFx0aWYgKGN1cnJlbnQudHlwZSA9PT0gJ2lmcmFtZScpIHtcclxuXHRcdFx0XHRpZnJhbWUgPSBjdXJyZW50LmNvbnRlbnQ7XHJcblxyXG5cdFx0XHRcdGlmIChjdXJyZW50LmF1dG9IZWlnaHQgJiYgaWZyYW1lLmRhdGEoJ3JlYWR5JykgPT09IDEpIHtcclxuXHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdGlmIChpZnJhbWVbMF0uY29udGVudFdpbmRvdy5kb2N1bWVudC5sb2NhdGlvbikge1xyXG5cdFx0XHRcdFx0XHRcdGlubmVyLndpZHRoKCBvcmlnV2lkdGggKS5oZWlnaHQoOTk5OSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGJvZHkgPSBpZnJhbWUuY29udGVudHMoKS5maW5kKCdib2R5Jyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChzY3JvbGxPdXQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGJvZHkuY3NzKCdvdmVyZmxvdy14JywgJ2hpZGRlbicpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0b3JpZ0hlaWdodCA9IGJvZHkub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR9IGNhdGNoIChlKSB7fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0gZWxzZSBpZiAoY3VycmVudC5hdXRvV2lkdGggfHwgY3VycmVudC5hdXRvSGVpZ2h0KSB7XHJcblx0XHRcdFx0aW5uZXIuYWRkQ2xhc3MoICdmYW5jeWJveC10bXAnICk7XHJcblxyXG5cdFx0XHRcdC8vIFNldCB3aWR0aCBvciBoZWlnaHQgaW4gY2FzZSB3ZSBuZWVkIHRvIGNhbGN1bGF0ZSBvbmx5IG9uZSBkaW1lbnNpb25cclxuXHRcdFx0XHRpZiAoIWN1cnJlbnQuYXV0b1dpZHRoKSB7XHJcblx0XHRcdFx0XHRpbm5lci53aWR0aCggb3JpZ1dpZHRoICk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoIWN1cnJlbnQuYXV0b0hlaWdodCkge1xyXG5cdFx0XHRcdFx0aW5uZXIuaGVpZ2h0KCBvcmlnSGVpZ2h0ICk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoY3VycmVudC5hdXRvV2lkdGgpIHtcclxuXHRcdFx0XHRcdG9yaWdXaWR0aCA9IGlubmVyLndpZHRoKCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoY3VycmVudC5hdXRvSGVpZ2h0KSB7XHJcblx0XHRcdFx0XHRvcmlnSGVpZ2h0ID0gaW5uZXIuaGVpZ2h0KCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpbm5lci5yZW1vdmVDbGFzcyggJ2ZhbmN5Ym94LXRtcCcgKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0d2lkdGggID0gZ2V0U2NhbGFyKCBvcmlnV2lkdGggKTtcclxuXHRcdFx0aGVpZ2h0ID0gZ2V0U2NhbGFyKCBvcmlnSGVpZ2h0ICk7XHJcblxyXG5cdFx0XHRyYXRpbyAgPSBvcmlnV2lkdGggLyBvcmlnSGVpZ2h0O1xyXG5cclxuXHRcdFx0Ly8gQ2FsY3VsYXRpb25zIGZvciB0aGUgY29udGVudFxyXG5cdFx0XHRtaW5XaWR0aCAgPSBnZXRTY2FsYXIoaXNQZXJjZW50YWdlKG1pbldpZHRoKSA/IGdldFNjYWxhcihtaW5XaWR0aCwgJ3cnKSAtIHdTcGFjZSA6IG1pbldpZHRoKTtcclxuXHRcdFx0bWF4V2lkdGggID0gZ2V0U2NhbGFyKGlzUGVyY2VudGFnZShtYXhXaWR0aCkgPyBnZXRTY2FsYXIobWF4V2lkdGgsICd3JykgLSB3U3BhY2UgOiBtYXhXaWR0aCk7XHJcblxyXG5cdFx0XHRtaW5IZWlnaHQgPSBnZXRTY2FsYXIoaXNQZXJjZW50YWdlKG1pbkhlaWdodCkgPyBnZXRTY2FsYXIobWluSGVpZ2h0LCAnaCcpIC0gaFNwYWNlIDogbWluSGVpZ2h0KTtcclxuXHRcdFx0bWF4SGVpZ2h0ID0gZ2V0U2NhbGFyKGlzUGVyY2VudGFnZShtYXhIZWlnaHQpID8gZ2V0U2NhbGFyKG1heEhlaWdodCwgJ2gnKSAtIGhTcGFjZSA6IG1heEhlaWdodCk7XHJcblxyXG5cdFx0XHQvLyBUaGVzZSB3aWxsIGJlIHVzZWQgdG8gZGV0ZXJtaW5lIGlmIHdyYXAgY2FuIGZpdCBpbiB0aGUgdmlld3BvcnRcclxuXHRcdFx0b3JpZ01heFdpZHRoICA9IG1heFdpZHRoO1xyXG5cdFx0XHRvcmlnTWF4SGVpZ2h0ID0gbWF4SGVpZ2h0O1xyXG5cclxuXHRcdFx0aWYgKGN1cnJlbnQuZml0VG9WaWV3KSB7XHJcblx0XHRcdFx0bWF4V2lkdGggID0gTWF0aC5taW4odmlld3BvcnQudyAtIHdTcGFjZSwgbWF4V2lkdGgpO1xyXG5cdFx0XHRcdG1heEhlaWdodCA9IE1hdGgubWluKHZpZXdwb3J0LmggLSBoU3BhY2UsIG1heEhlaWdodCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG1heFdpZHRoXyAgPSB2aWV3cG9ydC53IC0gd01hcmdpbjtcclxuXHRcdFx0bWF4SGVpZ2h0XyA9IHZpZXdwb3J0LmggLSBoTWFyZ2luO1xyXG5cclxuXHRcdFx0aWYgKGN1cnJlbnQuYXNwZWN0UmF0aW8pIHtcclxuXHRcdFx0XHRpZiAod2lkdGggPiBtYXhXaWR0aCkge1xyXG5cdFx0XHRcdFx0d2lkdGggID0gbWF4V2lkdGg7XHJcblx0XHRcdFx0XHRoZWlnaHQgPSBnZXRTY2FsYXIod2lkdGggLyByYXRpbyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoaGVpZ2h0ID4gbWF4SGVpZ2h0KSB7XHJcblx0XHRcdFx0XHRoZWlnaHQgPSBtYXhIZWlnaHQ7XHJcblx0XHRcdFx0XHR3aWR0aCAgPSBnZXRTY2FsYXIoaGVpZ2h0ICogcmF0aW8pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHdpZHRoIDwgbWluV2lkdGgpIHtcclxuXHRcdFx0XHRcdHdpZHRoICA9IG1pbldpZHRoO1xyXG5cdFx0XHRcdFx0aGVpZ2h0ID0gZ2V0U2NhbGFyKHdpZHRoIC8gcmF0aW8pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGhlaWdodCA8IG1pbkhlaWdodCkge1xyXG5cdFx0XHRcdFx0aGVpZ2h0ID0gbWluSGVpZ2h0O1xyXG5cdFx0XHRcdFx0d2lkdGggID0gZ2V0U2NhbGFyKGhlaWdodCAqIHJhdGlvKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHdpZHRoID0gTWF0aC5tYXgobWluV2lkdGgsIE1hdGgubWluKHdpZHRoLCBtYXhXaWR0aCkpO1xyXG5cclxuXHRcdFx0XHRpZiAoY3VycmVudC5hdXRvSGVpZ2h0ICYmIGN1cnJlbnQudHlwZSAhPT0gJ2lmcmFtZScpIHtcclxuXHRcdFx0XHRcdGlubmVyLndpZHRoKCB3aWR0aCApO1xyXG5cclxuXHRcdFx0XHRcdGhlaWdodCA9IGlubmVyLmhlaWdodCgpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aGVpZ2h0ID0gTWF0aC5tYXgobWluSGVpZ2h0LCBNYXRoLm1pbihoZWlnaHQsIG1heEhlaWdodCkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBUcnkgdG8gZml0IGluc2lkZSB2aWV3cG9ydCAoaW5jbHVkaW5nIHRoZSB0aXRsZSlcclxuXHRcdFx0aWYgKGN1cnJlbnQuZml0VG9WaWV3KSB7XHJcblx0XHRcdFx0aW5uZXIud2lkdGgoIHdpZHRoICkuaGVpZ2h0KCBoZWlnaHQgKTtcclxuXHJcblx0XHRcdFx0d3JhcC53aWR0aCggd2lkdGggKyB3UGFkZGluZyApO1xyXG5cclxuXHRcdFx0XHQvLyBSZWFsIHdyYXAgZGltZW5zaW9uc1xyXG5cdFx0XHRcdHdpZHRoXyAgPSB3cmFwLndpZHRoKCk7XHJcblx0XHRcdFx0aGVpZ2h0XyA9IHdyYXAuaGVpZ2h0KCk7XHJcblxyXG5cdFx0XHRcdGlmIChjdXJyZW50LmFzcGVjdFJhdGlvKSB7XHJcblx0XHRcdFx0XHR3aGlsZSAoKHdpZHRoXyA+IG1heFdpZHRoXyB8fCBoZWlnaHRfID4gbWF4SGVpZ2h0XykgJiYgd2lkdGggPiBtaW5XaWR0aCAmJiBoZWlnaHQgPiBtaW5IZWlnaHQpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHN0ZXBzKysgPiAxOSkge1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRoZWlnaHQgPSBNYXRoLm1heChtaW5IZWlnaHQsIE1hdGgubWluKG1heEhlaWdodCwgaGVpZ2h0IC0gMTApKTtcclxuXHRcdFx0XHRcdFx0d2lkdGggID0gZ2V0U2NhbGFyKGhlaWdodCAqIHJhdGlvKTtcclxuXHJcblx0XHRcdFx0XHRcdGlmICh3aWR0aCA8IG1pbldpZHRoKSB7XHJcblx0XHRcdFx0XHRcdFx0d2lkdGggID0gbWluV2lkdGg7XHJcblx0XHRcdFx0XHRcdFx0aGVpZ2h0ID0gZ2V0U2NhbGFyKHdpZHRoIC8gcmF0aW8pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAod2lkdGggPiBtYXhXaWR0aCkge1xyXG5cdFx0XHRcdFx0XHRcdHdpZHRoICA9IG1heFdpZHRoO1xyXG5cdFx0XHRcdFx0XHRcdGhlaWdodCA9IGdldFNjYWxhcih3aWR0aCAvIHJhdGlvKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0aW5uZXIud2lkdGgoIHdpZHRoICkuaGVpZ2h0KCBoZWlnaHQgKTtcclxuXHJcblx0XHRcdFx0XHRcdHdyYXAud2lkdGgoIHdpZHRoICsgd1BhZGRpbmcgKTtcclxuXHJcblx0XHRcdFx0XHRcdHdpZHRoXyAgPSB3cmFwLndpZHRoKCk7XHJcblx0XHRcdFx0XHRcdGhlaWdodF8gPSB3cmFwLmhlaWdodCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0d2lkdGggID0gTWF0aC5tYXgobWluV2lkdGgsICBNYXRoLm1pbih3aWR0aCwgIHdpZHRoICAtICh3aWR0aF8gIC0gbWF4V2lkdGhfKSkpO1xyXG5cdFx0XHRcdFx0aGVpZ2h0ID0gTWF0aC5tYXgobWluSGVpZ2h0LCBNYXRoLm1pbihoZWlnaHQsIGhlaWdodCAtIChoZWlnaHRfIC0gbWF4SGVpZ2h0XykpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChzY3JvbGxPdXQgJiYgc2Nyb2xsaW5nID09PSAnYXV0bycgJiYgaGVpZ2h0IDwgb3JpZ0hlaWdodCAmJiAod2lkdGggKyB3UGFkZGluZyArIHNjcm9sbE91dCkgPCBtYXhXaWR0aF8pIHtcclxuXHRcdFx0XHR3aWR0aCArPSBzY3JvbGxPdXQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlubmVyLndpZHRoKCB3aWR0aCApLmhlaWdodCggaGVpZ2h0ICk7XHJcblxyXG5cdFx0XHR3cmFwLndpZHRoKCB3aWR0aCArIHdQYWRkaW5nICk7XHJcblxyXG5cdFx0XHR3aWR0aF8gID0gd3JhcC53aWR0aCgpO1xyXG5cdFx0XHRoZWlnaHRfID0gd3JhcC5oZWlnaHQoKTtcclxuXHJcblx0XHRcdGNhblNocmluayA9ICh3aWR0aF8gPiBtYXhXaWR0aF8gfHwgaGVpZ2h0XyA+IG1heEhlaWdodF8pICYmIHdpZHRoID4gbWluV2lkdGggJiYgaGVpZ2h0ID4gbWluSGVpZ2h0O1xyXG5cdFx0XHRjYW5FeHBhbmQgPSBjdXJyZW50LmFzcGVjdFJhdGlvID8gKHdpZHRoIDwgb3JpZ01heFdpZHRoICYmIGhlaWdodCA8IG9yaWdNYXhIZWlnaHQgJiYgd2lkdGggPCBvcmlnV2lkdGggJiYgaGVpZ2h0IDwgb3JpZ0hlaWdodCkgOiAoKHdpZHRoIDwgb3JpZ01heFdpZHRoIHx8IGhlaWdodCA8IG9yaWdNYXhIZWlnaHQpICYmICh3aWR0aCA8IG9yaWdXaWR0aCB8fCBoZWlnaHQgPCBvcmlnSGVpZ2h0KSk7XHJcblxyXG5cdFx0XHQkLmV4dGVuZChjdXJyZW50LCB7XHJcblx0XHRcdFx0ZGltIDoge1xyXG5cdFx0XHRcdFx0d2lkdGhcdDogZ2V0VmFsdWUoIHdpZHRoXyApLFxyXG5cdFx0XHRcdFx0aGVpZ2h0XHQ6IGdldFZhbHVlKCBoZWlnaHRfIClcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdG9yaWdXaWR0aCAgOiBvcmlnV2lkdGgsXHJcblx0XHRcdFx0b3JpZ0hlaWdodCA6IG9yaWdIZWlnaHQsXHJcblx0XHRcdFx0Y2FuU2hyaW5rICA6IGNhblNocmluayxcclxuXHRcdFx0XHRjYW5FeHBhbmQgIDogY2FuRXhwYW5kLFxyXG5cdFx0XHRcdHdQYWRkaW5nICAgOiB3UGFkZGluZyxcclxuXHRcdFx0XHRoUGFkZGluZyAgIDogaFBhZGRpbmcsXHJcblx0XHRcdFx0d3JhcFNwYWNlICA6IGhlaWdodF8gLSBza2luLm91dGVySGVpZ2h0KHRydWUpLFxyXG5cdFx0XHRcdHNraW5TcGFjZSAgOiBza2luLmhlaWdodCgpIC0gaGVpZ2h0XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aWYgKCFpZnJhbWUgJiYgY3VycmVudC5hdXRvSGVpZ2h0ICYmIGhlaWdodCA+IG1pbkhlaWdodCAmJiBoZWlnaHQgPCBtYXhIZWlnaHQgJiYgIWNhbkV4cGFuZCkge1xyXG5cdFx0XHRcdGlubmVyLmhlaWdodCgnYXV0bycpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdF9nZXRQb3NpdGlvbjogZnVuY3Rpb24gKG9ubHlBYnNvbHV0ZSkge1xyXG5cdFx0XHR2YXIgY3VycmVudCAgPSBGLmN1cnJlbnQsXHJcblx0XHRcdFx0dmlld3BvcnQgPSBGLmdldFZpZXdwb3J0KCksXHJcblx0XHRcdFx0bWFyZ2luICAgPSBjdXJyZW50Lm1hcmdpbixcclxuXHRcdFx0XHR3aWR0aCAgICA9IEYud3JhcC53aWR0aCgpICArIG1hcmdpblsxXSArIG1hcmdpblszXSxcclxuXHRcdFx0XHRoZWlnaHQgICA9IEYud3JhcC5oZWlnaHQoKSArIG1hcmdpblswXSArIG1hcmdpblsyXSxcclxuXHRcdFx0XHRyZXogICAgICA9IHtcclxuXHRcdFx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG5cdFx0XHRcdFx0dG9wICA6IG1hcmdpblswXSxcclxuXHRcdFx0XHRcdGxlZnQgOiBtYXJnaW5bM11cclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYgKGN1cnJlbnQuYXV0b0NlbnRlciAmJiBjdXJyZW50LmZpeGVkICYmICFvbmx5QWJzb2x1dGUgJiYgaGVpZ2h0IDw9IHZpZXdwb3J0LmggJiYgd2lkdGggPD0gdmlld3BvcnQudykge1xyXG5cdFx0XHRcdHJlei5wb3NpdGlvbiA9ICdmaXhlZCc7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKCFjdXJyZW50LmxvY2tlZCkge1xyXG5cdFx0XHRcdHJlei50b3AgICs9IHZpZXdwb3J0Lnk7XHJcblx0XHRcdFx0cmV6LmxlZnQgKz0gdmlld3BvcnQueDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV6LnRvcCAgPSBnZXRWYWx1ZShNYXRoLm1heChyZXoudG9wLCAgcmV6LnRvcCAgKyAoKHZpZXdwb3J0LmggLSBoZWlnaHQpICogY3VycmVudC50b3BSYXRpbykpKTtcclxuXHRcdFx0cmV6LmxlZnQgPSBnZXRWYWx1ZShNYXRoLm1heChyZXoubGVmdCwgcmV6LmxlZnQgKyAoKHZpZXdwb3J0LncgLSB3aWR0aCkgICogY3VycmVudC5sZWZ0UmF0aW8pKSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gcmV6O1xyXG5cdFx0fSxcclxuXHJcblx0XHRfYWZ0ZXJab29tSW46IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGN1cnJlbnQgPSBGLmN1cnJlbnQ7XHJcblxyXG5cdFx0XHRpZiAoIWN1cnJlbnQpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdEYuaXNPcGVuID0gRi5pc09wZW5lZCA9IHRydWU7XHJcblxyXG5cdFx0XHRGLndyYXAuY3NzKCdvdmVyZmxvdycsICd2aXNpYmxlJykuYWRkQ2xhc3MoJ2ZhbmN5Ym94LW9wZW5lZCcpLmhpZGUoKS5zaG93KDApO1xyXG5cclxuXHRcdFx0Ri51cGRhdGUoKTtcclxuXHJcblx0XHRcdC8vIEFzc2lnbiBhIGNsaWNrIGV2ZW50XHJcblx0XHRcdGlmICggY3VycmVudC5jbG9zZUNsaWNrIHx8IChjdXJyZW50Lm5leHRDbGljayAmJiBGLmdyb3VwLmxlbmd0aCA+IDEpICkge1xyXG5cdFx0XHRcdEYuaW5uZXIuY3NzKCdjdXJzb3InLCAncG9pbnRlcicpLmJpbmQoJ2NsaWNrLmZiJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdFx0aWYgKCEkKGUudGFyZ2V0KS5pcygnYScpICYmICEkKGUudGFyZ2V0KS5wYXJlbnQoKS5pcygnYScpKSB7XHJcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0XHRcdEZbIGN1cnJlbnQuY2xvc2VDbGljayA/ICdjbG9zZScgOiAnbmV4dCcgXSgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBDcmVhdGUgYSBjbG9zZSBidXR0b25cclxuXHRcdFx0aWYgKGN1cnJlbnQuY2xvc2VCdG4pIHtcclxuXHRcdFx0XHQkKGN1cnJlbnQudHBsLmNsb3NlQnRuKS5hcHBlbmRUbyhGLnNraW4pLmJpbmQoJ2NsaWNrLmZiJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0XHRcdEYuY2xvc2UoKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQ3JlYXRlIG5hdmlnYXRpb24gYXJyb3dzXHJcblx0XHRcdGlmIChjdXJyZW50LmFycm93cyAmJiBGLmdyb3VwLmxlbmd0aCA+IDEpIHtcclxuXHRcdFx0XHRpZiAoY3VycmVudC5sb29wIHx8IGN1cnJlbnQuaW5kZXggPiAwKSB7XHJcblx0XHRcdFx0XHQkKGN1cnJlbnQudHBsLnByZXYpLmFwcGVuZFRvKEYub3V0ZXIpLmJpbmQoJ2NsaWNrLmZiJywgRi5wcmV2KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChjdXJyZW50Lmxvb3AgfHwgY3VycmVudC5pbmRleCA8IEYuZ3JvdXAubGVuZ3RoIC0gMSkge1xyXG5cdFx0XHRcdFx0JChjdXJyZW50LnRwbC5uZXh0KS5hcHBlbmRUbyhGLm91dGVyKS5iaW5kKCdjbGljay5mYicsIEYubmV4dCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRGLnRyaWdnZXIoJ2FmdGVyU2hvdycpO1xyXG5cclxuXHRcdFx0Ly8gU3RvcCB0aGUgc2xpZGVzaG93IGlmIHRoaXMgaXMgdGhlIGxhc3QgaXRlbVxyXG5cdFx0XHRpZiAoIWN1cnJlbnQubG9vcCAmJiBjdXJyZW50LmluZGV4ID09PSBjdXJyZW50Lmdyb3VwLmxlbmd0aCAtIDEpIHtcclxuXHJcblx0XHRcdFx0Ri5wbGF5KCBmYWxzZSApO1xyXG5cclxuXHRcdFx0fSBlbHNlIGlmIChGLm9wdHMuYXV0b1BsYXkgJiYgIUYucGxheWVyLmlzQWN0aXZlKSB7XHJcblx0XHRcdFx0Ri5vcHRzLmF1dG9QbGF5ID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdEYucGxheSh0cnVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHJcblx0XHRfYWZ0ZXJab29tT3V0OiBmdW5jdGlvbiAoIG9iaiApIHtcclxuXHRcdFx0b2JqID0gb2JqIHx8IEYuY3VycmVudDtcclxuXHJcblx0XHRcdCQoJy5mYW5jeWJveC13cmFwJykudHJpZ2dlcignb25SZXNldCcpLnJlbW92ZSgpO1xyXG5cclxuXHRcdFx0JC5leHRlbmQoRiwge1xyXG5cdFx0XHRcdGdyb3VwICA6IHt9LFxyXG5cdFx0XHRcdG9wdHMgICA6IHt9LFxyXG5cdFx0XHRcdHJvdXRlciA6IGZhbHNlLFxyXG5cdFx0XHRcdGN1cnJlbnQgICA6IG51bGwsXHJcblx0XHRcdFx0aXNBY3RpdmUgIDogZmFsc2UsXHJcblx0XHRcdFx0aXNPcGVuZWQgIDogZmFsc2UsXHJcblx0XHRcdFx0aXNPcGVuICAgIDogZmFsc2UsXHJcblx0XHRcdFx0aXNDbG9zaW5nIDogZmFsc2UsXHJcblx0XHRcdFx0d3JhcCAgIDogbnVsbCxcclxuXHRcdFx0XHRza2luICAgOiBudWxsLFxyXG5cdFx0XHRcdG91dGVyICA6IG51bGwsXHJcblx0XHRcdFx0aW5uZXIgIDogbnVsbFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdEYudHJpZ2dlcignYWZ0ZXJDbG9zZScsIG9iaik7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qXHJcblx0ICpcdERlZmF1bHQgdHJhbnNpdGlvbnNcclxuXHQgKi9cclxuXHJcblx0Ri50cmFuc2l0aW9ucyA9IHtcclxuXHRcdGdldE9yaWdQb3NpdGlvbjogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgY3VycmVudCAgPSBGLmN1cnJlbnQsXHJcblx0XHRcdFx0ZWxlbWVudCAgPSBjdXJyZW50LmVsZW1lbnQsXHJcblx0XHRcdFx0b3JpZyAgICAgPSBjdXJyZW50Lm9yaWcsXHJcblx0XHRcdFx0cG9zICAgICAgPSB7fSxcclxuXHRcdFx0XHR3aWR0aCAgICA9IDUwLFxyXG5cdFx0XHRcdGhlaWdodCAgID0gNTAsXHJcblx0XHRcdFx0aFBhZGRpbmcgPSBjdXJyZW50LmhQYWRkaW5nLFxyXG5cdFx0XHRcdHdQYWRkaW5nID0gY3VycmVudC53UGFkZGluZyxcclxuXHRcdFx0XHR2aWV3cG9ydCA9IEYuZ2V0Vmlld3BvcnQoKTtcclxuXHJcblx0XHRcdGlmICghb3JpZyAmJiBjdXJyZW50LmlzRG9tICYmIGVsZW1lbnQuaXMoJzp2aXNpYmxlJykpIHtcclxuXHRcdFx0XHRvcmlnID0gZWxlbWVudC5maW5kKCdpbWc6Zmlyc3QnKTtcclxuXHJcblx0XHRcdFx0aWYgKCFvcmlnLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0b3JpZyA9IGVsZW1lbnQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoaXNRdWVyeShvcmlnKSkge1xyXG5cdFx0XHRcdHBvcyA9IG9yaWcub2Zmc2V0KCk7XHJcblxyXG5cdFx0XHRcdGlmIChvcmlnLmlzKCdpbWcnKSkge1xyXG5cdFx0XHRcdFx0d2lkdGggID0gb3JpZy5vdXRlcldpZHRoKCk7XHJcblx0XHRcdFx0XHRoZWlnaHQgPSBvcmlnLm91dGVySGVpZ2h0KCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRwb3MudG9wICA9IHZpZXdwb3J0LnkgKyAodmlld3BvcnQuaCAtIGhlaWdodCkgKiBjdXJyZW50LnRvcFJhdGlvO1xyXG5cdFx0XHRcdHBvcy5sZWZ0ID0gdmlld3BvcnQueCArICh2aWV3cG9ydC53IC0gd2lkdGgpICAqIGN1cnJlbnQubGVmdFJhdGlvO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoRi53cmFwLmNzcygncG9zaXRpb24nKSA9PT0gJ2ZpeGVkJyB8fCBjdXJyZW50LmxvY2tlZCkge1xyXG5cdFx0XHRcdHBvcy50b3AgIC09IHZpZXdwb3J0Lnk7XHJcblx0XHRcdFx0cG9zLmxlZnQgLT0gdmlld3BvcnQueDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cG9zID0ge1xyXG5cdFx0XHRcdHRvcCAgICAgOiBnZXRWYWx1ZShwb3MudG9wICAtIGhQYWRkaW5nICogY3VycmVudC50b3BSYXRpbyksXHJcblx0XHRcdFx0bGVmdCAgICA6IGdldFZhbHVlKHBvcy5sZWZ0IC0gd1BhZGRpbmcgKiBjdXJyZW50LmxlZnRSYXRpbyksXHJcblx0XHRcdFx0d2lkdGggICA6IGdldFZhbHVlKHdpZHRoICArIHdQYWRkaW5nKSxcclxuXHRcdFx0XHRoZWlnaHQgIDogZ2V0VmFsdWUoaGVpZ2h0ICsgaFBhZGRpbmcpXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRyZXR1cm4gcG9zO1xyXG5cdFx0fSxcclxuXHJcblx0XHRzdGVwOiBmdW5jdGlvbiAobm93LCBmeCkge1xyXG5cdFx0XHR2YXIgcmF0aW8sXHJcblx0XHRcdFx0cGFkZGluZyxcclxuXHRcdFx0XHR2YWx1ZSxcclxuXHRcdFx0XHRwcm9wICAgICAgID0gZngucHJvcCxcclxuXHRcdFx0XHRjdXJyZW50ICAgID0gRi5jdXJyZW50LFxyXG5cdFx0XHRcdHdyYXBTcGFjZSAgPSBjdXJyZW50LndyYXBTcGFjZSxcclxuXHRcdFx0XHRza2luU3BhY2UgID0gY3VycmVudC5za2luU3BhY2U7XHJcblxyXG5cdFx0XHRpZiAocHJvcCA9PT0gJ3dpZHRoJyB8fCBwcm9wID09PSAnaGVpZ2h0Jykge1xyXG5cdFx0XHRcdHJhdGlvID0gZnguZW5kID09PSBmeC5zdGFydCA/IDEgOiAobm93IC0gZnguc3RhcnQpIC8gKGZ4LmVuZCAtIGZ4LnN0YXJ0KTtcclxuXHJcblx0XHRcdFx0aWYgKEYuaXNDbG9zaW5nKSB7XHJcblx0XHRcdFx0XHRyYXRpbyA9IDEgLSByYXRpbztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHBhZGRpbmcgPSBwcm9wID09PSAnd2lkdGgnID8gY3VycmVudC53UGFkZGluZyA6IGN1cnJlbnQuaFBhZGRpbmc7XHJcblx0XHRcdFx0dmFsdWUgICA9IG5vdyAtIHBhZGRpbmc7XHJcblxyXG5cdFx0XHRcdEYuc2tpblsgcHJvcCBdKCAgZ2V0U2NhbGFyKCBwcm9wID09PSAnd2lkdGgnID8gIHZhbHVlIDogdmFsdWUgLSAod3JhcFNwYWNlICogcmF0aW8pICkgKTtcclxuXHRcdFx0XHRGLmlubmVyWyBwcm9wIF0oIGdldFNjYWxhciggcHJvcCA9PT0gJ3dpZHRoJyA/ICB2YWx1ZSA6IHZhbHVlIC0gKHdyYXBTcGFjZSAqIHJhdGlvKSAtIChza2luU3BhY2UgKiByYXRpbykgKSApO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdHpvb21JbjogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgY3VycmVudCAgPSBGLmN1cnJlbnQsXHJcblx0XHRcdFx0c3RhcnRQb3MgPSBjdXJyZW50LnBvcyxcclxuXHRcdFx0XHRlZmZlY3QgICA9IGN1cnJlbnQub3BlbkVmZmVjdCxcclxuXHRcdFx0XHRlbGFzdGljICA9IGVmZmVjdCA9PT0gJ2VsYXN0aWMnLFxyXG5cdFx0XHRcdGVuZFBvcyAgID0gJC5leHRlbmQoe29wYWNpdHkgOiAxfSwgc3RhcnRQb3MpO1xyXG5cclxuXHRcdFx0Ly8gUmVtb3ZlIFwicG9zaXRpb25cIiBwcm9wZXJ0eSB0aGF0IGJyZWFrcyBvbGRlciBJRVxyXG5cdFx0XHRkZWxldGUgZW5kUG9zLnBvc2l0aW9uO1xyXG5cclxuXHRcdFx0aWYgKGVsYXN0aWMpIHtcclxuXHRcdFx0XHRzdGFydFBvcyA9IHRoaXMuZ2V0T3JpZ1Bvc2l0aW9uKCk7XHJcblxyXG5cdFx0XHRcdGlmIChjdXJyZW50Lm9wZW5PcGFjaXR5KSB7XHJcblx0XHRcdFx0XHRzdGFydFBvcy5vcGFjaXR5ID0gMC4xO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0gZWxzZSBpZiAoZWZmZWN0ID09PSAnZmFkZScpIHtcclxuXHRcdFx0XHRzdGFydFBvcy5vcGFjaXR5ID0gMC4xO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRGLndyYXAuY3NzKHN0YXJ0UG9zKS5hbmltYXRlKGVuZFBvcywge1xyXG5cdFx0XHRcdGR1cmF0aW9uIDogZWZmZWN0ID09PSAnbm9uZScgPyAwIDogY3VycmVudC5vcGVuU3BlZWQsXHJcblx0XHRcdFx0ZWFzaW5nICAgOiBjdXJyZW50Lm9wZW5FYXNpbmcsXHJcblx0XHRcdFx0c3RlcCAgICAgOiBlbGFzdGljID8gdGhpcy5zdGVwIDogbnVsbCxcclxuXHRcdFx0XHRjb21wbGV0ZSA6IEYuX2FmdGVyWm9vbUluXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHR6b29tT3V0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBjdXJyZW50ICA9IEYuY3VycmVudCxcclxuXHRcdFx0XHRlZmZlY3QgICA9IGN1cnJlbnQuY2xvc2VFZmZlY3QsXHJcblx0XHRcdFx0ZWxhc3RpYyAgPSBlZmZlY3QgPT09ICdlbGFzdGljJyxcclxuXHRcdFx0XHRlbmRQb3MgICA9IHtvcGFjaXR5IDogMC4xfTtcclxuXHJcblx0XHRcdGlmIChlbGFzdGljKSB7XHJcblx0XHRcdFx0ZW5kUG9zID0gdGhpcy5nZXRPcmlnUG9zaXRpb24oKTtcclxuXHJcblx0XHRcdFx0aWYgKGN1cnJlbnQuY2xvc2VPcGFjaXR5KSB7XHJcblx0XHRcdFx0XHRlbmRQb3Mub3BhY2l0eSA9IDAuMTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdEYud3JhcC5hbmltYXRlKGVuZFBvcywge1xyXG5cdFx0XHRcdGR1cmF0aW9uIDogZWZmZWN0ID09PSAnbm9uZScgPyAwIDogY3VycmVudC5jbG9zZVNwZWVkLFxyXG5cdFx0XHRcdGVhc2luZyAgIDogY3VycmVudC5jbG9zZUVhc2luZyxcclxuXHRcdFx0XHRzdGVwICAgICA6IGVsYXN0aWMgPyB0aGlzLnN0ZXAgOiBudWxsLFxyXG5cdFx0XHRcdGNvbXBsZXRlIDogRi5fYWZ0ZXJab29tT3V0XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHJcblx0XHRjaGFuZ2VJbjogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgY3VycmVudCAgID0gRi5jdXJyZW50LFxyXG5cdFx0XHRcdGVmZmVjdCAgICA9IGN1cnJlbnQubmV4dEVmZmVjdCxcclxuXHRcdFx0XHRzdGFydFBvcyAgPSBjdXJyZW50LnBvcyxcclxuXHRcdFx0XHRlbmRQb3MgICAgPSB7IG9wYWNpdHkgOiAxIH0sXHJcblx0XHRcdFx0ZGlyZWN0aW9uID0gRi5kaXJlY3Rpb24sXHJcblx0XHRcdFx0ZGlzdGFuY2UgID0gMjAwLFxyXG5cdFx0XHRcdGZpZWxkO1xyXG5cclxuXHRcdFx0c3RhcnRQb3Mub3BhY2l0eSA9IDAuMTtcclxuXHJcblx0XHRcdGlmIChlZmZlY3QgPT09ICdlbGFzdGljJykge1xyXG5cdFx0XHRcdGZpZWxkID0gZGlyZWN0aW9uID09PSAnZG93bicgfHwgZGlyZWN0aW9uID09PSAndXAnID8gJ3RvcCcgOiAnbGVmdCc7XHJcblxyXG5cdFx0XHRcdGlmIChkaXJlY3Rpb24gPT09ICdkb3duJyB8fCBkaXJlY3Rpb24gPT09ICdyaWdodCcpIHtcclxuXHRcdFx0XHRcdHN0YXJ0UG9zWyBmaWVsZCBdID0gZ2V0VmFsdWUoZ2V0U2NhbGFyKHN0YXJ0UG9zWyBmaWVsZCBdKSAtIGRpc3RhbmNlKTtcclxuXHRcdFx0XHRcdGVuZFBvc1sgZmllbGQgXSAgID0gJys9JyArIGRpc3RhbmNlICsgJ3B4JztcclxuXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHN0YXJ0UG9zWyBmaWVsZCBdID0gZ2V0VmFsdWUoZ2V0U2NhbGFyKHN0YXJ0UG9zWyBmaWVsZCBdKSArIGRpc3RhbmNlKTtcclxuXHRcdFx0XHRcdGVuZFBvc1sgZmllbGQgXSAgID0gJy09JyArIGRpc3RhbmNlICsgJ3B4JztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFdvcmthcm91bmQgZm9yIGh0dHA6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzEyMjczXHJcblx0XHRcdGlmIChlZmZlY3QgPT09ICdub25lJykge1xyXG5cdFx0XHRcdEYuX2FmdGVyWm9vbUluKCk7XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdEYud3JhcC5jc3Moc3RhcnRQb3MpLmFuaW1hdGUoZW5kUG9zLCB7XHJcblx0XHRcdFx0XHRkdXJhdGlvbiA6IGN1cnJlbnQubmV4dFNwZWVkLFxyXG5cdFx0XHRcdFx0ZWFzaW5nICAgOiBjdXJyZW50Lm5leHRFYXNpbmcsXHJcblx0XHRcdFx0XHRjb21wbGV0ZSA6IEYuX2FmdGVyWm9vbUluXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0Y2hhbmdlT3V0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBwcmV2aW91cyAgPSBGLnByZXZpb3VzLFxyXG5cdFx0XHRcdGVmZmVjdCAgICA9IHByZXZpb3VzLnByZXZFZmZlY3QsXHJcblx0XHRcdFx0ZW5kUG9zICAgID0geyBvcGFjaXR5IDogMC4xIH0sXHJcblx0XHRcdFx0ZGlyZWN0aW9uID0gRi5kaXJlY3Rpb24sXHJcblx0XHRcdFx0ZGlzdGFuY2UgID0gMjAwO1xyXG5cclxuXHRcdFx0aWYgKGVmZmVjdCA9PT0gJ2VsYXN0aWMnKSB7XHJcblx0XHRcdFx0ZW5kUG9zWyBkaXJlY3Rpb24gPT09ICdkb3duJyB8fCBkaXJlY3Rpb24gPT09ICd1cCcgPyAndG9wJyA6ICdsZWZ0JyBdID0gKCBkaXJlY3Rpb24gPT09ICd1cCcgfHwgZGlyZWN0aW9uID09PSAnbGVmdCcgPyAnLScgOiAnKycgKSArICc9JyArIGRpc3RhbmNlICsgJ3B4JztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cHJldmlvdXMud3JhcC5hbmltYXRlKGVuZFBvcywge1xyXG5cdFx0XHRcdGR1cmF0aW9uIDogZWZmZWN0ID09PSAnbm9uZScgPyAwIDogcHJldmlvdXMucHJldlNwZWVkLFxyXG5cdFx0XHRcdGVhc2luZyAgIDogcHJldmlvdXMucHJldkVhc2luZyxcclxuXHRcdFx0XHRjb21wbGV0ZSA6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdCQodGhpcykudHJpZ2dlcignb25SZXNldCcpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LypcclxuXHQgKlx0T3ZlcmxheSBoZWxwZXJcclxuXHQgKi9cclxuXHJcblx0Ri5oZWxwZXJzLm92ZXJsYXkgPSB7XHJcblx0XHRkZWZhdWx0cyA6IHtcclxuXHRcdFx0Y2xvc2VDbGljayA6IHRydWUsICAgICAgLy8gaWYgdHJ1ZSwgZmFuY3lCb3ggd2lsbCBiZSBjbG9zZWQgd2hlbiB1c2VyIGNsaWNrcyBvbiB0aGUgb3ZlcmxheVxyXG5cdFx0XHRzcGVlZE91dCAgIDogMjAwLCAgICAgICAvLyBkdXJhdGlvbiBvZiBmYWRlT3V0IGFuaW1hdGlvblxyXG5cdFx0XHRzaG93RWFybHkgIDogdHJ1ZSwgICAgICAvLyBpbmRpY2F0ZXMgaWYgc2hvdWxkIGJlIG9wZW5lZCBpbW1lZGlhdGVseSBvciB3YWl0IHVudGlsIHRoZSBjb250ZW50IGlzIHJlYWR5XHJcblx0XHRcdGNzcyAgICAgICAgOiB7fSwgICAgICAgIC8vIGN1c3RvbSBDU1MgcHJvcGVydGllc1xyXG5cdFx0XHRsb2NrZWQgICAgIDogIWlzVG91Y2gsICAvLyBpZiB0cnVlLCB0aGUgY29udGVudCB3aWxsIGJlIGxvY2tlZCBpbnRvIG92ZXJsYXlcclxuXHRcdFx0Zml4ZWQgICAgICA6IHRydWUgICAgICAgLy8gaWYgZmFsc2UsIHRoZSBvdmVybGF5IENTUyBwb3NpdGlvbiBwcm9wZXJ0eSB3aWxsIG5vdCBiZSBzZXQgdG8gXCJmaXhlZFwiXHJcblx0XHR9LFxyXG5cclxuXHRcdG92ZXJsYXkgOiBudWxsLCAgICAgIC8vIGN1cnJlbnQgaGFuZGxlXHJcblx0XHRmaXhlZCAgIDogZmFsc2UsICAgICAvLyBpbmRpY2F0ZXMgaWYgdGhlIG92ZXJsYXkgaGFzIHBvc2l0aW9uIFwiZml4ZWRcIlxyXG5cdFx0ZWwgICAgICA6ICQoJ2h0bWwnKSwgLy8gZWxlbWVudCB0aGF0IGNvbnRhaW5zIFwidGhlIGxvY2tcIlxyXG5cclxuXHRcdC8vIFB1YmxpYyBtZXRob2RzXHJcblx0XHRjcmVhdGUgOiBmdW5jdGlvbihvcHRzKSB7XHJcblx0XHRcdHZhciBwYXJlbnQ7XHJcblxyXG5cdFx0XHRvcHRzID0gJC5leHRlbmQoe30sIHRoaXMuZGVmYXVsdHMsIG9wdHMpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMub3ZlcmxheSkge1xyXG5cdFx0XHRcdHRoaXMuY2xvc2UoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cGFyZW50ID0gRi5jb21pbmcgPyBGLmNvbWluZy5wYXJlbnQgOiBvcHRzLnBhcmVudDtcclxuXHJcblx0XHRcdHRoaXMub3ZlcmxheSA9ICQoJzxkaXYgY2xhc3M9XCJmYW5jeWJveC1vdmVybGF5XCI+PC9kaXY+JykuYXBwZW5kVG8oIHBhcmVudCAmJiBwYXJlbnQubGVudGggPyBwYXJlbnQgOiAnYm9keScgKTtcclxuXHRcdFx0dGhpcy5maXhlZCAgID0gZmFsc2U7XHJcblxyXG5cdFx0XHRpZiAob3B0cy5maXhlZCAmJiBGLmRlZmF1bHRzLmZpeGVkKSB7XHJcblx0XHRcdFx0dGhpcy5vdmVybGF5LmFkZENsYXNzKCdmYW5jeWJveC1vdmVybGF5LWZpeGVkJyk7XHJcblxyXG5cdFx0XHRcdHRoaXMuZml4ZWQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdG9wZW4gOiBmdW5jdGlvbihvcHRzKSB7XHJcblx0XHRcdHZhciB0aGF0ID0gdGhpcztcclxuXHJcblx0XHRcdG9wdHMgPSAkLmV4dGVuZCh7fSwgdGhpcy5kZWZhdWx0cywgb3B0cyk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5vdmVybGF5KSB7XHJcblx0XHRcdFx0dGhpcy5vdmVybGF5LnVuYmluZCgnLm92ZXJsYXknKS53aWR0aCgnYXV0bycpLmhlaWdodCgnYXV0bycpO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmNyZWF0ZShvcHRzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCF0aGlzLmZpeGVkKSB7XHJcblx0XHRcdFx0Vy5iaW5kKCdyZXNpemUub3ZlcmxheScsICQucHJveHkoIHRoaXMudXBkYXRlLCB0aGlzKSApO1xyXG5cclxuXHRcdFx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAob3B0cy5jbG9zZUNsaWNrKSB7XHJcblx0XHRcdFx0dGhpcy5vdmVybGF5LmJpbmQoJ2NsaWNrLm92ZXJsYXknLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHRpZiAoJChlLnRhcmdldCkuaGFzQ2xhc3MoJ2ZhbmN5Ym94LW92ZXJsYXknKSkge1xyXG5cdFx0XHRcdFx0XHRpZiAoRi5pc0FjdGl2ZSkge1xyXG5cdFx0XHRcdFx0XHRcdEYuY2xvc2UoKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR0aGF0LmNsb3NlKCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5vdmVybGF5LmNzcyggb3B0cy5jc3MgKS5zaG93KCk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGNsb3NlIDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFcudW5iaW5kKCdyZXNpemUub3ZlcmxheScpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuZWwuaGFzQ2xhc3MoJ2ZhbmN5Ym94LWxvY2snKSkge1xyXG5cdFx0XHRcdCQoJy5mYW5jeWJveC1tYXJnaW4nKS5yZW1vdmVDbGFzcygnZmFuY3lib3gtbWFyZ2luJyk7XHJcblxyXG5cdFx0XHRcdHRoaXMuZWwucmVtb3ZlQ2xhc3MoJ2ZhbmN5Ym94LWxvY2snKTtcclxuXHJcblx0XHRcdFx0Vy5zY3JvbGxUb3AoIHRoaXMuc2Nyb2xsViApLnNjcm9sbExlZnQoIHRoaXMuc2Nyb2xsSCApO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQkKCcuZmFuY3lib3gtb3ZlcmxheScpLnJlbW92ZSgpLmhpZGUoKTtcclxuXHJcblx0XHRcdCQuZXh0ZW5kKHRoaXMsIHtcclxuXHRcdFx0XHRvdmVybGF5IDogbnVsbCxcclxuXHRcdFx0XHRmaXhlZCAgIDogZmFsc2VcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIFByaXZhdGUsIGNhbGxiYWNrc1xyXG5cclxuXHRcdHVwZGF0ZSA6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIHdpZHRoID0gJzEwMCUnLCBvZmZzZXRXaWR0aDtcclxuXHJcblx0XHRcdC8vIFJlc2V0IHdpZHRoL2hlaWdodCBzbyBpdCB3aWxsIG5vdCBtZXNzXHJcblx0XHRcdHRoaXMub3ZlcmxheS53aWR0aCh3aWR0aCkuaGVpZ2h0KCcxMDAlJyk7XHJcblxyXG5cdFx0XHQvLyBqUXVlcnkgZG9lcyBub3QgcmV0dXJuIHJlbGlhYmxlIHJlc3VsdCBmb3IgSUVcclxuXHRcdFx0aWYgKElFKSB7XHJcblx0XHRcdFx0b2Zmc2V0V2lkdGggPSBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0V2lkdGgsIGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGgpO1xyXG5cclxuXHRcdFx0XHRpZiAoRC53aWR0aCgpID4gb2Zmc2V0V2lkdGgpIHtcclxuXHRcdFx0XHRcdHdpZHRoID0gRC53aWR0aCgpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0gZWxzZSBpZiAoRC53aWR0aCgpID4gVy53aWR0aCgpKSB7XHJcblx0XHRcdFx0d2lkdGggPSBELndpZHRoKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMub3ZlcmxheS53aWR0aCh3aWR0aCkuaGVpZ2h0KEQuaGVpZ2h0KCkpO1xyXG5cdFx0fSxcclxuXHJcblx0XHQvLyBUaGlzIGlzIHdoZXJlIHdlIGNhbiBtYW5pcHVsYXRlIERPTSwgYmVjYXVzZSBsYXRlciBpdCB3b3VsZCBjYXVzZSBpZnJhbWVzIHRvIHJlbG9hZFxyXG5cdFx0b25SZWFkeSA6IGZ1bmN0aW9uIChvcHRzLCBvYmopIHtcclxuXHRcdFx0dmFyIG92ZXJsYXkgPSB0aGlzLm92ZXJsYXk7XHJcblxyXG5cdFx0XHQkKCcuZmFuY3lib3gtb3ZlcmxheScpLnN0b3AodHJ1ZSwgdHJ1ZSk7XHJcblxyXG5cdFx0XHRpZiAoIW92ZXJsYXkpIHtcclxuXHRcdFx0XHR0aGlzLmNyZWF0ZShvcHRzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKG9wdHMubG9ja2VkICYmIHRoaXMuZml4ZWQgJiYgb2JqLmZpeGVkKSB7XHJcblx0XHRcdFx0b2JqLmxvY2tlZCA9IHRoaXMub3ZlcmxheS5hcHBlbmQoIG9iai53cmFwICk7XHJcblx0XHRcdFx0b2JqLmZpeGVkICA9IGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAob3B0cy5zaG93RWFybHkgPT09IHRydWUpIHtcclxuXHRcdFx0XHR0aGlzLmJlZm9yZVNob3cuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHJcblx0XHRiZWZvcmVTaG93IDogZnVuY3Rpb24ob3B0cywgb2JqKSB7XHJcblx0XHRcdGlmIChvYmoubG9ja2VkICYmICF0aGlzLmVsLmhhc0NsYXNzKCdmYW5jeWJveC1sb2NrJykpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5maXhQb3NpdGlvbiAhPT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdCQoJyonKS5maWx0ZXIoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0cmV0dXJuICgkKHRoaXMpLmNzcygncG9zaXRpb24nKSA9PT0gJ2ZpeGVkJyAmJiAhJCh0aGlzKS5oYXNDbGFzcyhcImZhbmN5Ym94LW92ZXJsYXlcIikgJiYgISQodGhpcykuaGFzQ2xhc3MoXCJmYW5jeWJveC13cmFwXCIpICk7XHJcblx0XHRcdFx0XHR9KS5hZGRDbGFzcygnZmFuY3lib3gtbWFyZ2luJyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLmVsLmFkZENsYXNzKCdmYW5jeWJveC1tYXJnaW4nKTtcclxuXHJcblx0XHRcdFx0dGhpcy5zY3JvbGxWID0gVy5zY3JvbGxUb3AoKTtcclxuXHRcdFx0XHR0aGlzLnNjcm9sbEggPSBXLnNjcm9sbExlZnQoKTtcclxuXHJcblx0XHRcdFx0dGhpcy5lbC5hZGRDbGFzcygnZmFuY3lib3gtbG9jaycpO1xyXG5cclxuXHRcdFx0XHRXLnNjcm9sbFRvcCggdGhpcy5zY3JvbGxWICkuc2Nyb2xsTGVmdCggdGhpcy5zY3JvbGxIICk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMub3BlbihvcHRzKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0b25VcGRhdGUgOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKCF0aGlzLmZpeGVkKSB7XHJcblx0XHRcdFx0dGhpcy51cGRhdGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHJcblx0XHRhZnRlckNsb3NlOiBmdW5jdGlvbiAob3B0cykge1xyXG5cdFx0XHQvLyBSZW1vdmUgb3ZlcmxheSBpZiBleGlzdHMgYW5kIGZhbmN5Qm94IGlzIG5vdCBvcGVuaW5nXHJcblx0XHRcdC8vIChlLmcuLCBpdCBpcyBub3QgYmVpbmcgb3BlbiB1c2luZyBhZnRlckNsb3NlIGNhbGxiYWNrKVxyXG5cdFx0XHRpZiAodGhpcy5vdmVybGF5ICYmICFGLmNvbWluZykge1xyXG5cdFx0XHRcdHRoaXMub3ZlcmxheS5mYWRlT3V0KG9wdHMuc3BlZWRPdXQsICQucHJveHkoIHRoaXMuY2xvc2UsIHRoaXMgKSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKlxyXG5cdCAqXHRUaXRsZSBoZWxwZXJcclxuXHQgKi9cclxuXHJcblx0Ri5oZWxwZXJzLnRpdGxlID0ge1xyXG5cdFx0ZGVmYXVsdHMgOiB7XHJcblx0XHRcdHR5cGUgICAgIDogJ2Zsb2F0JywgLy8gJ2Zsb2F0JywgJ2luc2lkZScsICdvdXRzaWRlJyBvciAnb3ZlcicsXHJcblx0XHRcdHBvc2l0aW9uIDogJ2JvdHRvbScgLy8gJ3RvcCcgb3IgJ2JvdHRvbSdcclxuXHRcdH0sXHJcblxyXG5cdFx0YmVmb3JlU2hvdzogZnVuY3Rpb24gKG9wdHMpIHtcclxuXHRcdFx0dmFyIGN1cnJlbnQgPSBGLmN1cnJlbnQsXHJcblx0XHRcdFx0dGV4dCAgICA9IGN1cnJlbnQudGl0bGUsXHJcblx0XHRcdFx0dHlwZSAgICA9IG9wdHMudHlwZSxcclxuXHRcdFx0XHR0aXRsZSxcclxuXHRcdFx0XHR0YXJnZXQ7XHJcblxyXG5cdFx0XHRpZiAoJC5pc0Z1bmN0aW9uKHRleHQpKSB7XHJcblx0XHRcdFx0dGV4dCA9IHRleHQuY2FsbChjdXJyZW50LmVsZW1lbnQsIGN1cnJlbnQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIWlzU3RyaW5nKHRleHQpIHx8ICQudHJpbSh0ZXh0KSA9PT0gJycpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRpdGxlID0gJCgnPGRpdiBjbGFzcz1cImZhbmN5Ym94LXRpdGxlIGZhbmN5Ym94LXRpdGxlLScgKyB0eXBlICsgJy13cmFwXCI+JyArIHRleHQgKyAnPC9kaXY+Jyk7XHJcblxyXG5cdFx0XHRzd2l0Y2ggKHR5cGUpIHtcclxuXHRcdFx0XHRjYXNlICdpbnNpZGUnOlxyXG5cdFx0XHRcdFx0dGFyZ2V0ID0gRi5za2luO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlICdvdXRzaWRlJzpcclxuXHRcdFx0XHRcdHRhcmdldCA9IEYud3JhcDtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSAnb3Zlcic6XHJcblx0XHRcdFx0XHR0YXJnZXQgPSBGLmlubmVyO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRkZWZhdWx0OiAvLyAnZmxvYXQnXHJcblx0XHRcdFx0XHR0YXJnZXQgPSBGLnNraW47XHJcblxyXG5cdFx0XHRcdFx0dGl0bGUuYXBwZW5kVG8oJ2JvZHknKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoSUUpIHtcclxuXHRcdFx0XHRcdFx0dGl0bGUud2lkdGgoIHRpdGxlLndpZHRoKCkgKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR0aXRsZS53cmFwSW5uZXIoJzxzcGFuIGNsYXNzPVwiY2hpbGRcIj48L3NwYW4+Jyk7XHJcblxyXG5cdFx0XHRcdFx0Ly9JbmNyZWFzZSBib3R0b20gbWFyZ2luIHNvIHRoaXMgdGl0bGUgd2lsbCBhbHNvIGZpdCBpbnRvIHZpZXdwb3J0XHJcblx0XHRcdFx0XHRGLmN1cnJlbnQubWFyZ2luWzJdICs9IE1hdGguYWJzKCBnZXRTY2FsYXIodGl0bGUuY3NzKCdtYXJnaW4tYm90dG9tJykpICk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRpdGxlWyAob3B0cy5wb3NpdGlvbiA9PT0gJ3RvcCcgPyAncHJlcGVuZFRvJyAgOiAnYXBwZW5kVG8nKSBdKHRhcmdldCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0Ly8galF1ZXJ5IHBsdWdpbiBpbml0aWFsaXphdGlvblxyXG5cdCQuZm4uZmFuY3lib3ggPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG5cdFx0dmFyIGluZGV4LFxyXG5cdFx0XHR0aGF0ICAgICA9ICQodGhpcyksXHJcblx0XHRcdHNlbGVjdG9yID0gdGhpcy5zZWxlY3RvciB8fCAnJyxcclxuXHRcdFx0cnVuICAgICAgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0dmFyIHdoYXQgPSAkKHRoaXMpLmJsdXIoKSwgaWR4ID0gaW5kZXgsIHJlbFR5cGUsIHJlbFZhbDtcclxuXHJcblx0XHRcdFx0aWYgKCEoZS5jdHJsS2V5IHx8IGUuYWx0S2V5IHx8IGUuc2hpZnRLZXkgfHwgZS5tZXRhS2V5KSAmJiAhd2hhdC5pcygnLmZhbmN5Ym94LXdyYXAnKSkge1xyXG5cdFx0XHRcdFx0cmVsVHlwZSA9IG9wdGlvbnMuZ3JvdXBBdHRyIHx8ICdkYXRhLWZhbmN5Ym94LWdyb3VwJztcclxuXHRcdFx0XHRcdHJlbFZhbCAgPSB3aGF0LmF0dHIocmVsVHlwZSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCFyZWxWYWwpIHtcclxuXHRcdFx0XHRcdFx0cmVsVHlwZSA9ICdyZWwnO1xyXG5cdFx0XHRcdFx0XHRyZWxWYWwgID0gd2hhdC5nZXQoMClbIHJlbFR5cGUgXTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAocmVsVmFsICYmIHJlbFZhbCAhPT0gJycgJiYgcmVsVmFsICE9PSAnbm9mb2xsb3cnKSB7XHJcblx0XHRcdFx0XHRcdHdoYXQgPSBzZWxlY3Rvci5sZW5ndGggPyAkKHNlbGVjdG9yKSA6IHRoYXQ7XHJcblx0XHRcdFx0XHRcdHdoYXQgPSB3aGF0LmZpbHRlcignWycgKyByZWxUeXBlICsgJz1cIicgKyByZWxWYWwgKyAnXCJdJyk7XHJcblx0XHRcdFx0XHRcdGlkeCAgPSB3aGF0LmluZGV4KHRoaXMpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdG9wdGlvbnMuaW5kZXggPSBpZHg7XHJcblxyXG5cdFx0XHRcdFx0Ly8gU3RvcCBhbiBldmVudCBmcm9tIGJ1YmJsaW5nIGlmIGV2ZXJ5dGhpbmcgaXMgZmluZVxyXG5cdFx0XHRcdFx0aWYgKEYub3Blbih3aGF0LCBvcHRpb25zKSAhPT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHRcdGluZGV4ICAgPSBvcHRpb25zLmluZGV4IHx8IDA7XHJcblxyXG5cdFx0aWYgKCFzZWxlY3RvciB8fCBvcHRpb25zLmxpdmUgPT09IGZhbHNlKSB7XHJcblx0XHRcdHRoYXQudW5iaW5kKCdjbGljay5mYi1zdGFydCcpLmJpbmQoJ2NsaWNrLmZiLXN0YXJ0JywgcnVuKTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRELnVuZGVsZWdhdGUoc2VsZWN0b3IsICdjbGljay5mYi1zdGFydCcpLmRlbGVnYXRlKHNlbGVjdG9yICsgXCI6bm90KCcuZmFuY3lib3gtaXRlbSwgLmZhbmN5Ym94LW5hdicpXCIsICdjbGljay5mYi1zdGFydCcsIHJ1bik7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5maWx0ZXIoJ1tkYXRhLWZhbmN5Ym94LXN0YXJ0PTFdJykudHJpZ2dlcignY2xpY2snKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvLyBUZXN0cyB0aGF0IG5lZWQgYSBib2R5IGF0IGRvYyByZWFkeVxyXG5cdEQucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgdzEsIHcyO1xyXG5cclxuXHRcdGlmICggJC5zY3JvbGxiYXJXaWR0aCA9PT0gdW5kZWZpbmVkICkge1xyXG5cdFx0XHQvLyBodHRwOi8vYmVuYWxtYW4uY29tL3Byb2plY3RzL2pxdWVyeS1taXNjLXBsdWdpbnMvI3Njcm9sbGJhcndpZHRoXHJcblx0XHRcdCQuc2Nyb2xsYmFyV2lkdGggPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgcGFyZW50ID0gJCgnPGRpdiBzdHlsZT1cIndpZHRoOjUwcHg7aGVpZ2h0OjUwcHg7b3ZlcmZsb3c6YXV0b1wiPjxkaXYvPjwvZGl2PicpLmFwcGVuZFRvKCdib2R5JyksXHJcblx0XHRcdFx0XHRjaGlsZCAgPSBwYXJlbnQuY2hpbGRyZW4oKSxcclxuXHRcdFx0XHRcdHdpZHRoICA9IGNoaWxkLmlubmVyV2lkdGgoKSAtIGNoaWxkLmhlaWdodCggOTkgKS5pbm5lcldpZHRoKCk7XHJcblxyXG5cdFx0XHRcdHBhcmVudC5yZW1vdmUoKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIHdpZHRoO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggJC5zdXBwb3J0LmZpeGVkUG9zaXRpb24gPT09IHVuZGVmaW5lZCApIHtcclxuXHRcdFx0JC5zdXBwb3J0LmZpeGVkUG9zaXRpb24gPSAoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dmFyIGVsZW0gID0gJCgnPGRpdiBzdHlsZT1cInBvc2l0aW9uOmZpeGVkO3RvcDoyMHB4O1wiPjwvZGl2PicpLmFwcGVuZFRvKCdib2R5JyksXHJcblx0XHRcdFx0XHRmaXhlZCA9ICggZWxlbVswXS5vZmZzZXRUb3AgPT09IDIwIHx8IGVsZW1bMF0ub2Zmc2V0VG9wID09PSAxNSApO1xyXG5cclxuXHRcdFx0XHRlbGVtLnJlbW92ZSgpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZml4ZWQ7XHJcblx0XHRcdH0oKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0JC5leHRlbmQoRi5kZWZhdWx0cywge1xyXG5cdFx0XHRzY3JvbGxiYXJXaWR0aCA6ICQuc2Nyb2xsYmFyV2lkdGgoKSxcclxuXHRcdFx0Zml4ZWQgIDogJC5zdXBwb3J0LmZpeGVkUG9zaXRpb24sXHJcblx0XHRcdHBhcmVudCA6ICQoJ2JvZHknKVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly9HZXQgcmVhbCB3aWR0aCBvZiBwYWdlIHNjcm9sbC1iYXJcclxuXHRcdHcxID0gJCh3aW5kb3cpLndpZHRoKCk7XHJcblxyXG5cdFx0SC5hZGRDbGFzcygnZmFuY3lib3gtbG9jay10ZXN0Jyk7XHJcblxyXG5cdFx0dzIgPSAkKHdpbmRvdykud2lkdGgoKTtcclxuXHJcblx0XHRILnJlbW92ZUNsYXNzKCdmYW5jeWJveC1sb2NrLXRlc3QnKTtcclxuXHJcblx0XHQkKFwiPHN0eWxlIHR5cGU9J3RleHQvY3NzJz4uZmFuY3lib3gtbWFyZ2lue21hcmdpbi1yaWdodDpcIiArICh3MiAtIHcxKSArIFwicHg7fTwvc3R5bGU+XCIpLmFwcGVuZFRvKFwiaGVhZFwiKTtcclxuXHR9KTtcclxuXHJcbn0od2luZG93LCBkb2N1bWVudCwgalF1ZXJ5KSk7Il19
