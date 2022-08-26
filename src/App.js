import './App.css';
import { useState } from 'react';

function App() {
  // States
  const [city, setCity] = useState(null);  // To 
  const [showWeather, setShowWeather] = useState("disable");
  const [cityWeather,setCityWeather] = useState(null);

  // API Key for Open Weather Map API ( https://openweathermap.org/ )
  const apiKey = "a03b46846e7b8b2caa42bdf0a96f1d1c";

  // When user starts typing city name ✍️
  const loadCity = async (event) => {
    const userInputVal = event.target.value;

    // if user entered some value only then fetch the data 🧐..
    if (userInputVal) {
      // Fetch API 
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInputVal}&units=metric&appid=${apiKey}`);

      // IF data is coming successfully only then change the state .. 
      if (response.status == 200 && response.statusText == "OK") {
        // Convert response in json format 
        const data = await response.json();
        setCity(data.name);
        setCityWeather(data);
        setShowWeather("enable");
      } 
      // If status is not ok
      else{
        setCity(null);
        setShowWeather("disable");
        setCityWeather(null);
      }
    } else {
      setCity(null);
      setShowWeather("disable");
      setCityWeather(null);
    }
  }
  return (
    <div id="weatherMainContainer">

      {/* User Input Container */}
      <div id="userInputContainer">

        {/* Main Title of our app */}
        <h3 id="heading_of_app">
          my weather app
        </h3>
        {/* Input box */}
        <input type="text" id="userInputBox" onChange={loadCity} placeholder="Type city name 🏙️ .." />

        <span id="seperator">or</span>

        {/* Use user's location(coordinates) */}
        <button id="myLocationBtn">📡 your location </button>
      </div>

      {/* Show weather details only when user entered correct city name */}
      {!city ? (
        <span></span>
      ) : (
        <div id="weatherDetails" className={showWeather}>

          {/* Main weather details */}
          <div id="mainWeatherDetails">
            {/* Weather Icon */}

            <span className='htmlEmojis'>
              🌤️
            </span>

            {/* Temperature in celcius */}
            <p id="temperature">
              {cityWeather.main.temp}<sup>o</sup>C
            </p>
            {/* Condition */}
            <p id="condition">
              Haze
            </p>
            {/* Location (City Name) */}
            <p id="location">
              🗺️ {cityWeather.name}
            </p>
          </div>

          {/* Extra weather details */}
          <div id="extraWeatherDetails">
            {/* Feels like  */}
            <div id="feelsLike">
              <p>
                🌡️ {cityWeather.main.feels_like}<sup>o</sup>C
              </p>
              <p>Feels Like</p>
            </div>
            {/* Humidity Section */}
            <div id="humadity">
              <p>
                💧 {cityWeather.main.humidity}%
              </p>
              <p>Humadity</p>
            </div>
          </div>
        </div>
      )}
      {/* Outer Div */}
    </div>
  );
}

export default App;
