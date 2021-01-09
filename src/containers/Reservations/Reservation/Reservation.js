import React, {Component} from 'react';
import classes from './Reservation.module.css';
import Aux from '../../../hoc/ReactAux';
import Box from '@material-ui/core/Box';

class Reservation extends Component {
    handleClick = () => {
        this.props.clicked(this.props.number);
    }

    render() {
        return(
            <Aux>
                <div className={classes.Reservation} onClick={this.handleClick}> 
                    <p><b>Reservation #{this.props.id}</b></p>
                    <p>{this.props.departure}, From {this.props.source} to {this.props.destination}, {this.props.tickets} Passengers</p>
                </div>
                <Box m={1} />
            </Aux>
            
        );
    }
}

export default Reservation;