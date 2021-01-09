import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import classes from '../ControlPanel.module.css';
import { removeAirplane } from '../../../utils';

class RemoveAirplane extends Component {
  handleClick = () => {
    let iata = document.getElementById("iata").value;
    removeAirplane(iata);
  }
  
  render() {
    return (
      <div>
          <h3>Remove an Airplane</h3>
          <TextField
            id="iata"
            label="IATA"
            variant="outlined"
            />
          <Box m={1} />
          <button className={classes.Button} onClick={this.handleClick}>Execute</button>
      </div>
    );
  }
}

export default RemoveAirplane;
