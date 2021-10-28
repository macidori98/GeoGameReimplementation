import React from 'react';
import {ScrollView} from 'react-native';
import {GameDetailsLabel} from '~/constants/ConstantValues';
import FontSizes from '~/theme/FontSizes';
import CustomText from '../common/CustomText';
import GameStatistics from './GameStatistic';

/**
 * @param {GameDetailsItemProps} props
 * @returns {JSX.Element}
 */
const GameDetailsItem = props => {
  const {data} = props;
  return (
    <ScrollView>
      <CustomText
        text={`${GameDetailsLabel.numOfCorrectAnswers} ${data.data.correctAns}`}
        size={FontSizes.large}
      />
      <CustomText text={`${GameDetailsLabel.date} ${data.data.date}`} />
      <CustomText text={`${GameDetailsLabel.time} ${data.data.time}`} />
      <CustomText text={`${GameDetailsLabel.duration} ${data.data.duration}`} />

      <GameStatistics questions={data.questions} />
    </ScrollView>
  );
};

export default GameDetailsItem;
