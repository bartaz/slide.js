(function () {

  $.slide = {

    init: function () {
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

      // turn all links with rel='iframe' into iframes
      // each iframe will be covered by overlay to prevent stealing focus
      $(".slide a[rel='iframe']").each(function () {
        var iframe = '<iframe src="{src}" class="slideshow-only"></iframe>',
            overlay = '<div class="slideshow-only overlay"><a href="{href}" title="{title}" target="_blank">{text}</a></div>';
        iframe = iframe.replace(/\{src\}/, this.href);
        overlay = overlay.replace(/\{title\}/g, this.title).replace(/\{href\}|\{text\}/g, this.href);
        $(this).after(overlay).after(iframe);
      });
    },

    start: function (slide) {
      if (slide) {
        $.slide.current = $(slide);
      }
      if (!$.slide.current || !$.slide.current.length) {
        $.slide.current = $(".slide").eq(0);
      }
      $("body").addClass("slideshow");
      $.slide.show($.slide.current);
    },

    stop: function () {
      $("body").removeClass("slideshow");
    },

    show: function (slide) {
      if (slide.length) {
        $('html,body').animate({scrollTop: slide.offset().top}, 500, function () {
          if (slide.attr("id")) {
            window.location.hash = "#" + slide.attr("id");
          }
        });
        $.slide.current = slide;
      }
    }

  };

  $.each(["next", "prev"], function () {
    var name = this + "";
    $.slide[name] = function () {
      $.slide.show($.slide.current[name]());
    };
  });

  $(document).ready(function () {

    $.slide.init();
    $.slide.start(window.location.hash);

  });

}());
