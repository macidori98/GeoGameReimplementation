const BASE_URL = 'https://restcountries.com/v2';

/**
 * @param {string} region
 */
export const getCountriesOfRegion = async region => {
  const countries = await fetch(`${BASE_URL}/continent/${region}`);
  const resp = await countries.json();
  console.log(resp);
};
