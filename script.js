const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");

const weatherInfoSection = document.querySelector(".weather-info");
const notfoundSection = document.querySelector(".not-found");
const searchCitySection = document.querySelector(".search-city");

const countTxt = document.querySelector(".country-txt");
const tempTxt = document.querySelector(".temp-txt");
const conditionTxt = document.querySelector(".condition-txt");
const humidityValuetxt = document.querySelector(".humidity-value-txt");
const windValueTxt = document.querySelector(".wind-value-txt");
const weatherSummaryImg = document.querySelector(".weather-summary-img");

const currentDateTxt = document.querySelector(".current-data-txt");
const forecastItemContainer = document.querySelector(
  ".forecast-items-container"
);

const apikey = "459020fbc4dae37a62bf2b8b6d90b6c3";

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    updateWeatherInfo(city);
    cityInput.value = "";
    cityInput.blur();
  }
});

cityInput.addEventListener("keydown", (event) => {
  const city = cityInput.value.trim();
  if (event.key === "Enter" && city !== "") {
    updateWeatherInfo(city);
    cityInput.value = "";
    cityInput.blur();
  }
});

async function getFetchData(endPoint, city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apikey}&units=metric`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("City not found or API error");
  }
  return await response.json();
}

function getWeatherIcon(id) {
  if (id <= 232) return `thunderstorm.svg`;
  if (id <= 321) return `drizzle.svg`;
  if (id <= 531) return `rain.svg`;
  if (id <= 622) return `snow.svg`;
  if (id <= 781) return `atmosphere.svg`;
  if (id === 800) return `clear.svg`;
  return `clouds.svg`;
}

function getCurrentData() {
  const currentDate = new Date();
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
  };
  //   console.log(currentDate);
  return currentDate.toLocaleDateString("en-GB", options);
}

// async function updateWeatherInfo(city) {
//   const weatherData = await getFetchData("weather", city);

//   if (weatherData.cod !== 200) {
//     showDisplaySection(notfoundSection);
//     return;
//   }

//   console.log(weatherData);

//   const {
//     name: country,
//     main: { temp, humidity },
//     weather: [{ id, main } = {}],
//     wind: { speed },
//   } = weatherData;

//   countTxt.textContent = country;
//   tempTxt.textContent = `${Math.round(temp)} °C`;
//   conditionTxt.textContent = main;
//   humidityValuetxt.textContent = `${humidity}%`;
//   windValueTxt.textContent = `${speed} m/s`;

//   currentDateTxt.textContent = getCurrentData();
//   weatherSummaryImg.src = `weather/${getWeatherIcon(id)}?v=${Date.now()}`;

//   await updateForecastsInfo(city);
//   showDisplaySection(weatherInfoSection);
// }

async function updateWeatherInfo(city) {
  try {
    const weatherData = await getFetchData("weather", city);
    console.log("Weather data:", weatherData);

    if (weatherData.cod !== 200) {
      console.warn("⚠️ City not found or invalid response");
      showDisplaySection(notfoundSection);
      return;
    } // Destructure safely with default fallback

    const {
      name: country,
      main: { temp, humidity },
      weather = [],
      wind: { speed },
    } = weatherData;

    const { id = 800, main: condition = "Clear" } = weather[0] || {};

    countTxt.textContent = country;
    tempTxt.textContent = `${Math.round(temp)} °C`;
    conditionTxt.textContent = condition;
    humidityValuetxt.textContent = `${humidity}%`;
    windValueTxt.textContent = `${speed} m/s`;

    currentDateTxt.textContent = getCurrentData();

    const iconPath = `weather/${getWeatherIcon(id)}?v=${Date.now()}`;
    weatherSummaryImg.src = iconPath;

    weatherSummaryImg.onerror = () => {
      weatherSummaryImg.src = "weather/default.svg";
    };

    await updateForecastsInfo(city);

    showDisplaySection(weatherInfoSection);
  } catch (error) {
    console.error(" Error in updateWeatherInfo:", error);
    showDisplaySection(notfoundSection);
  }
}

async function updateForecastsInfo(city) {
  const forecastsData = await getFetchData("forecast", city);
  const timeTaken = "12:00:00";
  const todayDate = new Date().toISOString().split("T")[0];
  forecastItemContainer.innerHTML = ``;
  forecastsData.list.forEach((forecastWeather) => {
    if (
      forecastWeather.dt_txt.includes(timeTaken) &&
      !forecastWeather.dt_txt.includes(todayDate)
    ) {
      // console.log(forecastWeather);
      updateForecastItem(forecastWeather);
    }
  });
}

function updateForecastItem(weatherData) {
  console.log(weatherData);
  const {
    dt_txt: date,
    weather: [{ id }],
    main: { temp },
  } = weatherData;

  const dateTaken = new Date(date);
  const dateOption = {
    day: "2-digit",
    month: "short",
  };
  const dateResult = dateTaken.toLocaleDateString("en-US", dateOption);

  const forecastItem = `
    <div class="forecast-items">
      <h5 class="forecast-items-date regular-txt">${dateResult}</h5>
      <img src="weather/${getWeatherIcon(id)}" class="forecast-items-img">
      <h5 class="forecast-items-temp">${Math.round(temp)} °C</h5>
    </div>
  `;

  forecastItemContainer.insertAdjacentHTML("beforeend", forecastItem);
}

function showDisplaySection(section) {
  [weatherInfoSection, searchCitySection, notfoundSection].forEach((sec) => {
    sec.style.display = "none";
  });

  section.style.display = "flex";
}
