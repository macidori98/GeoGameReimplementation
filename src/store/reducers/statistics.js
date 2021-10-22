import {GET_PLAYED_GAMES_DATA} from '../actions/statistics';

/**
 * @type {StatisticsStateObj}
 */
const initialState = {
  games: [],
};

/**
 * @param {StatisticsStateObj} state
 * @param {GetPlayedGamesDataAction} action
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PLAYED_GAMES_DATA:
      return {...state, games: action.data};

    default:
      return initialState;
  }
};
