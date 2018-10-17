class Weather {
  constructor(lat, lon) {
    this.lat = lat;
    this.lon = lon;
  }

  // //Fetch weather from API

  async getWeather() {
    const response = await fetch(
      `https://api.weather.yandex.ru/v1/forecast?lat=` +
        this.lat +
        `&lon=` +
        this.lon +
        `&extra=true`,
      {
        // не работает без плагина разбираться надо с CORS

        headers: {
          // "Access-Control-Allow-Origin" : "*",
          // "Access-Control-Request-Headers" : "access-control-allow-headers,access-control-allow-origin,x-yandex-api-key",
          // "Access-Control-Request-Method": "GET",
          // "Origin" :"null" ,
          // "Access-Control-Allow-Origin" : "http://127.0.0.1:5500",
          "Access-Control-Allow-Headers": "X-Yandex-API-Key",
          "X-Yandex-API-Key": "54adec6d-a573-4085-b5ff-cdfd657c9ebe"
        }
      }
    );

    const responseData = await response.json();

    return responseData;
  }

  changeLocation(lat, lon) {
    this.lat = lat;
    this.lon = lon;
  }
}
