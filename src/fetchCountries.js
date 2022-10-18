const BASE_URL = `https://restcountries.com/v3.1`;

export function fetchCountries(countryInput) {
    return fetch (`${BASE_URL}/name/${countryInput}?fields=name,capital,population,flags,languages`)
.then(data => { if (!data.ok || data.status === 404 ){throw new Error('Oops, there is no country with that name')} 
    
 return data.json()
})
}
 