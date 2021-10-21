import {DetailLabel} from '~/constants/ConstantValues';

/**
 * @param {CountryDetailsType} details
 * @returns {SectionListDataType}
 */
export const convertDataForSectionList = details => {
  /**
   * @type {BaseFlagCombined}
   */
  const flagData = {typeIdentifier: 'flag', png: details.countryDetails.flag};

  /**
   * @type {BaseSimpleStringCombined}
   */
  const capitalData = {
    typeIdentifier: 'text',
    text: details.countryDetails.capital,
  };

  /**
   * @type {BaseSimpleStringCombined}
   */
  const areaData = {
    typeIdentifier: 'text',
    text: details.countryDetails.area.toString(),
  };

  /**
   * @type {BaseSimpleStringCombined}
   */
  const populationData = {
    typeIdentifier: 'text',
    text: details.countryDetails.population.toString(),
  };

  /**
   * @type {BaseTimezonesCombined}
   */
  const timezonesData = {
    typeIdentifier: 'timezones',
    timezones: details.countryDetails.timezones,
  };

  /**
   * @type {BaseNeighbourCombined}
   */
  const neighbourData = {
    typeIdentifier: 'neighbour',
    borders: details.borders,
  };

  /**
   * @type {BaseExchangeCombined}
   */
  const exchangeData = {
    typeIdentifier: 'exchange',
    exchanges: details.exchangeRates,
  };

  return [
    {title: DetailLabel.flag, data: [flagData]},
    {title: DetailLabel.capital, data: [capitalData]},
    {title: DetailLabel.area, data: [areaData]},
    {title: DetailLabel.population, data: [populationData]},
    {title: DetailLabel.currency, data: [exchangeData]},
    {title: DetailLabel.timezones, data: [timezonesData]},
    {title: DetailLabel.borders, data: [neighbourData]},
  ];
};
