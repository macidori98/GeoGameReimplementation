import {
  GET_PLAYED_GAMES_DATA,
  SAVE_PLAYED_GAME_DATA,
} from '../actions/statistics';

/**
 * @type {StatisticsStateObj}
 */
const initialState = {
  games: [],
};

/**
 * @param {StatisticsStateObj} state
 * @param {GetPlayedGamesDataAction|SavePlayedGamesDataAction} action
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PLAYED_GAMES_DATA:
      return {...state, games: action.data};
    case SAVE_PLAYED_GAME_DATA:
      return {...state, games: [action.data, ...state.games]};
    default:
      return initialState;
  }
};
