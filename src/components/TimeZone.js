import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {currentMillisToTimezoneMillis} from '~/helpers/DateHelpers';
import CustomText from './CustomText';

/**
 * @param {{timezones: Array<string>}} param0
 * @returns
 */
const TimeZone = ({timezones}) => {
  /**
   * @type {ComponentState<number>}
   */
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      {timezones.map(item => (
        <CustomText
          text={moment(
            currentMillisToTimezoneMillis(
              time,
              parseInt(String(item).substring(3, 6), 10),
            ),
          ).format('HH:mm:ss ')}
        />
      ))}
    </View>
  );
};

export default TimeZone;
