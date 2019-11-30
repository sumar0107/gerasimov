// custom.js
let hasClass, addClass, removeClass;
if ("classList" in document.documentElement) {
  hasClass = function (e, t) {
    return e.classList.contains(t)
  };
  addClass = function (e, t) {
    e.classList.add(t)
  };
  removeClass = function (e, t) {
    e.classList.remove(t)
  }
} else {
  hasClass = function (e, t) {
    return new RegExp("\\b" + t + "\\b").test(e.className)
  };
  addClass = function (e, t) {
    hasClass(e, t) || (e.className += " " + t)
  };
  removeClass = function (e, t) {
    e.className = e.className.replace(new RegExp("\\b" + t + "\\b", "g"), "")
  }
}

const Utils = {
  loadImages: function (e, t) {
    t || (t = 'img[data-load="false"]');
    var i, o, s = document.querySelectorAll(t), l = s.length;
    for (i = 0; i < l; i++)
      o = s[i],
        ImageLoader.load(o, {
          load: !0
        }),
      e && addClass(o, "loaded")
  },
  debounce: function (e, t, i) {
    var o;
    return function () {
      var s = this
        , l = arguments
        , a = i && !o;
      clearTimeout(o),
        o = setTimeout(function () {
          o = null,
          i || e.apply(s, l)
        }, t),
      a && e.apply(s, l)
    }
  },
  hamburger: function () {
    var e = Cache.header.querySelector(".hamburger");
    e && Utils.click(e, function () {
      e.classList.toggle("is-active")
    })
  },
  pageType: function () {
    var e, t = ["page", "gallery", "blog", "index", "project"], i = t.length, o = document.body.classList;
    for (e = 0; e < i; e++)
      if (o.contains("collection-type-" + t[e]))
        return o.contains("view-item") ? t[e] + "-item" : t[e]
  },
  classSwap: function (e, t, i) {
    hasClass(e, t) || addClass(e, t),
    hasClass(e, i) && removeClass(e, i)
  },
  isFullScreen: function () {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)
      return addClass(document.body, "slideshow-open"),
        !0;
    removeClass(document.body, "slideshow-open")
  },
  openFullScreen: function (e) {
    Cache.slideshow.requestFullscreen ? Cache.slideshow.requestFullscreen() : Cache.slideshow.webkitRequestFullscreen ? Cache.slideshow.webkitRequestFullscreen() : Cache.slideshow.mozRequestFullScreen ? Cache.slideshow.mozRequestFullScreen() : Cache.slideshow.msRequestFullscreen && Cache.slideshow.msRequestFullscreen()
  },
  closeFullScreen: function (e) {
    document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen()
  },
  isMobile: function () {
    return window.navigator.userAgent.match(/Android/i) || window.navigator.userAgent.match(/BlackBerry/i) || window.navigator.userAgent.match(/iPhone|iPad|iPod/i) || window.navigator.userAgent.match(/Opera Mini/i) || window.navigator.userAgent.match(/IEMobile/i) || window.matchMedia("(max-width: 640px)").matches
  },
  click: function (e, t) {
    e.addEventListener("click", t)
  },
  ready: function (e) {
    document.addEventListener("DOMContentLoaded", e)
  },
  resize: function (e) {
    window.addEventListener("resize", Utils.debounce(e, 100))
  },
  scroll: function (e) {
    window.addEventListener("scroll", Utils.debounce(e, 50))
  },
  animationEnd: function (e) {
    document.addEventListener("webkitAnimationEnd", e),
      document.addEventListener("animationend", e)
  },
  convertRemToPixels: function (e) {
    return e * parseFloat(getComputedStyle(document.documentElement).fontSize)
  },
  createGrid: function (e, t, i, o, s, l) {
    var a, n, r = o.offsetWidth, c = parseInt(r / e), d = t / e;
    c ? (a = r - (c - 1) * i,
      n = Math.floor(a / c) - .5) : (a = r,
      n = Math.floor(a) - .5);
    var u = Math.floor(n * d);
    if (s) {
      var h, m, f = s.length;
      for (h = 0; h < f; h++)
        (m = s[h]).style.width = n + "px",
          m.style.height = u + "px",
        l && (m.parentNode.nextElementSibling.style.width = n + "px")
    }
  },
  isoInit: function (e, t, i) {
    var o = "0.45s";
    Consts.isMobile && (o = "0s");
    new Isotope(e, {
      itemSelector: t,
      transitionDuration: o,
      layoutMode: "fitRows",
      hiddenStyle: {
        opacity: 0
      },
      visibleStyle: {
        opacity: 1
      },
      fitRows: {
        gutter: i
      }
    })
  }
};
const Cache = {
  isoGrid: document.querySelector(".iso-grid"),
  isoItems: document.querySelectorAll(".iso-image"),
  header: document.querySelector(".site-header"),
  main: document.querySelector(".site-content"),
  siteNav: document.querySelector(".site-nav"),
  mainNav: document.querySelector(".main-nav"),
  transNav: document.querySelector(".trans-nav"),
  hamburger: document.querySelector(".hamburger"),
  footer: document.querySelector(".site-footer"),
  siteTitle: document.querySelector('[data-content-field="site-title"]'),
  slideshow: document.querySelector(".project-slideshow"),
  $slideshow: $(".project-slideshow"),
  $indexGallery: $(".index-gallery"),
  projectList: document.querySelector(".project-list"),
  $projectList: $(".project-list"),
  blogList: document.querySelector(".blog-list"),
  detailMenu: document.querySelector(".detail-menu"),
  pageType: "",
  hasGallery: document.querySelectorAll(".project-slideshow, .index-gallery"),
  useCover: document.querySelectorAll(".index-gallery.full-height"),
  toTop: document.querySelector(".to-top"),
  screenHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
};
const States = {
  hasGrid: null != Cache.isoGrid || null != Cache.blogList || null != Cache.projectList
};
const Consts = {
  logoWidth: Cache.siteTitle.offsetWidth,
  menuWidth: Cache.mainNav.offsetWidth,
  isMobile: Utils.isMobile()
};
const Tweak = {
  isoWidth: parseInt(Y.Squarespace.Template.getTweakValue("tweak-grid-item-width"), 10),
  isoHeight: parseInt(Y.Squarespace.Template.getTweakValue("tweak-grid-item-height"), 10),
  isoGutter: Utils.convertRemToPixels(parseFloat(Y.Squarespace.Template.getTweakValue("tweak-grid-item-gutter"))),
  blogWidth: parseInt(Y.Squarespace.Template.getTweakValue("tweak-blog-item-width"), 10),
  blogHeight: parseInt(Y.Squarespace.Template.getTweakValue("tweak-blog-item-height"), 10),
  blogGutter: Utils.convertRemToPixels(parseFloat(Y.Squarespace.Template.getTweakValue("tweak-blog-item-gutter"))),
  listWidth: parseInt(Y.Squarespace.Template.getTweakValue("tweak-list-item-width"), 10),
  listHeight: parseInt(Y.Squarespace.Template.getTweakValue("tweak-list-item-height"), 10),
  listGutter: Utils.convertRemToPixels(parseFloat(Y.Squarespace.Template.getTweakValue("tweak-list-item-gutter")))
};
const RevealLayout = {
  partial: function () {
    addClass(Cache.header, "ready"),
      addClass(Cache.footer, "ready")
  },
  all: function () {
    addClass(Cache.header, "ready"),
      addClass(Cache.main, "ready"),
      addClass(Cache.footer, "ready")
  }
};
const siteLayout = {
  forceMobile: function () {
    document.querySelector(".site-nav").offsetWidth - 60 <= Consts.menuWidth + Consts.logoWidth || Consts.isMobile ? document.body.classList.contains("force-mobile") || document.body.classList.add("force-mobile") : document.body.classList.contains("force-mobile") && document.body.classList.remove("force-mobile")
  },
  menuOffset: function () {
    var e = document.querySelector(".site-header").offsetHeight;
    Cache.main.style.marginTop = e + "px",
      Cache.header = document.querySelector(".site-header")
  },
  resize: function (e) {
    Cache.mainNav && this.forceMobile(),
      "project" !== e ? Cache.useCover.length || this.menuOffset() : "project" == e && this.menuOffset()
  },
  init: function (e) {
    Cache.mainNav && Utils.hamburger(),
    "project" !== e && Cache.useCover.length && document.body.classList.add("cover-page"),
      siteLayout.resize(e)
  }
};
let iso;
let isIsotopeInit = !1;
const IsoGrid = {
  scaling: function (e) {
    e && (Tweak.isoWidth = Tweak.isoWidth / 1.5,
      Tweak.isoHeight = Tweak.isoHeight / 1.5,
      Tweak.isoGutter = 2 * Tweak.isoGutter);
    var t, i, o = Cache.isoGrid.offsetWidth, s = parseInt(o / Tweak.isoWidth), l = Tweak.isoHeight / Tweak.isoWidth;
    0 === s ? (t = o,
      i = Math.floor(t) - .5) : (t = o - (s - 1) * Tweak.isoGutter,
      i = Math.floor(t / s) - .5);
    for (var a = Math.floor(i * l), n = Cache.isoItems.length, r = 0; r < n; r++)
      Cache.isoItems[r].style.width = i + "px",
        Cache.isoItems[r].style.height = a + "px"
  },
  isoInit: function () {
    var e = "0.45s";
    Consts.isMobile && (e = "0s"),
      iso = new Isotope(".iso-grid", {
        itemSelector: ".iso-item",
        transitionDuration: e,
        layoutMode: "fitRows",
        hiddenStyle: {
          opacity: 0
        },
        visibleStyle: {
          opacity: 1
        },
        fitRows: {
          gutter: Tweak.isoGutter
        }
      })
  },
  getHash: function () {
    location.hash;
    var e = location.hash.match(/category=([^&]+)/i)
      , t = e && e[1];
    return t && decodeURIComponent(t)
  },
  updateHash: function () {
    var e, t = this.getHash();
    e = null !== t ? ".category-" + t : "*";
    var i = document.querySelector(".trans-nav li.active")
      , o = document.querySelector('.iso-btn[data-filter="' + e + '"]');
    if (i.classList.remove("active"),
    null !== o && o.parentNode.classList.add("active"),
      isIsotopeInit)
      return iso.arrange({
        filter: e
      }),
        void Utils.loadImages();
    this.isoInit(),
      iso.once("arrangeComplete", function () {
        Cache.main.classList.add("ready")
      }),
      iso.arrange({
        filter: e
      }),
      Utils.loadImages(!0),
      isIsotopeInit = !0
  },
  controls: function () {
    for (var e = document.querySelectorAll(".iso-btn"), t = 0; t < e.length; t++)
      e[t].addEventListener("click", function (e) {
        var t = this.dataset.filter.split("-").pop();
        location.hash = "*" === t ? "" : "category=" + encodeURIComponent(t),
          e.preventDefault()
      })
  },
  init: function () {
    this.scaling(),
    Consts.isMobile || this.controls(),
      this.updateHash(),
      window.addEventListener("hashchange", this.updateHash.bind(this))
  }
};
const Index = {
  slick: function () {
    Cache.$indexGallery.slick({
      fade: !0,
      slide: ".slide",
      autoplay: !1,
      autoplaySpeed: 3500,
      pauseOnFocus: !1,
      pauseOnHover: !1,
      speed: 350,
      easing: "swing",
      dots: !0,
      arrows: !1
    }),
    Cache.useCover.length && setTimeout(function () {
      Cache.$indexGallery.slick("slickPlay")
    }, 4e3)
  },
  init: function () {
    Cache.$indexGallery.length && (this.slick(),
      Utils.loadImages(!0)),
    Consts.isMobile || (UIkit.scrollspyNav(".anchor-nav", {
      cls: "active",
      closest: "li",
      offset: Cache.header.offsetHeight + 5
    }),
      UIkit.scroll(".anchor-btn", {
        offset: Cache.header.offsetHeight
      }))
  }
};
const Blog = {
  setup: function () {
    var e, t, i, o = Cache.blogList, s = o.querySelectorAll(".blog-item"),
      l = Cache.transNav.querySelector(".anchor-nav"), a = [];
    if (s) {
      var n = s.length;
      for (e = 0; e < n; e++)
        i = (t = s[e]).dataset.ao,
        -1 === a.indexOf(i) && a.push(i);
      if (n = a.length) {
        var r = document.createDocumentFragment()
          , c = document.createDocumentFragment();
        for (e = 0; e < n; e++) {
          if (t = a[e],
          e <= 6) {
            var d = document.createElement("li")
              , u = document.createElement("a");
            u.className = "anchor-btn",
              u.href = "#section-" + t,
              6 === e ? (u.title = "older",
                u.textContent = "Older") : (u.title = t,
                u.textContent = t),
              d.appendChild(u),
              c.appendChild(d)
          }
          var h, m = document.createElement("section"), f = document.createElement("h3"),
            g = o.querySelectorAll('[data-ao="' + t + '"]'), p = g.length;
          for (m.className = "blog-section",
                 f.textContent = t,
                 f.id = "section-" + t,
                 f.className = "section-title",
                 h = 0; h < p; h++)
            targetPost = g[h],
              m.appendChild(targetPost);
          r.appendChild(f),
            r.appendChild(m)
        }
        l.appendChild(c),
          o.appendChild(r)
      }
    }
  },
  grid: function (e) {
    var t, i, o, s = Cache.blogList.querySelectorAll(".blog-section"), l = s.length;
    if (l)
      for (t = 0; t < l; t++)
        o = (i = s[t]).querySelectorAll(".blog-image"),
          Utils.createGrid(Tweak.blogWidth, Tweak.blogHeight, Tweak.blogGutter, i, o, !0),
        e && Utils.isoInit(i, ".blog-item", Tweak.blogGutter)
  },
  init: function () {
    this.setup(),
      siteLayout.menuOffset(),
      this.grid(!0),
      Utils.loadImages(!0),
    Consts.isMobile || (UIkit.scrollspyNav(".anchor-nav", {
      cls: "active",
      closest: "li",
      offset: Cache.header.offsetHeight + 5
    }),
      UIkit.scroll(".anchor-btn", {
        offset: Cache.header.offsetHeight
      }))
  }
};
let respond;
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
Utils.ready(function () {
  Cache.pageType = Utils.pageType();
  var e = Cache.pageType;
  siteLayout.init(e),
  "project" === e && Cache.hasGallery.length && Project.init(),
  "index" === e && Index.init(),
  "gallery" === e && IsoGrid.init(),
  "blog" === e && Blog.init(),
  "blog-item" === e && Utils.loadImages(!0),
    UIkit.components.scroll.options.defaults.duration = 750,
    "gallery" === e ? RevealLayout.partial() : RevealLayout.all(),
    Utils.animationEnd(function (e) {
      var t = e.target;
      "IMG" == t.nodeName && (t.style.opacity = 1,
        t.style.animation = "none")
    })
});
Utils.resize(function () {
  States.hasGrid && ("blog" === Cache.pageType ? Blog.grid() : "project" === Cache.pageType ? (Project.slideMaxHeight(),
    Project.grid()) : IsoGrid.scaling()),
    Cache.header.offsetHeight = Cache.header.offsetHeight,
    Cache.screenHeight = screen.height,
    Consts.isMobile = Utils.isMobile(),
    siteLayout.resize(Cache.pageType),
    Utils.loadImages()
});
