import React, {Component} from 'react';
import classes from './Result.module.css';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Aux from '../../../hoc/ReactAux';
import DepartureLogo from '../../../assets/images/departures.svg'
import ArrivalLogo from '../../../assets/images/arrivals.svg'
import Arrow from '../../../assets/images/straight-right-arrow.svg'

class Result extends Component {
    handleClick = () => {
        this.props.clicked(this.props.number);
    }

    render() {    
        return (
            <Aux>
                <div className={classes.Result} onClick={this.handleClick}> 
                    <Grid container spacing={0}>
                        <Grid item xs={1} />
                        <Grid item xs={4}>
                            <div>
                                <img src={DepartureLogo} />
                                <p>{this.props.departure}</p>
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <img className={classes.Image} src={Arrow}/>
                        </Grid>
                        <Grid item xs={4}>
                            <div>
                                <img src={ArrivalLogo} />
                                <p>{this.props.arrival}</p>
                            </div>
                        </Grid>
                        <Grid item xs={1} />
                        <Grid item xs={4}>
                            <p><b>Airline:</b> {this.props.airline}</p>
                        </Grid>
                        <Grid item xs={4}>
                            <p><b>Stops:</b> {this.props.stops}</p>
                        </Grid>
                        <Grid item xs={4}>
                            <p><b>Price:</b> {this.props.price * this.props.tickets}$</p>
                        </Grid>
                    </Grid>
                </div>
                <Box m={2}/>
            </Aux>
        ); 
    }
}

export default Result;