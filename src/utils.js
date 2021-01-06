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
    console.log(base + query);
    const response = await fetch(base + query);
    const data = await response.json();
    return data;
}
