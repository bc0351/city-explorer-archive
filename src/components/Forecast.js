import React from 'react';

export default class Forecast extends React.Component {
  constructor(props) {
      super(props);
      console.log(props);
      this.state = {
          forecast: [],
          error: {}
      };
  }

  render () {
    let forecasts = this.props.forecasts.map((f) => {return <div>{f.forecast.date}: {f.forecast.description}.</div>;});
    console.log(forecasts);
    return (
      <div className="forecast" >
      {forecasts}
      </div>
    );
  }
}
