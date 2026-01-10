var headerElement = document.querySelector('header');
var navbarElement = document.querySelector('.header-navbar')
var menuIcon = document.querySelector('#menu-icon');
console.log(menuIcon)

window.addEventListener('scroll', () => {
    window.scrollY > 0 ? headerElement.classList.add('fixed-menu') : headerElement.classList.remove('fixed-menu') 
})

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('fa-close')
})
