import React, {Component} from 'react';
import classes from './ControlPanel.module.css';
import EmailIcon from '@material-ui/icons/Email';
import TextField from '@material-ui/core/TextField';
import Aux from '../../hoc/ReactAux';
import { isAdmin } from '../../utils';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import Modal from '../../components/Modal/Modal';
import AddAirplane from './Airplane/AddAirplane';
import RemoveAirplane from './Airplane/RemoveAirplane';

class ControlPanel extends Component {
    state={
        confirmed: false,
        wrongDetails: false,
        executing: false,
        action: '',
        entity:''
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

    handleQuit = () => {
        this.setState({executing: false});
    }

    handleModify = () => {
        let action = document.getElementById("action").value;
        let entity = document.getElementById("entity").value;
        this.setState({action: action, entity:entity, executing: true});
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
                    <button onClick={this.handleContinue} className={classes.Button}>Continue</button>
                    &nbsp;
                    {errorMessage}
                </div>
            </Aux>
        )

        if (this.state.confirmed) {
            panel = (
                <div className={classes.Content}>
                    <div className={classes.Dropdowns}>
                        <FormControl>
                            <InputLabel htmlFor="action-dropdown">Action</InputLabel>
                            <Select
                                native
                                style={{width: 100}}
                                inputProps={{
                                    name: 'action',
                                    id: 'action',
                                }}
                                >
                                <option>Add</option>
                                <option>Remove</option>
                            </Select>
                        </FormControl>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <FormControl>
                            <InputLabel htmlFor="entity-dropdown">Entity</InputLabel>
                            <Select
                                native
                                style={{width: 120}}
                                inputProps={{
                                    name: 'entity',
                                    id: 'entity',
                                }}
                                >
                                <option>Flight</option>
                                <option>Airport</option>
                                <option>Airplane</option>
                                <option>Airline</option>
                                <option>Route</option>
                                <option>Reservation</option>
                            </Select>
                        </FormControl>
                    </div>
                    <Box m={2.5} />
                    <button onClick={this.handleModify} className={classes.Button}>Modify</button>
                </div>
            )
        }

        let modalContent = '';
        if (this.state.action === "Add") {
            if (this.state.entity === "Airplane") {
                modalContent = (
                    <AddAirplane />
                )
            }
        }

        if (this.state.action === "Remove") {
            if (this.state.entity === "Airplane") {
                modalContent = (
                    <RemoveAirplane />
                )
            }
        }

        return (
            <div>
                <Modal show={this.state.executing} modalClosed={this.handleQuit}>
                    {modalContent}
                </Modal>
                <h3>Admin Control Panel</h3>
                {panel}
            </div>
        );
    }
    }

export default ControlPanel;
