(function () {

  var SLIDE = {

    init: function () {
      // bind events for changing slides
      $(window)
        .keyup(function (e) {
          if ($("body").hasClass("slideshow")) {
            if ((e.keyCode === 39) || (e.keyCode === 32)) { // [left] or [space]
              SLIDE.next();
            } else if (e.keyCode === 37) { // [right]
              SLIDE.prev();
            }
            e.preventDefault();
          }
        });

      // turn all links with rel='iframe' into iframes
      // each iframe will be covered by overlay to prevent stealing focus
      $(".slide a[rel='iframe']").each(function () {
        var iframe = '<iframe src="{src}" class="slideshow-only"></iframe>',
            overlay = '<div class="slideshow-only overlay"><a href="{href}" title="{title}" target="_blank">{text}</a></div>';
        iframe = iframe.replace(/\{src\}/, this.href);
        overlay = overlay.replace(/\{title\}/g, this.title).replace(/\{href\}|\{text\}/g, this.href);
        $(this).after(iframe).after(overlay);
      });
    },

    start: function (slide) {
      if (slide) {
        SLIDE.current = $(slide);
      }
      if (!SLIDE.current || !SLIDE.current.length) {
        SLIDE.current = $(".slide").eq(0);
      }
      $("body").addClass("slideshow");
      SLIDE.show(SLIDE.current);
    },

    stop: function () {
      $("body").removeClass("slideshow");
      SLIDE.current.siblings().show();
    },

    show: function (slide) {
      if (slide.length) {
        if (slide.attr("id")) {
          window.location.hash = "#" + slide.attr("id");
        }
        slide.siblings().hide();
        SLIDE.current = slide.show();
      }
    }

  };

  $.each(["next", "prev"], function () {
    var name = this + "";
    SLIDE[name] = function () {
      SLIDE.show(SLIDE.current[name]());
    };
  });

  $(document).ready(function () {

    SLIDE.init();
    SLIDE.start(window.location.hash);

  });

}());
