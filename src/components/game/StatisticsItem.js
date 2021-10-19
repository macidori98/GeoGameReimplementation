import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  MarginDimension,
  PaddingDimension,
  RadiusDimension,
} from '~/theme/Dimen';
import CustomText from '../common/CustomText';

/**
 * @param {StatisticsItemProps} props
 * @returns {JSX.Element}
 */
const StatisticsItem = props => {
  const {data} = props;
  return (
    <View style={styles.container}>
      <CustomText text={`Correct answers number: ${data.correctAns}`} />
      <CustomText text={`Date: ${data.date}`} />
      <CustomText text={`Time: ${data.time}`} />
      <CustomText text={`Duration: ${data.duration}`} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: RadiusDimension.medium,
    padding: PaddingDimension.medium,
    margin: MarginDimension.small,
  },
});

export default StatisticsItem;
