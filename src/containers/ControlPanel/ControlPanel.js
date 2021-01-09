import React, {Component} from 'react';
import classes from './ControlPanel.module.css';
import EmailIcon from '@material-ui/icons/Email';
import TextField from '@material-ui/core/TextField';
import Aux from '../../hoc/ReactAux';
import { isAdmin } from '../../utils';

class ControlPanel extends Component {
    state={
        confirmed: false,
        wrongDetails: false
    }

    handleContinue = () => {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        isAdmin(email, password)
            .then(data => {
                if (data.is_admin === "false") {
                    this.setState({wrongDetails: true});
                } else {
                    this.setState({confirmed: true});
                }
            })
    }

    render() {
        let errorMessage = '';

        if (this.state.wrongDetails) {
            errorMessage = <p className={classes.ErrorMessage}>Wrong email or password</p>
        }

        let panel = (
            <Aux>
                <div className={classes.Content}>
                    <p>Please Enter Email and Password. </p>
                    <TextField
                        className={classes.margin}
                        id="email"
                        label="Email"
                        style={{ width: 200 }}
                        InputProps={{
                        startAdornment: (
                            <EmailIcon />
                        ),
                        }} 
                    />
                    &nbsp;
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                    &nbsp;
                    <button onClick={this.handleContinue} className={classes.ContinueButton}>Continue</button>
                    &nbsp;
                    {errorMessage}
                </div>
            </Aux>
        )

        if (this.state.confirmed) {
            panel = (
                <div>
                    
                </div>
            )
        }

        return (
            <div>
                <h3>Admin Control Panel</h3>
                {panel}
            </div>
        );
    }
    }

export default ControlPanel;
