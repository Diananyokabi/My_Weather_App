function refreshWeather(response) {
    let temperatureElemet = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let windSpeedElement = document.querySelector("#wind-speed");
    let humidityElement = document.querySelector("#humidity");
    let timeElement = document.querySelector("#time");
    let date = new Date (response.data.time * 1000);
    let iconElement = document.querySelector("#icon");
    
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    windSpeedElement.innerHTML = `${response.data.wind.speed}Km/h`;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    temperatureElemet.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon">`;
}

function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Sartuday",

    ];
    let day = days[date.getDay()];
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
    let apiKey = "157a76fde4bot20af4447b7a34072da8";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);

}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  console.log(searchInput.value);
  
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");