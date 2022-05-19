import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Forecast from './components/Forecast';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      response: {},
      forecast: [],
      error: {},
      input: '',
      showForecast: false,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let q = this.state.cityName;
    let urlUS = encodeURI(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${q}&format=json`);
    let urlEU = encodeURI(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${q}&format=json`);
    try {
      let response = await axios.get(urlUS) || await axios.get(urlEU);
      console.log(response);
    } catch (err) {
      this.setState({
        error: err
      });
      alert(err.message);
      console.log(err.message);
    }
  };

  handleForecast = async (e) => {
    e.preventDefault();
    console.log(this.state.cityName);
    let url = `${process.env.REACT_APP_API_SERVER_URL}?searchQuery=${this.state.cityName}`;
    let forecasts = await axios.get(url);
    console.log(forecasts.data);
    this.setState({
      forecast: forecasts.data,
      showForecast: true
    });
  }

  handleChange = async (e) => {
    try {
      this.setState({
        cityName: e.currentTarget.value
      });
      
      console.log(this.state.cityName);

      let url = `https://api.locationiq.com/v1/autocomplete.php?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${this.state.cityName}&limit=5`;
      let response = await axios.get(url);

      console.log(response);

    } catch (err) {
      Object.entries(err).map((k,v) => console.log(`${k}: ${v}`));
    }
  };

  render() {
    let forecasts = this.state.forecast.map((forecastObj, index) => {return {key: index, forecast: {description: forecastObj.description, date: forecastObj.date}};});
    console.log(forecasts.forecast);
    return (
      <>
        <h1>City Explorer</h1>
        <h2>Code301 -Project 02 - City Explorer</h2>
        <Form
          onSubmit={this.handleSubmit}>
          <Form.Label
            htmlFor="cityName"
          >Enter a City</Form.Label>
          <input
            type="text"
            placeholder="Search for city..."
            className="form-control"
            id="cityName"
            onChange={this.handleChange}
          />
          <Button type="submit">Explore!</Button>
          <button type="button" onClick={this.handleForecast}>Get Forecast</button>
        </Form>
        <Forecast show={this.state.showForecast} forecasts={forecasts}/>
      </>
    );
  }
}
