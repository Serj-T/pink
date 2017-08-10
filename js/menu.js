'use strict';
var navMain = document.querySelector('.main-nav__list');
var navBtnToggle = document.querySelector('.main-nav__btn-toggle');

navMain.classList.remove('main-nav__list--opened');

navBtnToggle.addEventListener('click', function() {
  navMain.classList.toggle('main-nav__list--opened');
});