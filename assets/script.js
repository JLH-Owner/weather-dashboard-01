const searchButton = document.querySelector('#search')
const buttonsWell = document.querySelector('#buttons-well')
const cityName = document.querySelector('#title')


function renderDetail(data) {
  console.log(data);

  for (let city of cities) {
    const cities = JSON.parse(localStorage.getItem('cities')) || [];

    const cityEl = document.createElement('h3');
    const weatherEl = document.createElement('p');
    const cardEl = document.createElement('div');
    const columnEl = document.createElement('div');

    columnEl.className = 'col-12';
    cardEl.className = 'card mb-3 p-3';

    cityEl.textContent = city.strCity;
    weatherEl.textContent = weather.strWeather;

    cardEl.appendChild(cityEl);
    cardEl.appeandChild(weatherEl);
    columnEl.appendChild(cardEl);
    columnEl.appendChild(weatherEl);
    resultsList.appendChild(columnEl);

    if (!cities.find((item) => item.id === city.idCity)) {
      cities.push({ id: city.idCity, title: city.strCity});
      localStorage.setItem('cities', JSON.stringify(cities));
    }
  }
}

function renderCities() {
  const cities = JSON.parse(localStorage.getItem('cities')) || [];

  buttonsWell.innerHTML = null;

  for (let city of cities) {
    const buttonEl = document.createElement('button');
    buttonEl.textContent = city.title;
    buttonEl.dataset.id = city.id;
    buttonEl.classList.search('button');
    buttonsWell.appendChild(buttonEl);
  }
}

document.addEventListener('submit', function (event) {
  if (event.target.matches('butto[data-id]')) {
    console.log(event.target.dataset.id);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fd50b8715b5fd666755e33ddbd0dbc40${event.target.dataset.id}`)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        return response.json();
      }
    })
    .then(renderDetail)
  }
})

searchButton.addEventListener('submit', function (event) {
  event.preventDefault();

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fd50b8715b5fd666755e33ddbd0dbc40`)
  .then(function (response) {
    if (response.ok) {
      console.log(response);
      return response.json();
    }
  })
  .then(renderDetail)
  .catch((err) => console.log(err));
})

renderCities();