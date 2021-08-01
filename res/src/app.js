let pageManager;
let smallScreenThreshold = 640;
let isSmallScreen;

window.onload = () => {
  isSmallScreen = (window.innerWidth <= 320);
  pageManager = new PageManager();

  $('.home_nav').click(() => {
    pageManager.returnHome();
  })

  $('.about_me_nav').click(() => {
    pageManager.navigationTarget('#about');
  });

  $('.projects_nav').click(() => {
    pageManager.navigationTarget('#projects');
  });

  calcHomeBg();
}

window.onresize = () => {
  isSmallScreen = (window.innerWidth <= smallScreenThreshold);
  calcHomeBg();
}

window.onscroll = () => {
  console.log($(window).scrollTop());
  if ($(window).scrollTop() >= $('.base_page').height() && !isSmallScreen) {
    $('.navigation').show();
  } else {
    $('.navigation').hide();
  }
}

$('[data-tooltip]').hover((ev) => {
  console.log(ev.type);

  if (ev.type == "mouseenter") {
    $('.tooltip').delay(1000).fadeIn(100);
    $('.tooltip').css("left", ($(ev.currentTarget).offset().left + ev.currentTarget.offsetWidth) + 'px');
    $('.tooltip').css("top", ($(ev.currentTarget).offset().top + ev.currentTarget.offsetHeight) + 'px');
    $('.tooltip').text($(ev.currentTarget).data('tooltip'));
  } else {
    $('.tooltip').hide(100);
  }
})

let calcHomeBg = () => {
  $('.home_bg').css('height', (position($('.home_title'), $('.base_page')).top + ($('.home_title').height() / 2)) + 'px');
}

let position = (target, other) => {
  return {
    top: target.offset().top - other.offset().top - other.scrollTop(),
    left: target.offset().left - other.offset().left - other.scrollLeft(),
  };
}