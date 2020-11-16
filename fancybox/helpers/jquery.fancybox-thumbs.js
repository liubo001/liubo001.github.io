(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/*!
* Thumbnail helper for fancyBox
* version: 1.0.7 (Mon, 01 Oct 2012)
* @requires fancyBox v2.0 or later
*
* Usage:
*     $(".fancybox").fancybox({
*         helpers : {
*             thumbs: {
*                 width  : 50,
*                 height : 50
*             }
*         }
*     });
*
*/
;

(function ($) {
  //Shortcut for fancyBox object
  var F = $.fancybox; //Add helper object

  F.helpers.thumbs = {
    defaults: {
      width: 50,
      // thumbnail width
      height: 50,
      // thumbnail height
      position: 'bottom',
      // 'top' or 'bottom'
      source: function source(item) {
        // function to obtain the URL of the thumbnail image
        var href;

        if (item.element) {
          href = $(item.element).find('img').attr('src');
        }

        if (!href && item.type === 'image' && item.href) {
          href = item.href;
        }

        return href;
      }
    },
    wrap: null,
    list: null,
    width: 0,
    init: function init(opts, obj) {
      var that = this,
          list,
          thumbWidth = opts.width,
          thumbHeight = opts.height,
          thumbSource = opts.source; //Build list structure

      list = '';

      for (var n = 0; n < obj.group.length; n++) {
        list += '<li><a style="width:' + thumbWidth + 'px;height:' + thumbHeight + 'px;" href="javascript:jQuery.fancybox.jumpto(' + n + ');"></a></li>';
      }

      this.wrap = $('<div id="fancybox-thumbs"></div>').addClass(opts.position).appendTo('body');
      this.list = $('<ul>' + list + '</ul>').appendTo(this.wrap); //Load each thumbnail

      $.each(obj.group, function (i) {
        var el = obj.group[i],
            href = thumbSource(el);

        if (!href) {
          return;
        }

        $("<img />").load(function () {
          var width = this.width,
              height = this.height,
              widthRatio,
              heightRatio,
              parent;

          if (!that.list || !width || !height) {
            return;
          } //Calculate thumbnail width/height and center it


          widthRatio = width / thumbWidth;
          heightRatio = height / thumbHeight;
          parent = that.list.children().eq(i).find('a');

          if (widthRatio >= 1 && heightRatio >= 1) {
            if (widthRatio > heightRatio) {
              width = Math.floor(width / heightRatio);
              height = thumbHeight;
            } else {
              width = thumbWidth;
              height = Math.floor(height / widthRatio);
            }
          }

          $(this).css({
            width: width,
            height: height,
            top: Math.floor(thumbHeight / 2 - height / 2),
            left: Math.floor(thumbWidth / 2 - width / 2)
          });
          parent.width(thumbWidth).height(thumbHeight);
          $(this).hide().appendTo(parent).fadeIn(300);
        }).attr('src', href).attr('title', el.title);
      }); //Set initial width

      this.width = this.list.children().eq(0).outerWidth(true);
      this.list.width(this.width * (obj.group.length + 1)).css('left', Math.floor($(window).width() * 0.5 - (obj.index * this.width + this.width * 0.5)));
    },
    beforeLoad: function beforeLoad(opts, obj) {
      //Remove self if gallery do not have at least two items
      if (obj.group.length < 2) {
        obj.helpers.thumbs = false;
        return;
      } //Increase bottom margin to give space for thumbs


      obj.margin[opts.position === 'top' ? 0 : 2] += opts.height + 15;
    },
    afterShow: function afterShow(opts, obj) {
      //Check if exists and create or update list
      if (this.list) {
        this.onUpdate(opts, obj);
      } else {
        this.init(opts, obj);
      } //Set active element


      this.list.children().removeClass('active').eq(obj.index).addClass('active');
    },
    //Center list
    onUpdate: function onUpdate(opts, obj) {
      if (this.list) {
        this.list.stop(true).animate({
          'left': Math.floor($(window).width() * 0.5 - (obj.index * this.width + this.width * 0.5))
        }, 150);
      }
    },
    beforeClose: function beforeClose() {
      if (this.wrap) {
        this.wrap.remove();
      }

      this.wrap = null;
      this.list = null;
      this.width = 0;
    }
  };
})(jQuery);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMvbGFuZHNjYXBlL3NvdXJjZS9mYW5jeWJveC9oZWxwZXJzL2pxdWVyeS5mYW5jeWJveC10aHVtYnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQUUsV0FBVSxDQUFWLEVBQWE7QUFDZDtBQUNBLE1BQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFWLENBRmMsQ0FJZDs7QUFDQSxFQUFBLENBQUMsQ0FBQyxPQUFGLENBQVUsTUFBVixHQUFtQjtBQUNsQixJQUFBLFFBQVEsRUFBRztBQUNWLE1BQUEsS0FBSyxFQUFNLEVBREQ7QUFDVztBQUNyQixNQUFBLE1BQU0sRUFBSyxFQUZEO0FBRVc7QUFDckIsTUFBQSxRQUFRLEVBQUcsUUFIRDtBQUdXO0FBQ3JCLE1BQUEsTUFBTSxFQUFLLGdCQUFXLElBQVgsRUFBa0I7QUFBRztBQUMvQixZQUFJLElBQUo7O0FBRUEsWUFBSSxJQUFJLENBQUMsT0FBVCxFQUFrQjtBQUNqQixVQUFBLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU4sQ0FBRCxDQUFnQixJQUFoQixDQUFxQixLQUFyQixFQUE0QixJQUE1QixDQUFpQyxLQUFqQyxDQUFQO0FBQ0E7O0FBRUQsWUFBSSxDQUFDLElBQUQsSUFBUyxJQUFJLENBQUMsSUFBTCxLQUFjLE9BQXZCLElBQWtDLElBQUksQ0FBQyxJQUEzQyxFQUFpRDtBQUNoRCxVQUFBLElBQUksR0FBRyxJQUFJLENBQUMsSUFBWjtBQUNBOztBQUVELGVBQU8sSUFBUDtBQUNBO0FBaEJTLEtBRE87QUFvQmxCLElBQUEsSUFBSSxFQUFJLElBcEJVO0FBcUJsQixJQUFBLElBQUksRUFBSSxJQXJCVTtBQXNCbEIsSUFBQSxLQUFL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OiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIiAvKiFcclxuICogVGh1bWJuYWlsIGhlbHBlciBmb3IgZmFuY3lCb3hcclxuICogdmVyc2lvbjogMS4wLjcgKE1vbiwgMDEgT2N0IDIwMTIpXHJcbiAqIEByZXF1aXJlcyBmYW5jeUJveCB2Mi4wIG9yIGxhdGVyXHJcbiAqXHJcbiAqIFVzYWdlOlxyXG4gKiAgICAgJChcIi5mYW5jeWJveFwiKS5mYW5jeWJveCh7XHJcbiAqICAgICAgICAgaGVscGVycyA6IHtcclxuICogICAgICAgICAgICAgdGh1bWJzOiB7XHJcbiAqICAgICAgICAgICAgICAgICB3aWR0aCAgOiA1MCxcclxuICogICAgICAgICAgICAgICAgIGhlaWdodCA6IDUwXHJcbiAqICAgICAgICAgICAgIH1cclxuICogICAgICAgICB9XHJcbiAqICAgICB9KTtcclxuICpcclxuICovXHJcbjsoZnVuY3Rpb24gKCQpIHtcclxuXHQvL1Nob3J0Y3V0IGZvciBmYW5jeUJveCBvYmplY3RcclxuXHR2YXIgRiA9ICQuZmFuY3lib3g7XHJcblxyXG5cdC8vQWRkIGhlbHBlciBvYmplY3RcclxuXHRGLmhlbHBlcnMudGh1bWJzID0ge1xyXG5cdFx0ZGVmYXVsdHMgOiB7XHJcblx0XHRcdHdpZHRoICAgIDogNTAsICAgICAgIC8vIHRodW1ibmFpbCB3aWR0aFxyXG5cdFx0XHRoZWlnaHQgICA6IDUwLCAgICAgICAvLyB0aHVtYm5haWwgaGVpZ2h0XHJcblx0XHRcdHBvc2l0aW9uIDogJ2JvdHRvbScsIC8vICd0b3AnIG9yICdib3R0b20nXHJcblx0XHRcdHNvdXJjZSAgIDogZnVuY3Rpb24gKCBpdGVtICkgeyAgLy8gZnVuY3Rpb24gdG8gb2J0YWluIHRoZSBVUkwgb2YgdGhlIHRodW1ibmFpbCBpbWFnZVxyXG5cdFx0XHRcdHZhciBocmVmO1xyXG5cclxuXHRcdFx0XHRpZiAoaXRlbS5lbGVtZW50KSB7XHJcblx0XHRcdFx0XHRocmVmID0gJChpdGVtLmVsZW1lbnQpLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKCFocmVmICYmIGl0ZW0udHlwZSA9PT0gJ2ltYWdlJyAmJiBpdGVtLmhyZWYpIHtcclxuXHRcdFx0XHRcdGhyZWYgPSBpdGVtLmhyZWY7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gaHJlZjtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHJcblx0XHR3cmFwICA6IG51bGwsXHJcblx0XHRsaXN0ICA6IG51bGwsXHJcblx0XHR3aWR0aCA6IDAsXHJcblxyXG5cdFx0aW5pdDogZnVuY3Rpb24gKG9wdHMsIG9iaikge1xyXG5cdFx0XHR2YXIgdGhhdCA9IHRoaXMsXHJcblx0XHRcdFx0bGlzdCxcclxuXHRcdFx0XHR0aHVtYldpZHRoICA9IG9wdHMud2lkdGgsXHJcblx0XHRcdFx0dGh1bWJIZWlnaHQgPSBvcHRzLmhlaWdodCxcclxuXHRcdFx0XHR0aHVtYlNvdXJjZSA9IG9wdHMuc291cmNlO1xyXG5cclxuXHRcdFx0Ly9CdWlsZCBsaXN0IHN0cnVjdHVyZVxyXG5cdFx0XHRsaXN0ID0gJyc7XHJcblxyXG5cdFx0XHRmb3IgKHZhciBuID0gMDsgbiA8IG9iai5ncm91cC5sZW5ndGg7IG4rKykge1xyXG5cdFx0XHRcdGxpc3QgKz0gJzxsaT48YSBzdHlsZT1cIndpZHRoOicgKyB0aHVtYldpZHRoICsgJ3B4O2hlaWdodDonICsgdGh1bWJIZWlnaHQgKyAncHg7XCIgaHJlZj1cImphdmFzY3JpcHQ6alF1ZXJ5LmZhbmN5Ym94Lmp1bXB0bygnICsgbiArICcpO1wiPjwvYT48L2xpPic7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMud3JhcCA9ICQoJzxkaXYgaWQ9XCJmYW5jeWJveC10aHVtYnNcIj48L2Rpdj4nKS5hZGRDbGFzcyhvcHRzLnBvc2l0aW9uKS5hcHBlbmRUbygnYm9keScpO1xyXG5cdFx0XHR0aGlzLmxpc3QgPSAkKCc8dWw+JyArIGxpc3QgKyAnPC91bD4nKS5hcHBlbmRUbyh0aGlzLndyYXApO1xyXG5cclxuXHRcdFx0Ly9Mb2FkIGVhY2ggdGh1bWJuYWlsXHJcblx0XHRcdCQuZWFjaChvYmouZ3JvdXAsIGZ1bmN0aW9uIChpKSB7XHJcblx0XHRcdFx0dmFyIGVsICAgPSBvYmouZ3JvdXBbIGkgXSxcclxuXHRcdFx0XHRcdGhyZWYgPSB0aHVtYlNvdXJjZSggZWwgKTtcclxuXHJcblx0XHRcdFx0aWYgKCFocmVmKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQkKFwiPGltZyAvPlwiKS5sb2FkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdHZhciB3aWR0aCAgPSB0aGlzLndpZHRoLFxyXG5cdFx0XHRcdFx0XHRoZWlnaHQgPSB0aGlzLmhlaWdodCxcclxuXHRcdFx0XHRcdFx0d2lkdGhSYXRpbywgaGVpZ2h0UmF0aW8sIHBhcmVudDtcclxuXHJcblx0XHRcdFx0XHRpZiAoIXRoYXQubGlzdCB8fCAhd2lkdGggfHwgIWhlaWdodCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly9DYWxjdWxhdGUgdGh1bWJuYWlsIHdpZHRoL2hlaWdodCBhbmQgY2VudGVyIGl0XHJcblx0XHRcdFx0XHR3aWR0aFJhdGlvICA9IHdpZHRoIC8gdGh1bWJXaWR0aDtcclxuXHRcdFx0XHRcdGhlaWdodFJhdGlvID0gaGVpZ2h0IC8gdGh1bWJIZWlnaHQ7XHJcblxyXG5cdFx0XHRcdFx0cGFyZW50ID0gdGhhdC5saXN0LmNoaWxkcmVuKCkuZXEoaSkuZmluZCgnYScpO1xyXG5cclxuXHRcdFx0XHRcdGlmICh3aWR0aFJhdGlvID49IDEgJiYgaGVpZ2h0UmF0aW8gPj0gMSkge1xyXG5cdFx0XHRcdFx0XHRpZiAod2lkdGhSYXRpbyA+IGhlaWdodFJhdGlvKSB7XHJcblx0XHRcdFx0XHRcdFx0d2lkdGggID0gTWF0aC5mbG9vcih3aWR0aCAvIGhlaWdodFJhdGlvKTtcclxuXHRcdFx0XHRcdFx0XHRoZWlnaHQgPSB0aHVtYkhlaWdodDtcclxuXHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0d2lkdGggID0gdGh1bWJXaWR0aDtcclxuXHRcdFx0XHRcdFx0XHRoZWlnaHQgPSBNYXRoLmZsb29yKGhlaWdodCAvIHdpZHRoUmF0aW8pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0JCh0aGlzKS5jc3Moe1xyXG5cdFx0XHRcdFx0XHR3aWR0aCAgOiB3aWR0aCxcclxuXHRcdFx0XHRcdFx0aGVpZ2h0IDogaGVpZ2h0LFxyXG5cdFx0XHRcdFx0XHR0b3AgICAgOiBNYXRoLmZsb29yKHRodW1iSGVpZ2h0IC8gMiAtIGhlaWdodCAvIDIpLFxyXG5cdFx0XHRcdFx0XHRsZWZ0ICAgOiBNYXRoLmZsb29yKHRodW1iV2lkdGggLyAyIC0gd2lkdGggLyAyKVxyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0cGFyZW50LndpZHRoKHRodW1iV2lkdGgpLmhlaWdodCh0aHVtYkhlaWdodCk7XHJcblxyXG5cdFx0XHRcdFx0JCh0aGlzKS5oaWRlKCkuYXBwZW5kVG8ocGFyZW50KS5mYWRlSW4oMzAwKTtcclxuXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQuYXR0cignc3JjJywgICBocmVmKVxyXG5cdFx0XHRcdC5hdHRyKCd0aXRsZScsIGVsLnRpdGxlKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvL1NldCBpbml0aWFsIHdpZHRoXHJcblx0XHRcdHRoaXMud2lkdGggPSB0aGlzLmxpc3QuY2hpbGRyZW4oKS5lcSgwKS5vdXRlcldpZHRoKHRydWUpO1xyXG5cclxuXHRcdFx0dGhpcy5saXN0LndpZHRoKHRoaXMud2lkdGggKiAob2JqLmdyb3VwLmxlbmd0aCArIDEpKS5jc3MoJ2xlZnQnLCBNYXRoLmZsb29yKCQod2luZG93KS53aWR0aCgpICogMC41IC0gKG9iai5pbmRleCAqIHRoaXMud2lkdGggKyB0aGlzLndpZHRoICogMC41KSkpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRiZWZvcmVMb2FkOiBmdW5jdGlvbiAob3B0cywgb2JqKSB7XHJcblx0XHRcdC8vUmVtb3ZlIHNlbGYgaWYgZ2FsbGVyeSBkbyBub3QgaGF2ZSBhdCBsZWFzdCB0d28gaXRlbXNcclxuXHRcdFx0aWYgKG9iai5ncm91cC5sZW5ndGggPCAyKSB7XHJcblx0XHRcdFx0b2JqLmhlbHBlcnMudGh1bWJzID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly9JbmNyZWFzZSBib3R0b20gbWFyZ2luIHRvIGdpdmUgc3BhY2UgZm9yIHRodW1ic1xyXG5cdFx0XHRvYmoubWFyZ2luWyBvcHRzLnBvc2l0aW9uID09PSAndG9wJyA/IDAgOiAyIF0gKz0gKChvcHRzLmhlaWdodCkgKyAxNSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdGFmdGVyU2hvdzogZnVuY3Rpb24gKG9wdHMsIG9iaikge1xyXG5cdFx0XHQvL0NoZWNrIGlmIGV4aXN0cyBhbmQgY3JlYXRlIG9yIHVwZGF0ZSBsaXN0XHJcblx0XHRcdGlmICh0aGlzLmxpc3QpIHtcclxuXHRcdFx0XHR0aGlzLm9uVXBkYXRlKG9wdHMsIG9iaik7XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuaW5pdChvcHRzLCBvYmopO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvL1NldCBhY3RpdmUgZWxlbWVudFxyXG5cdFx0XHR0aGlzLmxpc3QuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuZXEob2JqLmluZGV4KS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9LFxyXG5cclxuXHRcdC8vQ2VudGVyIGxpc3RcclxuXHRcdG9uVXBkYXRlOiBmdW5jdGlvbiAob3B0cywgb2JqKSB7XHJcblx0XHRcdGlmICh0aGlzLmxpc3QpIHtcclxuXHRcdFx0XHR0aGlzLmxpc3Quc3RvcCh0cnVlKS5hbmltYXRlKHtcclxuXHRcdFx0XHRcdCdsZWZ0JzogTWF0aC5mbG9vcigkKHdpbmRvdykud2lkdGgoKSAqIDAuNSAtIChvYmouaW5kZXggKiB0aGlzLndpZHRoICsgdGhpcy53aWR0aCAqIDAuNSkpXHJcblx0XHRcdFx0fSwgMTUwKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHJcblx0XHRiZWZvcmVDbG9zZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodGhpcy53cmFwKSB7XHJcblx0XHRcdFx0dGhpcy53cmFwLnJlbW92ZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLndyYXAgID0gbnVsbDtcclxuXHRcdFx0dGhpcy5saXN0ICA9IG51bGw7XHJcblx0XHRcdHRoaXMud2lkdGggPSAwO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn0oalF1ZXJ5KSk7Il19
