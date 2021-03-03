/** 
 * 1. Hamburger menu
   2. Carousel
   3. Current Year
   4. Form validation
**/ 


// 1. Hamburger menu
const hamburger = document.querySelector('.nav__toggler');
const menu = document.querySelector('.nav__item');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');

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

// 2. Carousel
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const prevBtn = document.querySelector('.carousel__button--left');
const nextBtn = document.querySelector('.carousel__button--right');
const dotNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// Arrange the slides next to one another
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
};

const hideShowArrows = (slides, prevBtn, nextBtn, targetIndex) => {
  if(targetIndex === 0) {
    prevBtn.classList.add('is-hidden');
    nextBtn.classList.remove('is-hidden');
  } else if(targetIndex === slides.length - 1) {
    prevBtn.classList.remove('is-hidden');
    nextBtn.classList.add('is-hidden');
  } else {
    prevBtn.classList.remove('is-hidden');
    nextBtn.classList.remove('is-hidden');
  }
};

// When I click left, move slides to the left
prevBtn.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotNav.querySelector('.current-slide');
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevBtn, nextBtn, prevIndex);
});

// When I click right, move slides to the right
nextBtn.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevBtn, nextBtn, nextIndex);
});

// When I click the nav indicator, move to that slide
dotNav.addEventListener('click', (e) => {
  // what indicator clicked on?
  const targetDot = e.target.closest('.carousel__indicator');

  if(!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotNav.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevBtn, nextBtn, targetIndex);
});

// 3. Current Year
const currentYear =  document.querySelector('.currentYear');

const date = new Date();
currentYear.textContent = date.getFullYear();


// 4. Form validation
const form  = document.getElementsByTagName('form')[0];
const email = document.getElementById('mail');
const emailError = document.querySelector('#mail + span.error');

email.addEventListener('input', function (event) {
  // Each time the user types something, we check if the
  // form fields are valid.

  if (email.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    emailError.textContent = ''; // Reset the content of the message
    emailError.className = 'error'; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showError();
  }
});

form.addEventListener('submit', function (event) {
  // if the email field is valid, we let the form submit

  if(!email.validity.valid) {
    // If it isn't, we display an appropriate error message
    showError();
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();
  }
});

function showError() {
  if(email.validity.valueMissing) {
    // If the field is empty
    // display the following error message.
    emailError.textContent = 'Enter an e-mail address.';
  } else if(email.validity.typeMismatch) {
    // If the field doesn't contain an email address
    // display the following error message.
    emailError.textContent = 'Invalid e-mail address.';
  } else if(email.validity.tooShort) {
    // If the data is too short
    // display the following error message.
    emailError.textContent = `Email should be at least ${ email.minLength } characters; you entered ${ email.value.length }.`;
  }

  // Set the styling appropriately
  emailError.className = 'error active';
}