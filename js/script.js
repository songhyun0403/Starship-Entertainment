$(function () {
  var header = document.getElementById('header');
  var lastScrollTop = 0;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    var currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
      // 스크롤 다운
      header.classList.add('hidden');
    } else {
      // 스크롤 업
      header.classList.remove('hidden');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // 모바일 or 페이지 끝에서 bounce 현상 방지
  });

  var swiper = new Swiper('.sound-swiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: -50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
    },

    autoplay: {
      delay: 1000,
    },
    loop: true,
    speed: 1000,

    navigation: {
      nextEl: '.btn-next',
      prevEl: '.btn-prev',
    },
  });

  function updateBackground() {
    var activeSlide = swiper.slides[swiper.activeIndex];
    var bgImage = activeSlide.getAttribute('data-bg');
    document.querySelector(
      '.background-blur'
    ).style.backgroundImage = `url(${bgImage})`;
  }

  // Initial background image setup
  updateBackground();

  swiper.on('slideChange', updateBackground);

  AOS.init();

  // top버튼 클릭하면 이동
  $('.btn-gotop').on('click', () => {
    $('html, body')
      .stop()
      .animate(
        {
          scrollTop: 0,
        },
        () => {
          // $('.btn-gotop').fadeOut();
          gsap.to('.btn-gotop', {
            autoAlpha: 0,
          });
        }
      );
  });

  // 원하는 지점부터 버튼 In
  gsap.from('.btn-gotop', {
    autoAlpha: 0,
    y: 30,
    scrollTrigger: {
      trigger: '.artist',
      start: 'top 50%',
      toggleActions: 'play none reverse reverse',
      onEnter: () => console.log('Enter'),
      onLeave: () => console.log('Leave'),
      onEnterBack: () => console.log('EnterBack'),
      onLeaveBack: () => console.log('LeaveBack'),
    },
  });
});
