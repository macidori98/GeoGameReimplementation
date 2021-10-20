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
    const randomPickedCountriesCorrectAnswers = getRandomPickedCountries(
      countriesOfRegionResult.data,
      questionNumber,
    );

    /**
     * @type {Questions[]}
     */
    const questions = [];

    for (const countryCorrectAnswer of randomPickedCountriesCorrectAnswers) {
      let correctAnswer = countryCorrectAnswer.capital;
      let countriesOfRegion = countriesOfRegionResult.data;

      const index = countriesOfRegion.findIndex(
        item => item.name === countryCorrectAnswer.name,
      );
      countriesOfRegion.slice(index, 1);

      /**
       * @type {Questions}
       */
      const question = {
        country: countryCorrectAnswer.name,
        correctAnswer: correctAnswer,
        options: [correctAnswer],
      };

      const randomPickedCountriesWrongAnswers =
        getRandomPickedCountries(countriesOfRegion);

      for (const countryWrongAnswer of randomPickedCountriesWrongAnswers) {
        question.options.push(countryWrongAnswer.capital);
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
 * @returns {Country[]}
 */
const getRandomPickedCountries = (countriesOfRegion, questionNumer = 3) => {
  /**
   * @type {Country[]}
   */
  const questions = [];

  for (let i = 0; i < questionNumer; ++i) {
    const length = countriesOfRegion.length - 1;
    var index = Math.floor(Math.random() * length);

    questions.push(countriesOfRegion[index]);

    countriesOfRegion.splice(index, 1);
  }

  return questions;
};
