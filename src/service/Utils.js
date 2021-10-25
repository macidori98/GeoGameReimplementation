/**
 * @param {Country[]} countriesOfRegion
 * @param {number} questionNumer
 * @returns {Country[]}
 */
export const getRandomPickedCountries = (
  countriesOfRegion,
  questionNumer = 3,
) => {
  /**
   * @type {Country[]}
   */
  const questions = [];

  for (let i = 0; i < questionNumer; ++i) {
    const length = countriesOfRegion.length - 1;
    var index = Math.floor(Math.random() * length);

    if (countriesOfRegion[index].capital !== undefined) {
      questions.push(countriesOfRegion.splice(index, 1)[0]);
    } else {
      i--;
    }
  }

  return questions;
};
