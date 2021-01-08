export const handleDate = (date) => {
    let d = date.split('-');
    let str = d[2]+ '/' + d[1] + '/' + d[0];
    return str;
}

export const handleDateTime = (dateTime) => {
    let d = dateTime.split(' ');
    let h = d[1].split(':');
    let newDate = d[0] + " " + h[0] + ":" + h[1];
    return newDate;
}

export const handleHour = (hour) => {
    let s;
    let day = '';
    let d = '';
    if (hour.includes(".")) {
        s = hour.split(".");
        d = 'd ';
        day = parseInt(s[0], 10);
        hour = s[1];
    }
    s = hour.split(':');
    let t = day + d + parseInt(s[0], 10) + "h " + parseInt(s[1], 10) + "m"
    return t;
}

export const handleAirportName = (airport) => {
    let ap = airport.split(",");
    let r = ap[0];
    r = r.replace(" Airport ", " ");
    r = r.replace(" Airport", "");
    r = r.replace("Airport ", "");
    return r;
}

export const extractICAO = (str) => {
    let s = str.split(", ");
    return s[s.length - 1];
}

export const handleSuggestions = (suggestions) => {
    let s = [];
    var suggestion;
    for (suggestion of suggestions) {
        s.push(suggestion.name + ", " + suggestion.ICAO)
    }
    return s;
}

export const handleFlightResults = (results) => {
    let r = [];
    var result;
    for (result of results) {
        let departure = handleDateTime(result.trip_flights[0].local_departure_time);
        let arrival = handleDateTime(result.trip_flights[result.trip_flights.length - 1].local_arrival_time);
        let airline = result.trip_flights[0].airline.name;
        let price = result.price;
        let stops = result.trip_flights.length - 1;
        r.push({departure: departure, arrival: arrival, airline: airline, stops: stops, price: price})
    }
    return r;
}

export const getAutocomplete = async (str) => {
    const base = 'https://localhost:44353/api/Values';
    const query = `?airportName=${str}`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data;
}

export const getFlights = async (src, dest, y, m, d, tickets) => {
    const base = 'https://localhost:44353/api/Values';
    const query = `?src=${src}&dest=${dest}&y=${y}&m=${m}&d=${d}&tickets=${tickets}`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data;
}

export const postReservation = async (flights, email, numberOfTickets) => {
    let j = {flights: flights, email: email, number_of_tickets: numberOfTickets};
    const base = 'https://localhost:44353/api/Values/make_reservation';
    const response = await fetch(base, {
        method: 'POST', 
        // mode: 'no-cors', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(j)
    });
    const data = await response;
}
