'use strict';

require('dotenv').config();

const axios = require('axios');

const baseUrl = process.env.REACT_APP_LOC_IQ_US_BASE_URL;

function getCityInfo(req, res, next) {
  let params = {
    key: process.env.REACT_APP_LOC_IQ_API_KEY,
    city_name: req.query.city
  }
  axios.get(baseUrl, { params })
    .then(response => response.data.results.map(city => { return new Location(city) }))
    .then(filteredCities => res.status(200).send(filteredCities))
    .catch(error => next(error));
}

class Location {
  constructor(location) {
    this.place_id = location.place_id
    this.licence = location.licence
    this.osm_type = location.osm_type
    this.osm_id = location.osm_id
    this.boundingbox = location.boundingbox
    this.lat = location.lat
    this.lon = location.lon
    this.display_name = location.display_name
    this.class = location.class
    this.type = location.type
    this.importance = location.importance
    this.icon = location.icon
  }
}

module.exports = getCityInfo;
