import React from "react";

class App extends React.Component {

  constructor(props) {
    super();
    this.state = {
      location: "lisbon",
      weather: null
    }
    this.fetchWeather = this.fetchWeather.bind(this);
  }

  fetchWeather(){
    console.log('loading data');
  }

  render() {
    return (
      <div className="app">
        <h1>Weather App</h1>
        <input type="text" placeholder="search for location..." value={this.state.location} onChange={(e)=>this.setState({
          location: e.target.value
        })}/>
        <button onClick={this.fetchWeather}>Search weather</button>
      </div>
    );
  }
}

export default App;
