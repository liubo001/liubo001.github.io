(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var browser = {
  versions: function () {
    var u = window.navigator.userAgent;
    return {
      trident: u.indexOf('Trident') > -1,
      //IE内核
      presto: u.indexOf('Presto') > -1,
      //opera内核
      webKit: u.indexOf('AppleWebKit') > -1,
      //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
      //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/),
      //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
      //android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
      //是否为iPhone或者安卓QQ浏览器
      iPad: u.indexOf('iPad') > -1,
      //是否为iPad
      webApp: u.indexOf('Safari') == -1,
      //是否为web应用程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') == -1 //是否为微信浏览器

    };
  }()
};
module.exports = browser;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMveWlsaWEvc291cmNlL2pzL2Jyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQUksT0FBTyxHQUFHO0FBQ1YsRUFBQSxRQUFRLEVBQUUsWUFBVztBQUNqQixRQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUCxDQUFpQixTQUF6QjtBQUNBLFdBQU87QUFDSCxNQUFBLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBRixDQUFVLFNBQVYsSUFBdUIsQ0FBQyxDQUQ5QjtBQUNpQztBQUNwQyxNQUFBLE1BQU0sRUFBRSxDQUFDLENBQUMsT0FBRixDQUFVLFFBQVYsSUFBc0IsQ0FBQyxDQUY1QjtBQUUrQjtBQUNsQyxNQUFBLE1BQU0sRUFBRSxDQUFDLENBQUMsT0FBRixDQUFVLGFBQVYsSUFBMkIsQ0FBQyxDQUhqQztBQUdvQztBQUN2QyxNQUFBLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBRixDQUFVLE9BQVYsSUFBcUIsQ0FBQyxDQUF0QixJQUEyQixDQUFDLENBQUMsT0FBRixDQUFVLE9BQVYsS0FBc0IsQ0FBQyxDQUp0RDtBQUl5RDtBQUM1RCxNQUFBLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUYsQ0FBUSx1QkFBUixDQUxQO0FBS3lDO0FBQzVDLE1BQUEsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBRixDQUFRLCtCQUFSLENBTko7QUFNOEM7QUFDakQsTUFBQSxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxTQUFWLElBQXVCLENBQUMsQ0FBeEIsSUFBNkIsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxPQUFWLElBQXFCLENBQUMsQ0FQekQ7QUFPNEQ7QUFDL0QsTUFBQSxNQUFNLEVBQUUsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxRQUFWLElBQXNCLENBQUMsQ0FBdkIsSUFBNEIsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxLQUFWLElBQW1CLENBQUMsQ0FSckQ7QUFRd0Q7QUFDM0QsTUFBQSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxNQUFWLElBQW9CLENBQUMsQ0FUeEI7QUFTMkI7QUFDOUIsTUFBQSxNQUFNLEVBQUUsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxRQUFWLEtBQXVCLENBQUMsQ0FWN0I7QUFVZ0M7QUFDbkMsTUFBQSxNQUFNLEVBQUUsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxnQkFBVixLQUErQixDQUFDLENBWHJDLENBV3VDOztBQVh2QyxLQUFQO0FBYUgsR0FmUztBQURBLENBQWQ7QUFtQkEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsT0FBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJ2YXIgYnJvd3NlciA9IHtcclxuICAgIHZlcnNpb25zOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgdSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRyaWRlbnQ6IHUuaW5kZXhPZignVHJpZGVudCcpID4gLTEsIC8vSUXlhoXmoLhcclxuICAgICAgICAgICAgcHJlc3RvOiB1LmluZGV4T2YoJ1ByZXN0bycpID4gLTEsIC8vb3BlcmHlhoXmoLhcclxuICAgICAgICAgICAgd2ViS2l0OiB1LmluZGV4T2YoJ0FwcGxlV2ViS2l0JykgPiAtMSwgLy/oi7nmnpzjgIHosLfmrYzlhoXmoLhcclxuICAgICAgICAgICAgZ2Vja286IHUuaW5kZXhPZignR2Vja28nKSA+IC0xICYmIHUuaW5kZXhPZignS0hUTUwnKSA9PSAtMSwgLy/ngavni5DlhoXmoLhcclxuICAgICAgICAgICAgbW9iaWxlOiAhIXUubWF0Y2goL0FwcGxlV2ViS2l0LipNb2JpbGUuKi8pLCAvL+aYr+WQpuS4uuenu+WKqOe7iOerr1xyXG4gICAgICAgICAgICBpb3M6ICEhdS5tYXRjaCgvXFwoaVteO10rOyggVTspPyBDUFUuK01hYyBPUyBYLyksIC8vaW9z57uI56uvXHJcbiAgICAgICAgICAgIGFuZHJvaWQ6IHUuaW5kZXhPZignQW5kcm9pZCcpID4gLTEgfHwgdS5pbmRleE9mKCdMaW51eCcpID4gLTEsIC8vYW5kcm9pZOe7iOerr+aIluiAhXVj5rWP6KeI5ZmoXHJcbiAgICAgICAgICAgIGlQaG9uZTogdS5pbmRleE9mKCdpUGhvbmUnKSA+IC0xIHx8IHUuaW5kZXhPZignTWFjJykgPiAtMSwgLy/mmK/lkKbkuLppUGhvbmXmiJbogIXlronljZNRUea1j+iniOWZqFxyXG4gICAgICAgICAgICBpUGFkOiB1LmluZGV4T2YoJ2lQYWQnKSA+IC0xLCAvL+aYr+WQpuS4umlQYWRcclxuICAgICAgICAgICAgd2ViQXBwOiB1LmluZGV4T2YoJ1NhZmFyaScpID09IC0xLCAvL+aYr+WQpuS4undlYuW6lOeUqOeoi+W6j++8jOayoeacieWktOmDqOS4juW6lemDqFxyXG4gICAgICAgICAgICB3ZWl4aW46IHUuaW5kZXhPZignTWljcm9NZXNzZW5nZXInKSA9PSAtMSAvL+aYr+WQpuS4uuW+ruS/oea1j+iniOWZqFxyXG4gICAgICAgIH07XHJcbiAgICB9KClcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBicm93c2VyIl19
