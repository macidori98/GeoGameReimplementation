import {shuffle} from '~/helpers/Utils';
import {getRegionCountries} from '~/service/DataService';

/**
 * @param {string} region
 * @param {number} questionNumber
 * @returns {Promise<Questions[]>}
 */
export const generateGuessCapitalQuestionsAndAnswers = async (
  region,
  questionNumber,
) => {
  const countriesOfRegionResult = await getRegionCountries(region);

  if (countriesOfRegionResult.success) {
    const randomPickedCorrectAnswers = getRandomPickedCorrectAnswers(
      countriesOfRegionResult.data,
      questionNumber,
    );

    /**
     * @type {Questions[]}
     */
    const questions = [];

    for (const country of randomPickedCorrectAnswers.questions) {
      let correctAnswer = country.capital;

      /**
       * @type {Questions}
       */
      const question = {
        country: country.name,
        correctAnswer: correctAnswer,
        options: [correctAnswer],
      };

      const randomPickedWrongAnswers = getRandomPickedWrongAnswers(
        countriesOfRegionResult.data,
        countriesOfRegionResult.data.indexOf(country),
      );

      for (const wrongAnswer of randomPickedWrongAnswers) {
        question.options.push(wrongAnswer.capital);
      }

      shuffle(question.options);
      questions.push(question);
    }

    return questions;
  }

  return [];
};

/**
 * @param {Country[]} countriesOfRegion
 * @param {number} questionNumer
 * @returns {RandomQuestions}
 */
export const getRandomPickedCorrectAnswers = (
  countriesOfRegion,
  questionNumer,
) => {
  const length = countriesOfRegion.length - 1;

  /**
   * @type {Country[]}
   */
  const questions = [];

  /**
   * @type {number[]}
   */
  const alreadyUsedIndeces = [];

  var index = Math.floor(Math.random() * length);

  for (let i = 0; i < questionNumer; ++i) {
    while (alreadyUsedIndeces.findIndex(item => item === index) > -1) {
      index = Math.floor(Math.random() * length);
    }

    alreadyUsedIndeces.push(index);
    questions.push(countriesOfRegion[index]);
  }

  return {questions: questions, indexes: alreadyUsedIndeces};
};

/**
 * @param {Country[]} countriesOfRegion
 * @param {number} blacklistedIndex
 * @param {number} numberOfNeededAnswers
 * @returns {Country[]}
 */
export const getRandomPickedWrongAnswers = (
  countriesOfRegion,
  blacklistedIndex,
  numberOfNeededAnswers = 3,
) => {
  const length = countriesOfRegion.length - 1;

  /**
   * @type {Country[]}
   */
  const questions = [];

  /**
   * @type {number[]}
   */
  const alreadyUsedIndeces = [];

  while (alreadyUsedIndeces.length < numberOfNeededAnswers) {
    var r = Math.floor(Math.random() * length);

    if (alreadyUsedIndeces.indexOf(r) === -1 && blacklistedIndex !== r) {
      alreadyUsedIndeces.push(r);
    }
  }

  for (const index of alreadyUsedIndeces) {
    questions.push(countriesOfRegion[index]);
  }

  return questions;
};
