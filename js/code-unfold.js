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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMvbGFuZHNjYXBlL3NvdXJjZS9qcy9jb2RlLXVuZm9sZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQ0FBLElBQU0sZUFBZSxHQUFHLEdBQXhCO0FBQ0EsSUFBTSxVQUFVLEdBQUcsRUFBbkIsQyxDQUVBOztBQUNBLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVSxFQUFWLENBQWEsT0FBYixFQUFzQixxQkFBdEIsRUFBNkMsWUFBWTtBQUN2RCxFQUFBLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUSxPQUFSLENBQWdCLHlCQUFoQixFQUEyQyxRQUEzQyxDQUFvRCxJQUFwRDtBQUNELENBRkQsRSxDQUdBOztBQUNBLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVSxFQUFWLENBQWEsT0FBYixFQUFzQixzQkFBdEIsRUFBOEMsWUFBWTtBQUN4RCxNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBRCxDQUFELENBQVEsT0FBUixDQUFnQix5QkFBaEIsRUFBMkMsV0FBM0MsQ0FBdUQsSUFBdkQsQ0FBbkI7QUFDQSxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBRCxDQUFELENBQVUsU0FBVixFQUFmO0FBQ0EsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLE1BQVgsR0FBb0IsR0FBdEM7QUFDQSxFQUFBLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUSxHQUFSLENBQVksS0FBWixFQUFtQixDQUFuQjs7QUFDQSxNQUFJLE1BQU0sR0FBRyxTQUFiLEVBQXdCO0FBQ3RCO0FBQ0EsSUFBQSxDQUFDLENBQUMsWUFBRCxDQUFELENBQWdCLE9BQWhCLENBQXdCO0FBQ3RCLE1BQUEsU0FBUyxFQUFFLFVBQVUsQ0FBQyxNQUFYLEdBQW9CLEdBQXBCLEdBQTBCO0FBRGYsS0FBeEIsRUFFRyxHQUZIO0FBR0Q7QUFDRixDQVhELEUsQ0FZQTs7QUFDQSxDQUFDLENBQUMsTUFBRCxDQUFELENBQVUsRUFBVixDQUFhLFFBQWIsRUFBdUIsWUFBWTtBQUNqQyxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsTUFBRCxDQUFELENBQVUsU0FBVixFQUFsQjtBQUNBLE1BQU0sSUFBSSxHQUFHLEVBQWI7O0FBQ0EsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFiLEVBQWdCLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBL0IsRUFBdUMsQ0FBQyxFQUF4QyxFQUE0QztBQUMxQyxRQUFNLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBRCxDQUF2QjtBQUQwQyxRQUVsQyxVQUZrQyxHQUVvQixJQUZwQixDQUVsQyxVQUZrQztBQUFBLFFBRXRCLE1BRnNCLEdBRW9CLElBRnBCLENBRXRCLE1BRnNCO0FBQUEsUUFFZCxLQUZjLEdBRW9CLElBRnBCLENBRWQsS0FGYztBQUFBLFFBRVAsc0JBRk8sR0FFb0IsSUFGcEIsQ0FFUCxzQkFGTzs7QUFHMUMsUUFBSSxVQUFVLENBQUMsT0FBWCxDQUFtQixNQUFuQixFQUEyQixNQUEzQixLQUFzQyxDQUExQyxFQUE2QztBQUMzQztBQUNBO0FBQ0E7QUFDRDs7QUFDRCxJQUFBLElBQUksQ0FBQyxJQUFMLENBQVUsSUFBVjs7QUFDQSxRQUFJLENBQUMsVUFBVSxDQUFDLFFBQVgsQ0FBb0IsSUFBcEIsQ0FBTCxFQUFnQztBQUM5QjtBQUNEOztBQUNELFFBQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxNQUFYLEdBQW9CLEdBQXRDO0FBQ0EsUUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLFdBQU4sRUFBdEIsQ0FiMEMsQ0FjMUM7O0FBQ0EsUUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sSUFBSSxzQkFBc0IsR0FBRyxFQUFILEdBQVEsQ0FBbEMsQ0FBTixHQUE2QyxhQUE5QyxDQUF2QjtBQUNBLFFBQUksR0FBRyxHQUFHLFFBQVEsQ0FDaEIsSUFBSSxDQUFDLEdBQUwsQ0FDRSxJQUFJLENBQUMsR0FBTCxDQUFTLFNBQVMsR0FBRyxTQUFyQixFQUFnQyxDQUFoQyxDQURGLEVBQ3NDO0FBQ3BDLElBQUEsTUFGRixDQUVTO0FBRlQsS0FEZ0IsQ0FBbEIsQ0FoQjBDLENBc0IxQzs7QUFDQSxRQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVLE1BQVYsS0FBcUIsQ0FBckIsR0FBeUIsSUFBSSxDQUFDLEdBQUwsQ0FBVSxHQUFHLEdBQUcsTUFBUCxHQUFpQixFQUFqQixJQUF1QixJQUFJLElBQUksQ0FBQyxFQUFULEdBQVksR0FBbkMsQ0FBVCxDQUExQixDQUEzQjtBQUNBLElBQUEsS0FBSyxDQUFDLEdBQU4sQ0FBVSxLQUFWLEVBQWlCLElBQUksQ0FBQyxHQUFMLENBQVMsR0FBRyxHQUFHLFVBQWYsRUFBMkIsTUFBM0IsQ0FBakI7QUFDRDs7QUFDRCxFQUFBLFVBQVUsa0NBQUcsSUFBSCxDQUFWO0FBQ0QsQ0E5QkQsRSxDQWdDQTs7QUFDQSxJQUFNLFdBQVcsR0FBRyxTQUFkLFdBQWMsQ0FBQyxLQUFELEVBQVc7QUFDN0IsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQU4sQ0FBVyxrR0FBWCxFQUErRyxPQUEvRyxDQUF1SCx5QkFBdkgsQ0FBbkIsQ0FENkIsQ0FHN0I7O0FBQ0EsTUFBTSxJQUFJLEdBQUcsQ0FBQywyV0FBZDtBQU9BLEVBQUEsVUFBVSxDQUFDLE1BQVgsQ0FBa0IsSUFBbEI7QUFDQSxTQUFPLFVBQVA7QUFDRCxDQWJEOztBQWVBLElBQU0sR0FBRyxHQUFHLFNBQU4sR0FBTSxHQUFNO0FBQ2hCLEVBQUEsQ0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQixJQUFoQixDQUFxQixZQUFZO0FBQy9CO0FBQ0EsUUFBSSxLQUFLLFVBQUwsS0FBb0IsSUFBeEIsRUFBOEI7QUFDNUIsYUFBTyxJQUFQO0FBQ0Q7O0FBQ0QsU0FBSyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsUUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUQsQ0FBZjtBQUNBLFFBQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUSxXQUFSLEVBQWY7O0FBQ0EsUUFBSSxNQUFNLEdBQUcsZUFBYixFQUE4QjtBQUM1QjtBQUNBLFVBQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxLQUFELEVBQVEsTUFBUixDQUE5QjtBQUNBLE1BQUEsVUFBVSxDQUFDLElBQVgsQ0FBZ0I7QUFDZCxRQUFBLFVBQVUsRUFBVixVQURjO0FBRWQsUUFBQSxNQUFNLEVBQU4sTUFGYztBQUdkLFFBQUEsS0FBSyxFQUFFLFVBQVUsQ0FBQyxJQUFYLENBQWdCLHNCQUFoQixDQUhPO0FBSWQsUUFBQSxzQkFBc0IsRUFBRSxLQUFLLFdBQUwsR0FBbUIsS0FBSztBQUpsQyxPQUFoQjtBQU1EO0FBQ0YsR0FsQkQ7QUFtQkQsQ0FwQkQ7O2VBc0JlLEciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBDT0RFX01BWF9IRUlHSFQgPSAyMDA7XHJcbmNvbnN0IGNvbnRhaW5lcnMgPSBbXTtcclxuXHJcbi8vIOWxleW8gFxyXG4kKCdib2R5Jykub24oJ2NsaWNrJywgJy5qc191bmZvbGRfY29kZV9idG4nLCBmdW5jdGlvbiAoKSB7XHJcbiAgJCh0aGlzKS5jbG9zZXN0KCcuanNfaGlnaGxpZ2h0X2NvbnRhaW5lcicpLmFkZENsYXNzKCdvbicpO1xyXG59KTtcclxuLy8g5pS26LW3XHJcbiQoJ2JvZHknKS5vbignY2xpY2snLCAnLmpzX3JldHJhY3RfY29kZV9idG4nLCBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc3QgJGNvbnRhaW5lciA9ICQodGhpcykuY2xvc2VzdCgnLmpzX2hpZ2hsaWdodF9jb250YWluZXInKS5yZW1vdmVDbGFzcygnb24nKTtcclxuICBjb25zdCB3aW5Ub3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgY29uc3Qgb2Zmc2V0VG9wID0gJGNvbnRhaW5lci5vZmZzZXQoKS50b3A7XHJcbiAgJCh0aGlzKS5jc3MoJ3RvcCcsIDApO1xyXG4gIGlmICh3aW5Ub3AgPiBvZmZzZXRUb3ApIHtcclxuICAgIC8vIOiuvue9rua7muWKqOadoeS9jee9rlxyXG4gICAgJCgnYm9keSwgaHRtbCcpLmFuaW1hdGUoe1xyXG4gICAgICBzY3JvbGxUb3A6ICRjb250YWluZXIub2Zmc2V0KCkudG9wIC0gQ09ERV9NQVhfSEVJR0hUXHJcbiAgICB9LCA2MDApO1xyXG4gIH1cclxufSk7XHJcbi8vIOa7muWKqOS6i+S7tu+8jOinpuWPkeWKqOeUu+aViOaenFxyXG4kKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcclxuICBjb25zdCBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgY29uc3QgdGVtcCA9IFtdO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgaXRlbSA9IGNvbnRhaW5lcnNbaV07XHJcbiAgICBjb25zdCB7ICRjb250YWluZXIsIGhlaWdodCwgJGhpZGUsIGhhc0hvcml6b250YWxTY3JvbGxiYXIgfSA9IGl0ZW07XHJcbiAgICBpZiAoJGNvbnRhaW5lci5jbG9zZXN0KCdib2R5JykubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIC8vIOWmguaenCAkY29udGFpbmVyIOWFg+e0oOW3sue7j+S4jeWcqOmhtemdouS4iiwg5YiZ5Yig6Zmk6K+l5YWD57SgXHJcbiAgICAgIC8vIOmYsuatonBqYXjpobXpnaLot7PovazkuYvlkI7vvIzlhYPntKDmnKrliKDpmaRcclxuICAgICAgY29udGludWU7XHJcbiAgICB9XHJcbiAgICB0ZW1wLnB1c2goaXRlbSk7XHJcbiAgICBpZiAoISRjb250YWluZXIuaGFzQ2xhc3MoJ29uJykpIHtcclxuICAgICAgY29udGludWU7XHJcbiAgICB9XHJcbiAgICBjb25zdCBvZmZzZXRUb3AgPSAkY29udGFpbmVyLm9mZnNldCgpLnRvcDtcclxuICAgIGNvbnN0IGhpZGVCdG5IZWlnaHQgPSAkaGlkZS5vdXRlckhlaWdodCgpO1xyXG4gICAgLy8g5YeP5Y675oyJ6ZKu6auY5bqm77yM5YeP5Y675bqV6YOo5rua5Yqo5p2h6auY5bqmXHJcbiAgICBjb25zdCBtYXhUb3AgPSBwYXJzZUludChoZWlnaHQgLSAoaGFzSG9yaXpvbnRhbFNjcm9sbGJhciA/IDE3IDogMCkgLSBoaWRlQnRuSGVpZ2h0KTtcclxuICAgIGxldCB0b3AgPSBwYXJzZUludChcclxuICAgICAgTWF0aC5taW4oXHJcbiAgICAgICAgTWF0aC5tYXgoc2Nyb2xsVG9wIC0gb2Zmc2V0VG9wLCAwKSwgLy8g5aaC5p6c5bCP5LqOIDAg77yM5YiZ5Y+WIDBcclxuICAgICAgICBtYXhUb3AsLy8g5aaC5p6c5aSn5LqOIGhlaWdodCDvvIzliJnlj5YgaGVpZ2h0XHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgICAvLyDmoLnmja4gc2luIOabsue6v+iuvue9rlwi5pS26LW35Luj56CBXCLkvY3nva5cclxuICAgIGNvbnN0IGhhbGZIZWlnaHQgPSBwYXJzZUludCgkKHdpbmRvdykuaGVpZ2h0KCkgLyAyICogTWF0aC5zaW4oKHRvcCAvIG1heFRvcCkgKiA5MCAqICgyICogTWF0aC5QSS8zNjApKSk7XHJcbiAgICAkaGlkZS5jc3MoJ3RvcCcsIE1hdGgubWluKHRvcCArIGhhbGZIZWlnaHQsIG1heFRvcCkpO1xyXG4gIH1cclxuICBjb250YWluZXJzID0gdGVtcDtcclxufSk7XHJcblxyXG4vLyDmt7vliqDpmpDol4/lrrnlmahcclxuY29uc3QgYWRkQ29kZVdyYXAgPSAoJG5vZGUpID0+IHtcclxuICBjb25zdCAkY29udGFpbmVyID0gJG5vZGUud3JhcCgnPGRpdiBjbGFzcz1cImpzX2hpZ2hsaWdodF9jb250YWluZXIgaGlnaGxpZ2h0LWNvbnRhaW5lclwiPjxkaXYgY2xhc3M9XCJoaWdobGlnaHQtd3JhcFwiPjwvZGl2PjwvZGl2PicpLmNsb3Nlc3QoJy5qc19oaWdobGlnaHRfY29udGFpbmVyJyk7XHJcblxyXG4gIC8vIOW6lemDqCBcIuWxleW8gOS7o+eggVwiIOS4jiDkvqfovrnmoI8gXCLmlLbotbfku6PnoIFcIlxyXG4gIGNvbnN0ICRidG4gPSAkKGBcclxuICAgIDxkaXYgY2xhc3M9XCJoaWdobGlnaHQtZm9vdGVyXCI+XHJcbiAgICAgIDxhIGNsYXNzPVwianNfdW5mb2xkX2NvZGVfYnRuIHNob3ctYnRuXCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiPuWxleW8gOS7o+eggTxpIGNsYXNzPVwiZmEgZmEtYW5nbGUtZG93blwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L2E+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxhIGNsYXNzPVwianNfcmV0cmFjdF9jb2RlX2J0biBoaWRlLWJ0blwiIGhyZWY9XCJqYXZhc2NyaXB0OjtcIj48aSBjbGFzcz1cImZhIGZhLWFuZ2xlLXVwXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPuaUtui1t+S7o+eggTwvYT5cclxuICBgKTtcclxuXHJcbiAgJGNvbnRhaW5lci5hcHBlbmQoJGJ0bik7XHJcbiAgcmV0dXJuICRjb250YWluZXI7XHJcbn07XHJcblxyXG5jb25zdCByZXQgPSAoKSA9PiB7XHJcbiAgJCgnLmhpZ2hsaWdodCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgLy8g6Ziy5q2i6YeN5aSN5riy5p+TXHJcbiAgICBpZiAodGhpcy5fX3JlbmRlcl9fID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fX3JlbmRlcl9fID0gdHJ1ZTtcclxuICAgIGNvbnN0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgIGNvbnN0IGhlaWdodCA9ICQodGhpcykub3V0ZXJIZWlnaHQoKTtcclxuICAgIGlmIChoZWlnaHQgPiBDT0RFX01BWF9IRUlHSFQpIHtcclxuICAgICAgLy8g5re75Yqg5bGV5byAJuaUtui1t+WuueWZqFxyXG4gICAgICBjb25zdCAkY29udGFpbmVyID0gYWRkQ29kZVdyYXAoJHRoaXMsIGhlaWdodCk7XHJcbiAgICAgIGNvbnRhaW5lcnMucHVzaCh7XHJcbiAgICAgICAgJGNvbnRhaW5lcixcclxuICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgJGhpZGU6ICRjb250YWluZXIuZmluZCgnLmpzX3JldHJhY3RfY29kZV9idG4nKSxcclxuICAgICAgICBoYXNIb3Jpem9udGFsU2Nyb2xsYmFyOiB0aGlzLnNjcm9sbFdpZHRoID4gdGhpcy5vZmZzZXRXaWR0aCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCByZXQ7Il19
