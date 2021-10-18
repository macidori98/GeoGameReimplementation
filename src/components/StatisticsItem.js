import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  MarginDimension,
  PaddingDimension,
  RadiusDimension,
} from '~/theme/Dimen';
import CustomText from './CustomText';

/**
 * @param {StatisticsItemProps} props
 * @returns {JSX.Element}
 */
const StatisticsItem = props => {
  return (
    <View style={styles.container}>
      <CustomText text="Number of correct answers: 2" />
      <CustomText text="Date: 2021-10-18" />
      <CustomText text="Time: 12:13" />
      <CustomText text="Duration: 1:20" />
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
