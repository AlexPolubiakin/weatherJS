class Data {
  async getData() {
    const response = await fetch("russian-cities.json");

    const responseData = await response.json();

    return responseData;
  }
}
