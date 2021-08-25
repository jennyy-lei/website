let pageManager;
let prevScrollTop = $(window).scrollTop();
let isOverlayOpen = false;

$('html').css('overflow', 'hidden');

window.onload = () => {
  let reset = () => {
    if (isOverlayOpen) {
      $('.overlay').css('display', 'none');
      $('html').css('overflow', 'auto');
      isOverlayOpen = false;
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
      reset();
      pageManager.navigationTarget('#home');
    })

    $('.about_me_nav').click(() => {
      reset();
      pageManager.navigationTarget('#about');
    });

    $('.projects_nav').click(() => {
      reset();
      pageManager.navigationTarget('#projects');
    });
  }

  let smallScreenThreshold = 961;
  let isSmallScreen = (window.innerWidth <= smallScreenThreshold);

  pageManager = new PageManager();

  $('.menu_btn').click(() => {
    // navigation.show()
    $('.overlay').css('display', 'flex');
    $('html').css('overflow', 'hidden');
    isOverlayOpen = true;
  });

  $('.overlay_close').click(() => {
    reset();
  })

  setNavButtons();
  calcHomeBg();

  setupAnimation();
  $('.loadingScreen').delay(2250).animate({
    opacity: 0
  }, {
    duration: 500,
    complete: () => {
      $('.loadingScreen').remove();
      $('html').css('overflow', 'auto');
      animate();
    }
  })

  window.onresize = () => {
    isSmallScreen = (window.innerWidth <= smallScreenThreshold);
    // navigation.toggle(!isSmallScreen);
    calcHomeBg();
  }
}
