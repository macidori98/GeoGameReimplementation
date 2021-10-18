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
  var currentDate = Date();
  var offset = currentDate.substring(
    currentDate.length - 12,
    currentDate.length - 9,
  );
  return date.setHours(
    date.getHours() + (timezoneOffset - parseInt(offset, 10)),
  );
};
