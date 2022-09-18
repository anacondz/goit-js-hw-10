const URL = 'https://restcountries.com/v3.1/name/';
const filters = '?fields=name,capital,flags,population,languages';

export const fetchCountries = country => {
  return fetch(`${URL}${country}${filters}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
