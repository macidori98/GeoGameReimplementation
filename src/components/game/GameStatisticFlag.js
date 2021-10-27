import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {GameTypes, GameTypesObjects} from '~/constants/ConstantValues';
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
const GameStatisticsFlag = props => {
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
              }`}
            />
            <Image
              resizeMode={'cover'}
              style={styles.image}
              source={{uri: item.questionEnding}}
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
    paddingBottom: MarginDimension.large,
    marginBottom: MarginDimension.small,
  },
  ...gameComponentStyles,
});

export default GameStatisticsFlag;
