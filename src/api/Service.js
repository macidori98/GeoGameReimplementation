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

    return {success: true, data: resp};
  } catch (error) {
    return {success: false, message: error.toString()};
  }
};

/**
 * @param {string} code
 * @returns {Promise<SuccessResponseType<Country>|ErrorResponseType>}
 */
export const getCountryDetailsByCode = async code => {
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
 * @returns {Promise<SuccessResponseType<Country[]>|ErrorResponseType>}
 */
export const getCountryBorders = async borders => {
  try {
    /**
     * @type {Country[]}
     */
    const bordersDetails = [];

    if (borders === undefined) {
      return {success: true, data: bordersDetails};
    }

    for (const item of borders) {
      const details = await getCountryDetailsByCode(item);

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

/**
 * @param {string} code
 * @returns {Promise<SuccessResponseType<{countryDetails: Country, borders: Country[]}>|ErrorResponseType>}
 */
export const getCountryDetailsWithBorders = async code => {
  try {
    const countryDetailsResult = await getCountryDetailsByCode(code);

    if (countryDetailsResult.success === true) {
      const bordersDetailsResult = await getCountryBorders(
        countryDetailsResult.data.borders,
      );

      if (bordersDetailsResult.success === true) {
        return {
          success: true,
          data: {
            countryDetails: countryDetailsResult.data,
            borders: bordersDetailsResult.data,
          },
        };
      } else {
        return {success: false, message: bordersDetailsResult.message};
      }
    } else {
      return {success: false, message: countryDetailsResult.message};
    }
  } catch (error) {
    return {success: false, message: error.toString()};
  }
};
