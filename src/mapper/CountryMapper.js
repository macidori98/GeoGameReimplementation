import {
  fetchCountriesOfRegion,
  fetchCountryBorders,
  fetchCountryDetailsByCode,
} from '~/api/Service';

/**
 * @param {string} region
 * @returns {Promise<SuccessResponseType<Country[]>|ErrorResponseType>}
 */
export const getCountriesOfRegion = async region => {
  const result = await fetchCountriesOfRegion(region);

  if (result.success === true) {
    return {success: true, data: result.data.map(item => countryMapper(item))};
  } else {
    return {success: false, message: result.message};
  }
};

/**
 * @param {string} code
 * @returns {Promise<SuccessResponseType<{countryDetails: Country, borders: Country[]}>|ErrorResponseType>}
 */
export const getCountryDetailsWithBorders = async code => {
  try {
    const countryDetailsResult = await fetchCountryDetailsByCode(code);

    if (countryDetailsResult.success === true) {
      const bordersDetailsResult = await fetchCountryBorders(
        countryDetailsResult.data.borders,
      );

      if (bordersDetailsResult.success === true) {
        return {
          success: true,
          data: {
            countryDetails: countryMapper(countryDetailsResult.data),
            borders: bordersDetailsResult.data.map(item => {
              const data = countryMapper(item);
              return data;
            }),
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

/**
 * @param {CountryDTO} country
 * @returns {Country}
 */
const countryMapper = country => {
  const data = {
    name: country.name,
    code: country.alpha2Code,
    capital: country.capital,
    area: country.area,
    timezones: country.timezones,
    flag: country.flags.png,
    currencies: country.currencies.map(item => item.code),
    population: country.population,
    borders: country.borders ? country.borders : undefined,
  };
  return data;
};
