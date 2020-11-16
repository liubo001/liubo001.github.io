(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var backTop = function backTop(domE, ctn, distance) {
  if (!domE) return;
  var timer = null;
  var _onscroll = window.onscroll,
      _onclick = domE.onclick;
  (ctn || window).onscroll = throttle(function () {
    typeof _onscroll === 'function' && _onscroll.apply(this, arguments);
    toggleDomE();
  }, 100);

  domE.onclick = function () {
    typeof _onclick === 'function' && _onclick.apply(this, arguments);
    var baseCt = ctn.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
    timer = setInterval(function () {
      //设置一个计时器
      var ct = ctn.scrollTop || document.documentElement.scrollTop || document.body.scrollTop; //获取距离顶部的距离

      var diff = Math.max(10, ct / 6);
      ct -= diff;

      if (ct > 0) {
        //如果与顶部的距离大于零
        ctn.scrollTop = ctn.scrollTop - diff;
        window.scrollTo(0, ct); //向上移动10px
      } else {
        //如果距离小于等于零
        ctn.scrollTop = 0;
        window.scrollTo(0, 0); //移动到顶部

        clearInterval(timer); //清除计时器
      }
    }, 10); //隔10ms执行一次前面的function，展现一种平滑滑动效果
  };

  function toggleDomE() {
    domE.style.display = (ctn.scrollTop || document.documentElement.scrollTop || document.body.scrollTop) > (distance || 500) ? 'block' : 'none';
  }

  function throttle(func, wait) {
    var timer = null;
    return function () {
      var self = this,
          args = arguments;
      if (timer) clearTimeout(timer);
      timer = setTimeout(function () {
        return typeof func === 'function' && func.apply(self, args);
      }, wait);
    };
  }
};

function init() {
  backTop(document.getElementById('js-jump-container'), document.getElementById('container'));
}

module.exports = {
  init: init
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMveWlsaWEvc291cmNlL2pzL2FzaWRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLE9BQU8sR0FBRyxTQUFWLE9BQVUsQ0FBVSxJQUFWLEVBQWdCLEdBQWhCLEVBQXFCLFFBQXJCLEVBQStCO0FBQ3pDLE1BQUksQ0FBQyxJQUFMLEVBQVc7QUFDWCxNQUFJLEtBQUssR0FBRyxJQUFaO0FBQ0EsTUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLFFBQXZCO0FBQUEsTUFDSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BRHBCO0FBRUEsR0FBQyxHQUFHLElBQUksTUFBUixFQUFnQixRQUFoQixHQUEyQixRQUFRLENBQUMsWUFBWTtBQUM1QyxXQUFPLFNBQVAsS0FBcUIsVUFBckIsSUFBbUMsU0FBUyxDQUFDLEtBQVYsQ0FBZ0IsSUFBaEIsRUFBc0IsU0FBdEIsQ0FBbkM7QUFDQSxJQUFBLFVBQVU7QUFDYixHQUhrQyxFQUdoQyxHQUhnQyxDQUFuQzs7QUFJQSxFQUFBLElBQUksQ0FBQyxPQUFMLEdBQWUsWUFBWTtBQUN2QixXQUFPLFFBQVAsS0FBb0IsVUFBcEIsSUFBa0MsUUFBUSxDQUFDLEtBQVQsQ0FBZSxJQUFmLEVBQXFCLFNBQXJCLENBQWxDO0FBQ0EsUUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQUosSUFBaUIsUUFBUSxDQUFDLGVBQVQsQ0FBeUIsU0FBMUMsSUFBdUQsUUFBUSxDQUFDLElBQVQsQ0FBYyxTQUFsRjtBQUNBLElBQUEsS0FBSyxHQUFHLFdBQVcsQ0FBQyxZQUFZO0FBQUU7QUFDOUIsVUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLFNBQUosSUFBaUIsUUFBUSxDQUFDLGVBQVQsQ0FBeUIsU0FBMUMsSUFBdUQsUUFBUSxDQUFDLElBQVQsQ0FBYyxTQUE5RSxDQUQ0QixDQUM2RDs7QUFDekYsVUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUwsQ0FBUyxFQUFULEVBQWEsRUFBRSxHQUFHLENBQWxCLENBQVg7QUFDQSxNQUFBLEVBQUUsSUFBSSxJQUFOOztBQUNBLFVBQUksRUFBRSxHQUFHLENBQVQsRUFBWTtBQUFDO0FBQ1QsUUFBQSxHQUFHLENBQUMsU0FBSixHQUFnQixHQUFHLENBQUMsU0FBSixHQUFnQixJQUFoQztBQUNBLFFBQUEsTUFBTSxDQUFDLFFBQVAsQ0FBZ0IsQ0FBaEIsRUFBbUIsRUFBbkIsRUFGUSxDQUVlO0FBQzFCLE9BSEQsTUFHTztBQUFDO0FBQ0osUUFBQSxHQUFHLENBQUMsU0FBSixHQUFnQixDQUFoQjtBQUNBLFFBQUEsTUFBTSxDQUFDLFFBQVAsQ0FBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFGRyxDQUVtQjs7QUFDdEIsUUFBQSxhQUFhLENBQUMsS0FBRCxDQUFiLENBSEcsQ0FHa0I7QUFDeEI7QUFDSixLQVprQixFQVloQixFQVpnQixDQUFuQixDQUh1QixDQWVoQjtBQUNWLEdBaEJEOztBQWtCQSxXQUFTLFVBQVQsR0FBc0I7QUFDbEIsSUFBQSxJQUFJLENBQUMsS0FBTCxDQUFXLE9BQVgsR0FBcUIsQ0FBQyxHQUFHLENBQUMsU0FBSixJQUFpQixRQUFRLENBQUMsZUFBVCxDQUF5QixTQUExQyxJQUF1RCxRQUFRLENBQUMsSUFBVCxDQUFjLFNBQXRFLEtBQW9GLFFBQVEsSUFBSSxHQUFoRyxJQUF1RyxPQUF2RyxHQUFpSCxNQUF0STtBQUNIOztBQUNELFdBQVMsUUFBVCxDQUFrQixJQUFsQixFQUF3QixJQUF4QixFQUE4QjtBQUMxQixRQUFJLEtBQUssR0FBRyxJQUFaO0FBQ0EsV0FBTyxZQUFZO0FBQ2YsVUFBSSxJQUFJLEdBQUcsSUFBWDtBQUFBLFVBQWlCLElBQUksR0FBRyxTQUF4QjtBQUNBLFVBQUksS0FBSixFQUFXLFlBQVksQ0FBQyxLQUFELENBQVo7QUFDWCxNQUFBLEtBQUssR0FBRyxVQUFVLENBQUMsWUFBWTtBQUMzQixlQUFPLE9BQU8sSUFBUCxLQUFnQixVQUFoQixJQUE4QixJQUFJLENBQUMsS0FBTCxDQUFXLElBQVgsRUFBaUIsSUFBakIsQ0FBckM7QUFDSCxPQUZpQixFQUVmLElBRmUsQ0FBbEI7QUFHSCxLQU5EO0FBT0g7QUFDSixDQXhDRDs7QUEwQ0EsU0FBUyxJQUFULEdBQWdCO0FBQ1osRUFBQSxPQUFPLENBQUMsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsbUJBQXhCLENBQUQsRUFBK0MsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBL0MsQ0FBUDtBQUNIOztBQUVELE1BQU0sQ0FBQyxPQUFQLEdBQWlCO0FBQ2IsRUFBQSxJQUFJLEVBQUU7QUFETyxDQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsInZhciBiYWNrVG9wID0gZnVuY3Rpb24gKGRvbUUsIGN0biwgZGlzdGFuY2UpIHtcclxuICAgIGlmICghZG9tRSkgcmV0dXJuO1xyXG4gICAgdmFyIHRpbWVyID0gbnVsbDtcclxuICAgIHZhciBfb25zY3JvbGwgPSB3aW5kb3cub25zY3JvbGwsXHJcbiAgICAgICAgX29uY2xpY2sgPSBkb21FLm9uY2xpY2s7XHJcbiAgICAoY3RuIHx8IHdpbmRvdykub25zY3JvbGwgPSB0aHJvdHRsZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdHlwZW9mIF9vbnNjcm9sbCA9PT0gJ2Z1bmN0aW9uJyAmJiBfb25zY3JvbGwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICB0b2dnbGVEb21FKCk7XHJcbiAgICB9LCAxMDApO1xyXG4gICAgZG9tRS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHR5cGVvZiBfb25jbGljayA9PT0gJ2Z1bmN0aW9uJyAmJiBfb25jbGljay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIHZhciBiYXNlQ3QgPSBjdG4uc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XHJcbiAgICAgICAgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7IC8v6K6+572u5LiA5Liq6K6h5pe25ZmoXHJcbiAgICAgICAgICAgIHZhciBjdCA9IGN0bi5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDsgLy/ojrflj5bot53nprvpobbpg6jnmoTot53nprtcclxuICAgICAgICAgICAgdmFyIGRpZmYgPSBNYXRoLm1heCgxMCwgY3QgLyA2KTtcclxuICAgICAgICAgICAgY3QgLT0gZGlmZjtcclxuICAgICAgICAgICAgaWYgKGN0ID4gMCkgey8v5aaC5p6c5LiO6aG26YOo55qE6Led56a75aSn5LqO6Zu2XHJcbiAgICAgICAgICAgICAgICBjdG4uc2Nyb2xsVG9wID0gY3RuLnNjcm9sbFRvcCAtIGRpZmY7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgY3QpOy8v5ZCR5LiK56e75YqoMTBweFxyXG4gICAgICAgICAgICB9IGVsc2Ugey8v5aaC5p6c6Led56a75bCP5LqO562J5LqO6Zu2XHJcbiAgICAgICAgICAgICAgICBjdG4uc2Nyb2xsVG9wID0gMDtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTsvL+enu+WKqOWIsOmhtumDqFxyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7Ly/muIXpmaTorqHml7blmahcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwKTsvL+malDEwbXPmiafooYzkuIDmrKHliY3pnaLnmoRmdW5jdGlvbu+8jOWxleeOsOS4gOenjeW5s+a7kea7keWKqOaViOaenFxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiB0b2dnbGVEb21FKCkge1xyXG4gICAgICAgIGRvbUUuc3R5bGUuZGlzcGxheSA9IChjdG4uc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3ApID4gKGRpc3RhbmNlIHx8IDUwMCkgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgd2FpdCkge1xyXG4gICAgICAgIHZhciB0aW1lciA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgICAgICAgICBpZiAodGltZXIpIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICAgICAgICAgIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIGZ1bmMgPT09ICdmdW5jdGlvbicgJiYgZnVuYy5hcHBseShzZWxmLCBhcmdzKTtcclxuICAgICAgICAgICAgfSwgd2FpdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIGJhY2tUb3AoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLWp1bXAtY29udGFpbmVyJyksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgaW5pdDogaW5pdFxyXG59Il19
