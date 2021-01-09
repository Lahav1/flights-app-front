import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import classes from '../ControlPanel.module.css';
import { addAirplane } from '../../../utils';

class AddAirplane extends Component {
  handleClick = () => {
    let name = document.getElementById("name").value;
    let iata = document.getElementById("iata").value;
    let icao = document.getElementById("icao").value;
    let speed = document.getElementById("speed").value;
    let seats = document.getElementById("seats").value;
    addAirplane(name, iata, icao, speed, seats);
  }
  
  render() {
    return (
      <div>
          <h3>Add an Airplane</h3>
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
            id="speed"
            label="Speed"
            variant="outlined"
            />
          <Box m={0.5} />
          <TextField
            id="seats"
            label="Number of Seats"
            variant="outlined"
            />
          <Box m={1} />
          <button className={classes.Button} onClick={this.handleClick}>Execute</button>
      </div>
    );
  }
}

export default AddAirplane;
