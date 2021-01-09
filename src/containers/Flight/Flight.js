import React, {Component} from 'react';
import Arrow from '../../assets/images/straight-right-arrow.svg'
import Grid from '@material-ui/core/Grid';
import Aux from '../../hoc/ReactAux';
import { handleDateTime, handleHour, postReservation } from '../../utils';
import EmailIcon from '@material-ui/icons/Email';
import TextField from '@material-ui/core/TextField';
import classes from './Flight.module.css';

class Flight extends Component {d
    state = {
        ordering: false,
        confirmed: false
    }

    handleOrderClick = () => {
        this.setState({ordering: true});
    }

    handleConfirmClick = () => {
        let email = document.getElementById("email").value;
        // send API call.
        let flights = [];
        let flight;
        for (flight of this.props.details.trip_flights) {
            flights.push(flight.flight_ID);
        }
        postReservation(flights, email, this.props.tickets)
            .then(data => this.setState({confirmed: true}));
    }

    render() {
        let f = this.props.details.trip_flights;
        let i = 1;
        let flights = f.map((flight, index) => {
            let connectionTime = "";
            if (flight.connection_time !== undefined) {
                connectionTime = <Grid item xs={12}>
                                    <p className={classes.Connection}>Connection Time: {handleHour(flight.connection_time)}</p>
                                </Grid>
            }
            return (
                <Aux key={index}>
                    <Grid item xs={12}>
                        <p className={classes.Header}><b>Flight {i++}: {flight.flight_number}</b></p>
                    </Grid>
                    <Grid item xs={4}>
                        <p className={classes.Text}>{handleDateTime(flight.local_departure_time)}</p>
                        <p className={classes.Airport}>{flight.source_airport.city}</p>
                    </Grid>
                    <Grid item xs={4}>
                            <img alt="to" src={Arrow} className={classes.Image} />
                            <p className={classes.Duration}>{handleHour(flight.duration)}</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p className={classes.Text}>{handleDateTime(flight.local_arrival_time)}</p>
                        <p className={classes.Airport}>{flight.destination_airport.city}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.Airline}>
                            <img  alt={flight.airline.name} src={"//www.gstatic.com/flights/airline_logos/70px/" + flight.flight_number.substr(0, 2) + ".png"}></img>
                            &nbsp;
                            <p className={classes.Text}>{flight.airline.name}</p>
                        </div>
                    </Grid>
                    <Grid item xs={6} >
                        <div className={classes.Airplane}>
                            <p className={classes.Text}>{flight.airplane}</p>
                        </div>
                    </Grid>
                    {connectionTime}               
                </Aux>
        )});

        let order = (
            <Grid item xs={12}>
                <button className={classes.Button} onClick={this.handleOrderClick}>Order Tickets</button>
            </Grid>
        );

        if (this.state.ordering) {
            order = (
                <Grid item xs={12}>
                    <div className={classes.Order}>
                        <TextField
                                className={classes.margin}
                                id="email"
                                label="Your Email Address"
                                style={{ width: 150 }}
                                InputProps={{
                                startAdornment: (
                                    <EmailIcon />
                                ),
                                }} 
                            />
                        &emsp;
                        <button onClick={this.handleConfirmClick}>Confirm</button>
                    </div>
                </Grid>
            );
        };

        if (this.state.confirmed) {
            order = (
                <p className={classes.Message}>Your reservation has been confirmed. You can view it in the reservations page.</p>
            );
        };

        return (
        <div>
            <Grid container spacing={0}>
                {flights}
                <Grid item xs={12}>
                    <div>
                        <p className={classes.Header}><b>Total Duration: </b> {handleHour(this.props.details.duration)}</p>
                        <p className={classes.Header}><b>Price: </b> {this.props.details.price}$</p>
                    </div>
                </Grid>
                {order}
            </Grid>
        </div>
        );
    }
}


export default Flight;
