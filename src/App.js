import './App.css';

function App() {
  return (
    <div id="weatherMainContainer">
        {/* User Input Container */}
        <div id="userInputContainer">

          {/* Main Title of our app */}
          <h3 id="heading_of_app">my weather app</h3>
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
              
            </div>
            {/* Extra weather details */}
            <div id="extraWeatherDetails">

            </div>
        </div>
    </div>
  );
}

export default App;
