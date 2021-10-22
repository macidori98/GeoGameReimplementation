export const GET_PLAYED_GAMES_DATA = 'GET_PLAYED_GAMES_DATA';
export const SAVE_PLAYED_GAME_DATA = 'SAVE_PLAYED_GAME_DATA';

/**
 * @returns {() => Promise<void>}
 */
export const getPlayedGamesData = () => {
  return async dispatch => {
    dispatch({
      type: GET_PLAYED_GAMES_DATA,
      data: [],
    });
  };
};

/**
 * @param {StatisticsData} data
 */
export const savePlayedGameData = data => {
  return async dispatch => {
    dispatch({
      type: SAVE_PLAYED_GAME_DATA,
      data: data,
    });
  };
};
