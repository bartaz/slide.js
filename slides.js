(function () {

  var SLIDE = {

    current: null,

    init: function (slides, openSlide) {
      SLIDE.current = $(slides).hide().eq(0);
      if (openSlide) {
        openSlide = $(openSlide);
        if (openSlide.length) {
          SLIDE.current = openSlide;
        }
      }
      SLIDE.title = document.title;
      SLIDE.show(SLIDE.current);
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

    SLIDE.init(".slides", window.location.hash);

    // bind events for changing slides
    $(window)
      .keyup(function (e) {
        if ((e.keyCode === 39) || (e.keyCode === 32)) { // [left] or [space]
          SLIDE.next();
        } else if (e.keyCode === 37) { // [right]
          SLIDE.prev();
        }
        e.preventDefault();
      });

    // turn all links with rel='iframe' into iframes
    // each iframe will be covered by overlay to prevent stealing focus
    $(".slide a[rel='iframe']").each(function () {
      var iframe = '<iframe src="{src}"></iframe>',
          overlay = '<div class="overlay"><a href="{href}" title="{title}" target="_blank">{text}</a></div>';
      iframe = iframe.replace(/\{src\}/, this.href);
      overlay = overlay.replace(/\{title\}/g, this.title).replace(/\{href\}|\{text\}/g, this.href);
      $(this).after(iframe).after(overlay);
    });

  });

}());
