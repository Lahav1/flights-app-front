import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import classes from '../ControlPanel.module.css';
import { removeAirplane } from '../../../utils';

class RemoveAirplane extends Component {
  state = {
    success: false,
    failure: false
  }

  handleClick = () => {
    let iata = document.getElementById("iata").value;
    removeAirplane(iata)
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
        message = <p className={classes.SuccessMessage}>Airplane was removed successfuly.</p>
    }
    if (this.state.failure) {
      message = <p className={classes.ErrorMessage}>There was a problem!</p>
    }
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
          {message}
      </div>
    );
  }
}

export default RemoveAirplane;
