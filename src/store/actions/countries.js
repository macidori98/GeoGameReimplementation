import {getCountriesOfRegion} from '../../api/Service';

export const FETCH_COUNTRIES = 'FETCH_COUNTRIES';
export const RESET_STATE = 'RESET_STATE';

/**
 * @param {string} region
 * @returns {() => Promise<void>}
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

/**
 * @returns {ResetStateAction}
 */
export const deleteError = () => {
  return {type: RESET_STATE};
};
