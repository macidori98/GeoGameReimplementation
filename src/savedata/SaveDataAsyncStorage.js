import AsyncStorage from '@react-native-async-storage/async-storage';

const DATABASE_KEY = 'dbKey';
/**
 * @param {StatisticsDataWithQuestions} newGame
 * @returns {Promise<SuccessResponseType<StatisticsDataWithQuestions>|ErrorResponseType>}
 */
export const saveDataLocally = async newGame => {
  var gamesListResponse = await readDataFromLocal();
  if (gamesListResponse.success === true) {
    var gamesList = gamesListResponse.data ?? [];
    gamesList.push(newGame);

    try {
      const jsonValue = JSON.stringify(gamesList);
      await AsyncStorage.setItem(DATABASE_KEY, jsonValue);
      return {success: true, data: newGame};
    } catch (error) {
      return {success: false, message: error.toString()};
    }
  } else {
    return gamesListResponse;
  }
};

/**
 * @returns {Promise<SuccessResponseType<StatisticsDataWithQuestions[]>|ErrorResponseType>}
 */
export const readDataFromLocal = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(DATABASE_KEY);
    /**
     * @type {StatisticsDataWithQuestions[]}
     */
    return {
      success: true,
      data: jsonValue != null ? JSON.parse(jsonValue) : [],
    };
  } catch (error) {
    return {success: false, message: error.toString()};
  }
};
