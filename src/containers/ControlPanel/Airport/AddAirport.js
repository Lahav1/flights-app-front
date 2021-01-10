import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import classes from '../ControlPanel.module.css';
import { addAirport } from '../../../utils';

class AddAirport extends Component {
    state = {
        success: false,
        failure: false
    }

    handleClick = () => {
        let name = document.getElementById("name").value;
        let city = document.getElementById("city").value;
        let country = document.getElementById("country").value;
        let iata = document.getElementById("iata").value;
        let icao = document.getElementById("icao").value;
        let lat = document.getElementById("lat").value;
        let lon = document.getElementById("lon").value;
        let timezone = document.getElementById("timezone").value;
        addAirport(name, city, country, iata, icao, lat, lon, timezone)
            .then(data => {
                if (data.status === 400) {
                this.setState({success: false, failure: true});
                } else {
                this.setState({success: true, failure: false});
                }
            });
    }
  
    render() {
        let message = '';
        if (this.state.success) {
            message = <p className={classes.SuccessMessage}>Airport was added successfuly.</p>
        }
        if (this.state.failure) {
            message = <p className={classes.ErrorMessage}>There was a problem!</p>
        }
        return (
        <div>
            <h3>Add an Airport</h3>
            <TextField
                id="name"
                label="Name"
                variant="outlined"
                />
            <Box m={0.5} />
            <TextField
                id="city"
                label="City"
                variant="outlined"
                />
            <Box m={0.5} />
            <TextField
                id="country"
                label="Country"
                variant="outlined"
                />
            <Box m={0.5} />
            <TextField
                id="iata"
                label="IATA"
                variant="outlined"
                />
            <Box m={0.5} />
            <TextField
                id="icao"
                label="ICAO"
                variant="outlined"
                />
            <Box m={0.5} />
            <TextField
                id="lat"
                label="Latitude"
                variant="outlined"
                />
            <Box m={0.5} />
            <TextField
                id="lon"
                label="Longitude"
                variant="outlined"
                />
            <Box m={0.5} />
            <TextField
                id="timezone"
                label="Timezone"
                variant="outlined"
                />
            <Box m={1} />
            <button className={classes.Button} onClick={this.handleClick}>Execute</button>
            {message}
        </div>
        );
    }
}

export default AddAirport;
