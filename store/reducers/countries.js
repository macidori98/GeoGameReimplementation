/**
 * @typedef {{countries: Country[], selectedCountry: Country, error: CustomError}} CountryStateObj
 */

import {FETCH_COUNTRIES} from '../actions/countries';

/**
 * @type {CountryStateObj}
 */
const initialState = {
  countries: [],
  selectedCountry: null,
  error: null,
};

/**
 * @param {CountryStateObj} state
 * @param {import("../actions/countries").FetchCountriesAction} action
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES:
      if (action.response.typeIdentifier === 'country') {
        return {...state, countries: action.response};
      } else {
        return {...state, error: action.response.message};
      }
    default:
      return state;
  }
};
