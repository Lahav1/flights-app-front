import React, {Component} from 'react';
import Arrow from '../../assets/images/straight-right-arrow.svg'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import classes from './Flight.module.css';
import Aux from '../../hoc/ReactAux';
import { handleDateTime, handleHour } from '../../utils';

class Flight extends Component {
     
    render() {
        let str = "";
        let f = this.props.details.trip_flights;
        let i = 1;
        let flights = f.map((flight, index) => {
            return (
                <Aux>
                    <Grid item xs={12}>
                        <p className={classes.Header}><b>Flight {i++}: {flight.flight_number}</b></p>
                    </Grid>
                    <Grid item xs={4}>
                        <p className={classes.Text}>{handleDateTime(flight.local_departure_time)}</p>
                    </Grid>
                    <Grid item xs={4}>
                            <img src={Arrow} className={classes.Image} />
                            <p className={classes.Duration}>{handleHour(flight.duration)}</p>

                    </Grid>
                    <Grid item xs={4}>
                        <p className={classes.Text}>{handleDateTime(flight.local_arrival_time)}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p className={classes.Text}>{flight.airline.name}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p className={classes.Text}>{flight.airplane}</p>
                    </Grid>
                </Aux>
        )});
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
                <Grid item xs={12}>
                    <button className={classes.Button}>Order Tickets</button>
                </Grid>
            </Grid>
        </div>
        );
    }
}


export default Flight;
