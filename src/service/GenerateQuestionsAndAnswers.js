import * as RNLocalize from 'react-native-localize';
import {shuffle} from '~/helpers/Utils';
import {
  getCountryDetailsWithBordersAndCurrency,
  getRegionCountries,
} from '~/service/DataService';
import {getRandomPickedCountries} from './Utils';

/**
 * @param {string} region
 * @param {number} questionNumber
 * @param {(c: Country) => string} getAnswerValue
 * @param {(c: Country) => string} getQuestionValue
 * @returns {Promise<SuccessResponseType<Questions[]>| ErrorResponseType>}
 */
export const generateQuestionsAndAnswers = async (
  region,
  questionNumber,
  getAnswerValue,
  getQuestionValue,
) => {
  const countriesOfRegionResult = await getRegionCountries(region);
  if (countriesOfRegionResult.success === true) {
    const randomPickedCountriesCorrectAnswers = getRandomPickedCountries(
      countriesOfRegionResult.data,
      questionNumber,
    );

    /**
     * @type {Questions[]}
     */
    const questions = [];

    for (const countryCorrectAnswer of randomPickedCountriesCorrectAnswers) {
      let correctAnswer = getAnswerValue(countryCorrectAnswer);
      let countriesOfRegion = [...countriesOfRegionResult.data];

      const index = countriesOfRegion.findIndex(
        item => item.name === countryCorrectAnswer.name,
      );
      countriesOfRegion.slice(index, 1);

      /**
       * @type {Questions}
       */
      const question = {
        question: getQuestionValue(countryCorrectAnswer),
        correctAnswer: correctAnswer,
        options: [correctAnswer],
      };

      const randomPickedCountriesWrongAnswers =
        getRandomPickedCountries(countriesOfRegion);

      for (const countryWrongAnswer of randomPickedCountriesWrongAnswers) {
        question.options.push(getAnswerValue(countryWrongAnswer));
      }

      shuffle(question.options);
      questions.push(question);
    }

    return {success: true, data: questions};
  } else {
    return {success: false, message: countriesOfRegionResult.message};
  }
};

/**
 * @param {string} region
 * @param {number} questionNumber
 * @returns {Promise<SuccessResponseType<Questions[]>|ErrorResponseType>}
 */
export const generateGuessTheNeighbourQuestions = async (
  region,
  questionNumber,
) => {
  const countriesOfRegionResult = await getRegionCountries(region);
  if (countriesOfRegionResult.success === true) {
    const randomPickedCountriesCorrectAnswers = getRandomPickedCountries(
      countriesOfRegionResult.data,
      questionNumber,
    );

    /**
     * @type {Questions[]}
     */
    const questions = [];

    for (const countryCorrectAnswer of randomPickedCountriesCorrectAnswers) {
      let correctAnswer = 'No neighbour';
      let countriesOfRegion = [...countriesOfRegionResult.data];

      if (countryCorrectAnswer.borders?.length > 0) {
        const randomNeighbourIndex = Math.floor(
          Math.random() * countryCorrectAnswer.borders.length,
        );

        const borderCountryResponse =
          await getCountryDetailsWithBordersAndCurrency(
            countryCorrectAnswer.borders[randomNeighbourIndex],
            RNLocalize.getCurrencies(),
          );

        if (borderCountryResponse.success === true) {
          correctAnswer = borderCountryResponse.data.countryDetails.name;
        }
      }

      /**
       * @type {Questions}
       */
      const question = {
        question: countryCorrectAnswer.name,
        correctAnswer: correctAnswer,
        options: [correctAnswer],
      };

      const index = countriesOfRegion.findIndex(
        item => item.name === correctAnswer,
      );
      countriesOfRegion.slice(index, 1);

      const randomPickedCountriesWrongAnswers =
        getRandomPickedCountries(countriesOfRegion);

      for (const countryWrongAnswer of randomPickedCountriesWrongAnswers) {
        question.options.push(countryWrongAnswer.name);
      }

      shuffle(question.options);
      questions.push(question);
    }

    return {success: true, data: questions};
  } else {
    return {success: false, message: countriesOfRegionResult.message};
  }
};
