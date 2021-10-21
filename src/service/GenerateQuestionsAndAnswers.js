import {shuffle} from '~/helpers/Utils';
import {getRegionCountries} from '~/service/DataService';
import {getRandomPickedCountries} from './Utils';

/**
 * @param {string} region
 * @param {number} questionNumber
 * @param {string} property
 * @returns {Promise<Questions[]>}
 */
export const generateQuestionsAndAnswers = async (
  region,
  questionNumber,
  property,
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
      let correctAnswer = countryCorrectAnswer.name;
      let countriesOfRegion = countriesOfRegionResult.data;

      const index = countriesOfRegion.findIndex(
        item => item.name === countryCorrectAnswer.name,
      );
      countriesOfRegion.slice(index, 1);

      /**
       * @type {Questions}
       */
      const question = {
        question: countryCorrectAnswer[property],
        correctAnswer: correctAnswer,
        options: [correctAnswer],
      };

      const randomPickedCountriesWrongAnswers =
        getRandomPickedCountries(countriesOfRegion);

      for (const countryWrongAnswer of randomPickedCountriesWrongAnswers) {
        question.options.push(countryWrongAnswer.name);
      }

      shuffle(question.options);
      questions.push(question);
    }

    return questions;
  }

  return [];
};
