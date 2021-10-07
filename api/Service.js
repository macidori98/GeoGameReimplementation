const BASE_URL = 'https://restcountries.com/v2';

/**
 * @param {string} region
 * @returns {Promise<(Country[]&Base<'country'>)|(CustomError&Base<'error'>)>}
 */
export const getCountriesOfRegion = async region => {
  try {
    const countries = await fetch(`${BASE_URL}/continent/${region}`);
    const resp = await countries.json();

    if (resp.status !== undefined) {
      return {message: resp.message, typeIdentifier: 'error'};
    }

    return {...resp, typeIdentifier: 'country'};
  } catch (error) {
    return {message: error.toString(), typeIdentifier: 'error'};
  }
};
