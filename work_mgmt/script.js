// variables DOM
const buttons = document.querySelectorAll('input[class=btn');
const sessionBtn = document.querySelector('input[value=SESSION]');
const breakBtn = document.querySelector('input[value=PAUSE]');
const userInput = document.querySelector('input[name=input]');
const compteur = document.querySelector('#compteur');
const text = document.querySelector('#text');
const currentTime = text.querySelector('span:first-of-type');
const choice = text.querySelector('span:nth-of-type(2');
const thenTime = text.querySelector('span:nth-of-type(3');
const container = document.querySelector('.container');
const audio = document.querySelector('#sound');
// variables
let countdown;
let wantBreak = false;
let wantSession = false;
// functions
function displayNow() {
  const today = new Date();
  const hr = today.getHours();
  const min = today.getMinutes();
  const currently = `${hr}h${min < 10 ? `0${min}` : `${min}`}`;
  return currently;
}
function displayThen(time) {
  const now = Date.now();
  const then = new Date(now + (time * 1000));
  const hr = then.getHours();
  const min = then.getMinutes();
  const end = `${hr}h${min < 10 ? `0${min}` : `${min}`}`;
  return end;
}
function displayCD(time) {
  // display compteur
  const hours = Math.floor((time / 3600));
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  const displayHr = `${hours < 10 && hours > 0 ? `0${hours}:` : `${hours === 0 ? '' : `${hours}:`}`}`;
  const displayMin = `${minutes < 10 ? `0${minutes}:` : `${minutes}:`}`;
  const displaySec = `${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
  compteur.innerText = `${displayHr}${displayMin}${displaySec}`;
  // display texte
  text.style.display = 'block';
  currentTime.innerText = displayNow();
  if (wantSession) {
    choice.innerText = 'pause';
  } else if (wantBreak) {
    choice.innerText = 'reprise';
  }
  thenTime.innerText = displayThen(time);
  container.style.display = 'flex';
}
// create timer
function timer(time) {
  clearInterval(countdown);
  const now = Date.now(); // in ms
  const then = now + (time * 1000); // in ms
  displayCD(time);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000); // in sec
    if (secondsLeft <= 0) {
      clearInterval(countdown);
      audio.play();
    }
    displayCD(secondsLeft);
  }, 1000);
}
function emptyAll() {
  clearInterval(countdown);
  text.style.display = 'none';
  compteur.innerText = '';
  container.style.display = 'none';
}
// event listeners
buttons.forEach(button => button.addEventListener('click', (evt) => {
  const input = userInput.value;
  if (input === '') {
    emptyAll();
  } else if (input) {
    if (evt.target === sessionBtn) {
      choice.innerText = '';
      wantBreak = false;
      wantSession = true;
      timer(input * 60);
    } else if (evt.target === breakBtn) {
      choice.innerText = '';
      wantSession = false;
      wantBreak = true;
      timer(input * 60);
    }
  }
}));
