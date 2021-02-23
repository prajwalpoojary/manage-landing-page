const hamburger = document.querySelector('.nav__toggler');
const menu = document.querySelector('.nav__item');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');

let currentYear =  document.querySelector('.currentYear');

// Display mobile menu
const mobileMenu = () => {

    if(body.classList.contains('overlay')) {
        body.classList.remove('overlay')
        hamburger.classList.remove('active');
        menu.classList.remove('active');
    } else {
        body.classList.add('overlay')
        hamburger.classList.add('active');
        menu.classList.add('active');
    }
}

hamburger.addEventListener('click', mobileMenu);

let date = new Date();
currentYear.textContent = date.getFullYear();