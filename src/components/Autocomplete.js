import React from 'react';
import axios from 'axios';

export default class Autocomplete extends React.Component {
  constructor(props) {
      super(props);
      console.log(props);
      this.state = {
          error: {}
      };
  }

  render () {
    return (
      <div className="forecast" >
      {forecasts}
      </div>
    );
  }
}
