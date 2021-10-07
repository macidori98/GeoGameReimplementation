/**
 * @typedef {{countries: Array<Country>, selectedCountry: Country, error: CustomError}} CountryStateObj
 */

import {FETCH_COUNTRIES} from '../actions/countries';

/**
 * @type {CountryStateObj}
 */
const initialState = {
  countries: null,
  selectedCountry: null,
  error: {
    message: null,
  },
};

/**
 * @param {CountryStateObj} state
 * @param {import("../actions/countries").FetchCountriesAction} action
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES:
      if (action.response.typeIdentifier === 'country') {
        const countries = [];

        for (const key in action.response) {
          if (Object.hasOwnProperty.call(action.response, key)) {
            const country = action.response[key];
            countries.push({
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

        console.log('ass' + countries);

        return {...state, countries: countries};
      } else {
        return {...state, error: {message: action.response.message.toString()}};
      }
    default:
      return state;
  }
};
