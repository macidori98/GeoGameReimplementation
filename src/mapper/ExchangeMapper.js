import {fetchCurrencyData} from '~/api/Service';

/**
 * @param {string} countryCurrency
 * @param {string} localCurrency
 * @returns {Promise<SuccessResponseType<number>|ErrorResponseType>}
 */
export const getCurrenciesComparedToLocalCurrencies = async (
  countryCurrency,
  localCurrency,
) => {
  var harmasSzabalyResultCountry;
  var harmasSzabalyResultLocal;

  //country
  const valueCountry = await fetchCurrencyData(countryCurrency);
  if (valueCountry.success === true) {
    harmasSzabalyResultCountry = 1 / valueCountry.data;
  } else {
    return valueCountry;
  }

  //local
  const valueLocal = await fetchCurrencyData(localCurrency);
  if (valueLocal.success === true) {
    harmasSzabalyResultLocal = valueLocal.data * harmasSzabalyResultCountry;
  } else {
    return valueLocal;
  }

  return {
    success: true,
    data: parseFloat(harmasSzabalyResultLocal.toFixed(4)),
  };
};
