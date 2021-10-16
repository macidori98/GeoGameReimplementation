import {
  fetchAllRegionsCountries,
  fetchCountriesOfRegion,
  fetchCountryBorders,
  fetchCountryDetailsByCode,
  fetchCurrencyData,
} from '~/api/Service';
import {countryMapper, neighbourMapper} from '~/mapper/CountryMapper';
import {exchangeMapper} from '~/mapper/ExchangeMapper';

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
 * @param {Array<string>} localCurrencies
 * @returns {Promise<SuccessResponseType<CountryDetailsType>|ErrorResponseType>}
 */
export const getCountryDetailsWithBordersAndCurrency = async (
  code,
  localCurrencies,
) => {
  try {
    const countryDetails = await getCountryDetailsByCode(code);
    const resp = await Promise.all([
      getCountryBorders(countryDetails.borders),
      getRates(countryDetails.currencies, localCurrencies),
    ]);

    return {
      success: true,
      data: {
        countryDetails: countryDetails,
        borders: resp[0],
        exchangeRates: resp[1],
      },
    };
  } catch (error) {
    return {success: false, message: error.toString()};
  }
};

/**
 * @param {string} regionId
 * @returns {Promise<SuccessResponseType<Country[]>|ErrorResponseType>}
 */
export const getRegionCountries = async regionId => {
  const regionsCountriesResult = await fetchAllRegionsCountries();

  if (regionsCountriesResult.success === true) {
    const selectedRegionCountries = regionsCountriesResult.data.filter(
      item => item.region.toLowerCase() === regionId,
    );

    const mappedRegionCountries = selectedRegionCountries.map(item =>
      countryMapper(item),
    );

    return {success: true, data: mappedRegionCountries};
  } else {
    return {success: false, message: regionsCountriesResult.message};
  }
};

/**
 * @param {Array<string>} countryCurrencies
 * @param {Array<string>} localCurrencies
 * @returns {Promise<SuccessResponseType<Exchange[]>|ErrorResponseType>}
 */
export const getCurrenciesComparedToLocalCurrencies = async (
  countryCurrencies,
  localCurrencies,
) => {
  /**
   * @type {Exchange[]}
   */
  const result = [];

  for (const countryCurrency of countryCurrencies) {
    for (const localCurrency of localCurrencies) {
      /**
       * @type {number}
       */
      var resultCountry;

      /**
       * @type {number}
       */
      var resultLocal;

      //country
      const valueCountryResult = await fetchCurrencyData(countryCurrency);
      if (valueCountryResult.success === true) {
        resultCountry =
          1 / exchangeMapper(valueCountryResult.data, countryCurrency);
      } else {
        return valueCountryResult;
      }

      //local
      const valueLocalResult = await fetchCurrencyData(localCurrency);
      if (valueLocalResult.success === true) {
        resultLocal =
          exchangeMapper(valueLocalResult.data, localCurrency) * resultCountry;
      } else {
        return valueLocalResult;
      }

      result.push({
        from: countryCurrency,
        to: localCurrency,
        value: parseFloat(resultLocal.toFixed(4)),
      });
    }
  }

  return {success: true, data: result};
};

/**
 * @param {string} code
 * @returns {Promise<Country>}
 */
const getCountryDetailsByCode = async code => {
  const countryDetailsResult = await fetchCountryDetailsByCode(code);

  if (countryDetailsResult.success === true) {
    return countryMapper(countryDetailsResult.data);
  } else {
    throw new Error(countryDetailsResult.message);
  }
};

/**
 * @param {string[]} borders
 * @returns {Promise<Neighbour[]>}
 */
const getCountryBorders = async borders => {
  const bordersDetailsResult = await fetchCountryBorders(borders);

  if (bordersDetailsResult.success === true) {
    return bordersDetailsResult.data.map(item => {
      return neighbourMapper(item);
    });
  } else {
    throw new Error(bordersDetailsResult.message);
  }
};

/**
 * @param {Array<string>} countryCurrencies
 * @param {Array<string>} localCurrencies
 * @returns {Promise<Exchange[]>}
 */
const getRates = async (countryCurrencies, localCurrencies) => {
  const ratesResult = await getCurrenciesComparedToLocalCurrencies(
    countryCurrencies,
    localCurrencies,
  );

  if (ratesResult.success === true) {
    return ratesResult.data;
  } else {
    throw new Error(ratesResult.message);
  }
};
