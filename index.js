console.log("El archivo script.js se está ejecutando");

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    console.log('El botón de búsqueda funciona');
    const APIKey = '1473ab0bd5b366b6dade46cbd0a39336';
    const city = document.querySelector('.search-box input').value;

    if (city === '') 
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP_BdwfUXaUWuTRrYsTcbBrr-phza3-Qe50aFm2rpy7Q&s=10.png';
                    break;
                case 'Rain':
                    image.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtdVxhXZya3W5OnbFw5Suzf2FgNSnl98XDdaSsV8eW8A&s=10.png';
                    break;      
                case 'Snow':
                    image.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdQJP0bt-tdmiCete4VJG_KibjvtS6RhGNqp8QReO4xQ&s=10.png';
                    break;
                case 'Clouds':
                    image.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyPazr8sJOXpaFfskIwsKf7k5vtXKyZS3x1gqzFHYXw&s=10.png';
                    break;
                case 'Haze':
                    image.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSV7EFDA9aYJ1z9I7FVJBAj6VnpBwrQyhS9phT5AKe6Q&s=10.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed * 3.6)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
            
        });
        
});
document.querySelector('.search-box input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        search.click();
    }
});