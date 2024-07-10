const searchButton = document.querySelector('#search-btn');
const search = document.getElementById('#search');
const results = document.getElementById('#results');
const city = document.querySelector('#city');
const buttonsWell = document.querySelector('#buttons-well')

function renderDetail(city) {
  const nameEl = document.createElement('city')
  const tempEl = document.createElement('temp');
  const windEl = document.createElement('wind');
  const humidityEl = document.createElement('humidity')
  const cardEl = document.createElement('div');
  const columnEl = document.createElement('div');
  const resultsEl = document.createElement('div');

  nameEl.textContent = city.name;
  tempEl.textContent = city.main.temp;
  windEl.textContent = city.wind;
  humidityEl.textContent = city.main.humidity;

  cardEl.appendChild(nameEl);
  cardEl.appendChild(tempEl);
  cardEl.appendChild(windEl);
  cardEl.appendChild(humidityEl);
  columnEl.appendChild(cardEl);
  resultsEl.appendChild(cardEl);

  
  console.log('name', city.name);
  console.log('temp', city.main.temp);
  console.log('wind', city.wind);
  console.log('humidity', city.main.humidity);



  const results = localStorage.setItem('city', JSON.stringify(city));
  
}

function renderCities() {
  const cities = JSON.parse(localStorage.getItem('cities')) || [];

  var searchHistory = (localStorage.searchHistory) ? JSON.parse(localStorage.searchHistory) : [];
document.querySelector("button").addEventListener("click", () => {
  searchHistory.push(document.querySelector("input").value);
  localStorage.searchHistory = JSON.stringify(searchHistory);
});
document.querySelector("input").addEventListener("focus", () => {
  var data = document.querySelector("datalist#searchdata");
  data.innerHTML = "";
  searchHistory.forEach((search) => {
    data.innerHTML = "<option>" + data.innerHTML;
    data.querySelector("option").innerText = search;
  });
});

  // RENDER CITY BUTTONS
    buttonsWell.innerHTML = null;

    for (let city of cities) {
        const buttonEl = document.createElement('button');
        buttonEl.textContent = city.title;
        buttonEl.classList.city('button');
        buttonsWell.appendChild(buttonEl);
      }
    };
        

 

document.addEventListener('click', function (event) {
  if (event.target.matches('button[data-id]')) {
    console.log(event.target.dataset.id);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=fd50b8715b5fd666755e33ddbd0dbc40&units=imperial`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(renderDetail)
  }
})

searchButton.addEventListener('click', function (event) {
  event.preventDefault();

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=fd50b8715b5fd666755e33ddbd0dbc40&units=imperial`)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(renderDetail)
  .catch((err) => console.log(err));
})

renderCities();