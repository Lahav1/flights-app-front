
export const getAutocomplete = async (str) => {
    
    const base = 'https://localhost:44353/api/Values';
    const query = `?airportName=${str}`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data;
}

