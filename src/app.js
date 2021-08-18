let pageManager;
let prevScrollTop = $(window).scrollTop();

window.onload = () => {
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
  
  let smallScreenThreshold = 961;
  let isSmallScreen = (window.innerWidth <= smallScreenThreshold);

  pageManager = new PageManager();

  $('.menu_btn').click(() => {
    // navigation.show();
    $('html').css('overflow', 'hidden');
  });

  $('.navigation_close').click(() => {
    // navigation.hide();
    $('html').css('overflow', 'auto');
  })

  setNavButtons();
  calcHomeBg();

  window.onresize = () => {
    isSmallScreen = (window.innerWidth <= smallScreenThreshold);
    // navigation.toggle(!isSmallScreen);
    calcHomeBg();
  }
}
