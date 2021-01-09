import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import classes from '../ControlPanel.module.css';
import { removeRoute } from '../../../utils';

class RemoveRoute extends Component {
  state = {
    success: false,
    failure: false
  }

  handleClick = () => {
    let id = document.getElementById("id").value;
    removeRoute(id)
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
        message = <p className={classes.SuccessMessage}>Route was removed successfuly.</p>
    }
    if (this.state.failure) {
      message = <p className={classes.ErrorMessage}>There was a problem!</p>
    }
    return (
      <div>
          <h3>Remove a Route</h3>
          <TextField
            id="id"
            label="ID"
            variant="outlined"
            />
          <Box m={1} />
          <button className={classes.Button} onClick={this.handleClick}>Execute</button>
          {message}
      </div>
    );
  }
}

export default RemoveRoute;
