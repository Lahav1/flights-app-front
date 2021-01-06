import React, {Component} from 'react';
import Result from './Result/Result';
import classes from './Results.module.css';
import {handleDate, handleAirportName} from '../../utils';

class Results extends Component {
    state = {
        results: [],
        date: '',
        source: '',
        destination: '',
        tickets: 1
    }

    componentDidMount() {
        this.setState({date: this.props.location.date, 
                        source: this.props.location.source,
                        destination: this.props.location.destination, 
                        tickets: this.props.location.tickets});
        let r1 = {departure: "01/02/2020 10:00", arrival: "01/02/2020 15:00", airline: "El Al", stops:"0", price:"120"}
        let r2 = {departure: "01/02/2020 17:00", arrival: "01/02/2020 22:00", airline: "El Al", stops:"0", price:"110"}
        let r3 = {departure: "01/02/2020 06:00", arrival: "01/02/2020 11:00", airline: "Wizz", stops:"0", price:"90"}
        this.setState({results: [r1, r2, r3]})
    }

    render() {
        let results = this.state.results.map((result, index) => {
            return <Result departure={result.departure} arrival={result.arrival} 
                            airline={result.airline} stops={result.stops}
                            price={result.price} tickets={this.state.tickets} key={index} />
        });
        return (
            <div className={classes.Results}>
                <h3>Flights from {handleAirportName(this.state.source)} to {handleAirportName(this.state.destination)} at {handleDate(this.state.date)}</h3>
                {results}
            </div>
        );
    }
}

export default Results;