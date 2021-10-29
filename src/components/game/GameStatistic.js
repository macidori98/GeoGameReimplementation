import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '~/theme/Colors';
import {
  MarginDimension,
  PaddingDimension,
  RadiusDimension,
} from '~/theme/Dimen';
import GameStatisticsQuestionItem from './GameStatisticsQuestionItem';

/**
 *
 * @param {GameStatisticsProps} props
 * @returns {JSX.Element}
 */
const GameStatistics = props => {
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
            <GameStatisticsQuestionItem item={item} />
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
    paddingBottom: MarginDimension.large,
    marginBottom: MarginDimension.small,
  },
});

export default GameStatistics;
