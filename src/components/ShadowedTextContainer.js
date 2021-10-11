import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Colors from '~/theme/Colors';
import Dimen from '~/theme/Dimen';
import FontSizes from '~/theme/FontSizes';
import * as CommonStyles from '~/theme/CommonStyles';

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
    height: Dimen.dim80,
    width: dimensions.width * 0.66,
    minWidth: Dimen.dim100,
    borderRadius: Dimen.dim20,
    margin: Dimen.dim15,
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
