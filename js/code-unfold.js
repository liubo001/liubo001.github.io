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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMveWlsaWEvc291cmNlL2pzL2NvZGUtdW5mb2xkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FDQUEsSUFBTSxlQUFlLEdBQUcsR0FBeEI7QUFDQSxJQUFNLFVBQVUsR0FBRyxFQUFuQixDLENBRUE7O0FBQ0EsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVLEVBQVYsQ0FBYSxPQUFiLEVBQXNCLHFCQUF0QixFQUE2QyxZQUFZO0FBQ3ZELEVBQUEsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRLE9BQVIsQ0FBZ0IseUJBQWhCLEVBQTJDLFFBQTNDLENBQW9ELElBQXBEO0FBQ0QsQ0FGRCxFLENBR0E7O0FBQ0EsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVLEVBQVYsQ0FBYSxPQUFiLEVBQXNCLHNCQUF0QixFQUE4QyxZQUFZO0FBQ3hELE1BQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUSxPQUFSLENBQWdCLHlCQUFoQixFQUEyQyxXQUEzQyxDQUF1RCxJQUF2RCxDQUFuQjtBQUNBLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVSxTQUFWLEVBQWY7QUFDQSxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsTUFBWCxHQUFvQixHQUF0QztBQUNBLEVBQUEsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRLEdBQVIsQ0FBWSxLQUFaLEVBQW1CLENBQW5COztBQUNBLE1BQUksTUFBTSxHQUFHLFNBQWIsRUFBd0I7QUFDdEI7QUFDQSxJQUFBLENBQUMsQ0FBQyxZQUFELENBQUQsQ0FBZ0IsT0FBaEIsQ0FBd0I7QUFDdEIsTUFBQSxTQUFTLEVBQUUsVUFBVSxDQUFDLE1BQVgsR0FBb0IsR0FBcEIsR0FBMEI7QUFEZixLQUF4QixFQUVHLEdBRkg7QUFHRDtBQUNGLENBWEQsRSxDQVlBOztBQUNBLENBQUMsQ0FBQyxNQUFELENB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QU0sR0FBRyxlQUFiLEVBQThCO0FBQzVCO0FBQ0EsVUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLEtBQUQsRUFBUSxNQUFSLENBQTlCO0FBQ0EsTUFBQSxVQUFVLENBQUMsSUFBWCxDQUFnQjtBQUNkLFFBQUEsVUFBVSxFQUFWLFVBRGM7QUFFZCxRQUFBLE1BQU0sRUFBTixNQUZjO0FBR2QsUUFBQSxLQUFLLEVBQUUsVUFBVSxDQUFDLElBQVgsQ0FBZ0Isc0JBQWhCLENBSE87QUFJZCxRQUFBLHNCQUFzQixFQUFFLEtBQUssV0FBTCxHQUFtQixLQUFLO0FBSmxDLE9BQWhCO0FBTUQ7QUFDRixHQWxCRDtBQW1CRCxDQXBCRDs7ZUFzQmUsRyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IENPREVfTUFYX0hFSUdIVCA9IDIwMDtcclxuY29uc3QgY29udGFpbmVycyA9IFtdO1xyXG5cclxuLy8g5bGV5byAXHJcbiQoJ2JvZHknKS5vbignY2xpY2snLCAnLmpzX3VuZm9sZF9jb2RlX2J0bicsIGZ1bmN0aW9uICgpIHtcclxuICAkKHRoaXMpLmNsb3Nlc3QoJy5qc19oaWdobGlnaHRfY29udGFpbmVyJykuYWRkQ2xhc3MoJ29uJyk7XHJcbn0pO1xyXG4vLyDmlLbotbdcclxuJCgnYm9keScpLm9uKCdjbGljaycsICcuanNfcmV0cmFjdF9jb2RlX2J0bicsIGZ1bmN0aW9uICgpIHtcclxuICBjb25zdCAkY29udGFpbmVyID0gJCh0aGlzKS5jbG9zZXN0KCcuanNfaGlnaGxpZ2h0X2NvbnRhaW5lcicpLnJlbW92ZUNsYXNzKCdvbicpO1xyXG4gIGNvbnN0IHdpblRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICBjb25zdCBvZmZzZXRUb3AgPSAkY29udGFpbmVyLm9mZnNldCgpLnRvcDtcclxuICAkKHRoaXMpLmNzcygndG9wJywgMCk7XHJcbiAgaWYgKHdpblRvcCA+IG9mZnNldFRvcCkge1xyXG4gICAgLy8g6K6+572u5rua5Yqo5p2h5L2N572uXHJcbiAgICAkKCdib2R5LCBodG1sJykuYW5pbWF0ZSh7XHJcbiAgICAgIHNjcm9sbFRvcDogJGNvbnRhaW5lci5vZmZzZXQoKS50b3AgLSBDT0RFX01BWF9IRUlHSFRcclxuICAgIH0sIDYwMCk7XHJcbiAgfVxyXG59KTtcclxuLy8g5rua5Yqo5LqL5Lu277yM6Kem5Y+R5Yqo55S75pWI5p6cXHJcbiQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xyXG4gIGNvbnN0IHNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICBjb25zdCB0ZW1wID0gW107XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBpdGVtID0gY29udGFpbmVyc1tpXTtcclxuICAgIGNvbnN0IHsgJGNvbnRhaW5lciwgaGVpZ2h0LCAkaGlkZSwgaGFzSG9yaXpvbnRhbFNjcm9sbGJhciB9ID0gaXRlbTtcclxuICAgIGlmICgkY29udGFpbmVyLmNsb3Nlc3QoJ2JvZHknKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgLy8g5aaC5p6cICRjb250YWluZXIg5YWD57Sg5bey57uP5LiN5Zyo6aG16Z2i5LiKLCDliJnliKDpmaTor6XlhYPntKBcclxuICAgICAgLy8g6Ziy5q2icGpheOmhtemdoui3s+i9rOS5i+WQju+8jOWFg+e0oOacquWIoOmZpFxyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuICAgIHRlbXAucHVzaChpdGVtKTtcclxuICAgIGlmICghJGNvbnRhaW5lci5oYXNDbGFzcygnb24nKSkge1xyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuICAgIGNvbnN0IG9mZnNldFRvcCA9ICRjb250YWluZXIub2Zmc2V0KCkudG9wO1xyXG4gICAgY29uc3QgaGlkZUJ0bkhlaWdodCA9ICRoaWRlLm91dGVySGVpZ2h0KCk7XHJcbiAgICAvLyDlh4/ljrvmjInpkq7pq5jluqbvvIzlh4/ljrvlupXpg6jmu5rliqjmnaHpq5jluqZcclxuICAgIGNvbnN0IG1heFRvcCA9IHBhcnNlSW50KGhlaWdodCAtIChoYXNIb3Jpem9udGFsU2Nyb2xsYmFyID8gMTcgOiAwKSAtIGhpZGVCdG5IZWlnaHQpO1xyXG4gICAgbGV0IHRvcCA9IHBhcnNlSW50KFxyXG4gICAgICBNYXRoLm1pbihcclxuICAgICAgICBNYXRoLm1heChzY3JvbGxUb3AgLSBvZmZzZXRUb3AsIDApLCAvLyDlpoLmnpzlsI/kuo4gMCDvvIzliJnlj5YgMFxyXG4gICAgICAgIG1heFRvcCwvLyDlpoLmnpzlpKfkuo4gaGVpZ2h0IO+8jOWImeWPliBoZWlnaHRcclxuICAgICAgKVxyXG4gICAgKTtcclxuICAgIC8vIOagueaNriBzaW4g5puy57q/6K6+572uXCLmlLbotbfku6PnoIFcIuS9jee9rlxyXG4gICAgY29uc3QgaGFsZkhlaWdodCA9IHBhcnNlSW50KCQod2luZG93KS5oZWlnaHQoKSAvIDIgKiBNYXRoLnNpbigodG9wIC8gbWF4VG9wKSAqIDkwICogKDIgKiBNYXRoLlBJLzM2MCkpKTtcclxuICAgICRoaWRlLmNzcygndG9wJywgTWF0aC5taW4odG9wICsgaGFsZkhlaWdodCwgbWF4VG9wKSk7XHJcbiAgfVxyXG4gIGNvbnRhaW5lcnMgPSB0ZW1wO1xyXG59KTtcclxuXHJcbi8vIOa3u+WKoOmakOiXj+WuueWZqFxyXG5jb25zdCBhZGRDb2RlV3JhcCA9ICgkbm9kZSkgPT4ge1xyXG4gIGNvbnN0ICRjb250YWluZXIgPSAkbm9kZS53cmFwKCc8ZGl2IGNsYXNzPVwianNfaGlnaGxpZ2h0X2NvbnRhaW5lciBoaWdobGlnaHQtY29udGFpbmVyXCI+PGRpdiBjbGFzcz1cImhpZ2hsaWdodC13cmFwXCI+PC9kaXY+PC9kaXY+JykuY2xvc2VzdCgnLmpzX2hpZ2hsaWdodF9jb250YWluZXInKTtcclxuXHJcbiAgLy8g5bqV6YOoIFwi5bGV5byA5Luj56CBXCIg5LiOIOS+p+i+ueagjyBcIuaUtui1t+S7o+eggVwiXHJcbiAgY29uc3QgJGJ0biA9ICQoYFxyXG4gICAgPGRpdiBjbGFzcz1cImhpZ2hsaWdodC1mb290ZXJcIj5cclxuICAgICAgPGEgY2xhc3M9XCJqc191bmZvbGRfY29kZV9idG4gc2hvdy1idG5cIiBocmVmPVwiamF2YXNjcmlwdDo7XCI+5bGV5byA5Luj56CBPGkgY2xhc3M9XCJmYSBmYS1hbmdsZS1kb3duXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPjwvYT5cclxuICAgIDwvZGl2PlxyXG4gICAgPGEgY2xhc3M9XCJqc19yZXRyYWN0X2NvZGVfYnRuIGhpZGUtYnRuXCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiPjxpIGNsYXNzPVwiZmEgZmEtYW5nbGUtdXBcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+5pS26LW35Luj56CBPC9hPlxyXG4gIGApO1xyXG5cclxuICAkY29udGFpbmVyLmFwcGVuZCgkYnRuKTtcclxuICByZXR1cm4gJGNvbnRhaW5lcjtcclxufTtcclxuXHJcbmNvbnN0IHJldCA9ICgpID0+IHtcclxuICAkKCcuaGlnaGxpZ2h0JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyDpmLLmraLph43lpI3muLLmn5NcclxuICAgIGlmICh0aGlzLl9fcmVuZGVyX18gPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9fcmVuZGVyX18gPSB0cnVlO1xyXG4gICAgY29uc3QgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gJCh0aGlzKS5vdXRlckhlaWdodCgpO1xyXG4gICAgaWYgKGhlaWdodCA+IENPREVfTUFYX0hFSUdIVCkge1xyXG4gICAgICAvLyDmt7vliqDlsZXlvIAm5pS26LW35a655ZmoXHJcbiAgICAgIGNvbnN0ICRjb250YWluZXIgPSBhZGRDb2RlV3JhcCgkdGhpcywgaGVpZ2h0KTtcclxuICAgICAgY29udGFpbmVycy5wdXNoKHtcclxuICAgICAgICAkY29udGFpbmVyLFxyXG4gICAgICAgIGhlaWdodCxcclxuICAgICAgICAkaGlkZTogJGNvbnRhaW5lci5maW5kKCcuanNfcmV0cmFjdF9jb2RlX2J0bicpLFxyXG4gICAgICAgIGhhc0hvcml6b250YWxTY3JvbGxiYXI6IHRoaXMuc2Nyb2xsV2lkdGggPiB0aGlzLm9mZnNldFdpZHRoLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJldDsiXX0=
