import React from "react";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(date);
}
class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      location: "lisbon",
      weatherLocation: "",
      weather: {},
      isLoading: false,
    };
    this.fetchWeather = this.fetchWeather.bind(this);
  }

  async fetchWeather() {
    try {
      this.setState({
        isLoading: true,
      });
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();
      // console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      this.setState({
        weatherLocation: `${name} ${convertToFlag(country_code)}`,
      });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weather = await weatherRes.json();
      console.log(weather.daily);
      this.setState({ weatherData: weather.daily });
    } catch (err) {
      console.err(err);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    return (
      <div className="app">
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="search for location..."
          value={this.state.location}
          onChange={(e) =>
            this.setState({
              location: e.target.value,
            })
          }
        />
        <button onClick={this.fetchWeather}>Search weather</button>
        {this.state.isLoading && <p className="loader">isLoading data...</p>}
        {!this.state.isLoading && this.state.weatherData?.weathercode && (
          <Weather
            location={this.state.weatherLocation}
            weatherData={this.state.weatherData}
          />
        )}
      </div>
    );
  }
}

export default App;

class Weather extends React.Component {
  render() {
    console.log(this.props.weatherData);
    const {
      temperature_2m_max: maxTemperature,
      temperature_2m_min: minTemperature,
      time: dates,
      weathercode: codes,
    } = this.props.weatherData;

    return (
      <div>
        <h2>Weather {this.props.location}</h2>
        <ul className="weather">
          {dates.map((date, i) => (
            <Day
              key={date}
              date={date}
              max={maxTemperature.at(i)}
              min={minTemperature.at(i)}
              code={codes.at(i)}
              isToday={i === 0}
            />
          ))}
        </ul>
      </div>
    );
  }
}

class Day extends React.Component {
  render() {
    console.log({ props: this.props });
    const { date, max, min, code, isToday } = this.props;
    return (
      <li className="day">
        <span>{getWeatherIcon(code)}</span>
        <p>{date}</p>
        <p>{isToday ? "Today" : formatDay(date)}</p>
        <p>
          {Math.floor(min)}°- <strong>{Math.ceil(max)}°</strong>
        </p>
      </li>
    );
  }
}
