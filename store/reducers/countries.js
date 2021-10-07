import {FETCH_COUNTRIES, RESET_STATE} from '../actions/countries';

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
 * @param {FetchCountriesAction|ResetStateAction} action
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

        return {...state, countries: countries};
      } else {
        return {...state, error: {message: action.response.message}};
      }
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
};
