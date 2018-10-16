class UI {
  constructor() {
    this.location = document.getElementById("w-location"); // из координат вытаскивать
    this.desc = document.getElementById("w-desc"); // округ/ регион ?
    this.temp = document.getElementById("w-temp"); // температура
    this.icon = document.getElementById("w-icon"); // иконка
    this.feelslike = document.getElementById("w-feels_like");
    this.condition = document.getElementById("w-condition");
    this.wind = document.getElementById("w-wind"); // три параметра в одной строке
    this.pressuremm = document.getElementById("w-pressure_mm");
    this.humidity = document.getElementById("w-humidity");
  }

  paint(weather) {
    this.temp.textContent =
      "Температура сейчас:  " + weather.fact.temp + "\xB0C";
    this.icon.setAttribute(
      "src",
      `https://yastatic.net/weather/i/icons/blueye/color/svg/` +
        weather.fact.icon +
        `.svg`
    );
    this.icon.style.color = "#C0C0C0";
    this.feelslike.textContent =
      "Чувствуется как:  " + weather.fact.feels_like + "\xB0C";

    const weather_condition_data = `{
        "clear":"ясно",
        "partly-cloudy":"малооблачно",
        "cloudy":"облачно с прояснениями",
        "overcast":"пасмурно",
        "partly-cloudy-and-light-rain":"небольшой дождь",
        "partly-cloudy-and-rain":"дождь",
        "overcast-and-rain":"сильный дождь",
        "overcast-thunderstorms-with-rain":"сильный дождь, гроза",
        "cloudy-and-light-rain":"небольшой дождь",
        "overcast-and-light-rain":"небольшой дождь",
        "cloudy-and-rain":"дождь",
        "overcast-and-wet-snow":"дождь со снегом",
        "partly-cloudy-and-light-snow":"небольшой снег",
        "partly-cloudy-and-snow":"снег",
        "overcast-and-snow":"снегопад",
        "cloudy-and-light-snow":"небольшой снег",
        "overcast-and-light-snow":"небольшой снег",
        "cloudy-and-snow":"снег"
      }`;
    let weather_cond_trans = "";
    let cond_data = JSON.parse(weather_condition_data);
    let key;
    for (key in cond_data) {
      if (key === weather.fact.condition) {
        weather_cond_trans = cond_data[key];
      }
    }
    this.condition.textContent = weather_cond_trans;

    // направление ветра
    const wind_dir_data = `{
                "nw" : "Северо-западное",
                "n" : "Северное",
                "ne" : "Северо-восточное",
                "e": "Восточное",
                "se":"Юго-восточное",
                "s":"Южное",
                "sw":"Юго-западное",
                "w":"Западное",
                "c":"Штиль"
             }`;

    let wind_dir_translate = "";
    let wind_data = JSON.parse(wind_dir_data);
    for (key in wind_data) {
      if (key === weather.fact.wind_dir) {
        wind_dir_translate = wind_data[key];
      }
    }

    this.wind.innerHTML = `
    <p>Скорость ветра: ${weather.fact.wind_speed} м/с </p> 
    <p>Скорость порывов ветра: ${weather.fact.wind_gust} м/с </p>
    <p>Направление ветра: ${wind_dir_translate}</p>
    `;
    this.pressuremm.textContent =
      "Давление:  " + weather.fact.pressure_mm + "мм рт.ст.";
    this.humidity.textContent =
      "Относительная влажность:  " + weather.fact.humidity + "%";
  }
}
