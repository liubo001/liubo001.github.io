(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

var CODE_MAX_HEIGHT = 200;
var containers = []; // 展开

$('body').on('click', '.js_unfold_code_btn', function () {
  $(this).closest('.js_highlight_container').addClass('on');
}); // 收起

$('body').on('click', '.js_retract_code_btn', function () {
  var $container = $(this).closest('.js_highlight_container').removeClass('on');
  var winTop = $(window).scrollTop();
  var offsetTop = $container.offset().top;
  $(this).css('top', 0);

  if (winTop > offsetTop) {
    // 设置滚动条位置
    $('body, html').animate({
      scrollTop: $container.offset().top - CODE_MAX_HEIGHT
    }, 600);
  }
}); // 滚动事件，触发动画效果

$(window).on('scroll', function () {
  var scrollTop = $(window).scrollTop();
  var temp = [];

  for (var i = 0; i < containers.length; i++) {
    var item = containers[i];
    var $container = item.$container,
        height = item.height,
        $hide = item.$hide,
        hasHorizontalScrollbar = item.hasHorizontalScrollbar;

    if ($container.closest('body').length === 0) {
      // 如果 $container 元素已经不在页面上, 则删除该元素
      // 防止pjax页面跳转之后，元素未删除
      continue;
    }

    temp.push(item);

    if (!$container.hasClass('on')) {
      continue;
    }

    var offsetTop = $container.offset().top;
    var hideBtnHeight = $hide.outerHeight(); // 减去按钮高度，减去底部滚动条高度

    var maxTop = parseInt(height - (hasHorizontalScrollbar ? 17 : 0) - hideBtnHeight);
    var top = parseInt(Math.min(Math.max(scrollTop - offsetTop, 0), // 如果小于 0 ，则取 0
    maxTop // 如果大于 height ，则取 height
    )); // 根据 sin 曲线设置"收起代码"位置

    var halfHeight = parseInt($(window).height() / 2 * Math.sin(top / maxTop * 90 * (2 * Math.PI / 360)));
    $hide.css('top', Math.min(top + halfHeight, maxTop));
  }

  containers = (_readOnlyError("containers"), temp);
}); // 添加隐藏容器

var addCodeWrap = function addCodeWrap($node) {
  var $container = $node.wrap('<div class="js_highlight_container highlight-container"><div class="highlight-wrap"></div></div>').closest('.js_highlight_container'); // 底部 "展开代码" 与 侧边栏 "收起代码"

  var $btn = $("\n    <div class=\"highlight-footer\">\n      <a class=\"js_unfold_code_btn show-btn\" href=\"javascript:;\">\u5C55\u5F00\u4EE3\u7801<i class=\"fa fa-angle-down\" aria-hidden=\"true\"></i></a>\n    </div>\n    <a class=\"js_retract_code_btn hide-btn\" href=\"javascript:;\"><i class=\"fa fa-angle-up\" aria-hidden=\"true\"></i>\u6536\u8D77\u4EE3\u7801</a>\n  ");
  $container.append($btn);
  return $container;
};

var ret = function ret() {
  $('.highlight').each(function () {
    // 防止重复渲染
    if (this.__render__ === true) {
      return true;
    }

    this.__render__ = true;
    var $this = $(this);
    var height = $(this).outerHeight();

    if (height > CODE_MAX_HEIGHT) {
      // 添加展开&收起容器
      var $container = addCodeWrap($this, height);
      containers.push({
        $container: $container,
        height: height,
        $hide: $container.find('.js_retract_code_btn'),
        hasHorizontalScrollbar: this.scrollWidth > this.offsetWidth
      });
    }
  });
};

var _default = ret;
exports["default"] = _default;

},{}],2:[function(require,module,exports){
"use strict";

var _codeUnfold = _interopRequireDefault(require("./code-unfold"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(function ($) {
  // Search
  var $searchWrap = $('#search-form-wrap'),
      isSearchAnim = false,
      searchAnimDuration = 200;

  var startSearchAnim = function startSearchAnim() {
    isSearchAnim = true;
  };

  var stopSearchAnim = function stopSearchAnim(callback) {
    setTimeout(function () {
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('#nav-search-btn').on('click', function () {
    if (isSearchAnim) return;
    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function () {
      $('.search-form-input').focus();
    });
  });
  $('.search-form-input').on('blur', function () {
    startSearchAnim();
    $searchWrap.removeClass('on');
    stopSearchAnim();
  }); // Share

  $('body').on('click', function () {
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function (e) {
    e.stopPropagation();
    var $this = $(this),
        url = $this.attr('data-url'),
        encodedUrl = encodeURIComponent(url),
        id = 'article-share-box-' + $this.attr('data-id'),
        offset = $this.offset();

    if ($('#' + id).length) {
      var box = $('#' + id);

      if (box.hasClass('on')) {
        box.removeClass('on');
        return;
      }
    } else {
      var html = ['<div id="' + id + '" class="article-share-box">', '<input class="article-share-input" value="' + url + '">', '<div class="article-share-links">', '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>', '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>', '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>', '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>', '</div>', '</div>'].join('');
      var box = $(html);
      $('body').append(box);
    }

    $('.article-share-box.on').hide();
    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function (e) {
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function () {
    $(this).select();
  }).on('click', '.article-share-box-link', function (e) {
    e.preventDefault();
    e.stopPropagation();
    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  }); // Caption

  $('.article-entry').each(function (i) {
    $(this).find('img').each(function () {
      if ($(this).parent().hasClass('fancybox')) return;
      var alt = this.alt;
      if (alt) $(this).after('<span class="caption">' + alt + '</span>');
      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });
    $(this).find('.fancybox').each(function () {
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox) {
    $('.fancybox').fancybox();
  } // Mobile nav


  var $container = $('#container'),
      isMobileNavAnim = false,
      mobileNavAnimDuration = 200;

  var startMobileNavAnim = function startMobileNavAnim() {
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function stopMobileNavAnim() {
    setTimeout(function () {
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  };

  $('#main-nav-toggle').on('click', function () {
    if (isMobileNavAnim) return;
    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });
  $('#wrap').on('click', function () {
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;
    $container.removeClass('mobile-nav-on');
  });
})(jQuery);

(0, _codeUnfold["default"])();

},{"./code-unfold":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMvbGFuZHNjYXBlL3NvdXJjZS9qcy9jb2RlLXVuZm9sZC5qcyIsInRoZW1lcy9sYW5kc2NhcGUvc291cmNlL2pzL3NjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQ0FBLElBQU0sZUFBZSxHQUFHLEdBQXhCO0FBQ0EsSUFBTSxVQUFVLEdBQUcsRUFBbkIsQyxDQUVBOztBQUNBLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVSxFQUFWLENBQWEsT0FBYixFQUFzQixxQkFBdEIsRUFBNkMsWUFBWTtBQUN2RCxFQUFBLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUSxPQUFSLENBQWdCLHlCQUFoQixFQUEyQyxRQUEzQyxDQUFvRCxJQUFwRDtBQUNELENBRkQsRSxDQUdBOztBQUNBLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVSxFQUFWLENBQWEsT0FBYixFQUFzQixzQkFBdEIsRUFBOEMsWUFBWTtBQUN4RCxNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBRCxDQUFELENBQVEsT0FBUixDQUFnQix5QkFBaEIsRUFBMkMsV0FBM0MsQ0FBdUQsSUFBdkQsQ0FBbkI7QUFDQSxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBRCxDQUFELENBQVUsU0FBVixFQUFmO0FBQ0EsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLE1BQVgsR0FBb0IsR0FBdEM7QUFDQSxFQUFBLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUSxHQUFSLENBQVksS0FBWixFQUFtQixDQUFuQjs7QUFDQSxNQUFJLE1BQU0sR0FBRyxTQUFiLEVBQXdCO0FBQ3RCO0FBQ0EsSUFBQSxDQUFDLENBQUMsWUFBRCxDQUFELENBQWdCLE9BQWhCLENBQXdCO0FBQ3RCLE1BQUEsU0FBUyxFQUFFLFVBQVUsQ0FBQyxNQUFYLEdBQW9CLEdBQXBCLEdBQTBCO0FBRGYsS0FBeEIsRUFFRyxHQUZIO0FB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QUFpQixHQUFHLFNBQXBCLGlCQUFvQixHQUFVO0FBQ2hDLElBQUEsVUFBVSxDQUFDLFlBQVU7QUFDbkIsTUFBQSxlQUFlLEdBQUcsS0FBbEI7QUFDRCxLQUZTLEVBRVAscUJBRk8sQ0FBVjtBQUdELEdBSkQ7O0FBTUEsRUFBQSxDQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQixFQUF0QixDQUF5QixPQUF6QixFQUFrQyxZQUFVO0FBQzFDLFFBQUksZUFBSixFQUFxQjtBQUVyQixJQUFBLGtCQUFrQjtBQUNsQixJQUFBLFVBQVUsQ0FBQyxXQUFYLENBQXVCLGVBQXZCO0FBQ0EsSUFBQSxpQkFBaUI7QUFDbEIsR0FORDtBQVFBLEVBQUEsQ0FBQyxDQUFDLE9BQUQsQ0FBRCxDQUFXLEVBQVgsQ0FBYyxPQUFkLEVBQXVCLFlBQVU7QUFDL0IsUUFBSSxlQUFlLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBWCxDQUFvQixlQUFwQixDQUF4QixFQUE4RDtBQUU5RCxJQUFBLFVBQVUsQ0FBQyxXQUFYLENBQXVCLGVBQXZCO0FBQ0QsR0FKRDtBQUtELENBeElELEVBd0lHLE1BeElIOztBQTBJQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IENPREVfTUFYX0hFSUdIVCA9IDIwMDtcclxuY29uc3QgY29udGFpbmVycyA9IFtdO1xyXG5cclxuLy8g5bGV5byAXHJcbiQoJ2JvZHknKS5vbignY2xpY2snLCAnLmpzX3VuZm9sZF9jb2RlX2J0bicsIGZ1bmN0aW9uICgpIHtcclxuICAkKHRoaXMpLmNsb3Nlc3QoJy5qc19oaWdobGlnaHRfY29udGFpbmVyJykuYWRkQ2xhc3MoJ29uJyk7XHJcbn0pO1xyXG4vLyDmlLbotbdcclxuJCgnYm9keScpLm9uKCdjbGljaycsICcuanNfcmV0cmFjdF9jb2RlX2J0bicsIGZ1bmN0aW9uICgpIHtcclxuICBjb25zdCAkY29udGFpbmVyID0gJCh0aGlzKS5jbG9zZXN0KCcuanNfaGlnaGxpZ2h0X2NvbnRhaW5lcicpLnJlbW92ZUNsYXNzKCdvbicpO1xyXG4gIGNvbnN0IHdpblRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICBjb25zdCBvZmZzZXRUb3AgPSAkY29udGFpbmVyLm9mZnNldCgpLnRvcDtcclxuICAkKHRoaXMpLmNzcygndG9wJywgMCk7XHJcbiAgaWYgKHdpblRvcCA+IG9mZnNldFRvcCkge1xyXG4gICAgLy8g6K6+572u5rua5Yqo5p2h5L2N572uXHJcbiAgICAkKCdib2R5LCBodG1sJykuYW5pbWF0ZSh7XHJcbiAgICAgIHNjcm9sbFRvcDogJGNvbnRhaW5lci5vZmZzZXQoKS50b3AgLSBDT0RFX01BWF9IRUlHSFRcclxuICAgIH0sIDYwMCk7XHJcbiAgfVxyXG59KTtcclxuLy8g5rua5Yqo5LqL5Lu277yM6Kem5Y+R5Yqo55S75pWI5p6cXHJcbiQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xyXG4gIGNvbnN0IHNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICBjb25zdCB0ZW1wID0gW107XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBpdGVtID0gY29udGFpbmVyc1tpXTtcclxuICAgIGNvbnN0IHsgJGNvbnRhaW5lciwgaGVpZ2h0LCAkaGlkZSwgaGFzSG9yaXpvbnRhbFNjcm9sbGJhciB9ID0gaXRlbTtcclxuICAgIGlmICgkY29udGFpbmVyLmNsb3Nlc3QoJ2JvZHknKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgLy8g5aaC5p6cICRjb250YWluZXIg5YWD57Sg5bey57uP5LiN5Zyo6aG16Z2i5LiKLCDliJnliKDpmaTor6XlhYPntKBcclxuICAgICAgLy8g6Ziy5q2icGpheOmhtemdoui3s+i9rOS5i+WQju+8jOWFg+e0oOacquWIoOmZpFxyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuICAgIHRlbXAucHVzaChpdGVtKTtcclxuICAgIGlmICghJGNvbnRhaW5lci5oYXNDbGFzcygnb24nKSkge1xyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuICAgIGNvbnN0IG9mZnNldFRvcCA9ICRjb250YWluZXIub2Zmc2V0KCkudG9wO1xyXG4gICAgY29uc3QgaGlkZUJ0bkhlaWdodCA9ICRoaWRlLm91dGVySGVpZ2h0KCk7XHJcbiAgICAvLyDlh4/ljrvmjInpkq7pq5jluqbvvIzlh4/ljrvlupXpg6jmu5rliqjmnaHpq5jluqZcclxuICAgIGNvbnN0IG1heFRvcCA9IHBhcnNlSW50KGhlaWdodCAtIChoYXNIb3Jpem9udGFsU2Nyb2xsYmFyID8gMTcgOiAwKSAtIGhpZGVCdG5IZWlnaHQpO1xyXG4gICAgbGV0IHRvcCA9IHBhcnNlSW50KFxyXG4gICAgICBNYXRoLm1pbihcclxuICAgICAgICBNYXRoLm1heChzY3JvbGxUb3AgLSBvZmZzZXRUb3AsIDApLCAvLyDlpoLmnpzlsI/kuo4gMCDvvIzliJnlj5YgMFxyXG4gICAgICAgIG1heFRvcCwvLyDlpoLmnpzlpKfkuo4gaGVpZ2h0IO+8jOWImeWPliBoZWlnaHRcclxuICAgICAgKVxyXG4gICAgKTtcclxuICAgIC8vIOagueaNriBzaW4g5puy57q/6K6+572uXCLmlLbotbfku6PnoIFcIuS9jee9rlxyXG4gICAgY29uc3QgaGFsZkhlaWdodCA9IHBhcnNlSW50KCQod2luZG93KS5oZWlnaHQoKSAvIDIgKiBNYXRoLnNpbigodG9wIC8gbWF4VG9wKSAqIDkwICogKDIgKiBNYXRoLlBJLzM2MCkpKTtcclxuICAgICRoaWRlLmNzcygndG9wJywgTWF0aC5taW4odG9wICsgaGFsZkhlaWdodCwgbWF4VG9wKSk7XHJcbiAgfVxyXG4gIGNvbnRhaW5lcnMgPSB0ZW1wO1xyXG59KTtcclxuXHJcbi8vIOa3u+WKoOmakOiXj+WuueWZqFxyXG5jb25zdCBhZGRDb2RlV3JhcCA9ICgkbm9kZSkgPT4ge1xyXG4gIGNvbnN0ICRjb250YWluZXIgPSAkbm9kZS53cmFwKCc8ZGl2IGNsYXNzPVwianNfaGlnaGxpZ2h0X2NvbnRhaW5lciBoaWdobGlnaHQtY29udGFpbmVyXCI+PGRpdiBjbGFzcz1cImhpZ2hsaWdodC13cmFwXCI+PC9kaXY+PC9kaXY+JykuY2xvc2VzdCgnLmpzX2hpZ2hsaWdodF9jb250YWluZXInKTtcclxuXHJcbiAgLy8g5bqV6YOoIFwi5bGV5byA5Luj56CBXCIg5LiOIOS+p+i+ueagjyBcIuaUtui1t+S7o+eggVwiXHJcbiAgY29uc3QgJGJ0biA9ICQoYFxyXG4gICAgPGRpdiBjbGFzcz1cImhpZ2hsaWdodC1mb290ZXJcIj5cclxuICAgICAgPGEgY2xhc3M9XCJqc191bmZvbGRfY29kZV9idG4gc2hvdy1idG5cIiBocmVmPVwiamF2YXNjcmlwdDo7XCI+5bGV5byA5Luj56CBPGkgY2xhc3M9XCJmYSBmYS1hbmdsZS1kb3duXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPjwvYT5cclxuICAgIDwvZGl2PlxyXG4gICAgPGEgY2xhc3M9XCJqc19yZXRyYWN0X2NvZGVfYnRuIGhpZGUtYnRuXCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiPjxpIGNsYXNzPVwiZmEgZmEtYW5nbGUtdXBcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+5pS26LW35Luj56CBPC9hPlxyXG4gIGApO1xyXG5cclxuICAkY29udGFpbmVyLmFwcGVuZCgkYnRuKTtcclxuICByZXR1cm4gJGNvbnRhaW5lcjtcclxufTtcclxuXHJcbmNvbnN0IHJldCA9ICgpID0+IHtcclxuICAkKCcuaGlnaGxpZ2h0JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyDpmLLmraLph43lpI3muLLmn5NcclxuICAgIGlmICh0aGlzLl9fcmVuZGVyX18gPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9fcmVuZGVyX18gPSB0cnVlO1xyXG4gICAgY29uc3QgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gJCh0aGlzKS5vdXRlckhlaWdodCgpO1xyXG4gICAgaWYgKGhlaWdodCA+IENPREVfTUFYX0hFSUdIVCkge1xyXG4gICAgICAvLyDmt7vliqDlsZXlvIAm5pS26LW35a655ZmoXHJcbiAgICAgIGNvbnN0ICRjb250YWluZXIgPSBhZGRDb2RlV3JhcCgkdGhpcywgaGVpZ2h0KTtcclxuICAgICAgY29udGFpbmVycy5wdXNoKHtcclxuICAgICAgICAkY29udGFpbmVyLFxyXG4gICAgICAgIGhlaWdodCxcclxuICAgICAgICAkaGlkZTogJGNvbnRhaW5lci5maW5kKCcuanNfcmV0cmFjdF9jb2RlX2J0bicpLFxyXG4gICAgICAgIGhhc0hvcml6b250YWxTY3JvbGxiYXI6IHRoaXMuc2Nyb2xsV2lkdGggPiB0aGlzLm9mZnNldFdpZHRoLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJldDsiLCIoZnVuY3Rpb24oJCl7XHJcbiAgLy8gU2VhcmNoXHJcbiAgdmFyICRzZWFyY2hXcmFwID0gJCgnI3NlYXJjaC1mb3JtLXdyYXAnKSxcclxuICAgIGlzU2VhcmNoQW5pbSA9IGZhbHNlLFxyXG4gICAgc2VhcmNoQW5pbUR1cmF0aW9uID0gMjAwO1xyXG5cclxuICB2YXIgc3RhcnRTZWFyY2hBbmltID0gZnVuY3Rpb24oKXtcclxuICAgIGlzU2VhcmNoQW5pbSA9IHRydWU7XHJcbiAgfTtcclxuXHJcbiAgdmFyIHN0b3BTZWFyY2hBbmltID0gZnVuY3Rpb24oY2FsbGJhY2spe1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICBpc1NlYXJjaEFuaW0gPSBmYWxzZTtcclxuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcclxuICAgIH0sIHNlYXJjaEFuaW1EdXJhdGlvbik7XHJcbiAgfTtcclxuXHJcbiAgJCgnI25hdi1zZWFyY2gtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIGlmIChpc1NlYXJjaEFuaW0pIHJldHVybjtcclxuXHJcbiAgICBzdGFydFNlYXJjaEFuaW0oKTtcclxuICAgICRzZWFyY2hXcmFwLmFkZENsYXNzKCdvbicpO1xyXG4gICAgc3RvcFNlYXJjaEFuaW0oZnVuY3Rpb24oKXtcclxuICAgICAgJCgnLnNlYXJjaC1mb3JtLWlucHV0JykuZm9jdXMoKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICAkKCcuc2VhcmNoLWZvcm0taW5wdXQnKS5vbignYmx1cicsIGZ1bmN0aW9uKCl7XHJcbiAgICBzdGFydFNlYXJjaEFuaW0oKTtcclxuICAgICRzZWFyY2hXcmFwLnJlbW92ZUNsYXNzKCdvbicpO1xyXG4gICAgc3RvcFNlYXJjaEFuaW0oKTtcclxuICB9KTtcclxuXHJcbiAgLy8gU2hhcmVcclxuICAkKCdib2R5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICQoJy5hcnRpY2xlLXNoYXJlLWJveC5vbicpLnJlbW92ZUNsYXNzKCdvbicpO1xyXG4gIH0pLm9uKCdjbGljaycsICcuYXJ0aWNsZS1zaGFyZS1saW5rJywgZnVuY3Rpb24oZSl7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgIHZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgIHVybCA9ICR0aGlzLmF0dHIoJ2RhdGEtdXJsJyksXHJcbiAgICAgIGVuY29kZWRVcmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKSxcclxuICAgICAgaWQgPSAnYXJ0aWNsZS1zaGFyZS1ib3gtJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSxcclxuICAgICAgb2Zmc2V0ID0gJHRoaXMub2Zmc2V0KCk7XHJcblxyXG4gICAgaWYgKCQoJyMnICsgaWQpLmxlbmd0aCl7XHJcbiAgICAgIHZhciBib3ggPSAkKCcjJyArIGlkKTtcclxuXHJcbiAgICAgIGlmIChib3guaGFzQ2xhc3MoJ29uJykpe1xyXG4gICAgICAgIGJveC5yZW1vdmVDbGFzcygnb24nKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBodG1sID0gW1xyXG4gICAgICAgICc8ZGl2IGlkPVwiJyArIGlkICsgJ1wiIGNsYXNzPVwiYXJ0aWNsZS1zaGFyZS1ib3hcIj4nLFxyXG4gICAgICAgICAgJzxpbnB1dCBjbGFzcz1cImFydGljbGUtc2hhcmUtaW5wdXRcIiB2YWx1ZT1cIicgKyB1cmwgKyAnXCI+JyxcclxuICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYXJ0aWNsZS1zaGFyZS1saW5rc1wiPicsXHJcbiAgICAgICAgICAgICc8YSBocmVmPVwiaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/dXJsPScgKyBlbmNvZGVkVXJsICsgJ1wiIGNsYXNzPVwiYXJ0aWNsZS1zaGFyZS10d2l0dGVyXCIgdGFyZ2V0PVwiX2JsYW5rXCIgdGl0bGU9XCJUd2l0dGVyXCI+PC9hPicsXHJcbiAgICAgICAgICAgICc8YSBocmVmPVwiaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci5waHA/dT0nICsgZW5jb2RlZFVybCArICdcIiBjbGFzcz1cImFydGljbGUtc2hhcmUtZmFjZWJvb2tcIiB0YXJnZXQ9XCJfYmxhbmtcIiB0aXRsZT1cIkZhY2Vib29rXCI+PC9hPicsXHJcbiAgICAgICAgICAgICc8YSBocmVmPVwiaHR0cDovL3BpbnRlcmVzdC5jb20vcGluL2NyZWF0ZS9idXR0b24vP3VybD0nICsgZW5jb2RlZFVybCArICdcIiBjbGFzcz1cImFydGljbGUtc2hhcmUtcGludGVyZXN0XCIgdGFyZ2V0PVwiX2JsYW5rXCIgdGl0bGU9XCJQaW50ZXJlc3RcIj48L2E+JyxcclxuICAgICAgICAgICAgJzxhIGhyZWY9XCJodHRwczovL3BsdXMuZ29vZ2xlLmNvbS9zaGFyZT91cmw9JyArIGVuY29kZWRVcmwgKyAnXCIgY2xhc3M9XCJhcnRpY2xlLXNoYXJlLWdvb2dsZVwiIHRhcmdldD1cIl9ibGFua1wiIHRpdGxlPVwiR29vZ2xlK1wiPjwvYT4nLFxyXG4gICAgICAgICAgJzwvZGl2PicsXHJcbiAgICAgICAgJzwvZGl2PidcclxuICAgICAgXS5qb2luKCcnKTtcclxuXHJcbiAgICAgIHZhciBib3ggPSAkKGh0bWwpO1xyXG5cclxuICAgICAgJCgnYm9keScpLmFwcGVuZChib3gpO1xyXG4gICAgfVxyXG5cclxuICAgICQoJy5hcnRpY2xlLXNoYXJlLWJveC5vbicpLmhpZGUoKTtcclxuXHJcbiAgICBib3guY3NzKHtcclxuICAgICAgdG9wOiBvZmZzZXQudG9wICsgMjUsXHJcbiAgICAgIGxlZnQ6IG9mZnNldC5sZWZ0XHJcbiAgICB9KS5hZGRDbGFzcygnb24nKTtcclxuICB9KS5vbignY2xpY2snLCAnLmFydGljbGUtc2hhcmUtYm94JywgZnVuY3Rpb24oZSl7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH0pLm9uKCdjbGljaycsICcuYXJ0aWNsZS1zaGFyZS1ib3gtaW5wdXQnLCBmdW5jdGlvbigpe1xyXG4gICAgJCh0aGlzKS5zZWxlY3QoKTtcclxuICB9KS5vbignY2xpY2snLCAnLmFydGljbGUtc2hhcmUtYm94LWxpbmsnLCBmdW5jdGlvbihlKXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgd2luZG93Lm9wZW4odGhpcy5ocmVmLCAnYXJ0aWNsZS1zaGFyZS1ib3gtd2luZG93LScgKyBEYXRlLm5vdygpLCAnd2lkdGg9NTAwLGhlaWdodD00NTAnKTtcclxuICB9KTtcclxuXHJcbiAgLy8gQ2FwdGlvblxyXG4gICQoJy5hcnRpY2xlLWVudHJ5JykuZWFjaChmdW5jdGlvbihpKXtcclxuICAgICQodGhpcykuZmluZCgnaW1nJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5oYXNDbGFzcygnZmFuY3lib3gnKSkgcmV0dXJuO1xyXG5cclxuICAgICAgdmFyIGFsdCA9IHRoaXMuYWx0O1xyXG5cclxuICAgICAgaWYgKGFsdCkgJCh0aGlzKS5hZnRlcignPHNwYW4gY2xhc3M9XCJjYXB0aW9uXCI+JyArIGFsdCArICc8L3NwYW4+Jyk7XHJcblxyXG4gICAgICAkKHRoaXMpLndyYXAoJzxhIGhyZWY9XCInICsgdGhpcy5zcmMgKyAnXCIgdGl0bGU9XCInICsgYWx0ICsgJ1wiIGNsYXNzPVwiZmFuY3lib3hcIj48L2E+Jyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKHRoaXMpLmZpbmQoJy5mYW5jeWJveCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgJCh0aGlzKS5hdHRyKCdyZWwnLCAnYXJ0aWNsZScgKyBpKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICBpZiAoJC5mYW5jeWJveCl7XHJcbiAgICAkKCcuZmFuY3lib3gnKS5mYW5jeWJveCgpO1xyXG4gIH1cclxuXHJcbiAgLy8gTW9iaWxlIG5hdlxyXG4gIHZhciAkY29udGFpbmVyID0gJCgnI2NvbnRhaW5lcicpLFxyXG4gICAgaXNNb2JpbGVOYXZBbmltID0gZmFsc2UsXHJcbiAgICBtb2JpbGVOYXZBbmltRHVyYXRpb24gPSAyMDA7XHJcblxyXG4gIHZhciBzdGFydE1vYmlsZU5hdkFuaW0gPSBmdW5jdGlvbigpe1xyXG4gICAgaXNNb2JpbGVOYXZBbmltID0gdHJ1ZTtcclxuICB9O1xyXG5cclxuICB2YXIgc3RvcE1vYmlsZU5hdkFuaW0gPSBmdW5jdGlvbigpe1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICBpc01vYmlsZU5hdkFuaW0gPSBmYWxzZTtcclxuICAgIH0sIG1vYmlsZU5hdkFuaW1EdXJhdGlvbik7XHJcbiAgfVxyXG5cclxuICAkKCcjbWFpbi1uYXYtdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIGlmIChpc01vYmlsZU5hdkFuaW0pIHJldHVybjtcclxuXHJcbiAgICBzdGFydE1vYmlsZU5hdkFuaW0oKTtcclxuICAgICRjb250YWluZXIudG9nZ2xlQ2xhc3MoJ21vYmlsZS1uYXYtb24nKTtcclxuICAgIHN0b3BNb2JpbGVOYXZBbmltKCk7XHJcbiAgfSk7XHJcblxyXG4gICQoJyN3cmFwJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIGlmIChpc01vYmlsZU5hdkFuaW0gfHwgISRjb250YWluZXIuaGFzQ2xhc3MoJ21vYmlsZS1uYXYtb24nKSkgcmV0dXJuO1xyXG5cclxuICAgICRjb250YWluZXIucmVtb3ZlQ2xhc3MoJ21vYmlsZS1uYXYtb24nKTtcclxuICB9KTtcclxufSkoalF1ZXJ5KTtcclxuaW1wb3J0IGNvZGVVbmZvbGQgZnJvbSAnLi9jb2RlLXVuZm9sZCc7XHJcbmNvZGVVbmZvbGQoKTsiXX0=
