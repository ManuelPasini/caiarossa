

export function swiper() {
  var homeSwiper = new Swiper(".swiper-fullwith", {
    fadeEffect: { crossFade: true },
    speed: 1000,
    loop: true,
    autoplay: {
      delay: 4000
    },
    effect: "fade",
    on: {
      slideChangeTransitionEnd: function () {
        console.log(this.realIndex);
      }
    }
  });

  var homeSwiperText = new Swiper(".swiper-fullwith-text", {
    fadeEffect: { crossFade: false },
    speed: 1000,
    loop: true,
    autoplay: {
      delay: 4000
    }

  });

  homeSwiperText.controller.control = homeSwiper;
  homeSwiper.controller.control = homeSwiperText;

  //wines
  var swiper = new Swiper(".swiper-slider-wines", {
    slidesPerView: 4,
    spaceBetween: "8%",
    centeredSlides: true,
    centerInsufficientSlides: false,
    preventClicks: true,
    loop: true,
    on: {
      init: function () {

      },
      slideChangeTransitionStart: function () {

      },
      slideChangeTransitionEnd: function () {

      }
    },
  });

}
