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
