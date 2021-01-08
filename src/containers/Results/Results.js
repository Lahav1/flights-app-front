import React, {Component} from 'react';
import Result from './Result/Result';
import classes from './Results.module.css';
import {handleDate, handleAirportName, extractICAO, getFlights, handleFlightResults} from '../../utils';
import Spinner from '../../components/Spinner/Spinner';
import Modal from '../../components/Modal/Modal';
import Flight from '../Flight/Flight';

class Results extends Component {
    state = {
        results: [],
        rawResults: [],
        date: '',
        source: '',
        destination: '',
        tickets: 1,
        loading: true,
        watchingFlight: false,
        currentFlight: 0
    }

    handleResultClick = (i) => {
        this.setState({currentFlight: i, watchingFlight: true});
    }

    handleResultQuit = () => {
        this.setState({watchingFlight: false});
    }

    componentDidMount() {
        this.setState({date: this.props.location.date, 
                        source: this.props.location.source,
                        destination: this.props.location.destination, 
                        tickets: this.props.location.tickets});
        let d = this.props.location.date.split('-');    
        getFlights(extractICAO(this.props.location.source), extractICAO(this.props.location.destination), d[0], d[1], d[2], this.props.location.tickets)
        .then(data => {
            this.setState({rawResults: data, results: handleFlightResults(data), loading: false});
        });
    }

    render() {
        let results = <Spinner />
        let i = 0;
        if (!this.state.loading) {
            results = this.state.results.map((result, index) => {
                return <Result departure={result.departure} arrival={result.arrival} 
                                airline={result.airline} stops={result.stops}
                                price={result.price} tickets={this.state.tickets} 
                                number={i++} clicked={(n) => this.handleResultClick(n)} key={index} />
            });
        }
        return (
            <div className={classes.Results}>
                <Modal show={this.state.watchingFlight} modalClosed={this.handleResultQuit}>
                    <Flight details={this.state.rawResults[this.state.currentFlight]} tickets={this.state.tickets}/>
                </Modal>
                <h3>Flights from {handleAirportName(this.state.source)} to {handleAirportName(this.state.destination)} at {handleDate(this.state.date)}</h3>
                {results}
            </div>
        );
    }
}

export default Results;