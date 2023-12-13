import Swiper from 'swiper';
import { Autoplay, Controller, EffectFade } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

export default function swiper() {
  var homeSwiper = new Swiper(".swiper-fullwith", {
    modules: [Autoplay, Controller, EffectFade],
    fadeEffect: { crossFade: true },
    speed: 1000,
    loop: true,
    autoplay: {
      delay: 4000
    },
    effect: "fade"

  });

  var homeSwiperText = new Swiper(".swiper-fullwith-text", {
    modules: [Autoplay, Controller, EffectFade],
    fadeEffect: { crossFade: false },
    speed: 1000,
    loop: true,
    autoplay: {
      delay: 4000
    },
    on: {
      slideChangeTransitionEnd: function () {
        //console.log(this.realIndex);
      }
    }

  });

  homeSwiperText.controller.control = homeSwiper;
  homeSwiper.controller.control = homeSwiperText;

  //wines
  var swiper = new Swiper(".swiper-slider-wines", {
    slidesPerView: 2,
    //loopAdditionalSlides: 2,
    spaceBetween: "8%",
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: "8%"
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: "6%"
      }
    },

    centeredSlides: true,
    centerInsufficientSlides: false,
    preventClicks: true,
    loop: true,

  });

}
