import React from 'react';
import {StyleSheet, View} from 'react-native';
import {GameDetailsLabel} from '~/constants/ConstantValues';
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
      <CustomText
        text={`${GameDetailsLabel.numOfCorrectAnswers} ${data.correctAns}`}
      />
      <CustomText text={`${GameDetailsLabel.date} ${data.date}`} />
      <CustomText text={`${GameDetailsLabel.time} ${data.time}`} />
      <CustomText text={`${GameDetailsLabel.duration} ${data.duration}`} />
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
