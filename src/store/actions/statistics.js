export const GET_PLAYED_GAMES_DATA = 'GET_PLAYED_GAMES_DATA';

/**
 *
 * @returns {() => Promise<void>}
 */
export const getPlayedGamesData = () => {
  return async dispatch => {
    dispatch({
      type: GET_PLAYED_GAMES_DATA,
      data: [
        {
          //data will come from redux
          correctAns: 3,
          date: 'datee',
          time: 'timee',
          duration: 'duratioon',
        },
        {
          //data will come from redux
          correctAns: 3,
          date: 'datee',
          time: 'timee',
          duration: 'duratioon',
        },
        {
          //data will come from redux
          correctAns: 3,
          date: 'datee',
          time: 'timee',
          duration: 'duratioon',
        },
        {
          //data will come from redux
          correctAns: 3,
          date: 'datee',
          time: 'timee',
          duration: 'duratioon',
        },
        {
          //data will come from redux
          correctAns: 3,
          date: 'datee',
          time: 'timee',
          duration: 'duratioon',
        },
        {
          //data will come from redux
          correctAns: 3,
          date: 'datee',
          time: 'timee',
          duration: 'duratioon',
        },
        {
          //data will come from redux
          correctAns: 3,
          date: 'datee',
          time: 'timee',
          duration: 'duratioon',
        },
        {
          //data will come from redux
          correctAns: 3,
          date: 'datee',
          time: 'timee',
          duration: 'duratioon',
        },
        {
          //data will come from redux
          correctAns: 3,
          date: 'datee',
          time: 'timee',
          duration: 'duratioon',
        },
      ],
    });
  };
};
