function setupAnimation() {
  $('.animate').css({
    'opacity': 0,
    'transform': 'translateY(-15px)'
  });
}

function animate() {
  let animate_ = () => {
    let scroll = $('html').scrollTop();
    let groups = $('.animateGroup');
    groups.each(function(i) {
      if ($(this).offset().top <= scroll + 200 &&
          $(this).height() + $(this).offset().top >= scroll - 200) {
        let els = $(this).find('.animate');

        els.each(function() {
          let delay = $(this).data('anim-delay') || 0;
          $(this).delay(delay * 250).animate(
            {'opacity': '1'},
            {
              duration: 500,
              start: function() {
                $(this).css({
                  'transform': '',
                  'transition': 'transform 0.5s'
                })
              },
              complete: function() {
                $(this).css('transition', '');
                $(this).removeClass('animate');
                $(this).data('anim-delay', '');
              }
            }
          );
        })

        $(this).removeClass('animateGroup');
        groups = $('.animateGroup');
      }
    })
  }

  animate_();

  window.onscroll = () => {
    animate_();
  }
}