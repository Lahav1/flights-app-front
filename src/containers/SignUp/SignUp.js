import React, {Component} from 'react';
import classes from './SignUp.module.css';
import EmailIcon from '@material-ui/icons/Email';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import {postSignUp} from '../../utils';
import Aux from '../../hoc/ReactAux';

class SignUp extends Component {
    state = {
        completed: false,
        error: false
    }

    handleClick = () => {
        let email = document.getElementById("email").value;
        let name = document.getElementById("name").value;
        let date = document.getElementById("date").value;
        let passport = document.getElementById("passport").value;
        postSignUp(email, name, date, passport)
            .then(response => {
                if (response.status === 400) {
                    this.setState({error: true});
                } else {
                    this.setState({completed: true});
                }
            })
    }

    render() {   
        let signup = (
            <Aux>
                <h3>Sign Up</h3>
                <div className={classes.Content}>
                    <TextField
                        id="email"
                        label="Email Address"
                        style={{ width: 200 }}
                        InputProps={{
                        startAdornment: (
                            <EmailIcon />
                        ),
                        }} 
                    />
                    &nbsp;
                    <TextField
                        id="name"
                        label="Full Name"
                        multiline
                        style={{ width: 200 }}
                        rowsMax={4}
                    />
                    <Box m={2} />
                    <TextField
                        id="date"
                        label="Date of Birth"
                        type="date"
                        defaultValue="1995-01-01"
                        style={{ width: 200 }}
                    />
                    &nbsp;
                    <TextField
                        id="passport"
                        label="Passport Number"
                        multiline
                        style={{ width: 200 }}
                        rowsMax={4}
                    />
                </div>
                <Box m={4} />
                <button className={classes.SignUpButton} onClick={this.handleClick}>
                    Complete    
                </button>
            </Aux>
        )
        if (this.state.completed) {
            signup = (
                <div className={classes.Content}>Signup Succeed</div>
            )
        }
        if (this.state.error) {
            signup = (
                <div className={classes.Content}>Email already exists. <br/> Please try again with another address.</div>
            )
        }
        return (
            <div>
                {signup}
            </div>
        ); 
    }
}

export default SignUp;