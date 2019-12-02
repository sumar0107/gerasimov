const Project = {
  slideMaxHeight: function () {
    var e, t = document.querySelector(".site-header").offsetHeight,
      i = document.querySelector(".detail-menu").offsetHeight, o = Cache.slideshow.querySelectorAll(".slide"),
      s = o.length, l = document.documentElement.clientHeight - (t + i);
    if (s)
      for (e = 0; e < s; e++)
        o[e].style.maxHeight = l + "px"
  },
  slick: function () {
    Cache.$slideshow.slick({
      fade: !0,
      slide: ".slide",
      prevArrow: '<a href="" class="prev hide"><svg viewBox="0 0 50 71" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="b" d="M34.90463 6.48785L28.417 0 .907 27.51l27.51 27.51 6.48763-6.48785L13.88248 27.51z"/><filter x="-39.7%" y="-20.9%" width="173.5%" height="145.4%" filterUnits="objectBoundingBox" id="a"><feMorphology radius=".5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"/><feOffset dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="3.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.603091033 0" in="shadowBlurOuter1"/></filter></defs><g transform="translate(8 7)" fill-rule="nonzero" fill="none"><use fill="#000" filter="url(#a)" xlink:href="#b"/><use fill="#FFF" fill-rule="evenodd" xlink:href="#b"/></g></svg></a>',
      nextArrow: '<a href="" class="next"><svg viewBox="0 0 50 71" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="d" d="M7.39763 0L.91 6.48785 21.93215 27.51.91 48.53215 7.39763 55.02l27.51-27.51z"/><filter x="-38.2%" y="-20%" width="176.5%" height="147.3%" filterUnits="objectBoundingBox" id="c"><feMorphology radius=".5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"/><feOffset dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="3.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" in="shadowBlurOuter1"/></filter></defs><g transform="translate(7 6)" fill-rule="nonzero" fill="none"><use fill="#000" filter="url(#c)" xlink:href="#d"/><use fill="#FFF" fill-rule="evenodd" xlink:href="#d"/></g></svg></a>',
      appendArrows: ".slick-list"
    });
    var e, t = Cache.detailMenu.querySelector(".current"), i = Cache.detailMenu.querySelector(".title"),
      o = Cache.slideshow.querySelectorAll(".slide"), s = o.length - 1, l = Cache.slideshow.querySelector(".prev"),
      a = Cache.slideshow.querySelector(".next");
    i.textContent = o[0].querySelector(".slide-meta").textContent,
      Cache.$slideshow.on("beforeChange", function (n, r, c, d) {
        e = o[d].querySelector(".slide-meta").textContent,
          i.textContent = e,
          t.textContent = d + 1,
          d === s ? addClass(a, "hide") : removeClass(a, "hide"),
          d ? removeClass(l, "hide") : addClass(l, "hide")
      })
  },
  tooltips: function () {
    UIkit.tooltip(".tooltip", {
      animation: "uk-animation-fade"
    })
  },
  revealUI: function () {
    hasClass(document.body, "hide-project-ui") && removeClass(document.body, "hide-project-ui"),
      clearTimeout(respond),
      respond = setTimeout(function () {
        Utils.isFullScreen() && addClass(document.body, "hide-project-ui")
      }, 2500)
  },
  mouseMoveOn: function () {
    Cache.$slideshow.on("mousemove", Utils.debounce(Project.revealUI, 100))
  },
  mouseMoveOff: function () {
    removeClass(document.body, "hide-project-ui"),
      Cache.$slideshow.off("mousemove")
  },
  list: function () {
    removeClass(Cache.projectList, "delay"),
      Project.grid(!0),
      Utils.loadImages(!0, ".project-list .responsive")
  },
  grid: function (e) {
    var t = document.querySelector(".project-list-items")
      , i = t.querySelectorAll(".project-image");
    Utils.createGrid(Tweak.listWidth, Tweak.listHeight, Tweak.listGutter, t, i),
    e && Utils.isoInit(".project-list-items", ".project-item", Tweak.listGutter)
  },
  closeList: function () {
    Cache.main.dataset.view = "detail",
      removeClass(Cache.projectList, "open"),
      addClass(Cache.projectList, "close"),
      removeClass(document.documentElement, "list-view")
  },
  controls: function () {
    var e, t = Cache.detailMenu.querySelector(".detail-btn"), i = Cache.detailMenu.querySelector(".list-btn"),
      o = Cache.detailMenu.querySelector(".fullscreen-btn"), s = Cache.projectList.querySelector(".close-button"),
      l = Cache.projectList.querySelectorAll(".project-item"), a = l.length;
    Cache.main.dataset.view = "detail";
    var n = UIkit.scroll(t);
    for (Utils.click(t, function (e) {
      "detail" !== Cache.main.dataset.view && (Cache.main.dataset.view = "detail"),
      Utils.isFullScreen() && (Utils.closeFullScreen(o),
        n = UIkit.scroll(t))
    }),
           Utils.click(i, function (e) {
             "list" !== Cache.main.dataset.view && (Cache.main.dataset.view = "list",
               removeClass(Cache.projectList, "close"),
               addClass(Cache.projectList, "open"),
               addClass(document.documentElement, "list-view")),
             Utils.isFullScreen() && Utils.closeFullScreen(o)
           }),
           Utils.click(o, function (e) {
             Utils.isFullScreen() ? (Utils.closeFullScreen(this),
               Project.mouseMoveOff()) : (Utils.openFullScreen(this),
               Project.mouseMoveOn(),
               n.$destroy(),
               n = UIkit.scroll(t),
             "detail" !== Cache.main.dataset.view && (Cache.main.dataset.view = "detail"))
           }),
           e = 0; e < a; e++)
      Utils.click(l[e], function (e) {
        var t = $(l).index(this);
        Cache.$slideshow.slick("slickGoTo", t, !0),
          Project.closeList()
      });
    Utils.click(s, function () {
      Project.closeList()
    }),
      $(document).on("webkitfullscreenchange mozfullscreenchange fullscreenchange", function (e) {
        o.classList.toggle("active"),
        Utils.isFullScreen() || Project.mouseMoveOff()
      })
  },
  init: function () {
    if (Cache.$slideshow.length)
      if (this.slick(),
        Utils.loadImages(!0, ".slide .responsive"),
        Consts.isMobile) {
        var e = Cache.detailMenu.querySelector(".detail-btn");
        Cache.main.dataset.view = "detail",
          UIkit.scroll(e)
      } else
        this.slideMaxHeight(),
          this.controls(),
          this.tooltips(),
          Project.list()
  }
};
