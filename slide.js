(function () {

  $.slide = {

    init: function (slides) {

      if (slides) {
        $.slide.slides = $(slides);
      }
      if (!$.slide.slides || !$.slide.slides.length) {
        $.slide.slides = $(".slide");
      }
      $.slide.current = 0;

      if (!$.slide.init.done) {
        // bind events for changing slides
        $(window)
          .keydown(function (e) {
            if ($("body").hasClass("slideshow")) {
              if ((e.keyCode === 39) || (e.keyCode === 40) || (e.keyCode === 32)) { // [left], [down], [space]
                $.slide.next();
                e.preventDefault();
              } else if ((e.keyCode === 37) || (e.keyCode === 38)) { // [right], [up]
                $.slide.prev();
                e.preventDefault();
              }
            }
          });

        // bind events to slideshow action links
        $.each(["start", "stop", "toggle", "next", "prev"], function () {
          var name = this + "";
          $("a[rel='slide." + name + "']").click(function () {
            $.slide[name]();
            return false;
          });
        });

        // turn all links with rel='iframe' into iframes
        // each iframe will be covered by overlay to prevent stealing focus
        $(".slide a[rel='iframe']").each(function () {
          var iframe = '<iframe src="{src}" class="slideshow-only" scrolling="no"></iframe>',
              overlay = '<div class="slideshow-only overlay"><a href="{href}" title="{title}" target="_blank">{text}</a></div>';
          iframe = iframe.replace(/\{src\}/, this.href);
          overlay = overlay.replace(/\{title\}/g, this.title).replace(/\{href\}|\{text\}/g, this.href);
          $(this).after(overlay).after(iframe);
        });

        $.slide.init.done = true;
      }
    },

    start: function (slide) {
      $("body").addClass("slideshow");
      $.slide.show(slide);
    },

    stop: function () {
      $("body").removeClass("slideshow");
      window.location.hash = "";
    },

    toggle: function () {
      if ($("body").hasClass("slideshow")) {
        $.slide.stop();
      } else {
        $.slide.start();
      }
    },

    show: function (slide) {
      if (typeof slide !== 'number') {
        slide = $.slide.slides.index($(slide));
      }
      if (slide < 0) {
        slide = 0;
      } else if (slide >= $.slide.slides.length) {
        slide = $.slide.slides.length - 1;
      }
      if (slide !== $.slide.current) {
        $.slide.current = slide;
        slide = $.slide.slides.eq(slide);
        $('html,body').animate({scrollTop: slide.offset().top, scrollLeft: slide.offset().left}, 500, function () {
          if (slide.attr("id")) {
            window.location.hash = "#" + slide.attr("id");
          }
        });
      }
    },

    next: function () {
      $.slide.show($.slide.current + 1);
    },

    prev: function () {
      $.slide.show($.slide.current - 1);
    }

  };

  $.fn.slideshow = function (slide) {
    $.slide.init(this);
    $.slide.start(slide);
    return this;
  };

  $(document).ready(function () {
    $.slide.init();
  });

}());

