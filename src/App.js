import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Forecast from './components/Forecast';
// import Map from './components/Map';
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const getCityInfo = require('../src/modules/location');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      lat: '',
      lon: '',
      response: {},
      data: [],
      forecastData: [],
      error: {},
      input: '',
      displayName: '',
      displayComponent: false
    };
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let baseUrl = process.env.REACT_APP_LOC_IQ_US_BASE_URL;
      let input = this.state.input;
      console.log(baseUrl);

      input = input.split('').map((e,i) => {return (i===0)?e.toUpperCase():e}).join('');
      console.log(input);

      this.setState({input: input});
      
      let res = app.get('/location', getCityInfo);
      
      this.setState({
        data: res.data,
        showMap: true
      });

      console.log(this.state.data);

    } catch (err) {
      this.setState({ error: err });
      console.log(err);
    }
  };

  handleForecast = (e) => {
    e.preventDefault();
    try{
      let API_URL = process.env.REACT_APP_API_WEATHER_URL
      let input = this.state.input;
      console.log(this.state.input);

      input = input.split('').map((e,i) => {return (i===0)?e.toUpperCase():e}).join('');
      this.setState({input: input});

      let url = `${API_URL}?lat=${this.state.data.lat}&lon=${this.state.data.lon}`;
      let res = axios.get(url);
      console.log(res);

      this.setState({
        forecastData: res.data
      });

    } catch (err) {
      this.setState({ error: err });
    }
  }

  handleChange = async (e) => {
    e.preventDefault();
    try {
      this.setState({input: e.currentTarget.value});
      console.log(this.state.input);
    } catch (err) {
      this.setState({ error: err });
    }
  };

  render() {
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
            id="city"
            name="city"
            value={this.state.input}
            onChange={this.handleChange}
          />
          <Button type="submit">Explore!</Button>
          <button 
            show={this.state.displayComponent.toString()} 
            type="button" 
            onClick={this.handleForecast}
          >Get Forecast</button>
        </Form>
        <Forecast data={this.state.forecastData}/>
        {/* <Map show={this.state.showMap} data={this.state.data} /> */}
      </>
    );
  }
}
