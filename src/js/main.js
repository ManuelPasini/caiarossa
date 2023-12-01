import 'virtual:accessible';
import 'virtual:spritemap';
import 'virtual:theme.css';
import '../css/main.scss';
//
import 'swiper/bundle';
import 'swiper/css/bundle';
import { lazyLoad } from './common/lazyLoad';
import { lenis } from './common/lenis';
import { swiper } from './common/swiper';

addEventListener('DOMContentLoaded', () => {
  lazyLoad();
  lenis();
  swiper();
});

import icons from 'virtual:icons';
import theme from 'virtual:theme';

if (import.meta.env.DEV) {
  console.info('%cws-vite ' + import.meta.env.WS_VITE, 'color: #757575');
  // console.log('env', import.meta.env);
  console.log('icons', icons);
  console.log('theme', theme);
}


function threeshake() {
  console.log('❗if this comment is present in the main.min.js there is a threeshake error!');
}

window.onload = () => {

};

