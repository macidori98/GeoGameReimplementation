const BASE_URL = 'https://restcountries.com/v2';

/**
 * @param {string} region
 * @returns {Promise<SuccessResponseType<Country[]>|ErrorResponseType>}
 */
export const getCountriesOfRegion = async region => {
  try {
    const countries = await fetch(`${BASE_URL}/continent/${region}`);
    const resp = await countries.json();

    if (resp.status !== undefined) {
      return {success: false, message: resp.message};
    }

    /**
     * @type {Country[]}
     */
    const countriesArray = [];

    for (const key in resp) {
      if (Object.hasOwnProperty.call(resp, key)) {
        const country = resp[key];
        countriesArray.push({
          name: country.name,
          alpha2Code: country.alpha2Code,
          capital: country.capital,
          area: country.area,
          timezones: country.timezones,
          flags: country.flags,
          currencies: country.currencies,
          population: country.population,
        });
      }
    }

    return {success: true, data: countriesArray};
  } catch (error) {
    return {success: false, message: error.toString()};
  }
};
