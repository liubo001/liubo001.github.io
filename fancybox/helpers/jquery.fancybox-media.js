(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/*!
 * Media helper for fancyBox
 * version: 1.0.6 (Fri, 14 Jun 2013)
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             media: true
 *         }
 *     });
 *
 * Set custom URL parameters:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             media: {
 *                 youtube : {
 *                     params : {
 *                         autoplay : 0
 *                     }
 *                 }
 *             }
 *         }
 *     });
 *
 * Or:
 *     $(".fancybox").fancybox({,
 *         helpers : {
 *             media: true
 *         },
 *         youtube : {
 *             autoplay: 0
 *         }
 *     });
 *
 *  Supports:
 *
 *      Youtube
 *          http://www.youtube.com/watch?v=opj24KnzrWo
 *          http://www.youtube.com/embed/opj24KnzrWo
 *          http://youtu.be/opj24KnzrWo
 *			http://www.youtube-nocookie.com/embed/opj24KnzrWo
 *      Vimeo
 *          http://vimeo.com/40648169
 *          http://vimeo.com/channels/staffpicks/38843628
 *          http://vimeo.com/groups/surrealism/videos/36516384
 *          http://player.vimeo.com/video/45074303
 *      Metacafe
 *          http://www.metacafe.com/watch/7635964/dr_seuss_the_lorax_movie_trailer/
 *          http://www.metacafe.com/watch/7635964/
 *      Dailymotion
 *          http://www.dailymotion.com/video/xoytqh_dr-seuss-the-lorax-premiere_people
 *      Twitvid
 *          http://twitvid.com/QY7MD
 *      Twitpic
 *          http://twitpic.com/7p93st
 *      Instagram
 *          http://instagr.am/p/IejkuUGxQn/
 *          http://instagram.com/p/IejkuUGxQn/
 *      Google maps
 *          http://maps.google.com/maps?q=Eiffel+Tower,+Avenue+Gustave+Eiffel,+Paris,+France&t=h&z=17
 *          http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
 *          http://maps.google.com/?ll=48.859463,2.292626&spn=0.000965,0.002642&t=m&z=19&layer=c&cbll=48.859524,2.292532&panoid=YJ0lq28OOy3VT2IqIuVY0g&cbp=12,151.58,,0,-15.56
 */
;

(function ($) {
  "use strict"; //Shortcut for fancyBox object

  var F = $.fancybox,
      format = function format(url, rez, params) {
    params = params || '';

    if ($.type(params) === "object") {
      params = $.param(params, true);
    }

    $.each(rez, function (key, value) {
      url = url.replace('$' + key, value || '');
    });

    if (params.length) {
      url += (url.indexOf('?') > 0 ? '&' : '?') + params;
    }

    return url;
  }; //Add helper object


  F.helpers.media = {
    defaults: {
      youtube: {
        matcher: /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
        params: {
          autoplay: 1,
          autohide: 1,
          fs: 1,
          rel: 0,
          hd: 1,
          wmode: 'opaque',
          enablejsapi: 1
        },
        type: 'iframe',
        url: '//www.youtube.com/embed/$3'
      },
      vimeo: {
        matcher: /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
        params: {
          autoplay: 1,
          hd: 1,
          show_title: 1,
          show_byline: 1,
          show_portrait: 0,
          fullscreen: 1
        },
        type: 'iframe',
        url: '//player.vimeo.com/video/$1'
      },
      metacafe: {
        matcher: /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
        params: {
          autoPlay: 'yes'
        },
        type: 'swf',
        url: function url(rez, params, obj) {
          obj.swf.flashVars = 'playerVars=' + $.param(params, true);
          return '//www.metacafe.com/fplayer/' + rez[1] + '/.swf';
        }
      },
      dailymotion: {
        matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
        params: {
          additionalInfos: 0,
          autoStart: 1
        },
        type: 'swf',
        url: '//www.dailymotion.com/swf/video/$1'
      },
      twitvid: {
        matcher: /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
        params: {
          autoplay: 0
        },
        type: 'iframe',
        url: '//www.twitvid.com/embed.php?guid=$1'
      },
      twitpic: {
        matcher: /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
        type: 'image',
        url: '//twitpic.com/show/full/$1/'
      },
      instagram: {
        matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
        type: 'image',
        url: '//$1/p/$2/media/?size=l'
      },
      google_maps: {
        matcher: /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
        type: 'iframe',
        url: function url(rez) {
          return '//maps.google.' + rez[1] + '/' + rez[3] + '' + rez[4] + '&output=' + (rez[4].indexOf('layer=c') > 0 ? 'svembed' : 'embed');
        }
      }
    },
    beforeLoad: function beforeLoad(opts, obj) {
      var url = obj.href || '',
          type = false,
          what,
          item,
          rez,
          params;

      for (what in opts) {
        if (opts.hasOwnProperty(what)) {
          item = opts[what];
          rez = url.match(item.matcher);

          if (rez) {
            type = item.type;
            params = $.extend(true, {}, item.params, obj[what] || ($.isPlainObject(opts[what]) ? opts[what].params : null));
            url = $.type(item.url) === "function" ? item.url.call(this, rez, params, obj) : format(item.url, rez, params);
            break;
          }
        }
      }

      if (type) {
        obj.href = url;
        obj.type = type;
        obj.autoHeight = false;
      }
    }
  };
})(jQuery);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMvbGFuZHNjYXBlL3NvdXJjZS9mYW5jeWJveC9oZWxwZXJzL2pxdWVyeS5mYW5jeWJveC1tZWRpYS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFBRSxXQUFVLENBQVYsRUFBYTtBQUNkLGVBRGMsQ0FHZDs7QUFDQSxNQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBVjtBQUFBLE1BQ0MsTUFBTSxHQUFHLFNBQVQsTUFBUyxDQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CLE1BQXBCLEVBQTZCO0FBQ3JDLElBQUEsTUFBTSxHQUFHLE1BQU0sSUFBSSxFQUFuQjs7QUFFQSxRQUFLLENBQUMsQ0FBQyxJQUFGLENBQVEsTUFBUixNQUFxQixRQUExQixFQUFxQztBQUNwQyxNQUFBLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBRixDQUFRLE1BQVIsRUFBZ0IsSUFBaEIsQ0FBVDtBQUNBOztBQUVELElBQUEsQ0FBQyxDQUFDLElBQUYsQ0FBTyxHQUFQLEVBQVksVUFBUyxHQUFULEVBQWMsS0FBZCxFQUFxQjtBQUNoQyxNQUFBLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBSixDQUFhLE1BQU0s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Q0FBaEMsQ0FBVDtBQUVBLFlBQUEsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFGLENBQVEsSUFBSSxDQUFDLEdBQWIsTUFBdUIsVUFBdkIsR0FBb0MsSUFBSSxDQUFDLEdBQUwsQ0FBUyxJQUFULENBQWUsSUFBZixFQUFxQixHQUFyQixFQUEwQixNQUExQixFQUFrQyxHQUFsQyxDQUFwQyxHQUE4RSxNQUFNLENBQUUsSUFBSSxDQUFDLEdBQVAsRUFBWSxHQUFaLEVBQWlCLE1BQWpCLENBQTFGO0FBRUE7QUFDQTtBQUNEO0FBQ0Q7O0FBRUQsVUFBSSxJQUFKLEVBQVU7QUFDVCxRQUFBLEdBQUcsQ0FBQyxJQUFKLEdBQVcsR0FBWDtBQUNBLFFBQUEsR0FBRyxDQUFDLElBQUosR0FBVyxJQUFYO0FBRUEsUUFBQSxHQUFHLENBQUMsVUFBSixHQUFpQixLQUFqQjtBQUNBO0FBQ0Q7QUEzR2dCLEdBQWxCO0FBOEdBLENBdElDLEVBc0lBLE1BdElBLENBQUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKiFcclxuICogTWVkaWEgaGVscGVyIGZvciBmYW5jeUJveFxyXG4gKiB2ZXJzaW9uOiAxLjAuNiAoRnJpLCAxNCBKdW4gMjAxMylcclxuICogQHJlcXVpcmVzIGZhbmN5Qm94IHYyLjAgb3IgbGF0ZXJcclxuICpcclxuICogVXNhZ2U6XHJcbiAqICAgICAkKFwiLmZhbmN5Ym94XCIpLmZhbmN5Ym94KHtcclxuICogICAgICAgICBoZWxwZXJzIDoge1xyXG4gKiAgICAgICAgICAgICBtZWRpYTogdHJ1ZVxyXG4gKiAgICAgICAgIH1cclxuICogICAgIH0pO1xyXG4gKlxyXG4gKiBTZXQgY3VzdG9tIFVSTCBwYXJhbWV0ZXJzOlxyXG4gKiAgICAgJChcIi5mYW5jeWJveFwiKS5mYW5jeWJveCh7XHJcbiAqICAgICAgICAgaGVscGVycyA6IHtcclxuICogICAgICAgICAgICAgbWVkaWE6IHtcclxuICogICAgICAgICAgICAgICAgIHlvdXR1YmUgOiB7XHJcbiAqICAgICAgICAgICAgICAgICAgICAgcGFyYW1zIDoge1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheSA6IDBcclxuICogICAgICAgICAgICAgICAgICAgICB9XHJcbiAqICAgICAgICAgICAgICAgICB9XHJcbiAqICAgICAgICAgICAgIH1cclxuICogICAgICAgICB9XHJcbiAqICAgICB9KTtcclxuICpcclxuICogT3I6XHJcbiAqICAgICAkKFwiLmZhbmN5Ym94XCIpLmZhbmN5Ym94KHssXHJcbiAqICAgICAgICAgaGVscGVycyA6IHtcclxuICogICAgICAgICAgICAgbWVkaWE6IHRydWVcclxuICogICAgICAgICB9LFxyXG4gKiAgICAgICAgIHlvdXR1YmUgOiB7XHJcbiAqICAgICAgICAgICAgIGF1dG9wbGF5OiAwXHJcbiAqICAgICAgICAgfVxyXG4gKiAgICAgfSk7XHJcbiAqXHJcbiAqICBTdXBwb3J0czpcclxuICpcclxuICogICAgICBZb3V0dWJlXHJcbiAqICAgICAgICAgIGh0dHA6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1vcGoyNEtuenJXb1xyXG4gKiAgICAgICAgICBodHRwOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkL29wajI0S256cldvXHJcbiAqICAgICAgICAgIGh0dHA6Ly95b3V0dS5iZS9vcGoyNEtuenJXb1xyXG4gKlx0XHRcdGh0dHA6Ly93d3cueW91dHViZS1ub2Nvb2tpZS5jb20vZW1iZWQvb3BqMjRLbnpyV29cclxuICogICAgICBWaW1lb1xyXG4gKiAgICAgICAgICBodHRwOi8vdmltZW8uY29tLzQwNjQ4MTY5XHJcbiAqICAgICAgICAgIGh0dHA6Ly92aW1lby5jb20vY2hhbm5lbHMvc3RhZmZwaWNrcy8zODg0MzYyOFxyXG4gKiAgICAgICAgICBodHRwOi8vdmltZW8uY29tL2dyb3Vwcy9zdXJyZWFsaXNtL3ZpZGVvcy8zNjUxNjM4NFxyXG4gKiAgICAgICAgICBodHRwOi8vcGxheWVyLnZpbWVvLmNvbS92aWRlby80NTA3NDMwM1xyXG4gKiAgICAgIE1ldGFjYWZlXHJcbiAqICAgICAgICAgIGh0dHA6Ly93d3cubWV0YWNhZmUuY29tL3dhdGNoLzc2MzU5NjQvZHJfc2V1c3NfdGhlX2xvcmF4X21vdmllX3RyYWlsZXIvXHJcbiAqICAgICAgICAgIGh0dHA6Ly93d3cubWV0YWNhZmUuY29tL3dhdGNoLzc2MzU5NjQvXHJcbiAqICAgICAgRGFpbHltb3Rpb25cclxuICogICAgICAgICAgaHR0cDovL3d3dy5kYWlseW1vdGlvbi5jb20vdmlkZW8veG95dHFoX2RyLXNldXNzLXRoZS1sb3JheC1wcmVtaWVyZV9wZW9wbGVcclxuICogICAgICBUd2l0dmlkXHJcbiAqICAgICAgICAgIGh0dHA6Ly90d2l0dmlkLmNvbS9RWTdNRFxyXG4gKiAgICAgIFR3aXRwaWNcclxuICogICAgICAgICAgaHR0cDovL3R3aXRwaWMuY29tLzdwOTNzdFxyXG4gKiAgICAgIEluc3RhZ3JhbVxyXG4gKiAgICAgICAgICBodHRwOi8vaW5zdGFnci5hbS9wL0llamt1VUd4UW4vXHJcbiAqICAgICAgICAgIGh0dHA6Ly9pbnN0YWdyYW0uY29tL3AvSWVqa3VVR3hRbi9cclxuICogICAgICBHb29nbGUgbWFwc1xyXG4gKiAgICAgICAgICBodHRwOi8vbWFwcy5nb29nbGUuY29tL21hcHM/cT1FaWZmZWwrVG93ZXIsK0F2ZW51ZStHdXN0YXZlK0VpZmZlbCwrUGFyaXMsK0ZyYW5jZSZ0PWgmej0xN1xyXG4gKiAgICAgICAgICBodHRwOi8vbWFwcy5nb29nbGUuY29tLz9sbD00OC44NTc5OTUsMi4yOTQyOTcmc3BuPTAuMDA3NjY2LDAuMDIxMTM2JnQ9bSZ6PTE2XHJcbiAqICAgICAgICAgIGh0dHA6Ly9tYXBzLmdvb2dsZS5jb20vP2xsPTQ4Ljg1OTQ2MywyLjI5MjYyNiZzcG49MC4wMDA5NjUsMC4wMDI2NDImdD1tJno9MTkmbGF5ZXI9YyZjYmxsPTQ4Ljg1OTUyNCwyLjI5MjUzMiZwYW5vaWQ9WUowbHEyOE9PeTNWVDJJcUl1VlkwZyZjYnA9MTIsMTUxLjU4LCwwLC0xNS41NlxyXG4gKi9cclxuOyhmdW5jdGlvbiAoJCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHQvL1Nob3J0Y3V0IGZvciBmYW5jeUJveCBvYmplY3RcclxuXHR2YXIgRiA9ICQuZmFuY3lib3gsXHJcblx0XHRmb3JtYXQgPSBmdW5jdGlvbiggdXJsLCByZXosIHBhcmFtcyApIHtcclxuXHRcdFx0cGFyYW1zID0gcGFyYW1zIHx8ICcnO1xyXG5cclxuXHRcdFx0aWYgKCAkLnR5cGUoIHBhcmFtcyApID09PSBcIm9iamVjdFwiICkge1xyXG5cdFx0XHRcdHBhcmFtcyA9ICQucGFyYW0ocGFyYW1zLCB0cnVlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JC5lYWNoKHJleiwgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xyXG5cdFx0XHRcdHVybCA9IHVybC5yZXBsYWNlKCAnJCcgKyBrZXksIHZhbHVlIHx8ICcnICk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aWYgKHBhcmFtcy5sZW5ndGgpIHtcclxuXHRcdFx0XHR1cmwgKz0gKCB1cmwuaW5kZXhPZignPycpID4gMCA/ICcmJyA6ICc/JyApICsgcGFyYW1zO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdXJsO1xyXG5cdFx0fTtcclxuXHJcblx0Ly9BZGQgaGVscGVyIG9iamVjdFxyXG5cdEYuaGVscGVycy5tZWRpYSA9IHtcclxuXHRcdGRlZmF1bHRzIDoge1xyXG5cdFx0XHR5b3V0dWJlIDoge1xyXG5cdFx0XHRcdG1hdGNoZXIgOiAvKHlvdXR1YmVcXC5jb218eW91dHVcXC5iZXx5b3V0dWJlLW5vY29va2llXFwuY29tKVxcLyh3YXRjaFxcP3Y9fHZcXC98dVxcL3xlbWJlZFxcLz8pPyh2aWRlb3Nlcmllc1xcP2xpc3Q9KC4qKXxbXFx3LV17MTF9fFxcP2xpc3RUeXBlPSguKikmbGlzdD0oLiopKS4qL2ksXHJcblx0XHRcdFx0cGFyYW1zICA6IHtcclxuXHRcdFx0XHRcdGF1dG9wbGF5ICAgIDogMSxcclxuXHRcdFx0XHRcdGF1dG9oaWRlICAgIDogMSxcclxuXHRcdFx0XHRcdGZzICAgICAgICAgIDogMSxcclxuXHRcdFx0XHRcdHJlbCAgICAgICAgIDogMCxcclxuXHRcdFx0XHRcdGhkICAgICAgICAgIDogMSxcclxuXHRcdFx0XHRcdHdtb2RlICAgICAgIDogJ29wYXF1ZScsXHJcblx0XHRcdFx0XHRlbmFibGVqc2FwaSA6IDFcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHR5cGUgOiAnaWZyYW1lJyxcclxuXHRcdFx0XHR1cmwgIDogJy8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyQzJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR2aW1lbyA6IHtcclxuXHRcdFx0XHRtYXRjaGVyIDogLyg/OnZpbWVvKD86cHJvKT8uY29tKVxcLyg/OlteXFxkXSspPyhcXGQrKSg/Oi4qKS8sXHJcblx0XHRcdFx0cGFyYW1zICA6IHtcclxuXHRcdFx0XHRcdGF1dG9wbGF5ICAgICAgOiAxLFxyXG5cdFx0XHRcdFx0aGQgICAgICAgICAgICA6IDEsXHJcblx0XHRcdFx0XHRzaG93X3RpdGxlICAgIDogMSxcclxuXHRcdFx0XHRcdHNob3dfYnlsaW5lICAgOiAxLFxyXG5cdFx0XHRcdFx0c2hvd19wb3J0cmFpdCA6IDAsXHJcblx0XHRcdFx0XHRmdWxsc2NyZWVuICAgIDogMVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0dHlwZSA6ICdpZnJhbWUnLFxyXG5cdFx0XHRcdHVybCAgOiAnLy9wbGF5ZXIudmltZW8uY29tL3ZpZGVvLyQxJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRtZXRhY2FmZSA6IHtcclxuXHRcdFx0XHRtYXRjaGVyIDogL21ldGFjYWZlLmNvbVxcLyg/OndhdGNofGZwbGF5ZXIpXFwvKFtcXHdcXC1dezEsMTB9KS8sXHJcblx0XHRcdFx0cGFyYW1zICA6IHtcclxuXHRcdFx0XHRcdGF1dG9QbGF5IDogJ3llcydcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHR5cGUgOiAnc3dmJyxcclxuXHRcdFx0XHR1cmwgIDogZnVuY3Rpb24oIHJleiwgcGFyYW1zLCBvYmogKSB7XHJcblx0XHRcdFx0XHRvYmouc3dmLmZsYXNoVmFycyA9ICdwbGF5ZXJWYXJzPScgKyAkLnBhcmFtKCBwYXJhbXMsIHRydWUgKTtcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gJy8vd3d3Lm1ldGFjYWZlLmNvbS9mcGxheWVyLycgKyByZXpbMV0gKyAnLy5zd2YnO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0ZGFpbHltb3Rpb24gOiB7XHJcblx0XHRcdFx0bWF0Y2hlciA6IC9kYWlseW1vdGlvbi5jb21cXC92aWRlb1xcLyguKilcXC8/KC4qKS8sXHJcblx0XHRcdFx0cGFyYW1zICA6IHtcclxuXHRcdFx0XHRcdGFkZGl0aW9uYWxJbmZvcyA6IDAsXHJcblx0XHRcdFx0XHRhdXRvU3RhcnQgOiAxXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR0eXBlIDogJ3N3ZicsXHJcblx0XHRcdFx0dXJsICA6ICcvL3d3dy5kYWlseW1vdGlvbi5jb20vc3dmL3ZpZGVvLyQxJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR0d2l0dmlkIDoge1xyXG5cdFx0XHRcdG1hdGNoZXIgOiAvdHdpdHZpZFxcLmNvbVxcLyhbYS16QS1aMC05X1xcLVxcP1xcPV0rKS9pLFxyXG5cdFx0XHRcdHBhcmFtcyAgOiB7XHJcblx0XHRcdFx0XHRhdXRvcGxheSA6IDBcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHR5cGUgOiAnaWZyYW1lJyxcclxuXHRcdFx0XHR1cmwgIDogJy8vd3d3LnR3aXR2aWQuY29tL2VtYmVkLnBocD9ndWlkPSQxJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR0d2l0cGljIDoge1xyXG5cdFx0XHRcdG1hdGNoZXIgOiAvdHdpdHBpY1xcLmNvbVxcLyg/ISg/OnBsYWNlfHBob3Rvc3xldmVudHMpXFwvKShbYS16QS1aMC05XFw/XFw9XFwtXSspL2ksXHJcblx0XHRcdFx0dHlwZSA6ICdpbWFnZScsXHJcblx0XHRcdFx0dXJsICA6ICcvL3R3aXRwaWMuY29tL3Nob3cvZnVsbC8kMS8nXHJcblx0XHRcdH0sXHJcblx0XHRcdGluc3RhZ3JhbSA6IHtcclxuXHRcdFx0XHRtYXRjaGVyIDogLyhpbnN0YWdyXFwuYW18aW5zdGFncmFtXFwuY29tKVxcL3BcXC8oW2EtekEtWjAtOV9cXC1dKylcXC8/L2ksXHJcblx0XHRcdFx0dHlwZSA6ICdpbWFnZScsXHJcblx0XHRcdFx0dXJsICA6ICcvLyQxL3AvJDIvbWVkaWEvP3NpemU9bCdcclxuXHRcdFx0fSxcclxuXHRcdFx0Z29vZ2xlX21hcHMgOiB7XHJcblx0XHRcdFx0bWF0Y2hlciA6IC9tYXBzXFwuZ29vZ2xlXFwuKFthLXpdezIsM30oXFwuW2Etel17Mn0pPylcXC8oXFw/bGw9fG1hcHNcXD8pKC4qKS9pLFxyXG5cdFx0XHRcdHR5cGUgOiAnaWZyYW1lJyxcclxuXHRcdFx0XHR1cmwgIDogZnVuY3Rpb24oIHJleiApIHtcclxuXHRcdFx0XHRcdHJldHVybiAnLy9tYXBzLmdvb2dsZS4nICsgcmV6WzFdICsgJy8nICsgcmV6WzNdICsgJycgKyByZXpbNF0gKyAnJm91dHB1dD0nICsgKHJlels0XS5pbmRleE9mKCdsYXllcj1jJykgPiAwID8gJ3N2ZW1iZWQnIDogJ2VtYmVkJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdGJlZm9yZUxvYWQgOiBmdW5jdGlvbihvcHRzLCBvYmopIHtcclxuXHRcdFx0dmFyIHVybCAgID0gb2JqLmhyZWYgfHwgJycsXHJcblx0XHRcdFx0dHlwZSAgPSBmYWxzZSxcclxuXHRcdFx0XHR3aGF0LFxyXG5cdFx0XHRcdGl0ZW0sXHJcblx0XHRcdFx0cmV6LFxyXG5cdFx0XHRcdHBhcmFtcztcclxuXHJcblx0XHRcdGZvciAod2hhdCBpbiBvcHRzKSB7XHJcblx0XHRcdFx0aWYgKG9wdHMuaGFzT3duUHJvcGVydHkod2hhdCkpIHtcclxuXHRcdFx0XHRcdGl0ZW0gPSBvcHRzWyB3aGF0IF07XHJcblx0XHRcdFx0XHRyZXogID0gdXJsLm1hdGNoKCBpdGVtLm1hdGNoZXIgKTtcclxuXHJcblx0XHRcdFx0XHRpZiAocmV6KSB7XHJcblx0XHRcdFx0XHRcdHR5cGUgICA9IGl0ZW0udHlwZTtcclxuXHRcdFx0XHRcdFx0cGFyYW1zID0gJC5leHRlbmQodHJ1ZSwge30sIGl0ZW0ucGFyYW1zLCBvYmpbIHdoYXQgXSB8fCAoJC5pc1BsYWluT2JqZWN0KG9wdHNbIHdoYXQgXSkgPyBvcHRzWyB3aGF0IF0ucGFyYW1zIDogbnVsbCkpO1xyXG5cclxuXHRcdFx0XHRcdFx0dXJsID0gJC50eXBlKCBpdGVtLnVybCApID09PSBcImZ1bmN0aW9uXCIgPyBpdGVtLnVybC5jYWxsKCB0aGlzLCByZXosIHBhcmFtcywgb2JqICkgOiBmb3JtYXQoIGl0ZW0udXJsLCByZXosIHBhcmFtcyApO1xyXG5cclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodHlwZSkge1xyXG5cdFx0XHRcdG9iai5ocmVmID0gdXJsO1xyXG5cdFx0XHRcdG9iai50eXBlID0gdHlwZTtcclxuXHJcblx0XHRcdFx0b2JqLmF1dG9IZWlnaHQgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG59KGpRdWVyeSkpOyJdfQ==
