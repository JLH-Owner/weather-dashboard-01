const apiKey = 'fd50b8715b5fd666755e33ddbd0dbc40';
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const currentWeatherDiv = document.getElementById('current-weather');
const forecastDiv = document.getElementById('forecast');
const savedCitiesDiv = document.getElementById('saved-cities');

function fetchWeatherData(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    .then(response => response.json())
    .then(data => {
      displayCurrentWeather(data);
      fetchForecastData(data.coord.lat, data.coord.lon);
      saveCity(city);
    });
}

function fetchForecastData(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    .then(response => response.json())
    .then(data => {
      displayForecast(data);
    });
}

function displayCurrentWeather(data) {
  currentWeatherDiv.innerHTML = `
    <h2>${data.name} (${new Date().toLocaleDateString()})</h2
    <p>Temp: ${data.main.temp}°F</p>
    <p>Wind: ${data.wind.speed} MPH</p>
    <p>Humidity: ${data.main.humidity}%</p>
  `;
}

function displayForecast(data) {
  forecastDiv.innerHTML = '';
  for (let i = 0; i < data.list.length; i += 8) {
    const day = data.list[i];
    forecastDiv.innerHTML += `
    <div>
      <h3>${new Date(day.dt * 1000).toLocaleDateString()}</h3>
      <p>Temp: ${day.main.temp}°F</p>
      <p>Wind: ${day.wind.speed} MPH</p>
      <p>Humidity: ${day.main.humidity}%</p>
    </div>
    `;
  }
}

function saveCity(city) {
  let cities = JSON.parse(localStorage.getItem('cities')) || [];
  if (!cities.includes(city)) {
    cities.push(city);
    localStorage.setItem('cities', JSON.stringify(cities));
    displaySavedCities();
  }
}

function displaySavedCities() {
  const cities = JSON.parse(localStorage.getItem('cities')) || [];
  savedCitiesDiv.innerHTML = '';
  cities.forEach(city => {
    savedCitiesDiv.innerHTML += `<button class="city-btn:>${city}</button>`;
  });
  document.querySelectorAll('.city-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      fetchWeatherData(e.target.innerText);
    });
  });
}

searchBtn.addEventListener('click', () => {
  const city = cityInput.value;
  if (city) {
    fetchWeatherData(city);
  }
});

window.onload = displaySavedCities;
