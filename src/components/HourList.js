import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import CustomText from './CustomText';

const longToDate = function (millisec, time) {
  var date = new Date(millisec);
  var currentDate = Date();
  var offset = currentDate.substring(
    currentDate.length - 12,
    currentDate.length - 9,
  );
  return date.setHours(date.getHours() + (time - offset));
};

const HourList = ({timezones}) => {
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
            longToDate(time, parseInt(String(item).substring(3, 6), 10)),
          ).format('HH:mm:ss ')}
        />
      ))}
    </View>
  );
};

export default HourList;
