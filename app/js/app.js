const hamburger = document.querySelector('.nav__toggler');
const menu = document.querySelector('.nav__item');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');

// Display mobile menu
const mobileMenu = () => {
    // menu.classList.toggle('active');
    // hamburger.classList.toggle('active');
    // if(menu.classList.contains('active')) {
    //     header.classList.add('overlay')
    // } else {
    //     header.classList.remove('overlay')
    // }
    
    // if(body.offsetWidth >= '639px') {
    //     menu.classList.remove('active');
    //     hamburger.classList.remove('active');
    //     header.classList.remove('overlay')
    // }

    if(header.classList.contains('overlay')) {
        header.classList.remove('overlay')
        hamburger.classList.remove('active');
        menu.classList.remove('active');
    } else {
        header.classList.add('overlay')
        hamburger.classList.add('active');
        menu.classList.add('active');
    }
}

hamburger.addEventListener('click', mobileMenu);