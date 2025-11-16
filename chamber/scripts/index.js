document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration and Constants ---
    // IMPORTANT: Replace this with your actual OpenWeatherMap API key
    const OPEN_WEATHER_API_KEY = "214fdc6d99c95665af78367c9c06c847";
    
    // --- WEATHER UPDATE ---
    // Using coordinates for Curicó, because Licantén may not be properly indexed by the API.
    // The weather section on the page will still be labeled "Licantén Weather".
    const CURICO_LAT = -34.983; // Curicó Latitude
    const CURICO_LON = -71.233; // Curicó Longitude 
    const WEATHER_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${CURICO_LAT}&lon=${CURICO_LON}&units=metric&appid=${OPEN_WEATHER_API_KEY}`;
    
    // --- MEMBER DATA UPDATE ---
    // Member data loaded directly from the provided JSON file structure.
    const chamberMembers = [
        { name: "El Trigal Bakery of Lora", address: "Av. Las Flores #150, Lora", phone: "75 2555 101", website: "https://www.eltrigallora.com", image: "https://placehold.co/60x60/FAD79A/5B3A1C?text=LBB", membershipLevel: 3, otherInfo: "Specialized in kneaded bread and traditional Chilean sweets." },
        { name: "The Iloca Breeze Inn", address: "Ruta Costera Sur S/N, Iloca", phone: "75 2555 102", website: "https://www.hostalbrisa.cl", image: "https://placehold.co/60x60/A3D0C3/1F403D?text=IBI", membershipLevel: 2, otherInfo: "Sea-view accommodation and delicious homemade breakfasts." },
        { name: "The Hook Fish Market", address: "Caleta de Duao S/N", phone: "75 2555 103", website: "https://www.elanzuelo.cl", image: "https://placehold.co/60x60/698B9D/FFFFFF?text=HFM", membershipLevel: 3, otherInfo: "Fresh seafood products, daily sales to the public and restaurants." },
        { name: "Mataquito Sunset Vineyard", address: "Camino Vecinal 45, Licantén", phone: "75 2555 104", website: "https://www.vinaocasomataquito.cl", image: "https://placehold.co/60x60/8B0000/FFFFFF?text=MSV", membershipLevel: 1, otherInfo: "Producers of coastal dry-farmed Syrah and Carmenère grapes." },
        { name: "The Return Minimarket", address: "Calle Principal #201, Licantén", phone: "75 2555 105", website: "https://www.elretorno.com", image: "https://placehold.co/60x60/F5CBA7/76448A?text=TRM", membershipLevel: 2, otherInfo: "Open 24 hours. Essential goods and local products." },
        { name: "Mataquito Hardware Store", address: "Ruta J-60 Km 3, Licantén", phone: "75 2555 106", website: "https://www.ferreteriataquito.cl", image: "https://placehold.co/60x60/5D6D7E/FFFFFF?text=MHS", membershipLevel: 1, otherInfo: "Construction materials and tool rental services." },
        { name: "Licantén Coffee and Crafts", address: "Plaza de Armas #12, Licantén", phone: "75 2555 107", website: "https://www.cafeartesania.cl", image: "https://placehold.co/60x60/D4AC0D/1C2833?text=LCC", membershipLevel: 3, otherInfo: "Specialty coffee and sales of local crafts and souvenirs." },
        { name: "The Coastal Pharmacy", address: "Av. Iloca 44, Iloca", phone: "75 2555 108", website: "https://www.farmaciacostera.cl", image: "https://placehold.co/60x60/F0F3F4/2C3E50?text=TCP", membershipLevel: 2, otherInfo: "Full service pharmacy and health clinic." },
        { name: "Duao Handicrafts Center", address: "Costanera S/N, Duao", phone: "75 2555 109", website: "https://www.arteduo.cl", image: "https://placehold.co/60x60/E59866/5B2C6F?text=DHC", membershipLevel: 3, otherInfo: "Showcasing traditional Maule clay and wood crafts." },
        { name: "Licantén Municipal Services", address: "Calle Central 10, Licantén", phone: "75 2555 110", website: "https://www.munilicanten.cl", image: "https://placehold.co/60x60/5499C7/FFFFFF?text=LMS", membershipLevel: 1, otherInfo: "Local government offices and public services." }
    ];

    // Helper function to map numeric level to display string
    function getLevelString(level) {
        switch (level) {
            case 3: return 'gold';
            case 2: return 'silver';
            case 1: 
            default: return 'bronze';
        }
    }

    // --- Utility Functions ---

    /**
     * Handles mobile navigation menu toggle.
     */
    function setupMobileMenu() {
        const button = document.getElementById('mobile-menu-button');
        const menu = document.getElementById('nav-menu');

        button.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }

    /**
     * Converts temperature from Celsius to a rounded string.
     * @param {number} temp - Temperature in Celsius.
     * @returns {string} - Rounded temperature string with degree symbol.
     */
    function formatTemperature(temp) {
        return `${Math.round(temp)}°C`;
    }

    // --- Weather Data Fetching and Rendering ---

    /**
     * Fetches weather data from OpenWeatherMap API and displays it.
     */
    async function fetchWeatherData() {
        const weatherInfoElement = document.getElementById('weather-info');
        
        if (OPEN_WEATHER_API_KEY === "YOUR_OPENWEATHER_API_KEY" || !OPEN_WEATHER_API_KEY) {
             // Display user-facing error message for missing key
             weatherInfoElement.innerHTML = `<p style="color:red; font-weight:bold;">ERROR: Please replace 'YOUR_OPENWEATHER_API_KEY' in the JavaScript file with a valid API key for the weather to load.</p>`;
             return;
        }

        // Retry logic for API call with exponential backoff
        const maxRetries = 3;
        let response = null;
        let data = null;
        let lastError = null;

        for (let i = 0; i < maxRetries; i++) {
            try {
                response = await fetch(WEATHER_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                data = await response.json();
                break; // Success! Break the loop
            } catch (error) {
                lastError = error;
                // Wait using exponential backoff: 1s, 2s, 4s...
                if (i < maxRetries - 1) {
                    const delay = Math.pow(2, i) * 1000;
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }

        if (data) {
            renderWeather(data);
        } else {
            console.error("Could not fetch weather data after retries:", lastError);
            weatherInfoElement.innerHTML = `<p style="color:red;">Failed to load weather data after multiple attempts. Please check the API key and console for errors.</p>`;
        }
    }

    /**
     * Renders the current weather and 3-day forecast.
     * @param {Object} data - OpenWeatherMap forecast API response data.
     */
    function renderWeather(data) {
        const weatherInfoElement = document.getElementById('weather-info');
        const list = data.list;

        // 1. Current Weather (using the first entry in the list, which is the current or nearest forecast)
        const current = list[0];
        const currentTemp = formatTemperature(current.main.temp);
        const description = current.weather[0].description;
        
        // 2. 3-Day Forecast Logic
        // Group forecast data by date (Midnight time '00:00:00') to get distinct days
        const dailyForecasts = {};
        
        list.forEach(item => {
            // Get short day name (e.g., 'Mon', 'Tue')
            const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
            // Only consider midday/afternoon forecast to represent the "daily" temperature
            if (item.dt_txt.includes("12:00:00") || item.dt_txt.includes("15:00:00")) { 
                if (!dailyForecasts[date]) {
                    dailyForecasts[date] = { min: item.main.temp_min, max: item.main.temp_max, day: date };
                } else {
                    // Update min/max if a lower min or higher max is found for the day
                    dailyForecasts[date].min = Math.min(dailyForecasts[date].min, item.main.temp_min);
                    dailyForecasts[date].max = Math.max(dailyForecasts[date].max, item.main.temp_max);
                }
            }
        });

        // Convert object to array and take the next 3 days (excluding today)
        const forecastArray = Object.values(dailyForecasts).slice(1, 4);

        let forecastHTML = '';
        if (forecastArray.length > 0) {
            forecastHTML = forecastArray.map(day => `
                <div class="forecast-day">
                    <strong>${day.day}</strong>
                    <p>Low: ${formatTemperature(day.min)}</p>
                    <p>High: ${formatTemperature(day.max)}</p>
                </div>
            `).join('');
        } else {
            forecastHTML = '<p>No 3-day forecast available.</p>';
        }

        // Inject final HTML
        weatherInfoElement.innerHTML = `
            <div id="current-weather">
                <h3>Current Conditions</h3>
                <p id="current-temp">${currentTemp}</p>
                <p id="current-description">${description}</p>
            </div>
            <div>
                <h3>3-Day Forecast</h3>
                <div id="forecast-container">
                    ${forecastHTML}
                </div>
            </div>
        `;
    }

    // --- Member Spotlights Logic ---

    /**
     * Shuffles an array randomly.
     * @param {Array} array - Array to shuffle.
     * @returns {Array} - Shuffled array.
     */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /**
     * Loads and displays random Gold/Silver member spotlights.
     */
    async function loadSpotlights() {
        const spotlightsContainer = document.getElementById('spotlights-container');
        spotlightsContainer.innerHTML = '<p class="loading">Filtering and selecting members...</p>';

        // 1. Filter for Gold (3) or Silver (2) members
        const qualifiedMembers = chamberMembers.filter(member => 
            member.membershipLevel === 3 || member.membershipLevel === 2
        );

        // 2. Randomly select 2 or 3 members
        const shuffledMembers = shuffleArray(qualifiedMembers);
        const selectionCount = Math.floor(Math.random() * 2) + 2; // Randomly choose 2 or 3
        const featuredMembers = shuffledMembers.slice(0, selectionCount);
        
        let spotlightHTML = '';

        if (featuredMembers.length === 0) {
            spotlightHTML = '<p>No Gold or Silver members available for spotlight today.</p>';
        } else {
            spotlightHTML = featuredMembers.map(member => {
                const levelString = getLevelString(member.membershipLevel);
                // The image field in the JSON is 400x300. We will use the smaller 60x60 placeholder defined in the JS data for display consistency.
                const imageSrc = member.image; 
                
                return `
                    <div class="spotlight-card">
                        <span class="level-tag level-${levelString}">${levelString}</span>
                        <div class="member-details">
                            <!-- Using the small placeholder logo defined in the JS data for consistent card size -->
                            <img src="${imageSrc.replace('400x300', '60x60').replace('Bakery', 'LB').replace('Inn', 'IB').replace('Fish+Market', 'HM').replace('Vineyard', 'MV').replace('Minimarket', 'RM').replace('Hardware', 'HS').replace('Coffee', 'LC').replace('Pharmacy', 'CP').replace('Crafts', 'DH').replace('Municipality', 'LS')}" 
                                alt="${member.name} Logo" 
                                onerror="this.onerror=null; this.src='https://placehold.co/60x60/CCCCCC/333333?text=Logo';">
                            <div>
                                <h3>${member.name}</h3>
                                <p style="font-size:0.8em; color:#777;">${member.otherInfo}</p>
                            </div>
                        </div>
                        <div class="detail-line"><span>📞</span>${member.phone}</div>
                        <div class="detail-line"><span>🏠</span>${member.address}</div>
                        <div class="detail-line"><span>🌐</span><a href="${member.website}" target="_blank">${member.website.replace(/(https?:\/\/)/, '').replace(/\/$/, '')}</a></div>
                    </div>
                `;
            }).join('');
        }

        // Use a short delay to simulate network latency for better demonstration of async/await
        await new Promise(resolve => setTimeout(resolve, 500));

        spotlightsContainer.innerHTML = spotlightHTML;
    }

    // --- Initialization ---
    setupMobileMenu();
    fetchWeatherData();
    loadSpotlights();
});