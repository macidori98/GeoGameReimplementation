import React from 'react';
import {View} from 'react-native';
import {GameDetailsLabel} from '~/constants/ConstantValues';
import FontSizes from '~/theme/FontSizes';
import CustomText from '../common/CustomText';

/**
 * @param {{data: StatisticsData}} props
 * @returns {JSX.Element}
 */
const GameDetailsItem = props => {
  const {data} = props;
  return (
    <View>
      <CustomText
        text={`${GameDetailsLabel.numOfCorrectAnswers} ${data.correctAns}`}
        size={FontSizes.large}
      />
      <CustomText text={`${GameDetailsLabel.date} ${data.date}`} />
      <CustomText text={`${GameDetailsLabel.time} ${data.time}`} />
      <CustomText text={`${GameDetailsLabel.duration} ${data.duration}`} />
    </View>
  );
};

export default GameDetailsItem;
