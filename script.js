

const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherResultDiv = document.getElementById('weather-result');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    const apiUrl = `https://wttr.in/${city}?format=j1`;
    weatherResultDiv.innerHTML = `<p>Buscando dados...</p>`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Cidade não encontrada ou erro na API.');
        }
        const data = await response.json();
        displayWeather(data); // Chama a próxima função em caso de sucesso
    } catch (error) {
        weatherResultDiv.innerHTML = `<p class="weather-error">${error.message}</p>`;
    }
}

function displayWeather(data) {
    const currentCondition = data.current_condition[0];
    const temperatura = currentCondition.temp_C;
    const descricao = currentCondition.weatherDesc[0].value;
    const cidade = data.nearest_area[0].areaName[0].value;
    
    weatherResultDiv.innerHTML = `
        <h3>Tempo atual em ${cidade}</h3>
        <p class="temperatura">${temperatura}°C</p>
        <p class="descricao">${descricao}</p>
    `;
}