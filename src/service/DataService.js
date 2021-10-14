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
 * @param {string} localCurrency
 * @returns {Promise<SuccessResponseType<CountryDetailsType>|ErrorResponseType>}
 */
export const getCountryDetailsWithBordersAndCurrency = async (
  code,
  localCurrency,
) => {
  const countryDetailsResult = await fetchCountryDetailsByCode(code);

  if (countryDetailsResult.success === true) {
    const bordersDetailsResult = await fetchCountryBorders(
      countryDetailsResult.data.borders,
    );

    const rateResult = await getCurrenciesComparedToLocalCurrencies(
      countryDetailsResult.data.currencies[0].code,
      localCurrency,
    );

    if (bordersDetailsResult.success === true) {
      if (rateResult.success === true) {
        return {
          success: true,
          data: {
            countryDetails: countryMapper(countryDetailsResult.data),
            borders: bordersDetailsResult.data.map(item => {
              const data = neighbourMapper(item);

              return data;
            }),
            exchangeRate: rateResult.data,
          },
        };
      } else {
        return {success: false, message: rateResult.message};
      }
    } else {
      return {success: false, message: bordersDetailsResult.message};
    }
  } else {
    return {success: false, message: countryDetailsResult.message};
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
 * @param {string} countryCurrency
 * @param {string} localCurrency
 * @returns {Promise<SuccessResponseType<number>|ErrorResponseType>}
 */
export const getCurrenciesComparedToLocalCurrencies = async (
  countryCurrency,
  localCurrency,
) => {
  /**
   * @type {number}
   */
  var resultCountry;

  /**
   * @type {number}
   */
  var resultLocal;

  //country
  const valueCountry = await fetchCurrencyData(countryCurrency);
  if (valueCountry.success === true) {
    resultCountry = 1 / exchangeMapper(valueCountry.data, countryCurrency);
  } else {
    return valueCountry;
  }

  //local
  const valueLocal = await fetchCurrencyData(localCurrency);
  if (valueLocal.success === true) {
    resultLocal =
      exchangeMapper(valueLocal.data, localCurrency) * resultCountry;
  } else {
    return valueLocal;
  }

  return {
    success: true,
    data: parseFloat(resultLocal.toFixed(4)),
  };
};
