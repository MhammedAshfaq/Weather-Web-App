// Mian Condent Swiching to the Javascript File

const timeEI = document.getElementById("time");
const dateEI = document.getElementById("date");
const timeZone = document.getElementById("time-zone");
const country = document.getElementById("country");
const currentWeatherItems = document.getElementById("current-weather-items");
const currentWeatherEI = document.getElementById("current-temp");
const weatherForecastEI = document.getElementById("multi-forecast");

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const API_KEY = `e3b37fa8576627ac04f542c54d862761`;

setInterval(() => {
    // Time
    const time = new Date();
    const minute = time.getMinutes();
    const hour = time.getHours();
    const hoursIn12HrFormation = hour >= 13 ? hour % 12 : hour //This is Ternery Operaters
    const ampm = hour >= 12 ? "PM" : "AM";
    // Time Setting in html page
    timeEI.innerHTML = (hoursIn12HrFormation < 10 ? '0' + hoursIn12HrFormation : hoursIn12HrFormation) + " : " + (minute < 10 ? '0' + minute :minute) + " " + `<span id="am-pm">${ampm}</span>`

    // Date
    const day = time.getDay();
    const month = time.getMonth();
    const date = time.getDate();
    //Date Setting in html page
    dateEI.innerHTML = days[day] + " , " + date + " , " + months[month];
}, 1000);

// Gwt Wether Data
(function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {

        let { latitude, longitude } = success.coords;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
            .then(response =>
                response.json())
            .then(data => {
                console.log(data);
                showWeatherData(data);
            })
    })
})()

function showWeatherData(data) {

      //Time Zone Setting
    timeZone.innerHTML = data.timezone;
      // Coundry Position setting
    country.innerHTML =data.lat +"N "+data.lon+"E";


    let { humidity, pressure, wind_speed, sunrise, sunset, temp } = data.current;

    currentWeatherItems.innerHTML =
        `<div class="weather-items">
            <div>Weather</div>
            <div>${temp}&#176; C</div>
        </div>

        <div class="weather-items">
            <div>Humidity</div>
            <div>${humidity} %</div>
        </div>

        <div class="weather-items">
            <div>Pressure</div>
            <div>${pressure} mb</div>
        </div>

        <div class="weather-items">
            <div>Wind Speed</div>
            <div>${wind_speed} km/h</div>
        </div>
        
        <div class="weather-items">
            <div>Sunrise</div>
            <div>${window.moment(sunrise * 1000).format('HH: mm a')}</div>
        </div>

        <div class="weather-items">
            <div>Sunset</div>
            <div>${window.moment(sunset * 1000).format('HH: mm a')}</div>
        </div>`;

    let otherDayForcast ='';
    data.daily.forEach((day, idx) => {
        if (idx ==0) {
            // Currend Day Weather Details
            currentWeatherEI.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@2x.png" alt="wether-icon" class="w-icon">
            <div class="today-list">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <div class="temp">Night-<br> ${day.temp.night}&#176; C</div>
                <div class="temp">Day-<br> ${day.temp.day}&#176; C</div>
            </div>
            `
            
        }else{
            otherDayForcast += `
            <div class="multi-forecast-item">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="wether-icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176; C</div>
                <div class="temp">Day - ${day.temp.day}&#176; C</div>
            </div>
            `
        }
    });

    // Adding Multiple Day Forcast Day and Night Temparatues
    weatherForecastEI.innerHTML = otherDayForcast;
          
};


