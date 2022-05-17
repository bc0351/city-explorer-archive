import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      request: {},
      response: {},
      error: {},
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let url = encodeURI(
      `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${e.target.value}&format=json`
    );
    let cityInfo = {};
    try {
      cityInfo = await axios.get(url);
      this.setState({
        city: cityInfo,
      });
    } catch (err) {
      try {
        url = encodeURI(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${e.target.value}&format=json`);
        cityInfo = await axios.get(url);
        this.setState({
          city: cityInfo,
        });
      } catch (err) {
        this.setState({
          error: err,
        });
      }
    }
  };

  handleChange = async (e) => {
    e.preventDefault();
    console.log(process.env.REACT_APP_LOCATION_IQ_API_KEY);
    let q = e.currentTarget.value.toString();
    let url = encodeURI(
      `https://api.locationiq.com/v1/autocomplete.php?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${q}&limit=5`
    );
    let cityInfo = await axios.get(url);
    try {
      console.log(cityInfo);
      document.getElementById('cityName').value = cityInfo;
    } catch (err) {
      this.setState({
        error: err,
      });
    }
  };

  render() {
    return (
      <>
        <h1>City Explorer</h1>
        <h2>Code301 -Project 02 - Lab 06</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Label htmlFor="cityName">Enter a City</Form.Label>
          <input
            type="text"
            placeholder="Search for city..."
            className="form-control ds-input"
            autoComplete="off"
            role="combobox"
            id="cityName"
            aria-autocomplete="list"
            aria-expanded="false"
            aria-label="search input"
            aria-controls=''
            onChange={this.handleChange}
            value={this.state.city}
          />
          <Button>Explore!</Button>
        </Form>
      </>
    );
  }
}
