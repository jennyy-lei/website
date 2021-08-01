function PageManager() {
  this.pages = $('.page');

  if (window.location.hash) {
    this.navigationTarget(window.location.hash, false);
  }

  window.onhashchange = (n) => {
    this.navigationTarget(window.location.hash || '#home', false);
  }
}

PageManager.prototype.goToPage = function (getter, animate = true) {
  $('html').animate({
    scrollTop: $(getter).offset().top
  }, animate ? 1000 : 0);
}

PageManager.prototype.navigationTarget = function (targetId, animate = true) {
  this.goToPage(targetId, animate);
  if (window.location.hash != targetId) {
    window.history.pushState("", "", targetId);
  }
}