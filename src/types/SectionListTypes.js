/**
 * @typedef {object} Flag
 * @property {string} png
 */

/**
 * @typedef {object} SimpleString
 * @property {string} text
 */

/**
 * @typedef {object} Timezones
 * @property {Array<string>} timezones
 */

/**
 * @typedef {object} Border
 * @property {Neighbour[]} borders
 */

/**
 * @typedef {object} exchangeRates
 * @property {Exchange[]} exchanges
 */

/**
 * @typedef {Base<'flag'> & Flag} BaseFlagCombined
 */

/**
 * @typedef {Base<'text'> & SimpleString} BaseSimpleStringCombined
 */

/**
 * @typedef {Base<'timezones'> & Timezones} BaseTimezonesCombined
 */

/**
 * @typedef {Base<'neighbour'> & Border} BaseNeighbourCombined
 */

/**
 * @typedef {Base<'exchange'> & exchangeRates} BaseExchangeCombined
 */

/**
 * @typedef {Array<{title: string, data: (BaseFlagCombined|BaseSimpleStringCombined|BaseTimezonesCombined|BaseNeighbourCombined|BaseExchangeCombined)[]}>} SectionListDataType
 */
