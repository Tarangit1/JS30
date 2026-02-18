const apikey = "ba61994c3c841d0d4cd6604e085709d0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const inputBox = document.getElementById("input-city");
const inputbtn = document.getElementById("search-btn");

// Button click event
inputbtn.addEventListener('click', searchWeather);

// Enter key event
inputBox.addEventListener('keypress', function(e) {
    if(e.key === "Enter") {
        searchWeather();
    }
});

// Load user location on page load
window.addEventListener('load', getUserLocation);
function searchWeather() {
    const city = inputBox.value;
    if(city === "") {
        alert("Please enter a city name");
        return;
    } else {
        check_weather(city);
    }
}

// Get user's location
function getUserLocation() {
    if (navigator.geolocation) {
        console.log("Getting your location...");
        document.querySelector(".city").innerHTML = "Detecting location...";
        
        navigator.geolocation.getCurrentPosition(
            // Success - user allowed location
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                console.log("Location found:", lat, lon);
                getWeatherByCoordinates(lat, lon);
            },
            // Error - user denied or error occurred
            (error) => {
                console.log("Location error:", error.message);
                alert("Location access denied. Showing default city.");
                check_weather('London');
            }
        );
    } else {
        console.log("Geolocation not supported");
        alert("Your browser doesn't support location. Showing default city.");
        check_weather('London');
    }
}

// Fetch weather by coordinates
async function getWeatherByCoordinates(lat, lon) {
    try {
        const res = await fetch(`${apiUrl}&lat=${lat}&lon=${lon}&appid=${apikey}`);
        
        if (!res.ok) {
            throw new Error("Weather data not available");
        }
        
        const data = await res.json();
        updateWeatherUI(data);
        
    } catch (error) {
        console.error(error);
        alert("Couldn't fetch weather. Showing default city.");
        check_weather('London');
    }
}

async function check_weather(city) {
    try {
        const res = await fetch(apiUrl + `&q=${city}&appid=${apikey}`);
        
        if (!res.ok) {
            alert("City not found! Please enter a valid city name.");
            return;
        }
        
        const data = await res.json();
        updateWeatherUI(data);
        
    } catch (error) {
        console.error(error);
        alert("Error fetching weather. Please try again.");
    }
}

// Reusable function to update UI
function updateWeatherUI(data) {
    console.log(data);
    
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";
    
    // Update weather icon
    const weatherCondition = data.weather[0].main;
    updateWeatherIcon(weatherCondition);
    console.log("Weather condition:", weatherCondition);
}

function updateWeatherIcon(condition) {
    const weatherIcon = document.querySelector(".weather-icon");
    
    switch(condition) {
        case "Clouds":
            weatherIcon.src = "images/clouds.png";
            break;
        case "Clear":
            weatherIcon.src = "images/clear.png";
            break;
        case "Rain":
            weatherIcon.src = "images/rain.png";
            break;
        case "Drizzle":
            weatherIcon.src = "images/drizzle.png";
            break;
        case "Snow":
            weatherIcon.src = "images/snow.png";
            break;
        case "Mist":
        case "Fog":
            weatherIcon.src = "images/mist.png";
            break;
        default:
            weatherIcon.src = "images/clear.png";
    }
}

