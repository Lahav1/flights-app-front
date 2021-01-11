import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import classes from '../ControlPanel.module.css';
import { addFlight } from '../../../utils';

class AddFlight extends Component {
    state = {
        success: false,
        failure: false
    }

    handleClick = () => {
        let route = document.getElementById("route").value;
        let departure = document.getElementById("departure").value;
        let arrival = document.getElementById("arrival").value;
        let price = document.getElementById("price").value;
        let airplane = document.getElementById("airplane").value;
        addFlight(route, departure, arrival, price, airplane)
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
            message = <p className={classes.SuccessMessage}>Flight was added successfuly.</p>
        }
        if (this.state.failure) {
            message = <p className={classes.ErrorMessage}>There was a problem!</p>
        }
        return (
        <div>
            <h3>Add a Flight</h3>
            <TextField
                id="route"
                label="Route ID"
                variant="outlined"
                />
            <Box m={1} />
            <TextField
                id="departure"
                label="Departure Time"
                variant="outlined"
                />
            <Box m={1} />
            <TextField
                id="arrival"
                label="Arrival Time"
                variant="outlined"
                />
            <Box m={1} />
            <TextField
                id="price"
                label="Ticket Price"
                variant="outlined"
                />
            <Box m={1} />
            <TextField
                id="airplane"
                label="Airplane IATA"
                variant="outlined"
                />
            <Box m={1} />
            <button className={classes.Button} onClick={this.handleClick}>Execute</button>
            {message}
        </div>
        );
    }
}

export default AddFlight;
