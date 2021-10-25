import React from 'react';
import {View} from 'react-native';
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
        text={`Correct answers number: ${data.correctAns}`}
        size={FontSizes.large}
      />
      <CustomText text={`Date: ${data.date}`} />
      <CustomText text={`Time: ${data.time}`} />
      <CustomText text={`Duration: ${data.duration}`} />
    </View>
  );
};

export default GameDetailsItem;
