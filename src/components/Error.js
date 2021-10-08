import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import * as CommonStyles from '~/theme/CommonStyles';
import FontSizes from '~/theme/FontSizes';
import Dimen from '~/theme/Dimen';

const Error = ({message}) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.text}>Something went wrong! Sorryyy </Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    width: Dimensions.get('screen').width,
    paddingHorizontal: Dimen.dim20,
    height: Dimen.dim150,
    ...CommonStyles.styles.centered,
    ...CommonStyles.styles.screen,
  },
  text: {
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Dimen.dim15,
  },
});

export default Error;
