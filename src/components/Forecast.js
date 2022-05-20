import React from 'react';

export default class Forecast extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          forecast: [],
          error: {}
      };
  }
  
  render () {
    let forecasts = this.props.data.map((f) => {return <li>{f.datetime}: {f.weather_description}.</li>;});
    return (
      <ul className="forecast" >
        {forecasts?forecasts:''}
      </ul>
    );
  }
}
