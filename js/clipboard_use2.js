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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMveWlsaWEvc291cmNlL2pzL2NsaXBib2FyZF91c2UyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxDQUFDLENBQUMsWUFBRCxDQUFELENBQWdCLElBQWhCLENBQXFCLDREQUFyQjtBQUNBOztBQUNBLENBQUMsVUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQjtBQUNoQjtBQUNBLE1BQUksWUFBWSxHQUFHLFNBQWYsWUFBZSxHQUFZO0FBQzNCLFFBQUksUUFBUSxHQUFHLEVBQWY7QUFDQSxJQUFBLFFBQVEsSUFBSSxxREFBWjtBQUNBLElBQUEsUUFBUSxJQUFJLGtEQUFaO0FBQ0EsSUFBQSxRQUFRLElBQUksV0FBWjtBQUNBLElBQUEsQ0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0IsTUFBdEIsQ0FBNkIsUUFBN0I7QUFDQSxRQUFJLFNBQVMsR0FBRyxJQUFJLFdBQUosQ0FBZ0IsV0FBaEIsRUFBNkI7QUFDekMsTUFBQSxNQUFNLEVBQUUsZ0JBQVUsT0FBVixFQUFtQjtBQUN2QixlQUFPLE9BQU8sQ0FBQyxrQkFBZjtBQUNIO0FBSHdDLEtBQTdCLENBQWhCO0FBS0EsSUFBQSxTQUFTLENBQUMsRUFBVixDQUFhLFNBQWIsRUFBd0IsVUFBVSxDQUFWLEVBQWE7QUFDakMsTUFBQSxDQUFDLENBQUMsT0FBRixDQUFVLFNBQVYsR0FBc0Isa0RBQXRCO0FBQ0EsTUFBQSxVQUFVLENBQUMsWUFBWTtBQUNuQixRQUFBLENBQUMsQ0FBQyxPQUFGLENBQVUsU0FBVixHQUFzQixnREFBdEI7QUFDSCxPQUZTLEVBRVAsSUFGTyxDQUFWO0FBR0EsTUFBQSxDQUFDLENBQUMsY0FBRjtBQUNILEtBTkQ7QUFPQSxJQUFBLFNBQVMsQ0FBQyxFQUFWLENBQWEsT0FBYixFQUFzQixVQUFVLENBQVYsRUFBYTtBQUMvQixNQUFBLENBQUMsQ0FBQyxPQUFGLENBQVUsU0FBVixHQUFzQixrREFBdEI7QUFDQSxNQUFBLFVBQVUsQ0FBQyxZQUFZO0FBQ25CLFFBQUEsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxTQUFWLEdBQXNCLGdEQUF0QjtBQUNILE9BRlMsRUFFUCxJQUZPLENBQVY7QUFHQSxNQUFBLENBQUMsQ0FBQyxjQUFGO0FBQ0gsS0FORDtBQU9ILEdBekJEOztBQTBCQSxFQUFBLFlBQVk7QUFDZixDQTdCQSxDQTZCQyxNQTdCRCxFQTZCUyxRQTdCVCxDQUFEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiJChcIi5oaWdobGlnaHRcIikud3JhcChcIjxkaXYgY2xhc3M9J2NvZGUtd3JhcHBlcicgc3R5bGU9J3Bvc2l0aW9uOnJlbGF0aXZlJz48L2Rpdj5cIik7XHJcbi8q6aG16Z2i6L295YWl5a6M5oiQ5ZCO77yM5Yib5bu65aSN5Yi25oyJ6ZKuKi9cclxuIWZ1bmN0aW9uIChlLCB0LCBhKSB7XHJcbiAgICAvKiBjb2RlICovXHJcbiAgICB2YXIgaW5pdENvcHlDb2RlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjb3B5SHRtbCA9ICcnO1xyXG4gICAgICAgIGNvcHlIdG1sICs9ICc8YnV0dG9uIGNsYXNzPVwiYnRuLWNvcHlcIiBkYXRhLWNsaXBib2FyZC1zbmlwcGV0PVwiXCI+JztcclxuICAgICAgICBjb3B5SHRtbCArPSAnICA8aSBjbGFzcz1cImZhIGZhLWNsaXBib2FyZFwiPjwvaT48c3Bhbj7lpI3liLY8L3NwYW4+JztcclxuICAgICAgICBjb3B5SHRtbCArPSAnPC9idXR0b24+JztcclxuICAgICAgICAkKFwiLmhpZ2hsaWdodCAuY29kZVwiKS5iZWZvcmUoY29weUh0bWwpO1xyXG4gICAgICAgIHZhciBjbGlwYm9hcmQgPSBuZXcgQ2xpcGJvYXJkSlMoJy5idG4tY29weScsIHtcclxuICAgICAgICAgICAgdGFyZ2V0OiBmdW5jdGlvbiAodHJpZ2dlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyaWdnZXIubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2xpcGJvYXJkLm9uKCdzdWNjZXNzJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS50cmlnZ2VyLmlubmVySFRNTCA9IFwiPGkgY2xhc3M9J2ZhIGZhLWNsaXBib2FyZCc+PC9pPjxzcGFuPuWkjeWItuaIkOWKnzwvc3Bhbj5cIlxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGUudHJpZ2dlci5pbm5lckhUTUwgPSBcIjxpIGNsYXNzPSdmYSBmYS1jbGlwYm9hcmQnPjwvaT48c3Bhbj7lpI3liLY8L3NwYW4+XCJcclxuICAgICAgICAgICAgfSwgMTAwMClcclxuICAgICAgICAgICAgZS5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNsaXBib2FyZC5vbignZXJyb3InLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnRyaWdnZXIuaW5uZXJIVE1MID0gXCI8aSBjbGFzcz0nZmEgZmEtY2xpcGJvYXJkJz48L2k+PHNwYW4+5aSN5Yi25aSx6LSlPC9zcGFuPlwiXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZS50cmlnZ2VyLmlubmVySFRNTCA9IFwiPGkgY2xhc3M9J2ZhIGZhLWNsaXBib2FyZCc+PC9pPjxzcGFuPuWkjeWItjwvc3Bhbj5cIlxyXG4gICAgICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgICAgICBlLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpbml0Q29weUNvZGUoKTtcclxufSh3aW5kb3csIGRvY3VtZW50KTsiXX0=
