import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import classes from './FlightSearch.module.css';
import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '../../assets/images/search-icon.svg';
import {getAutocomplete, handleSuggestions} from '../../utils';
import { withRouter } from 'react-router-dom';

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
        this.props.history.push({
            pathname: '/results',
            date: this.state.departureDate,
            source: this.state.source,
            destination: this.state.destination, 
            tickets: this.state.numberOfTickets
        });
    }

    handleSignUp = () => {
        this.props.history.push('/signup');
    }

    handleAdmin = () => {
        this.props.history.push('/admin_control');
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
                        style={{width: 150}}
                        onChange={this.onTicketsChange}
                        defaultValue="1"
                        InputProps={{ inputProps: { min: 1, max: 1000 } }}
                    />
                    <Box m={1} />
                </div>
                <Box m={5} />
                <button className={classes.SearchButton} onClick={this.handleClick}>
                    Search&nbsp;&nbsp;&nbsp;    
                    <img alt="search" src={SearchIcon} className={classes.SearchIcon}/>
                </button>
                <Box m={5} />
                <button className={classes.BottomButtons} onClick={this.handleSignUp}>Sign Up</button>
                <br /><br />
                <button className={classes.BottomButtons} onClick={this.handleAdmin}>Admin Control Panel</button>
            </div>
        );
    }
}

export default withRouter(FlightSearch);