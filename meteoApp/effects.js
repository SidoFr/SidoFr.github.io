// **********************************************
const slider = document.querySelector('#frame');
let mouseDown = false;
let mousePos;
let scrollLeft;
slider.addEventListener('mousedown', (evt) => {
  mouseDown = true;
  slider.classList.add('active');
  mousePos = evt.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseup', () => {
  mouseDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseleave', () => {
  mouseDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (evt) => {
  if (!mouseDown) return;
  evt.preventDefault();
  // where is cursor?
  const x = evt.pageX - slider.offsetLeft;
  // dif between cursor pos after slide and mouse pos before slide
  // *3 to enhance mvt
  const slide = (x - mousePos) * 3;
  // and slide
  slider.scrollLeft = scrollLeft - slide;
});
