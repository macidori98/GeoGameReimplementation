const COUNTRY_BASE_URL = 'https://restcountries.com/v2';
const API_KEY = 'e176dcf7d2cd08934e3cdc35c4078b8c';
const EXCHANGE_BASE_URL = `http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}&format=1&symbols=`;

/**
 * @param {string} region
 * @returns {Promise<SuccessResponseType<CountryDTO[]>|ErrorResponseType>}
 */
export const fetchCountriesOfRegion = async region => {
  try {
    const countries = await fetch(`${COUNTRY_BASE_URL}/continent/${region}`);
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
    const details = await fetch(`${COUNTRY_BASE_URL}/alpha/${code}`);
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

/**
 * @returns {Promise<SuccessResponseType<CountryDTO[]>|ErrorResponseType>}
 */
export const fetchAllRegionsCountries = async () => {
  try {
    const resp = await fetch(`${COUNTRY_BASE_URL}/all`);
    const countries = await resp.json();

    return {success: true, data: countries};
  } catch (error) {
    return {success: false, message: error.toString()};
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
  try {
    const URL = `${EXCHANGE_BASE_URL}${countryCurrency}`;
    const respCountryCurrency = await fetch(`${URL}`);
    const countryCurrenciesValues = await respCountryCurrency.json();

    if (countryCurrenciesValues.status !== undefined) {
      return {success: false, message: countryCurrenciesValues.message};
    }

    const URL2 = `${EXCHANGE_BASE_URL}${localCurrency}`;
    const respLocalCurrency = await fetch(`${URL2}`);
    const localCurrenciesValues = await respLocalCurrency.json();

    if (localCurrenciesValues.status !== undefined) {
      return {success: false, message: localCurrenciesValues.message};
    }

    //country
    const valueCountry = countryCurrenciesValues.rates[countryCurrency];
    const harmasSzabalyResultCountry = 1 / valueCountry;

    //local
    const valueLocal = localCurrenciesValues.rates[localCurrency];
    const harmasSzabalyResultLocal = valueLocal * harmasSzabalyResultCountry;

    return {
      success: true,
      data: parseFloat(harmasSzabalyResultLocal.toFixed(4)),
    };
  } catch (error) {
    return {success: false, message: error.toString()};
  }
};
