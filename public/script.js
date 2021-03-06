const menu = document.querySelector('.menu');
const menu_li = menu.querySelectorAll('.menu__list li');
const img = document.querySelector('img[alt="certificat"]');
const boxPitch = document.querySelectorAll('.box__pitch');
const boxes = document.querySelectorAll('.box');
const arrow = document.querySelector('.body__arrow');
// debounce fn which will run checkMenu every 20 ms
// if not too many events to check!
function debounce(func, wait = 10, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
  // fn to check when display arrow
function checkMenu() {
    // window.scrollY = dist top of window from top of page
    // window.scrollY + window.innerHeight = dist bottom window from very top of page
    const displayAt = window.scrollY + window.innerHeight;
    const imgBottom = img.offsetTop + img.height;
    if (displayAt > imgBottom) {
        arrow.style.display = 'block';
    } else if (displayAt < imgBottom) {
        arrow.style.display = 'none';
    }
}

// handle smaller devices without mice or touchpads
function detectDevice() {
    if (navigator.userAgent.match(/iPad/i) || window.innerWidth < 770 && window.innerHeight <= 1024) {
        // no hover animation
        boxes.forEach(box => {
            if( box.classList.contains('hover')) {
                box.classList.remove('hover');
            }
        });
        return true;     
    } else {
        boxes.forEach(box => {
            if (!box.classList.contains('hover')) {
                box.classList.add('hover');
            }
        });
        return false;
    }
        
}
 const device = detectDevice();

menu_li.forEach(elt => elt.addEventListener('mouseover', function(evt) {
    if (this.querySelector('.menu__list__dropdown') && !device) { 
        const drop = this.querySelector('.menu__list__dropdown');
        drop.style.display = 'block';
    }
}));
menu_li.forEach(elt => elt.addEventListener('mouseleave', function(evt) {
    if (this.querySelector('.menu__list__dropdown')) {
        const drop = this.querySelector('.menu__list__dropdown');
        if (drop.style.display === 'block') {
            drop.style.display = 'none';
        }
    }
}));
window.addEventListener('scroll', debounce(checkMenu));



