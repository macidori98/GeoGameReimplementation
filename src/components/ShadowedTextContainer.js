import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '~/theme/Colors';
import FontSizes from '~/theme/FontSizes';
import * as CommonStyles from '~/theme/CommonStyles';
import {
  HeightDimension,
  MarginDimension,
  RadiusDimension,
  WidthDimension,
} from '~/theme/Dimen';

/**
 * @param {ShadowedTextContainerProps} props
 * @returns {JSX.Element}
 */
const ShadowedTextContainer = props => {
  return (
    <View style={{...CommonStyles.styles.myShadow, ...styles.card}}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: HeightDimension.large,
    width: WidthDimension.extraLarge,
    minWidth: WidthDimension.large,
    borderRadius: RadiusDimension.large,
    margin: MarginDimension.medium,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: FontSizes.large,
    fontWeight: '500',
    color: Colors.whiteish,
  },
});

export default ShadowedTextContainer;
