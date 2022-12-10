const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      // console.log(weather.json());
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  document.querySelector('.search-box').style.display='none';
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;
  
  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);
  
  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
  
  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].description;
  
  let wind = document.querySelector('.current .wind');
  wind.innerText = "Wind speed: "+weather.wind.speed+"m/s";
  
  let x=weather.weather[0].main;
  if(x=="Clear" || x=="Sunny")
  document.body.style.backgroundImage = "url('clear.png')";
  if(x=="Clouds" || x=="Rainy")
  document.body.style.backgroundImage = "url('cloudy.png')";
  
  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
  
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day} ${date} ${month} ${year}`;
}