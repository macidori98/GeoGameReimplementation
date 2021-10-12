const BASE_URL = 'https://restcountries.com/v2';

/**
 * @param {string} region
 * @returns {Promise<SuccessResponseType<CountryDTO[]>|ErrorResponseType>}
 */
export const fetchCountriesOfRegion = async region => {
  try {
    const countries = await fetch(`${BASE_URL}/continent/${region}`);
    const resp = await countries.json();

    if (resp.status !== undefined) {
      return {success: false, message: resp.message};
    }

    return {success: true, data: resp};
  } catch (error) {
    return {success: false, message: error.toString()};
  }
};

/**
 * @param {string} code
 * @returns {Promise<SuccessResponseType<CountryDTO>|ErrorResponseType>}
 */
export const fetchCountryDetailsByCode = async code => {
  try {
    const details = await fetch(`${BASE_URL}/alpha/${code}`);
    const resp = await details.json();

    if (resp.status !== undefined) {
      return {success: false, message: resp.message};
    }

    return {success: true, data: resp};
  } catch (error) {
    return {success: false, message: error.toString()};
  }
};

/**
 * @param {Array<string>} borders
 * @returns {Promise<SuccessResponseType<CountryDTO[]>|ErrorResponseType>}
 */
export const fetchCountryBorders = async borders => {
  try {
    /**
     * @type {CountryDTO[]}
     */
    const bordersDetails = [];

    if (borders === undefined) {
      return {success: true, data: bordersDetails};
    }

    for (const item of borders) {
      const details = await fetchCountryDetailsByCode(item);

      if (details.success === true) {
        bordersDetails.push(details.data);
      } else {
        return {success: false, message: details.message};
      }
    }

    return {success: true, data: bordersDetails};
  } catch (error) {
    return {success: false, message: error.toString()};
  }
};
