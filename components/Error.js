import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import FontSizes from '../theme/FontSizes';

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
    paddingHorizontal: 20,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default Error;
