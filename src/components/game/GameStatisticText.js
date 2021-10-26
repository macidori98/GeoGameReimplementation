import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GameTypes, GameTypesObjects} from '~/constants/ConstantValues';
import Colors from '~/theme/Colors';
import {
  MarginDimension,
  PaddingDimension,
  RadiusDimension,
} from '~/theme/Dimen';
import FontSizes from '~/theme/FontSizes';
import CustomText from '../common/CustomText';

/**
 *
 * @param {{questions: QuestionStatistic[]}} props
 * @returns {JSX.Element}
 */
const GameStatisticsText = props => {
  return (
    <View style={{marginTop: MarginDimension.extraLarge}}>
      {props.questions.map(item => (
        <View
          key={item.questionEnding}
          style={{
            ...styles.container,
            borderColor:
              item.correctAnswer === item.givenAnswer
                ? Colors.greenish
                : Colors.greyish,
          }}>
          <View
            style={{
              ...styles.titleContainer,
              borderBottomColor:
                item.correctAnswer === item.givenAnswer
                  ? Colors.greenish
                  : Colors.greyish,
            }}>
            <CustomText
              size={FontSizes.medium}
              text={`${
                GameTypesObjects.find(i => i.id === GameTypes[item.question])
                  .name
              } of ${item.questionEnding}`}
            />
          </View>
          <Text>Correct answer: {item.correctAnswer}</Text>
          <Text>Given answer: {item.givenAnswer}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderRadius: RadiusDimension.medium,
    padding: PaddingDimension.large,
    marginBottom: MarginDimension.small,
  },
  titleContainer: {
    borderBottomWidth: 2,
    marginBottom: MarginDimension.medium,
  },
});

export default GameStatisticsText;
