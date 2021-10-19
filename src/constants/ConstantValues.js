/**
 * @type {Region[]}
 */
export const Regions = [
  {id: 'africa', name: 'Africa'},
  {id: 'americas', name: 'Americas'},
  {id: 'asia', name: 'Asia'},
  {id: 'europe', name: 'Europe'},
  {id: 'oceania', name: 'Oceania'},
];

export const Headers = {
  region: 'Regions',
  details: 'Details',
};

export const DetailLabel = {
  flag: 'Flag',
  capital: 'Capital',
  area: 'Area',
  population: 'Population',
  borders: 'Borders',
  currency: 'Currency',
  timezones: 'Timezones',
  noBorder: 'No borders',
  loading: 'Loading...',
};

export const GameTypes = [
  {id: 'guessTheCapital', name: 'Guess the capital'},
  {id: 'guessTheNeighbour', name: 'Guess the neighbor'},
  {id: 'guessTheFlag', name: 'Guess the flag'},
];

export const NumberOfQuestions = [
  {id: '5', name: '5'},
  {id: '10', name: '10'},
  {id: '15', name: '15'},
];

export const ConfigLabels = {
  region: 'Select region',
  gameType: 'Select game type',
  numberOfQuestions: 'Select number of questions',
  startGame: 'Start game',
  configGame: 'Config game',
  closeConfigGame: 'Close',
};
