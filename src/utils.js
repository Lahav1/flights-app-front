export const handleDate = (date) => {
    let d = date.split('-');
    let str = d[2]+ '/' + d[1] + '/' + d[0];
    return str;
}

export const handleAirportName = (airport) => {
    let ap = airport.split(",");
    let r = ap[0];
    r = r.replace(" Airport ", " ");
    r = r.replace(" Airport", "");
    r = r.replace("Airport ", "");
    return r;
}

export const handleSuggestions = (suggestions) => {
    let s = [];
    var suggestion;
    for (suggestion of suggestions) {
        console.log(suggestion);
        s.push(suggestion.name + ", " + suggestion.ICAO)
    }
    return s;
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
