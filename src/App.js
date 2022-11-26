import './App.css';
import { useEffect, useState } from 'react';
import { SplashScreen } from './SplashScreen';

function App() {
  // States
  const [splashScreen, setSplashScreen] = useState(true);
  const [city, setCity] = useState(null);
  const [showWeather, setShowWeather] = useState("disable");
  const [cityWeather, setCityWeather] = useState(null);

  const displaySplashScreen = () => {
    setTimeout(() => {
      setSplashScreen(false);
    }, 1000);
  }

  useEffect(() => {
    displaySplashScreen();
  }, []);
  // API Key for Open Weather Map API ( https://openweathermap.org/ )
  const apiKey = process.env.REACT_APP_apiKey;

  // When user starts typing city name ✍️
  const loadCity = async (event) => {
    const userInputVal = event.target.value;

    // if user entered some value only then fetch the data 🧐..
    if (userInputVal) {
      // Fetch API 
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInputVal}&units=metric&appid=${apiKey}`);

      // IF data has received successfully only then change the state .. 
      if (response.status === 200 && response.statusText === "OK") {
        // Convert response in json format 
        const data = await response.json();

        setCity(data.name);
        setCityWeather(data);
        setShowWeather("enable");
      }
      // If status is not ok
      else {
        setCity(null);
        setShowWeather("disable");
        setCityWeather(null);
      }
    }
    else {
      setCity(null);
      setShowWeather("disable");
      setCityWeather(null);
    }
  }

  // When user choose to search weather based on their current location 🛰️
  const detectMyLocation = () => {
    // Browser in-built API to get device(browser) location/coordinates ..

    /* 
      1. The geolocation property is only available in secure contexts (HTTPS).
      2. The geolocation property is only available if the user approves it.
    */

    setSplashScreen(true);
    if (window.navigator.geolocation) // if this API is supported by the browser ❔
    {
      window.navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);

        // IF data has received successfully only then change the state .. 
        if (response.status === 200 && response.statusText === "OK") {
          // Convert response in json format 
          const data = await response.json();
          
          setTimeout(() => {
            setSplashScreen(false);
            setCity(data.name);
            setCityWeather(data);
            setShowWeather(true);
          }, 1000);  
        }
        // If status is not ok
        else {
          setCity(null);
          setShowWeather("disable");
          setCityWeather(null);
        }
      }, (error) => console.log(error));
    }
  }
  return (
    <>
      {/* Splash screen component */}
      {splashScreen ? <SplashScreen /> : ""}
      <div id="weatherMainContainer">

        {/* User Input Container */}
        <div id="userInputContainer">

          {/* Main Title of our app */}
          <h3 id="heading_of_app">
            sky zone
          </h3>
          {/* Input box */}
          <input type="text" id="userInputBox" onChange={loadCity} placeholder="Type city name 🏙️ .." />

          <span id="seperator">or</span>

          {/* Use user's location(coordinates) */}
          <button id="myLocationBtn" onClick={detectMyLocation}>📡 your location </button>
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

                {/* Overcast clouds */}
                {cityWeather.weather[0].description === "overcast clouds" ? (<span className='htmlEmojis'> ☁️ </span>
                ) : (<span />)}
                {/* Few clouds or Scattered Clouds */}
                {cityWeather.weather[0].description === "few clouds" || cityWeather.weather[0].description === "scattered clouds" ? (<span className='htmlEmojis'> 🌥️ </span>
                ) : (<span />)}
                {/* Sunny */}
                {cityWeather.weather[0].description === "clear sky" ? (<span className='htmlEmojis'> ☀️ </span>
                ) : (<span />)}
                {/* Haze or Mist */}
                {cityWeather.weather[0].description === "haze" || cityWeather.weather[0].description === 'mist' ? (<span className='htmlEmojis'> 🌁 </span>
                ) : (<span />)}
                {/* Broken Clouds */}
                {cityWeather.weather[0].description === "broken clouds" ? (<span className='htmlEmojis'> 🌤️ </span>
                ) : (<span />)}
                {/* Rain */}
                {(cityWeather.weather[0].description).includes("rain") ? (<span className='htmlEmojis'> ⛈️ </span>
                ) : (<span />)}
                {/* Snow */}
                {(cityWeather.weather[0].description).includes("snow") ? (<span className='htmlEmojis'> 🌨️ </span>
                ) : (<span />)}

              </span>

              {/* Temperature in celcius */}
              <p id="temperature">
                {cityWeather.main.temp}<sup>o</sup>C
              </p>
              {/* Condition */}
              <p id="condition" style={{ textTransform: 'capitalize' }}>
                {cityWeather.weather[0].description}
              </p>
              {/* Location (City Name) */}
              <p id="location">
                🗺️ {cityWeather.name}
              </p>
            </div>
            {console.log(cityWeather.weather[0].description)}
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
    </>
  );
}

export default App;
