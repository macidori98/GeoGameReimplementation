/**
 * @param {CountryDTO} country
 * @returns {Country}
 */
export const countryMapper = country => {
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

/**
 * @param {CountryDTO} country
 * @returns {Neighbour}
 */
export const neighbourMapper = country => {
  const data = {
    name: country.name,
    code: country.alpha2Code,
    flag: country.flags.png,
  };

  return data;
};
