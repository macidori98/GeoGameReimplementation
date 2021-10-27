import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MarginDimension} from '~/theme/Dimen';
import FontSizes from '~/theme/FontSizes';

/**
 * @param {TimeElapsedProps} props
 * @returns {JSX.Element}
 */
const TimeElapsed = props => {
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
    <View style={styles.container}>
      <Text style={styles.text}>Time elapsed:</Text>
      <Text style={styles.text}>
        {moment(time - props.startTime).format('mm:ss')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    marginTop: MarginDimension.large,
    marginRight: MarginDimension.extraLarge,
  },
  text: {
    fontSize: FontSizes.medium,
  },
});

export default TimeElapsed;
