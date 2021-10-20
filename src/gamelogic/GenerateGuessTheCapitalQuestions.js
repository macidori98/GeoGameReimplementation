import {shuffle} from '~/helpers/Utils';
import {getRegionCountries} from '~/service/DataService';

/**
 * @param {string} region
 * @param {number} questionNo
 * @returns {Promise<Questions[]>}
 */
export const generateGuessCapitalQuestions = async (region, questionNo) => {
  const dataArrayResponse = await getRegionCountries(region);

  if (dataArrayResponse.success) {
    const randomCountries = randomQuestions(dataArrayResponse.data, questionNo);

    /**
     * @type {Questions[]}
     */
    const questions = [];

    for (const country of randomCountries.questions) {
      let goodAnswer = country.capital;

      /**
       * @type {Questions}
       */
      const question = {
        country: country.name,
        correctAnswer: goodAnswer,
        options: [goodAnswer],
      };

      const otherOptions = randomOtherAnswers(
        dataArrayResponse.data,
        dataArrayResponse.data.indexOf(country),
      );

      for (const otherOption of otherOptions) {
        question.options.push(otherOption.capital);
      }

      shuffle(question.options);
      questions.push(question);
    }

    return questions;
  }

  return [];
};

/**
 * @param {Country[]} dataArray
 * @param {number} questionNumer
 * @returns {RandomQuestions}
 */
export const randomQuestions = (dataArray, questionNumer) => {
  const length = dataArray.length - 1;

  /**
   * @type {Country[]}
   */
  const questions = [];

  /**
   * @type {number[]}
   */
  const alreadyUsedIndexes = [];

  var index = Math.floor(Math.random() * length);

  for (let i = 0; i < questionNumer; ++i) {
    while (alreadyUsedIndexes.findIndex(item => item === index) > -1) {
      index = Math.floor(Math.random() * length);
    }

    alreadyUsedIndexes.push(index);
    questions.push(dataArray[index]);
  }

  return {questions: questions, indexes: alreadyUsedIndexes};
};

/**
 * @param {Country[]} dataArray
 * @param {number} blacklistedIndex
 * @param {number} numberOfNeededAnswers
 * @returns {Country[]}
 */
export const randomOtherAnswers = (
  dataArray,
  blacklistedIndex,
  numberOfNeededAnswers = 3,
) => {
  const length = dataArray.length - 1;

  /**
   * @type {Country[]}
   */
  const questions = [];

  /**
   * @type {number[]}
   */
  const alreadyUsedIndexes = [];

  while (alreadyUsedIndexes.length < numberOfNeededAnswers) {
    var r = Math.floor(Math.random() * length);

    if (alreadyUsedIndexes.indexOf(r) === -1 && blacklistedIndex !== r) {
      alreadyUsedIndexes.push(r);
    }
  }

  for (const i of alreadyUsedIndexes) {
    questions.push(dataArray[i]);
  }

  return questions;
};
