import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import classes from './FlightSearch.module.css';
import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '../../assets/images/search-icon.svg';
import {getAutocomplete, handleSuggestions} from '../../utils';

class FlightSearch extends Component {
    state = {
        departureDate: "2021-02-01",
        source: "",
        destination: "",
        numberOfTickets: 1,
        srcSuggestions: [],
        dstSuggestions: []
    }

    onDateChange = () => {
        let val = document.getElementById("date").value;
        this.setState({departureDate: val});
    }

    onSrcChange = (val) => {
        this.setState({source: val});
        getAutocomplete(val).then((data => this.setState({srcSuggestions: handleSuggestions(data)})))
            .catch(error => {
                this.setState({suggestions: []})
            });
    }

    onDstChange = (val) => {
        this.setState({destination: val});
        getAutocomplete(val).then((data => this.setState({dstSuggestions: handleSuggestions(data)})))
            .catch(error => {
                this.setState({suggestions: []})
            });
    }

    onTicketsChange = () => {
        let val = document.getElementById("tickets").value;
        this.setState({numberOfTickets: val});
    }

    handleClick = () => {
        // this.setState({source: document.getElementById("srcAC").value});
        // this.setState({destination: document.getElementById("dstAC").value});
        console.log(this.state.departureDate)
        console.log(this.state.source)
        console.log(this.state.destination)
        console.log(this.state.numberOfTickets)

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
                    <Autocomplete
                        id="srcAC"
                        style={{ width: 200 }}
                        options={this.state.srcSuggestions}
                        onChange={(event, value) => this.onSrcChange(value)}
                        onInputChange={(event, value) => this.onSrcChange(value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="From..."
                            />                                     
                        )} 
                    />       
                    <Box m={2} />
                    <Autocomplete
                        id="dstAC"
                        style={{ width: 200 }}
                        options={this.state.dstSuggestions}
                        onChange={(event, value) => this.onDstChange(value)}
                        onInputChange={(event, value) => this.onDstChange(value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                id="dst"
                                label="To..." />
                        )} 
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