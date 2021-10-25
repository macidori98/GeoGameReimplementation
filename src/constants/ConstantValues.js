import Colors from '~/theme/Colors';

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

export const GameTypesObjects = [
  {id: 'guessTheCapital', name: 'Guess the capital'},
  {id: 'guessTheNeighbour', name: 'Guess the neighbour'},
  {id: 'guessTheFlag', name: 'Guess the flag'},
];

export const GameTypes = {
  guessTheCapital: 'guessTheCapital',
  guessTheNeighbour: 'guessTheNeighbour',
  guessTheFlag: 'guessTheFlag',
};

export const NumberOfQuestions = [
  {id: '5', name: '5'},
  {id: '10', name: '10'},
  {id: '15', name: '15'},
];

export const ConfigLabels = {
  region: 'Select region',
  gameType: 'Select game type',
  numberOfQuestions: 'Select number of questions',
  configGame: 'Config game',
};

export const CommonRadioButtonProps = {
  selected: false,
  labelStyle: {color: Colors.black},
};

export const NoGameYet = {
  noGamePlayed: 'No game pleyed yet.',
  letsPlay: "Let's play one!",
};

export const HelperButtonsLabel = {
  retry: 'Retry!',
  cancel: 'Cancel',
  back: 'Back',
  close: 'Close',
  startGame: 'Start game',
};

export const GameDetailsLabel = {
  numOfCorrectAnswers: 'Correct answers number:',
  date: 'Date:',
  time: 'Time:',
  duration: 'Duration:',
};
