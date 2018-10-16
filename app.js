const storage = new Storage();
// получение локации по умолчанию
const weatherLoc = storage.getLocationData();
// инициализация класса weather
const weather = new Weather(weatherLoc.lat,weatherLoc.lon);
// инициализации класаа Data
const cityData = new Data();
// инициализация класса UI
const ui = new UI();

setNameByCoords(weatherLoc.lat,weatherLoc.lon);

// Добавляем eventListner
document.addEventListener("DOMContentLoaded", getWeather);

document.getElementById("w-change-btn").addEventListener("click", e => {
  let city = document.getElementById("city").value;
  getData(city);
  $("#locModal").modal("hide");
});

function getWeather() {
  weather
    .getWeather()
    .then(result => {
      ui.paint(result);
    })
    .catch(err => console.log(err));
}

function getData(city) {
  cityData
    .getData()
    .then(result => {
      result.forEach(item => {
        if (item.name === city) {
          document.getElementById("w-location").textContent = item.name;
          document.getElementById("w-desc").textContent = item.subject;
          weather.changeLocation(item.coords.lat, item.coords.lon);
          weather.getWeather();
          getWeather();
        }
      });
    })
    .catch(err => console.log(err));
}

function setNameByCoords(lat, lon) {
  cityData
    .getData()
    .then(result => {
      result.forEach(item => {
        if ((item.coords.lat === lat) & (item.coords.lon === lon)) {
          document.getElementById("w-location").textContent = item.name;
          document.getElementById("w-desc").textContent = item.subject;
        }
      });
    })
    .catch(err => console.log(err));
}
