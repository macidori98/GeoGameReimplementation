import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Colors from '~/theme/Colors';
import FontSizes from '~/theme/FontSizes';
import * as CommonStyles from '~/theme/CommonStyles';
import {
  HeightDimension,
  MarginDimension,
  RadiusDimension,
  WidthDimension,
} from '~/theme/Dimen';

const dimensions = Dimensions.get('screen');

const ShadowedTextContainer = ({item}) => {
  return (
    <View style={{...CommonStyles.styles.myShadow, ...styles.card}}>
      <Text style={styles.text}>{item.name}</Text>
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
