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
  const countryDetailsResult = await fetchCountryDetailsByCode(code);

  if (countryDetailsResult.success === true) {
    const bordersDetailsResult = await fetchCountryBorders(
      countryDetailsResult.data.borders,
    );

    const rateResult = await getCurrenciesComparedToLocalCurrencies(
      countryDetailsResult.data.currencies.map(item => item.code),
      localCurrencies,
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
            exchangeRates: rateResult.data,
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

  console.log(result);

  return {success: true, data: result};
};
