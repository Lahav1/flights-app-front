import React, {Component} from 'react';
import classes from './ControlPanel.module.css';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
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
import AddAirline from './Airline/AddAirline';
import RemoveAirline from './Airline/RemoveAirline';
import AddRoute from './Route/AddRoute';
import RemoveRoute from './Route/RemoveRoute';
import AddFlight from './Flight/AddFlight';
import RemoveFlight from './Flight/RemoveFlight';
import AddAirport from './Airport/AddAirport';
import RemoveAirport from './Airport/RemoveAirport';

class ControlPanel extends Component {
    state={
        confirmed: true,
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
        let action = document.getElementById("action").value.trim();
        let entity = document.getElementById("entity").value.trim();
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
                        style={{ width: 200 }}
                        InputProps={{
                            startAdornment: (
                                <LockIcon />
                            ),
                            }} 
                    />
                    <Box m={1} />
                </div>
                <Box m={3} />
                <button onClick={this.handleContinue} className={classes.Button}>Continue</button>
                <Box m={1} />
                {errorMessage}
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
                                    id: 'action'
                                }}
                                >
                                <option className={classes.Option}>&nbsp;Add</option>
                                <option className={classes.Option}>&nbsp;Remove</option>
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
                                <option className={classes.Option}>&nbsp;Flight</option>
                                <option className={classes.Option}>&nbsp;Airport</option>
                                <option className={classes.Option}>&nbsp;Airplane</option>
                                <option className={classes.Option}>&nbsp;Airline</option>
                                <option className={classes.Option}>&nbsp;Route</option>
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
            if (this.state.entity === "Airline") {
                modalContent = (
                    <AddAirline />
                )
            }
            if (this.state.entity === "Route") {
                modalContent = (
                    <AddRoute />
                )
            }
            if (this.state.entity === "Flight") {
                modalContent = (
                    <AddFlight />
                )
            }
            if (this.state.entity === "Airport") {
                modalContent = (
                    <AddAirport />
                )
            }
        }

        if (this.state.action === "Remove") {
            if (this.state.entity === "Airplane") {
                modalContent = (
                    <RemoveAirplane />
                )
            }
            if (this.state.entity === "Airline") {
                modalContent = (
                    <RemoveAirline />
                )
            }
            if (this.state.entity === "Route") {
                modalContent = (
                    <RemoveRoute />
                )
            }
            if (this.state.entity === "Flight") {
                modalContent = (
                    <RemoveFlight />
                )
            }
            if (this.state.entity === "Airport") {
                modalContent = (
                    <RemoveAirport />
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
