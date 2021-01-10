import React, {Component} from 'react';
import Arrow from '../../../assets/images/straight-right-arrow.svg'
import Grid from '@material-ui/core/Grid';
import Aux from '../../../hoc/ReactAux';
import { handleDateTime, handleHour, postCancelReservation} from '../../../utils';
import classes from './ReservationInfo.module.css';

class ReservationInfo extends Component {
    state = {
        canceled: false
    }

    handleCancelClick = () => {
        postCancelReservation(this.props.details.reservation_id)
            .then(data => this.setState({canceled: true}));
    }

    render() {
        let f = this.props.details.flights;
        let i = 1;
        let flights = f.map((flight, index) => {
            let connectionTime = "";
            if (flight.connection_duration !== undefined) {
                connectionTime = <Grid item xs={12}>
                                    <p className={classes.Connection}>Connection Time: {handleHour(flight.connection_duration)}</p>
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
                            <p className={classes.Duration}>{handleHour(flight.flight_duration)}</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p className={classes.Text}>{handleDateTime(flight.local_arrival_time)}</p>
                        <p className={classes.Airport}>{flight.destination_airport.city}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.Airline}>
                            <img  alt={flight.airline} src={"//www.gstatic.com/flights/airline_logos/70px/" + flight.flight_number.substr(0, 2) + ".png"}></img>
                            &nbsp;
                            <p className={classes.Text}>{flight.airline}</p>
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

        let cancel = (
            <Grid item xs={12}>
                <button className={classes.Button} onClick={this.handleCancelClick}>Cancel Reservation</button>
            </Grid>
        );

        if (this.state.canceled) {
            cancel = (
                <div className={classes.Message}>
                     <p>Your reservation has been canceled.</p>
                </div>
            ); 
        }

        return(
            <div>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <h2>Reservation #{this.props.details.reservation_id}</h2>
                    </Grid>
                    {flights}
                    <Grid item xs={12}>
                        <div>
                            <p className={classes.Header}><b>Total Duration: </b> {this.props.details.total_flight_duration}</p>
                            <p className={classes.Header}><b>Passengers: </b> {this.props.details.number_of_passangers}</p>
                            <p className={classes.Header}><b>Price: </b> {this.props.details.price}$</p>
                        </div>
                    </Grid>
                    &nbsp;
                    {cancel}
                </Grid>
            </div>
            
        );
    }
}

export default ReservationInfo;