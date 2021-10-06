import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v2';

export const getCountriesOfRegion = async region => {
  const countries = await axios.get(`${BASE_URL}/continent/${region}`);

  console.log(countries.data);
};
