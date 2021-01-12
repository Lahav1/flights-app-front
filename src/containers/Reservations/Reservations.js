import React, {Component} from 'react';
import EmailIcon from '@material-ui/icons/Email';
import TextField from '@material-ui/core/TextField';
import classes from './Reservations.module.css';
import Spinner from '../../components/Spinner/Spinner';
import Modal from '../../components/Modal/Modal';
import { getUserReservations, handleReservationDetails } from '../../utils';
import Reservation from './Reservation/Reservation';
import Aux from '../../hoc/ReactAux';
import ReservationInfo from './ReservationInfo/ReservationInfo';
import Box from '@material-ui/core/Box';

class Reservations extends Component {
    state = {
        reservations: [],
        rawReservations: [],
        email: '',
        enteredMail: false,
        currentReservation: 0,
        viewingReservation: false,
        error: false
    }

    handleContinue = () => {
        let email = document.getElementById("email").value;
        this.setState({loading: true, email: email});
        getUserReservations(email).then(data => {
            this.setState({
                rawReservations: data,
                reservations: handleReservationDetails(data), 
                enteredMail: true
            });
        }).catch(error => {
            this.setState({error: true})
        });
    }

    handleReservationClicked = (i) => {
        this.setState({currentReservation: i, viewingReservation: true});
    }

    handleReservationQuit = () => {
        this.setState({viewingReservation: false});
        getUserReservations(this.state.email).then(data => {
            this.setState({
                rawReservations: data,
                reservations: handleReservationDetails(data)
            });
        });
    }

    render() {
        let reservations = (
            <Aux>
                <h3>My Reservations</h3>
                <div className={classes.Content}>
                    <p>Enter your email address to view your reservations: </p>
                    <TextField
                        className={classes.margin}
                        id="email"
                        label="Email"
                        style={{ width: 250 }}
                        InputProps={{
                        startAdornment: (
                            <EmailIcon />
                        ),
                        }} 
                    />
                    &nbsp;
                </div>
                <Box m={3} />
                <button onClick={this.handleContinue} className={classes.ViewButton}>Continue</button>
            </Aux>
        )

        if (this.state.enteredMail) {
            reservations = <Spinner />
        }

        if (this.state.error) {
            reservations = <p>Failed to connect to server. Please try again later.</p>
        }

        if (this.state.enteredMail) {
            if (this.state.reservations.length !== 0) {
                let i = 0;
                let r = this.state.reservations.map((reservation, index) => {
                    return <Reservation id={reservation.id} departure={reservation.departure}
                                    source={reservation.source}  destination={reservation.destination} tickets={reservation.tickets} 
                                    number={i++} clicked={(n) => this.handleReservationClicked(n)} key={index} />
                });
                reservations = (
                    <div>
                        <h3>Viewing reservations for: {this.state.email}</h3>
                        <div className={classes.Reservations}>
                            {r}
                        </div>
                    </div>
                )
            } else {
                reservations = (
                    <div>
                        <h3>There are no reservations for {this.state.email}</h3>
                    </div>
                )
            }
        }
            
        return(
            <div>
                <Modal show={this.state.viewingReservation} modalClosed={this.handleReservationQuit}>
                    <ReservationInfo details={this.state.rawReservations[this.state.currentReservation]} email={this.state.email}/>
                </Modal>
                {reservations}
            </div>
        );
    }
}

export default Reservations;