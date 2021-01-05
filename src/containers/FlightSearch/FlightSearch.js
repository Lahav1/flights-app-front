import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import classes from './FlightSearch.module.css';
import Box from '@material-ui/core/Box';
import SearchIcon from '../../assets/images/search-icon.svg';

class FlightSearch extends Component {
    state = {
        departureDate: "2021-02-01",
        source: null,
        destination: null,
        numberOfTickets: 0
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
        console.log(this.state)
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
                    />
                    <Box m={2} />
                    <TextField
                        id="src"
                        label="From..."
                        onChange={this.onSrcChange}
                        defaultValue="Tel Aviv"
                    />
                    <Box m={2} />
                    <TextField
                        id="dst"
                        label="To..."
                        onChange={this.onDstChange}
                        defaultValue="Amsterdam"
                    />
                    <Box m={2} />
                    <TextField
                        id="tickets"
                        label="Number of Tickets"
                        type="number"
                        onChange={this.onTicketsChange}
                        defaultValue="0"
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