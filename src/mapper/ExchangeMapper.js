/**
 * @param {ExchangeDTO} exchange
 * @param {string} key
 * @returns {number}
 */
export const exchangeMapper = (exchange, key) => {
  return exchange.rates[key];
};
