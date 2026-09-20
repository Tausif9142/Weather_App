const API_KEY = "2cd65905d3b74e2c8a5122338261709";

const BASE_URL = "https://api.weatherapi.com/v1/current.json";


// Get weather
async function getWeather() {

    const locationInput = document.getElementById("locationInput");

    const location = locationInput.value.trim();

    // Check empty input
    if (location === "") {
        showError("Please enter a city name.");
        return;
    }

    showLoading(true);
    hideError();

    try {

        const url =
            `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(location)}&aqi=yes`;

        const response = await fetch(url);

        const data = await response.json();

        // API error
        if (!response.ok || data.error) {
            throw new Error(
                data.error?.message || "Unable to find this location."
            );
        }

        displayWeather(data);

    } catch (error) {

        showError(error.message);

    } finally {

        showLoading(false);

    }
}


// Display weather
function displayWeather(data) {

    const location = data.location;
    const current = data.current;

    // Location
    document.getElementById("city").textContent =
        location.name;

    document.getElementById("country").textContent =
        `${location.region}, ${location.country}`;


    // Main weather
    document.getElementById("temperature").textContent =
        `${current.temp_c}°C`;

    document.getElementById("condition").textContent =
        current.condition.text;


    // Weather icon
    document.getElementById("weatherIcon").src =
        "https:" + current.condition.icon;

    document.getElementById("weatherIcon").alt =
        current.condition.text;


    // Weather details
    document.getElementById("feelsLike").textContent =
        `${current.feelslike_c}°C`;

    document.getElementById("humidity").textContent =
        `${current.humidity}%`;

    document.getElementById("wind").textContent =
        `${current.wind_kph} km/h`;

    document.getElementById("cloud").textContent =
        `${current.cloud}%`;

    document.getElementById("visibility").textContent =
        `${current.vis_km} km`;

    document.getElementById("uv").textContent =
        current.uv;


    // Air quality
    if (current.air_quality) {

        document.getElementById("aqi").textContent =
            current.air_quality["us-epa-index"];

        document.getElementById("pm25").textContent =
            `${current.air_quality.pm2_5} μg/m³`;

        document.getElementById("pm10").textContent =
            `${current.air_quality.pm10} μg/m³`;

    } else {

        document.getElementById("aqi").textContent = "N/A";
        document.getElementById("pm25").textContent = "N/A";
        document.getElementById("pm10").textContent = "N/A";

    }


    // Last updated
    document.getElementById("updated").textContent =
        current.last_updated;
}


// Show loading
function showLoading(status) {

    document.getElementById("loading").style.display =
        status ? "block" : "none";
}


// Show error
function showError(message) {

    const error = document.getElementById("error");

    error.textContent = message;

    error.style.display = "block";
}


// Hide error
function hideError() {

    document.getElementById("error").style.display =
        "none";
}


// Press Enter to search
document
    .getElementById("locationInput")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            getWeather();
        }

    });


// Load London weather initially
window.addEventListener("load", function() {

    document.getElementById("locationInput").value = "London";

    getWeather();

});