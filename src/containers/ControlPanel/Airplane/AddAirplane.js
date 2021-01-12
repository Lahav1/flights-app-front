import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import classes from '../ControlPanel.module.css';
import { addAirplane } from '../../../utils';

class AddAirplane extends Component {
    state = {
      success: false,
      failure: false
    } 

    handleClick = () => {
        let name = document.getElementById("name").value;
        let iata = document.getElementById("iata").value;
        let icao = document.getElementById("icao").value;
        let speed = document.getElementById("speed").value;
        let seats = document.getElementById("seats").value;
        addAirplane(name, iata, icao, speed, seats)
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
          message = <p className={classes.SuccessMessage}>Airplane was added successfuly.</p>
      }
      if (this.state.failure) {
        message = <p className={classes.ErrorMessage}>There was a problem!</p>
      }
      return (
        <div>
            <h3>Add an Airplane</h3>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              />
            <Box m={3} />
            <TextField
              id="iata"
              label="IATA"
              variant="outlined"
              helperText="3 characters code"
              />
            <Box m={2} />
            <TextField
              id="icao"
              label="ICAO"
              variant="outlined"
              helperText="4 characters code"
              />
            <Box m={2} />
            <TextField
              id="speed"
              label="Speed"
              variant="outlined"
              variant="outlined"
              helperText="KTS"
              />
            <Box m={2} />
            <TextField
              id="seats"
              label="Number of Seats"
              variant="outlined"
              />
            <Box m={2} />
            <button className={classes.Button} onClick={this.handleClick}>Execute</button>
            {message}
        </div>
      );
    }
}

export default AddAirplane;
