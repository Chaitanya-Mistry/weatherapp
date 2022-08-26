import './App.css';

function App() {
  return (
    <div id="weatherMainContainer">
      {/* User Input Container */}
      <div id="userInputContainer">

        {/* Main Title of our app */}
        <h3 id="heading_of_app">
          my weather app
        </h3>
        {/* Input box */}
        <input type="text" id="userInputBox" placeholder="Type city name 🏙️ .." />

        <span id="seperator">or</span>

        {/* Use user's location(coordinates) */}
        <button id="myLocationBtn">📡 your location </button>
      </div>

      {/* Weather Details */}
      <div id="weatherDetails">

        {/* Main weather details */}
        <div id="mainWeatherDetails">
          {/* Weather Icon */}

          <span className='htmlEmojis'>🌤️</span>

          {/* Temperature in celcius */}
          <p id="temperature">
            27<sup>o</sup>C
          </p>
          {/* Condition */}
          <p id="condition">
            Haze
          </p>
          {/* Location (City Name) */}
          <p id="location">
            🗺️ Mumbai
          </p>
        </div>

        {/* Extra weather details */}
        <div id="extraWeatherDetails">
          {/* Feels like  */}
          <div id="feelsLike">
            <p>
              🌡️ 32<sup>o</sup>C
            </p>
            <p>Feels Like</p>
          </div>
          {/* Humidity Section */}
          <div id="humadity">
            <p>
              💧 83%
            </p>
            <p>Humadity</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
