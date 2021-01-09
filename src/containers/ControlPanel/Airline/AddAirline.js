import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import classes from '../ControlPanel.module.css';
import { addAirline } from '../../../utils';

class AddAirline extends Component {
    state = {
        success: false,
        failure: false
    }

    handleClick = () => {
        let name = document.getElementById("name").value;
        let iata = document.getElementById("iata").value;
        let icao = document.getElementById("icao").value;
        let active = document.getElementById("active").value;
        let rating = document.getElementById("rating").value;
        addAirline(name, iata, icao, active, rating)
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
            message = <p className={classes.SuccessMessage}>Airline was added successfuly.</p>
        }
        if (this.state.failure) {
            message = <p className={classes.ErrorMessage}>There was a problem!</p>
        }
        return (
        <div>
            <h3>Add an Airline</h3>
            <TextField
                id="name"
                label="Name"
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
                id="active"
                label="Active"
                variant="outlined"
                />
            <Box m={0.5} />
            <TextField
                id="rating"
                label="Rating"
                variant="outlined"
                />
            <Box m={1} />
            <button className={classes.Button} onClick={this.handleClick}>Execute</button>
            {message}
        </div>
        );
    }
}

export default AddAirline;
