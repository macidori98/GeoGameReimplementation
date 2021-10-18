/**
 * @typedef {object} CurrencyDTO
 * @property {string} code
 * @property {string} name
 * @property {string} symbol
 */

/**
 * @typedef {object} FlagsDTO
 * @property {string} png
 * @property {string} svg
 */

/**
 * @typedef {object} CountryDTO
 * @property {string} name
 * @property {string} alpha2Code
 * @property {string} capital
 * @property {number} area
 * @property {Array<string>} timezones
 * @property {FlagsDTO} flags
 * @property {string} region
 * @property {CurrencyDTO[]} currencies
 * @property {number} population
 * @property {Array<string>} [borders]
 */
