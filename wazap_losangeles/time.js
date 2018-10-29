/*   DST TIME! *****************
year  france           LA
2018  28/10            4/11
2019  31/03 27/10      10/03 3/11
2020  29/03 25/10      8/03  1/11
2021  28/03 31/10      14/03 7/11
2022  27/03 30/10      13/03 6/11
*/
// france dst timestamp
const oct18Fr = new Date('October 28, 2018 02:00:00').getTime();
const oct19Fr = new Date('October 27, 2019 02:00:00').getTime();
const oct20Fr = new Date('October 25, 2020 02:00:00').getTime();
const oct21Fr = new Date('October 31, 2021 02:00:00').getTime();
const oct22Fr = new Date('October 30, 2022 02:00:00').getTime();
const mars19Fr = new Date('March 31, 2019 02:00:00').getTime();
const mars20Fr = new Date('March 29, 2020 02:00:00').getTime();
const mars21Fr = new Date('March 28, 2021 02:00:00').getTime();
const mars22Fr = new Date('March 27, 2022 02:00:00').getTime();
// la dst
const nov18La = new Date('November 4, 2018 02:00:00').getTime();
const nov19La = new Date('November 3, 2019 02:00:00').getTime();
const nov20La = new Date('November 1, 2020 02:00:00').getTime();
const nov21La = new Date('November 7, 2021 02:00:00').getTime();
const nov22La = new Date('November 6, 2022 02:00:00').getTime();
const mars19La = new Date('March 10, 2019 02:00:00').getTime();
const mars20La = new Date('March 8, 2020 02:00:00').getTime();
const mars21La = new Date('March 14, 2021 02:00:00').getTime();
const mars22La = new Date('March 13, 2022 02:00:00').getTime();

const today = Date.now();
// calculate time in LA regarding time zone AND dst
const getLaTime = stamp => {
  let laTime = 0;
  if (
    (stamp >= oct18Fr && stamp <= nov18La) ||
    (stamp >= oct19Fr && stamp <= nov19La) ||
    (stamp >= oct20Fr && stamp <= nov20La) ||
    (stamp >= oct21Fr && stamp <= nov21La) ||
    (stamp >= oct22Fr && stamp <= nov22La)
  ) {
    laTime = today - 28800000; // -8hrs en ms
    return laTime;
  }
  if (
    (stamp >= mars19La && stamp <= mars19Fr) ||
    (stamp >= mars20La && stamp <= mars20Fr) ||
    (stamp >= mars21La && stamp <= mars21Fr) ||
    (stamp >= mars22La && stamp <= mars22Fr)
  ) {
    laTime = today - 36000000; // -10hrs en ms
    return laTime;
  }
  laTime = today - 32400000; // - 9hrs en ms
  return laTime;
};

const week = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const months = ['décembre', 'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août',
  'septembre', 'octobre', 'novembre'];
const getDate = stamp => {
  const day = week[new Date(stamp).getDay()];
  const date = new Date(stamp).toLocaleString('fr-FR').split(' ')[0];
    const month = months[date.split('/')[1]].slice(0) === 0 ?
    months[date.split('/')[1]].slice(1) :
    months[date.split('/')[1]];
  const dateString = `${day} ${date.split('/')[0]} ${month} ${date.split('/')[2]}`;
  return dateString;
};
const getTime = stamp => {
  const string = new Date(stamp).toLocaleString('fr-FR').split(' ')[2];
  const hourString = `${string.split(':')[0]}h${string.split(':')[1]}`;
  return hourString;
};

// DOM ****************
const localDate = document.querySelector('span[class="date local"]');
const laDate = document.querySelector('span[class="date l_a"]');
const localHr = document.querySelector('span[class="time local"]');
const laHr = document.querySelector('span[class="time l_a"]');
localDate.innerHTML += getDate(today);
laDate.innerHTML += getDate(getLaTime(today));
localHr.innerHTML += getTime(today);
laHr.innerHTML += getTime(getLaTime(today));
