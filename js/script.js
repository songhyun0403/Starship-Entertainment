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

  // 아티스트 슬라이드 부분

  var newSwiper = new Swiper('.newSwiper', {
    slidesPerView: 3.5,
    spaceBetween: 30,

    autoplay: {
      delay: 1000,
    },
    loop: true,
    speed: 3000,
  });

  // 두 번째 스와이퍼 (앨범)
  // 기존 Swiper 초기화 코드
  var soundSwiper = new Swiper('.sound-swiper', {
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
      el: '.sound-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 1000,
    },
    loop: true,
    speed: 1000,
  });

  // 배경 이미지 업데이트 함수
  function updateBackground() {
    var activeSlide = soundSwiper.slides[soundSwiper.activeIndex];
    var bgImage = activeSlide.getAttribute('data-bg');
    document.querySelector(
      '.background-blur'
    ).style.backgroundImage = `url(${bgImage})`;
  }

  // 초기 배경 이미지 설정
  updateBackground();

  // Swiper 슬라이드 변경 이벤트 리스너 등록
  soundSwiper.on('slideChange', updateBackground);

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
      trigger: '.artist-slider',
      start: 'top 50%',
      toggleActions: 'play none reverse reverse',
      onEnter: () => console.log('Enter'),
      onLeave: () => console.log('Leave'),
      onEnterBack: () => console.log('EnterBack'),
      onLeaveBack: () => console.log('LeaveBack'),
    },
  });
});
