/* scripts/main.js Weather widget and Santiago time small helpers */

// 1) Insert your OpenWeatherMap API key here
const OPENWEATHER_API_KEY = '214fdc6d99c95665af78367c9c06c847'; // <-- PUT YOUR API KEY HERE

// Coordinates for Santiago, Chile
const LAT = -33.45;
const LON = -70.6667;

// Fetch and display current weather
async function fetchWeather() {
    if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === 'YOUR_API_KEY_HERE') {
        document.getElementById('weather-temp').textContent = 'API key missing';
        document.getElementById('weather-desc').textContent = 'Add API key in scripts/main.js';
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${OPENWEATHER_API_KEY}`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Weather fetch failed');
        const data = await res.json();
        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description;
        const icon = data.weather[0].icon; // e.g. 01d
        document.getElementById('weather-temp').textContent = `${temp} °C`;
        document.getElementById('weather-desc').textContent = desc;
        // set icon (simple image from OpenWeather)
        const iconEl = document.getElementById('weather-icon');
        iconEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" width="48" height="48">`;
    } catch (err) {
        console.error(err);
        document.getElementById('weather-desc').textContent = 'Unable to load weather.';
    }
}

// Santiago local time
function updateChileTime() {
    const now = new Date();
    // FIXED: Changed 'hour 12' to 'hour12'
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false, timeZone: 'America/Santiago'
    };
    // FIXED: Added missing '='
    const timeStr = now.toLocaleTimeString('es-CL', options);
    const el = document.getElementById('chile-time');
    if (el) el.textContent = timeStr;
}

// Small helper to set year in footers
function setYearAll(){
    const y = new Date().getFullYear();
    // FIXED: Added missing '=' to all below
    const el1 = document.getElementById('year');
    const el2 = document.getElementById('year2');
    const el3 = document.getElementById('year3');
    // FIXED: Corrected typos/syntax
    if(el1) el1.textContent = y;
    if(el2) el2.textContent = y;
    if(el3) el3.textContent = y;
}

// Initialize
function init() {
    fetchWeather();
    updateChileTime();
    setInterval(updateChileTime, 1000);
    setYearAll();
}

// Run when loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}