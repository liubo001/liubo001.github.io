(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

$(".highlight").wrap("<div class='code-wrapper' style='position:relative'></div>");
/*页面载入完成后，创建复制按钮*/

!function (e, t, a) {
  /* code */
  var initCopyCode = function initCopyCode() {
    var copyHtml = '';
    copyHtml += '<button class="btn-copy" data-clipboard-snippet="">';
    copyHtml += '  <i class="fa fa-clipboard"></i><span>复制</span>';
    copyHtml += '</button>';
    $(".highlight .code").before(copyHtml);
    var clipboard = new ClipboardJS('.btn-copy', {
      target: function target(trigger) {
        return trigger.nextElementSibling;
      }
    });
    clipboard.on('success', function (e) {
      e.trigger.innerHTML = "<i class='fa fa-clipboard'></i><span>复制成功</span>";
      setTimeout(function () {
        e.trigger.innerHTML = "<i class='fa fa-clipboard'></i><span>复制</span>";
      }, 1000);
      e.clearSelection();
    });
    clipboard.on('error', function (e) {
      e.trigger.innerHTML = "<i class='fa fa-clipboard'></i><span>复制失败</span>";
      setTimeout(function () {
        e.trigger.innerHTML = "<i class='fa fa-clipboard'></i><span>复制</span>";
      }, 1000);
      e.clearSelection();
    });
  };

  initCopyCode();
}(window, document);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMveWlsaWEvc291cmNlL2pzL2NsaXBib2FyZF91c2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLENBQUMsQ0FBQyxZQUFELENBQUQsQ0FBZ0IsSUFBaEIsQ0FBcUIsNERBQXJCO0FBQ0E7O0FBQ0EsQ0FBQyxVQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CO0FBQ2hCO0FBQ0EsTUFBSSxZQUFZLEdBQUcsU0FBZixZQUFlLEdBQVk7QUFDM0IsUUFBSSxRQUFRLEdBQUcsRUFBZjtBQUNBLElBQUEsUUFBUSxJQUFJLHFEQUFaO0FBQ0EsSUFBQSxRQUFRLElBQUksa0RBQVo7QUFDQSxJQUFBLFFBQVEsSUFBSSxXQUFaO0FBQ0EsSUFBQSxDQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQixNQUF0QixDQUE2QixRQUE3QjtBQUNBLFFBQUksU0FBUyxHQUFHLElBQUksV0FBSixDQUFnQixXQUFoQixFQUE2QjtBQUN6QyxNQUFBLE1BQU0sRUFBRSxnQkFBVSxPQUFWLEVBQW1CO0FBQ3ZCLGVBQU8sT0FBTyxDQUFDLGtCQUFmO0FBQ0g7QUFId0MsS0FBN0IsQ0FBaEI7QUFLQSxJQUFBLFNBQVMsQ0FBQyxFQUFWLENBQWEsU0FBYixFQUF3QixVQUFVLENBQVYsRUFBYTtBQUNqQyxNQUFBLENBQUMsQ0FBQyxPQUFGLENBQVUsU0FBVixHQUFzQixrREFBdEI7QUFDQSxNQUFBLFVBQVUsQ0FBQyxZQUFZO0FBQ25CLFFBQUEsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxTQUFWLEdBQXNCLGdEQUF0QjtBQUNILE9BRlMsRUFFUCxJQUZPLENBQVY7QUFHQSxNQUFBLENBQUMsQ0FBQyxjQUFGO0FBQ0gsS0FORDtBQU9BLElBQUEsU0FBUyxDQUFDLEVBQVYsQ0FBYSxPQUFiLEVBQXNCLFVBQVUsQ0FBVixFQUFhO0FBQy9CLE1BQUEsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxTQUFWLEdBQXNCLGtEQUF0QjtBQUNBLE1BQUEsVUFBVSxDQUFDLFlBQVk7QUFDbkIsUUFBQSxDQUFDLENBQUMsT0FBRixDQUFVLFNBQVYsR0FBc0IsZ0RBQXRCO0FBQ0gsT0FGUyxFQUVQLElBRk8sQ0FBVjtBQUdBLE1BQUEsQ0FBQyxDQUFDLGNBQUY7QUFDSCxLQU5EO0FBT0gsR0F6QkQ7O0FBMEJBLEVBQUEsWUFBWTtBQUNmLENBN0JBLENBNkJDLE1BN0JELEVBNkJTLFFBN0JULENBQUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIkKFwiLmhpZ2hsaWdodFwiKS53cmFwKFwiPGRpdiBjbGFzcz0nY29kZS13cmFwcGVyJyBzdHlsZT0ncG9zaXRpb246cmVsYXRpdmUnPjwvZGl2PlwiKTtcclxuLyrpobXpnaLovb3lhaXlrozmiJDlkI7vvIzliJvlu7rlpI3liLbmjInpkq4qL1xyXG4hZnVuY3Rpb24gKGUsIHQsIGEpIHtcclxuICAgIC8qIGNvZGUgKi9cclxuICAgIHZhciBpbml0Q29weUNvZGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNvcHlIdG1sID0gJyc7XHJcbiAgICAgICAgY29weUh0bWwgKz0gJzxidXR0b24gY2xhc3M9XCJidG4tY29weVwiIGRhdGEtY2xpcGJvYXJkLXNuaXBwZXQ9XCJcIj4nO1xyXG4gICAgICAgIGNvcHlIdG1sICs9ICcgIDxpIGNsYXNzPVwiZmEgZmEtY2xpcGJvYXJkXCI+PC9pPjxzcGFuPuWkjeWItjwvc3Bhbj4nO1xyXG4gICAgICAgIGNvcHlIdG1sICs9ICc8L2J1dHRvbj4nO1xyXG4gICAgICAgICQoXCIuaGlnaGxpZ2h0IC5jb2RlXCIpLmJlZm9yZShjb3B5SHRtbCk7XHJcbiAgICAgICAgdmFyIGNsaXBib2FyZCA9IG5ldyBDbGlwYm9hcmRKUygnLmJ0bi1jb3B5Jywge1xyXG4gICAgICAgICAgICB0YXJnZXQ6IGZ1bmN0aW9uICh0cmlnZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJpZ2dlci5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBjbGlwYm9hcmQub24oJ3N1Y2Nlc3MnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnRyaWdnZXIuaW5uZXJIVE1MID0gXCI8aSBjbGFzcz0nZmEgZmEtY2xpcGJvYXJkJz48L2k+PHNwYW4+5aSN5Yi25oiQ5YqfPC9zcGFuPlwiXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZS50cmlnZ2VyLmlubmVySFRNTCA9IFwiPGkgY2xhc3M9J2ZhIGZhLWNsaXBib2FyZCc+PC9pPjxzcGFuPuWkjeWItjwvc3Bhbj5cIlxyXG4gICAgICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgICAgICBlLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2xpcGJvYXJkLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUudHJpZ2dlci5pbm5lckhUTUwgPSBcIjxpIGNsYXNzPSdmYSBmYS1jbGlwYm9hcmQnPjwvaT48c3Bhbj7lpI3liLblpLHotKU8L3NwYW4+XCJcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBlLnRyaWdnZXIuaW5uZXJIVE1MID0gXCI8aSBjbGFzcz0nZmEgZmEtY2xpcGJvYXJkJz48L2k+PHNwYW4+5aSN5Yi2PC9zcGFuPlwiXHJcbiAgICAgICAgICAgIH0sIDEwMDApXHJcbiAgICAgICAgICAgIGUuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGluaXRDb3B5Q29kZSgpO1xyXG59KHdpbmRvdywgZG9jdW1lbnQpOyJdfQ==
