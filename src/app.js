let pageManager;
let prevScrollTop = $(window).scrollTop();

window.onload = () => {
  let smallScreenThreshold = 961;
  let isSmallScreen = (window.innerWidth <= smallScreenThreshold);

  pageManager = new PageManager();
  let navigation = new Navigation($('.header').innerHeight() + 10);
  let header = new Header(false, (x) => {
    if (!isSmallScreen) {
      navigation.slideToggle(x);
    }
  });

  $('.menu_btn').click(() => {
    navigation.show();
    $('html').css('overflow', 'hidden');
  });

  $('.navigation_close').click(() => {
    navigation.hide();
    $('html').css('overflow', 'auto');
  })

  setNavButtons();
  calcHomeBg();
  navigation.toggle(
    !isSmallScreen &&
    $(window).scrollTop() >= $('.base_page').height(),
    false
  );

  window.onresize = () => {
    isSmallScreen = (window.innerWidth <= smallScreenThreshold);
    navigation.toggle(!isSmallScreen);
    calcHomeBg();
  }

  // window.onscroll = () => {
  //   navigation.toggle(
  //     !isSmallScreen &&
  //     $(window).scrollTop() >= $('.base_page').height()
  //   );

  //   if (prevScrollTop) {
  //     if ($(window).scrollTop() > prevScrollTop) {
  //       // scroll down
  //       header.hide();
  //     } else if ($(window).scrollTop() < prevScrollTop ) {
  //       // scroll up
  //       header.show();
  //     }
  //   }

  //   prevScrollTop = $(window).scrollTop();
  // }
}

$('[data-tooltip]').hover((ev) => {
  if (ev.type == "mouseenter") {
    $('.tooltip').delay(1000).fadeIn(100);
    $('.tooltip').css("left", ($(ev.currentTarget).offset().left + ev.currentTarget.offsetWidth) + 'px');
    $('.tooltip').css("top", ($(ev.currentTarget).offset().top + ev.currentTarget.offsetHeight) + 'px');
    $('.tooltip').text($(ev.currentTarget).data('tooltip'));
  } else {
    $('.tooltip').hide(100);
  }
})

let Header = function (initial, callback = () => {}) {
  let el = $('.header');
  let isShowing_ = initial;

  this.show = (animate = true, ignore = false) => {
    if (isShowing_ != true || ignore) {
      el.slideDown(animate ? 200 : 0);
      callback(true);
      isShowing_ = true;
    }
  }

  this.hide = (animate = true, ignore = false) => {
    if (isShowing_ != false || ignore) {
      el.slideUp(animate ? 200 : 0);
      callback(false);
      isShowing_ = false;
    }
  }

  this.toggle = (x, animate = true, ignore = false) => {
    if (x) this.show(ignore);
    else this.hide(ignore);
  }

  this.toggle(initial, true, true);
}

let Navigation = function (slideTop) {
  let el = $('.navigation_wrapper');
  let initTop_ = parseInt(el.css('top')) || 0;
  let movedTop_ = slideTop;

  this.show = (animate = true) => el.slideDown(animate ? 200 : 0);

  this.hide = (animate = true) => el.slideUp(animate ? 200 : 0);

  this.slideDown = () => {
    el.animate({top: movedTop_}, 200)
    $('html').css('overflow', 'auto');
  }

  this.slideUp = () => {
    el.animate({top: initTop_}, 200)
    $('html').css('overflow', 'auto');
  }

  this.toggle = (x, animate = true) => {
    if (x) this.show(animate);
    else this.hide(animate);
  }

  this.slideToggle = (x) => {
    if (x) this.slideDown();
    else this.slideUp();
  }
}

let calcHomeBg = () => {
  $('.home_bg').css('height', (position($('.home_title'), $('.base_page')).top + ($('.home_title').height() / 2)) + 'px');
}

let position = (target, other) => {
  return {
    top: target.offset().top - other.offset().top - other.scrollTop(),
    left: target.offset().left - other.offset().left - other.scrollLeft(),
  };
}

let setNavButtons = () => {
  $('.home_nav').click(() => {
    pageManager.navigationTarget('#home');
  })

  $('.about_me_nav').click(() => {
    pageManager.navigationTarget('#about');
  });

  $('.projects_nav').click(() => {
    pageManager.navigationTarget('#projects');
  });
}
