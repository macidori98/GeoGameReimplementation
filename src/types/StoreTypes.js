/**
 * @typedef {{type: import('../store/actions/countries').FETCH_COUNTRIES, response: ((Country[]&Base<'country'>)|(CustomError&Base<'error'>))}} FetchCountriesAction
 */

/**
 * @typedef {{type: import('../store/actions/countries').RESET_STATE}} ResetStateAction
 */

/**
 * @typedef {{countries: Array<Country>, selectedCountry: Country, error: CustomError}} CountryStateObj
 */
