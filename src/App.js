import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      response: {},
      error: {},
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let q = this.state.cityName;
    let url = encodeURI(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${q}&format=json`);
    try {
      let response = await axios.get(url);
      console.log(response);
    } catch (err) {
      try {
        url = encodeURI(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${q}&format=json`);
        let response = await axios.get(url);
        console.log(response);
      } catch (err) {
        this.setState({
          error: err
        });
        console.log(this.state.error);
      }
    }
  };

  handleChange = async (e) => {
    this.setState({
      cityName: e.currentTarget.value
    });
    console.log(this.state.cityName);
    let url = `https://api.locationiq.com/v1/autocomplete.php?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${this.state.cityName}&limit=5`;
    let response = await axios.get(url);
    console.log(response);
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
            id="cityName"
            onChange={this.handleChange}
          />
          <Button>Explore!</Button>
        </Form>
      </>
    );
  }
}
