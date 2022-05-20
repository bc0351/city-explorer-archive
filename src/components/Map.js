import React from 'react';
import axios from 'axios';
// import Image from 'react-bootstrap/Image';

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cityName: '',
            response: {},
            error: {},
        };
    }

    renderMap = async () => {
        let center = this.props.latLong;
        let zoom = 5;
        let url = process.env.REACT_APP_MAPS_URL;
        try {
            let response = await axios.get(`${url}?key=${key}&center=${center}&zoom=${zoom}`);
            this.setState({
                response: response
            });
        } catch (e) {
            this.setState({
                error: e
            });
        }
    }

    render() {
        return (
            <>
              <img src={this.renderMap} alt="" fluid="true" />
            </>
        );
    }
}
