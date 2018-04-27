// **********meteo api*************/
// variables dom
const main = document.querySelector('#main');
const form = main.querySelectorAll('form');
const geo = main.querySelector('#geo');
const results = document.querySelector('#results');
const ville = results.querySelector('#ville');
const conditions = results.querySelector('#cond');
const localTime = results.querySelector('#time');
const mainTemp = results.querySelector('#mainTemp');
const iconFrame = results.querySelector('.img');
const refresh = results.querySelector('#refresh');
const container = document.querySelector('.container');
const frames = container.querySelectorAll('.frames');
const frame1 = container.querySelector('#frame1');
const frame2 = container.querySelector('#frame2');
const frame3 = container.querySelector('#frame3');
const frame4 = container.querySelector('#frame4');
const frame5 = container.querySelector('#frame5');
const firstLi1 = frame1.querySelector('li:first-child');
const firstLi2 = frame2.querySelector('li:first-child');
const firstLi3 = frame3.querySelector('li:first-child');
const firstLi4 = frame4.querySelector('li:first-child');
const firstLi5 = frame5.querySelector('li:first-child');
const errorFrame = document.querySelector('#errorHandler');
const close = errorFrame.querySelector('button');
const inputs = document.querySelectorAll('input[type=text]');
// variables api
const urlForecast = 'https://api.openweathermap.org/data/2.5/forecast?';
const urlWeather = 'https://api.openweathermap.org/data/2.5/weather?'; // id=city
const key = '&APPID=1e9c998ed3b895a9638dbd936e66c91f';
const lang = '&lang=fr';
// other variables
const now = Date.now();
function getDate(timestamp) {
  const date = new Date(timestamp);
  const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  const day = date.getDate();
  const weekDay = days[date.getDay()];
  const jour = `${weekDay} ${day}`;
  return jour;
}
const today = getDate(now);
const day2 = getDate((now + 86400000));
const day3 = getDate((now + 172800000));
const day4 = getDate((now + 259200000));
const day5 = getDate((now + 345600000));
// get current time
function getTime(timestamp) {
  const date = new Date(timestamp);
  const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août',
    'septembre', 'octobre', 'novembre', 'décembre'];
  const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const weekDay = days[date.getDay()];
  const hour = date.getHours();
  const min = date.getMinutes();
  const maintenant = `${weekDay} ${day} ${month}, ${hour}h${min < 10 ? '0' : ''}${min}`;
  return maintenant;
}
/* ********************icons mgmt********************
ICONS LIST (png)
conditions**********code********icon
*********************************************************************
clear               800         clear/clearN
few clouds          801         few_clouds/cloudsN
scattered clouds    802         clouds/ cloudsN
broken clouds       803/804     broken_clouds/cloudsN
mist                701/711/721 mist
rain                500-504     rain/rainN
shower rain         520/521/522/531   showerRain_or_drizzle
drizzle             3xx         ---------------------
thunderstorm        2xx         thunder
snow                6xx         snow
freezing rainN      511         snow
extreme             900-906+731/741/751/761/762/771/781   XXXXXXX
*/
let icon = '';
function displayIcon(stamp, code) {
  const time = new Date(stamp);
  const month = time.getMonth();
  const hour = time.getHours();
  let nightmode = false;
  // 'hiver' 'printemps 'été' 'automne'
  if ((month === 0 || month === 1 || month === 11 || month === 10) && (hour >= 18 || hour < 9)) {
    nightmode = true;
  } else if ((month === 2 || month === 3) && (hour >= 21 || hour < 7)) {
    nightmode = true;
  } else if ((month === 4 || month === 5 || month === 6 || month === 7) && (hour >= 22 || hour < 6)) {
    nightmode = true;
  } else if ((month === 8 || month === 9) && (hour >= 20 || hour < 8)) {
    nightmode = true;
  }
  if (nightmode) {
    if (code.startsWith('2')) {
      icon = 'url(icons/thunder.png)';
    } else if (code.startsWith('3')) {
      icon = 'url(icons/showerRain_or_drizzle.png)';
    } else if (code.startsWith('6')) {
      icon = 'url(icons/snow.png)';
    } else if (code.startsWith('90')) {
      icon = '<i class="fas fa-exclamation-triangle"></i>';
    } else if (code === '731' || (code >= '751' && code <= '781')) {
      icon = '<i class="fas fa-exclamation"></i>';
    } else {
      switch (code) {
        case '800':
          icon = 'url(icons/clearN.png)';
          break;
        case '801':
          icon = 'url(icons/cloudsN.png)';
          break;
        case '802':
          icon = 'url(icons/cloudsN.png)';
          break;
        case '803':
        case '804':
          icon = 'url(icons/cloudsN.png)';
          break;
        case '500':
        case '501':
        case '502':
        case '503':
        case '504':
          icon = 'url(icons/rainN.png)';
          break;
        case '701':
        case '711':
        case '721':
        case '741':
          icon = 'url(icons/mist.png)';
          break;
        case '520':
        case '521':
        case '522':
        case '531':
          icon = 'url(icons/showerRain_or_drizzle.png)';
          break;
        case '511':
          icon = 'url(icons/snow.png)';
          break;
        default:
          icon = 'linear-gradient(to right, #56ccf2, #2f80ed)';
      }
    }
  } else if (!nightmode) {
    if (code.startsWith('2')) {
      icon = 'url(icons/thunder.png)';
    } else if (code.startsWith('3')) {
      icon = 'url(icons/showerRain_or_drizzle.png)';
    } else if (code.startsWith('6')) {
      icon = 'url(icons/snow.png)';
    } else if (code.startsWith('90')) {
      icon = '<i class="fas fa-exclamation-triangle"></i>';
    } else if (code === '731' || (code >= '751' && code <= '781')) {
      icon = '<i class="fas fa-exclamation"></i>';
    } else {
      switch (code) {
        case '800':
          icon = 'url(icons/clear.png)';
          break;
        case '801':
          icon = 'url(icons/few_clouds.png)';
          break;
        case '802':
          icon = 'url(icons/clouds.png)';
          break;
        case '803':
        case '804':
          icon = 'url(icons/broken_clouds.png)';
          break;
        case '701':
        case '711':
        case '721':
        case '741':
          icon = 'url(icons/mist.png)';
          break;
        case '500':
        case '501':
        case '502':
        case '503':
        case '504':
          icon = 'url(icons/rain.png)';
          break;
        case '520':
        case '521':
        case '522':
        case '531':
          icon = 'url(icons/showerRain_or_drizzle.png)';
          break;
        case '511':
          icon = 'url(icons/snow.png)';
          break;
        default:
          icon = 'linear-gradient(to right, #56ccf2, #2f80ed)';
      }
    }
  }
  return icon;
}
// *************display results***************
function empty() {
  results.style.display = 'none';
  // empty results
  ville.innerText = '';
  iconFrame.style.backgroundImage = '';
  conditions.innerText = '';
  mainTemp.innerText = '';
  localTime.innerText = '';
  // empty frames
  firstLi1.innerText = '';
  firstLi2.innerText = '';
  firstLi3.innerText = '';
  firstLi4.innerText = '';
  firstLi5.innerText = '';
  frames.forEach((frame) => {
    const lis = frame.querySelectorAll('li');
    lis.forEach(li => li.innerText = '');
  });
}
// display temps actuel
function currentWeather(url) {
  $.getJSON(url, (data) => {
    // display données principales ds le cadre pal
    const weather = data.weather[0];
    const code = weather.id;
    const stamp = data.dt * 1000;
    const temperatures = data.main;
    const celsius = Math.round(temperatures.temp - 273.15);
    const icone = displayIcon(stamp, code.toString());
    iconFrame.style.backgroundImage = icone;
    conditions.innerText += `${weather.description}`;
    mainTemp.innerText += `${celsius}°C`;
    // display current date and time
    localTime.innerText += getTime(now);
  })
    .fail(() => {
      errorFrame.style.display = 'flex';
      empty();
    });
}
// display prévisions météo
function getForecast(url) {
  $.getJSON(url, (data) => {
    const datas = data.list;
    firstLi1.innerText += today;
    firstLi2.innerText += day2;
    firstLi3.innerText += day3;
    firstLi4.innerText += day4;
    firstLi5.innerText += day5;
    function displayFrame(obj, frame, icone) {
      const hr = obj.dt_txt.split(' ')[1];
      const weather = obj.weather[0].description;
      const temperatures = obj.main;
      const celsius = Math.round(temperatures.temp - 273.15);
      if (hr.includes('6')) {
        const li6 = frame.querySelector('li:nth-of-type(2)');
        li6.innerText = '';
        li6.innerHTML += `
          <div class="miniBox">
            <span>6h</span>
            <div class="miniImg"></div>
          </div>
          ${weather} --- ${celsius}°C
        `;
        const icon6 = li6.querySelector('.miniImg');
        icon6.style.backgroundImage = icone;
      } else if (hr.includes('9')) {
        const li9 = frame.querySelector('li:nth-of-type(3)');
        li9.innerText = '';
        li9.innerHTML += `
          <div class="miniBox">
            <span>9h</span>
            <div class="miniImg"></div>
          </div>
          ${weather} --- ${celsius}°C
        `;
        const icon9 = li9.querySelector('.miniImg');
        icon9.style.backgroundImage = icon;
      } else if (hr.includes('12')) {
        const li12 = frame.querySelector('li:nth-of-type(4)');
        li12.innerText = '';
        li12.innerHTML += `
          <div class="miniBox">
            <span>12h</span>
            <div class="miniImg"></div>
          </div>
          ${weather} --- ${celsius}°C
        `;
        const icon12 = li12.querySelector('.miniImg');
        icon12.style.backgroundImage = icon;
      } else if (hr.includes('18')) {
        const li18 = frame.querySelector('li:nth-of-type(5)');
        li18.innerText = '';
        li18.innerHTML += `
          <div class="miniBox">
            <span>18h</span>
            <div class="miniImg"></div>
          </div>
          ${weather} --- ${celsius}°C
        `;
        const icon18 = li18.querySelector('.miniImg');
        icon18.style.backgroundImage = icon;
      } else if (hr.includes('21')) {
        const li21 = frame.querySelector('li:nth-of-type(6)');
        li21.innerText = '';
        li21.innerHTML += `
          <div class="miniBox">
            <span>21h</span>
            <div class="miniImg"></div>
          </div>
          ${weather} --- ${celsius}°C
        `;
        const icon21 = li21.querySelector('.miniImg');
        icon21.style.backgroundImage = icon;
      }
    }
    datas.forEach((obj) => {
      let id;
      let stamp;
      let icone;
      switch (getDate(obj.dt * 1000)) {
        case today:
          id = obj.weather[0].id;
          stamp = obj.dt * 1000;
          icone = displayIcon(stamp, id.toString());
          displayFrame(obj, frame1, icone);
          break;
        case day2:
          id = obj.weather[0].id;
          stamp = obj.dt * 1000;
          icone = displayIcon(stamp, id.toString());
          displayFrame(obj, frame2, icone);
          break;
        case day3:
          id = obj.weather[0].id;
          stamp = obj.dt * 1000;
          icone = displayIcon(stamp, id.toString());
          displayFrame(obj, frame3, icone);
          break;
        case day4:
          id = obj.weather[0].id;
          stamp = obj.dt * 1000;
          icone = displayIcon(stamp, id.toString());
          displayFrame(obj, frame4, icone);
          break;
        case day5:
          id = obj.weather[0].id;
          stamp = obj.dt * 1000;
          icone = displayIcon(stamp, id.toString());
          displayFrame(obj, frame5, icone);
          break;
        default:
          return -1;
      }
    });
  })
    .fail(() => {
      errorFrame.style.display = 'flex';
      empty();
    });
}
function createUrl(entry, cond) {
  if (cond === geo) {
    currentWeather(`${urlWeather}${entry}${key}${lang}`);
    getForecast(`${urlForecast}${entry}${key}${lang}`);
  } else {
    const locality = `q=+${entry}+`;
    currentWeather(`${urlWeather}${locality}${key}${lang}`);
    getForecast(`${urlForecast}${locality}${key}${lang}`);
  }
}
function getLocation() {
  function getPos(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const id = `lat=${lat}&lon=${lon}`;
    createUrl(id, geo);
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPos);
  } else {
    alert('géolocalisation indisponible');
  }
}
// event listeners
form.forEach(item => item.addEventListener('submit', function sub(evt) {
  evt.preventDefault();
  if (evt.target.id === 'byCity') {
    const entry = this.querySelector('[name=choix]').value;
    createUrl(entry);
  } else if (evt.target.id === 'byCoords') {
    const coords = (this.querySelector('[name=choix]').value).split(' ');
    const id = `lat=${coords[0]}&lon=${coords[1]}`;
    createUrl(id, geo);
    }
  }));
close.addEventListener('click', () => {
  errorFrame.style.display = 'none';
});
refresh.addEventListener('click', ()=> {
  inputs.forEach(input=> input.value = '');
  results.style.display = 'none';
  main.style.display = 'flex';
  empty();
});
geo.addEventListener('click', getLocation);
