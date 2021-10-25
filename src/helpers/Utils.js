/**
 * @param {string[]} arr
 * @returns {string[]}
 */
export const shuffle = arr => {
  var i, j, temp;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr;
};

/**
 * @param {number} seconds
 * @returns {string}
 */
export const getDurationString = seconds => {
  console.log(seconds);
  var minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  minutes = minutes % 60;

  const indexOfDot = seconds.toString().indexOf('.');
  const twoDecimalsIndex = 3;

  var stringSec =
    seconds.toString().substr(0, indexOfDot).length === 2
      ? `${seconds.toString().substr(0, indexOfDot + twoDecimalsIndex)}`
      : `0${seconds.toString().substr(0, indexOfDot + twoDecimalsIndex)}`;
  var minutesString =
    minutes.toString().length === 2 ? `${minutes}` : `0${minutes}`;

  return `${minutesString}:${stringSec}`;
};
