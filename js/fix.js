(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function init() {
  // 由于hexo分页不支持，手工美化
  var $nav = document.querySelector('#page-nav');

  if ($nav && !document.querySelector('#page-nav .extend.prev')) {
    $nav.innerHTML = '<a class="extend prev disabled" rel="prev">&laquo; Prev</a>' + $nav.innerHTML;
  }

  if ($nav && !document.querySelector('#page-nav .extend.next')) {
    $nav.innerHTML = $nav.innerHTML + '<a class="extend next disabled" rel="next">Next &raquo;</a>';
  } // 新窗口打开


  if (yiliaConfig && yiliaConfig.open_in_new) {
    var $a = document.querySelectorAll('.article-entry a:not(.article-more-a)');
    $a.forEach(function ($em) {
      var target = $em.getAttribute('target');

      if (!target || target === '') {
        $em.setAttribute('target', '_blank');
      }
    });
  } // 目录序号


  if (yiliaConfig && yiliaConfig.toc_hide_index) {
    var _$a = document.querySelectorAll('.toc-number');

    _$a.forEach(function ($em) {
      $em.style.display = 'none';
    });
  } // about me 转义


  var $aboutme = document.querySelector('#js-aboutme');

  if ($aboutme && $aboutme.length !== 0) {
    $aboutme.innerHTML = $aboutme.innerText;
  }
}

module.exports = {
  init: init
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMveWlsaWEvc291cmNlL2pzL2ZpeC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsU0FBUyxJQUFULEdBQWdCO0FBQ2Y7QUFDQSxNQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixXQUF2QixDQUFYOztBQUNBLE1BQUksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsd0JBQXZCLENBQWIsRUFBK0Q7QUFDOUQsSUFBQSxJQUFJLENBQUMsU0FBTCxHQUFpQixnRUFBZ0UsSUFBSSxDQUFDLFNBQXRGO0FBQ0E7O0FBQ0QsTUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBVCxDQUF1Qix3QkFBdkIsQ0FBYixFQUErRDtBQUM5RCxJQUFBLElBQUksQ0FBQyxTQUFMLEdBQWlCLElBQUksQ0FBQyxTQUFMLEdBQWlCLDZEQUFsQztBQUNBLEdBUmMsQ0FVZjs7O0FBQ0EsTUFBSSxXQUFXLElBQUksV0FBVyxDQUFDLFdBQS9CLEVBQTRDO0FBQzNDLFFBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxnQkFBVCxDQUEyQix1Q0FBM0IsQ0FBVDtBQUNBLElBQUEsRUFBRSxDQUFDLE9BQUgsQ0FBVyxVQUFDLEdBQUQsRUFBUztBQUNuQixVQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsWUFBSixDQUFpQixRQUFqQixDQUFiOztBQUNBLFVBQUksQ0FBQyxNQUFELElBQVcsTUFBTSxLQUFLLEVBQTFCLEVBQThCO0FBQzdCLFFBQUEsR0FBRyxDQUFDLFlBQUosQ0FBaUIsUUFBakIsRUFBMkIsUUFBM0I7QUFDQTtBQUNELEtBTEQ7QUFNQSxHQW5CYyxDQW9CZjs7O0FBQ0EsTUFBSSxXQUFXLElBQUksV0FBVyxDQUFDLGNBQS9CLEVBQStDO0FBQzlDLFFBQUksR0FBRSxHQUFHLFFBQVEsQ0FBQyxnQkFBVCxDQUEyQixhQUEzQixDQUFUOztBQUNBLElBQUEsR0FBRSxDQUFDLE9BQUgsQ0FBVyxVQUFDLEdBQUQsRUFBUztBQUNuQixNQUFBLEdBQUcsQ0FBQyxLQUFKLENBQVUsT0FBVixHQUFvQixNQUFwQjtBQUNBLEtBRkQ7QUFHQSxHQTFCYyxDQTRCZjs7O0FBQ0EsTUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBZjs7QUFDQSxNQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBVCxLQUFvQixDQUFwQyxFQUF1QztBQUN0QyxJQUFBLFFBQVEsQ0FBQyxTQUFULEdBQXFCLFFBQVEsQ0FBQyxTQUE5QjtBQUNBO0FBRUQ7O0FBRUQsTUFBTSxDQUFDLE9BQVAsR0FBaUI7QUFDaEIsRUFBQSxJQUFJLEVBQUU7QUFEVSxDQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImZ1bmN0aW9uIGluaXQoKSB7XHJcblx0Ly8g55Sx5LqOaGV4b+WIhumhteS4jeaUr+aMge+8jOaJi+W3pee+juWMllxyXG5cdHZhciAkbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhZ2UtbmF2JylcclxuXHRpZiAoJG5hdiAmJiAhZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhZ2UtbmF2IC5leHRlbmQucHJldicpKSB7XHJcblx0XHQkbmF2LmlubmVySFRNTCA9ICc8YSBjbGFzcz1cImV4dGVuZCBwcmV2IGRpc2FibGVkXCIgcmVsPVwicHJldlwiPiZsYXF1bzsgUHJldjwvYT4nICsgJG5hdi5pbm5lckhUTUxcclxuXHR9XHJcblx0aWYgKCRuYXYgJiYgIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYWdlLW5hdiAuZXh0ZW5kLm5leHQnKSkge1xyXG5cdFx0JG5hdi5pbm5lckhUTUwgPSAkbmF2LmlubmVySFRNTCArICc8YSBjbGFzcz1cImV4dGVuZCBuZXh0IGRpc2FibGVkXCIgcmVsPVwibmV4dFwiPk5leHQgJnJhcXVvOzwvYT4nXHJcblx0fVxyXG5cclxuXHQvLyDmlrDnqpflj6PmiZPlvIBcclxuXHRpZiAoeWlsaWFDb25maWcgJiYgeWlsaWFDb25maWcub3Blbl9pbl9uZXcpIHtcclxuXHRcdGxldCAkYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoKCcuYXJ0aWNsZS1lbnRyeSBhOm5vdCguYXJ0aWNsZS1tb3JlLWEpJykpXHJcblx0XHQkYS5mb3JFYWNoKCgkZW0pID0+IHtcclxuXHRcdFx0bGV0IHRhcmdldCA9ICRlbS5nZXRBdHRyaWJ1dGUoJ3RhcmdldCcpO1xyXG5cdFx0XHRpZiAoIXRhcmdldCB8fCB0YXJnZXQgPT09ICcnKSB7XHJcblx0XHRcdFx0JGVtLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgJ19ibGFuaycpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQvLyDnm67lvZXluo/lj7dcclxuXHRpZiAoeWlsaWFDb25maWcgJiYgeWlsaWFDb25maWcudG9jX2hpZGVfaW5kZXgpIHtcclxuXHRcdGxldCAkYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoKCcudG9jLW51bWJlcicpKVxyXG5cdFx0JGEuZm9yRWFjaCgoJGVtKSA9PiB7XHJcblx0XHRcdCRlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdC8vIGFib3V0IG1lIOi9rOS5iVxyXG5cdHZhciAkYWJvdXRtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNqcy1hYm91dG1lJylcclxuXHRpZiAoJGFib3V0bWUgJiYgJGFib3V0bWUubGVuZ3RoICE9PSAwKSB7XHJcblx0XHQkYWJvdXRtZS5pbm5lckhUTUwgPSAkYWJvdXRtZS5pbm5lclRleHRcclxuXHR9XHJcblx0XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGluaXQ6IGluaXRcclxufSJdfQ==
