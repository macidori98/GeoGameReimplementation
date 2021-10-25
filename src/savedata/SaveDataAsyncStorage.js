import AsyncStorage from '@react-native-async-storage/async-storage';

const DATABASE_KEY = 'dbKey';
/**
 * @param {StatisticsData} newGame
 * @returns {Promise<SuccessResponseType<StatisticsData>|ErrorResponseType>}
 */
export const saveDataLocally = async newGame => {
  var gamesListResponse = await readDataFromLocal();
  if (gamesListResponse.success === true) {
    var gamesList = gamesListResponse.data;
    gamesList != null ? gamesList.push(newGame) : (gamesList = []);

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
 * @returns {Promise<SuccessResponseType<StatisticsData[]>|ErrorResponseType>}
 */
export const readDataFromLocal = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(DATABASE_KEY);
    /**
     * @type {StatisticsData[]}
     */
    return {
      success: true,
      data: jsonValue != null ? JSON.parse(jsonValue) : [],
    };
  } catch (error) {
    return {success: false, message: error.toString()};
  }
};
