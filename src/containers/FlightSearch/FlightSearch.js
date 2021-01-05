import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import classes from './FlightSearch.module.css';
import Box from '@material-ui/core/Box';
import SearchIcon from '../../assets/images/search-icon.svg';
import {getAutocomplete} from '../../utils';

class FlightSearch extends Component {
    state = {
        departureDate: "2021-02-01",
        source: "London",
        destination: "Amsterdam",
        numberOfTickets: 1,
        suggestions: []
    }

    onDateChange = () => {
        let val = document.getElementById("date").value;
        this.setState({departureDate: val});
    }

    onSrcChange = () => {
        let val = document.getElementById("src").value;
        this.setState({source: val});
    }

    onDstChange = () => {
        let val = document.getElementById("dst").value;
        this.setState({destination: val});
    }

    onTicketsChange = () => {
        let val = document.getElementById("tickets").value;
        this.setState({numberOfTickets: val});
    }

    handleClick = () => {
        getAutocomplete(this.state.source).then(data => console.log(data));
    }

    render() {
        return(
            <div>
                <h3>Welcome to Flight Scanner</h3>
                <Box m={4} />
                <div className={classes.Content}>
                    <TextField
                        id="date"
                        label="Departure Date"
                        type="date"
                        onChange={this.onDateChange}
                        defaultValue="2021-02-01"
                        inputProps={{
                            min: "2021-02-01",
                            max: "2021-02-28"
                          }}
                    />
                    <Box m={2} />
                    <TextField
                        id="src"
                        label="From..."
                        onChange={this.onSrcChange}
                        defaultValue="London"
                    />
                    <Box m={2} />
                    <TextField
                        id="dst"
                        label="To..."
                        onChange={this.onDstChange}
                        defaultValue="Amsterdam"
                    />
                    <Box m={2.4} />
                    <TextField
                        id="tickets"
                        label="Number of Tickets"
                        type="number"
                        onChange={this.onTicketsChange}
                        defaultValue="1"
                    />
                    <Box m={1} />
                </div>
                <Box m={6} />
                <button className={classes.SearchButton} onClick={this.handleClick}>
                    Search&nbsp;&nbsp;&nbsp;    
                    <img src={SearchIcon} className={classes.SearchIcon}/>
                </button>
            </div>
        );
    }
}

export default FlightSearch;