import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import classes from '../ControlPanel.module.css';
import { addRoute } from '../../../utils';

class AddRoute extends Component {
    state = {
        success: false,
        failure: false
    }

    handleClick = () => {
        let source = document.getElementById("src").value;
        let destination = document.getElementById("dst").value;
        let airline = document.getElementById("airline").value;
        let equipment = document.getElementById("equipment").value;
        addRoute(source, destination, airline, equipment)
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
            message = <p className={classes.SuccessMessage}>Route was added successfuly.</p>
        }
        if (this.state.failure) {
            message = <p className={classes.ErrorMessage}>There was a problem!</p>
        }
        return (
        <div>
            <h3>Add a Route</h3>
            <TextField
                id="src"
                label="Source"
                variant="outlined"
                />
            <Box m={1} />
            <TextField
                id="dst"
                label="Destination"
                variant="outlined"
                />
            <Box m={1} />
            <TextField
                id="airline"
                label="Airline"
                variant="outlined"
                />
            <Box m={1} />
            <TextField
                id="equipment"
                label="Equipment"
                variant="outlined"
                />
            <Box m={1} />
            <button className={classes.Button} onClick={this.handleClick}>Execute</button>
            {message}
        </div>
        );
    }
}

export default AddRoute;
