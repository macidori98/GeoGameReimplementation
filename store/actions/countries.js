import {getCountriesOfRegion} from '../../api/Service';

export const FETCH_COUNTRIES = 'FETCH_COUNTRIES';

/**
 * @typedef {{type: FETCH_COUNTRIES, response: ((Country[]&Base<'country'>)|(CustomError&Base<'error'>))}} FetchCountriesAction
 */

/**
 * @param {string} region
 * @returns {Promise<void>}
 */
export const fetchCountries = region => {
  return async dispatch => {
    try {
      const response = await getCountriesOfRegion(region);
      dispatch({
        type: FETCH_COUNTRIES,
        response: response,
      });
    } catch (error) {}
  };
};
