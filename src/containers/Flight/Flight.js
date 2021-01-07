import React, {Component} from 'react';
import classes from './Flight.module.css';

class Flight extends Component {
     
    render() {
        let str = "";
        var flight;
        for (flight of this.props.details.trip_flights) {
            str += flight.flight_ID + " ";
        }
        return (
        <div>
            <p>{str}</p>
        </div>
        );
    }
}


export default Flight;
