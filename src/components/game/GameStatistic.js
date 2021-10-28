import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {GameTypes, GameTypesValues} from '~/constants/ConstantValues';
import Colors from '~/theme/Colors';
import {gameComponentStyles} from '~/theme/CommonStyles';
import {
  MarginDimension,
  PaddingDimension,
  RadiusDimension,
} from '~/theme/Dimen';
import FontSizes from '~/theme/FontSizes';
import CustomText from '../common/CustomText';

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
                  text={`${GameTypesValues[item.question]} of ${
                    item.questionEnding
                  }`}
                />
              </>
            )}
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
  ...gameComponentStyles,
});

export default GameStatistics;
