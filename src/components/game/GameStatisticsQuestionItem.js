import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {GameTypes, GameTypesValues} from '~/constants/ConstantValues';
import {gameComponentStyles} from '~/theme/CommonStyles';
import FontSizes from '~/theme/FontSizes';
import CustomText from '../common/CustomText';

/**
 * @param {{item: QuestionStatistic}} props
 * @returns
 */
const GameStatisticsQuestionItem = props => {
  const {item} = props;
  return (
    <>
      {item.question === GameTypes.guessTheFlag && (
        <>
          <CustomText
            size={FontSizes.medium}
            text={`${GameTypesValues[item.question]}`}
          />
          <Image
            resizeMode={'cover'}
            style={styles.image}
            source={{uri: item.questionEnding}}
          />
        </>
      )}
      {item.question !== GameTypes.guessTheFlag && (
        <>
          <CustomText
            size={FontSizes.medium}
            text={`${GameTypesValues[item.question]} of ${item.questionEnding}`}
          />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  ...gameComponentStyles,
});

export default GameStatisticsQuestionItem;
