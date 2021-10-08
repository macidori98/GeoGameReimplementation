import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Dimen from '~/theme/Dimen';
import FontSizes from '~/theme/FontSizes';

const CustomText = ({text}) => {
  return <Text style={styles.boldText}>{text}</Text>;
};

const styles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
    fontSize: FontSizes.medium,
    marginVertical: Dimen.dim5,
  },
});

export default CustomText;
