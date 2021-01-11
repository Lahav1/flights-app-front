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
        let duration = result.duration;
        r.push({departure: departure, arrival: arrival, airline: airline, stops: stops, price: price, duration: duration})
    }
    return r;
}

export const handleReservationDetails = (results) => {
    let r = [];
    var result;
    for (result of results) {
        let reservationID = result.reservation_id;
        let departure = handleDateTime(result.flights[0].local_departure_time).split(' ')[0];
        let source = result.flights[0].source_airport.city;
        let destination = result.flights[result.flights.length - 1].destination_airport.city;
        let tickets = result.number_of_passangers;
        r.push({id: reservationID, departure: departure, source: source, destination: destination, tickets: tickets})
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
    let response = await fetch(base, {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(j)
    });
    return response;
}

export const postCancelReservation = async (id) => {
    let j = {reservation_id: id};
    const base = 'https://localhost:44353/api/Values/cancel_reservation';
    await fetch(base, {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(j)
    });
}

export const getUserReservations = async (email) => {
    let j = {user_id: email};
    const base = 'https://localhost:44353/api/Values/user_reservations';
    let response = await fetch(base, {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(j)
    });
    if (response.status === 400) {
        return [];
    }
    let data = await response.json();
    return data;
}

export const postSignUp = async (email, name, date, passport) => {
    let j = {email: email, full_name: name, DOB: date, passport_id: passport};
    const base = 'https://localhost:44353/api/Values/sign_up';
    let response = await fetch(base, {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(j)
    });
    return response;
}

export const isAdmin = async (email, password) => {
    let j = {email: email, password: password};
    const base = 'https://localhost:44353/api/Values/is_admin';
    let response = await fetch(base, {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(j)
    });
    let data = await response.json();
    return data;
}

export const addAirplane = async (name, iata, icao, speed, seats) => {
    let j = {name: name, IATA: iata, ICAO: icao, cruise_speed: speed, num_of_seats: seats};
    const base = 'https://localhost:44353/api/Values/add_airplane';
    let response = await fetch(base, {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(j)
    });
    return response;
}

export const removeAirplane = async (iata) => {
    let j = {IATA: iata};
    const base = 'https://localhost:44353/api/Values/remove_airplane';
    let response = await fetch(base, {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(j)
    });
    return response;
}

export const addAirline = async (name, iata, icao, active, rating) => {
    let j = {name: name, IATA: iata, ICAO: icao, is_active: active, rating: rating};
    const base = 'https://localhost:44353/api/Values/add_airline';
    let response = await fetch(base, {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(j)
    });
    return response;
}

export const removeAirline = async (id) => {
    let j = {id: id};
    const base = 'https://localhost:44353/api/Values/remove_airline';
    let response = await fetch(base, {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(j)
    });
    return response;
}

export const addRoute = async (source, destination, airline, equipment) => {
    let j = {source_airport: source, destination_airport: destination, airline_id: airline, equipment: equipment};
    const base = 'https://localhost:44353/api/Values/add_route';
    let response = await fetch(base, {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(j)
    });
    return response;
}

export const removeRoute = async (id) => {
    let j = {route_id: id};
    const base = 'https://localhost:44353/api/Values/remove_route';
    let response = await fetch(base, {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(j)
    });
    return response;
}

export const addFlight = async (route, departure, arrival, price, airplane) => {
    let j = {route_id: route, departure_time_GMT: departure, arrival_time_GMT: arrival, ticket_price: price, airplane_IATA: airplane};
    const base = 'https://localhost:44353/api/Values/add_flight';
    let response = await fetch(base, {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(j)
    });
    return response;
}

export const removeFlight = async (id) => {
    let j = {flight_id: id};
    const base = 'https://localhost:44353/api/Values/cancel_flight';
    let response = await fetch(base, {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(j)
    });
    return response;
}

export const addAirport = async (name, city, country, iata, icao, lat, lon, timezone) => {
    let j = {name: name, city: city, country: country, IATA: iata, ICAO: icao, lat: lat, lon: lon, timezone: timezone};
    const base = 'https://localhost:44353/api/Values/add_airport';
    let response = await fetch(base, {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(j)
    });
    return response;
}

export const removeAirport = async (id) => {
    let j = {airport_id: id};
    const base = 'https://localhost:44353/api/Values/remove_airport';
    let response = await fetch(base, {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(j)
    });
    return response;
}