let images = {
    "Clear": "src/images/clear.jpg",
    "Clouds": "src/images/clouds.jpg", 
    "Rain": "src/images/rain.jpg",     
    "Snow": "src/images/snow.png",    
    "Fog": "src/images/mist.jpg",     
    "Thunderstorm": "src/images/thunderstorm.jpg",
    "Wind": "src/images/wind.jpg"
};

document.getElementById("btn").addEventListener("click", async function () {
    let API_KEY = "e5e752c89a6de56dff41ceb16f735082"; 
    let city = document.getElementById("bar").value.trim(); 

    let image = document.getElementById("image");
    let cityName = document.getElementById("city_name")
    let degradesAnswer = document.getElementById("degrades_answer");
    let feelsLike = document.getElementById("feels_like");
    let windSpeed = document.getElementById("wind_speed");
    let pressure = document.getElementById("pressure");
    
    if (!city) {
        degradesAnswer.innerHTML = "Please enter the name of the city";
        image.src = "";
        return;
    }

    degradesAnswer.innerHTML = "Loading...";
    image.src = "";
    image.style.display = "none";

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();

        cityName.textContent = `Weather in ${data.name}:`;

        degradesAnswer.innerHTML = `Temperature: ${Math.round(data.main.temp)}°C`;
        feelsLike.innerHTML = `Feels like: ${Math.round(data.main.feels_like)}°C`;
        windSpeed.innerHTML = `Wind speed: ${Math.round(data.wind.speed)}km/h`;
        pressure.innerHTML = `Pressure: ${(data.main.pressure)}`;
        

        const weatherType = data.weather[0].main;
        if (images[weatherType]) {
            image.src = images[weatherType];
            image.alt = `${weatherType} weather`;
            image.style.display = "block";
        } else {
            image.src = "";
            image.alt = "No image available for this weather";
            console.warn(`No image defined for weather type: ${weatherType}`);
            image.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        if (error.message.includes("401")) {
            degradesAnswer.innerHTML = "Error: Invalid API key. Check the OpenWeatherMap key.";
        } else if (error.message.includes("404")) {
            degradesAnswer.innerHTML = "Error: City not found.";
        } else {
            degradesAnswer.innerHTML = "Error loading weather data. Try again later.";
        }
        image.src = "";
        image.style.display = "none";
    }
});

document.getElementById("btn").addEventListener("click", function() {
    document.getElementById("bar").value = ""; 
})

document.getElementById("image_container").addEventListener("click", function(event) {
    if (event.target.classList.contains("search_image")) {
        let word = event.target.getAttribute("data-word");
        let searchInput = document.getElementById("bar");
        searchInput.value += (searchInput.value ? " " : "") + word; 
    }
});

const marquee = document.querySelector('.marquee span');
        marquee.addEventListener('mouseover', () => {
            marquee.style.animationPlayState = 'paused';
        });
        marquee.addEventListener('mouseout', () => {
            marquee.style.animationPlayState = 'running';
});
