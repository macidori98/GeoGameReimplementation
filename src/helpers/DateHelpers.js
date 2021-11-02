/**
 * @param {number} currentMillis
 * @param {number} timezoneOffset
 * @returns {number}
 */
export const currentMillisToTimezoneMillis = function (
  currentMillis,
  timezoneOffset,
) {
  var date = new Date(currentMillis);
  var currentDate = new Date();
  var offset = currentDate.getTimezoneOffset() / 60;
  return date.setHours(date.getHours() + (timezoneOffset + offset));
};
