import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Colors from '~/theme/Colors';
import {MarginDimension} from '~/theme/Dimen';
import FontSizes from '~/theme/FontSizes';

const CustomText = ({text}) => {
  return (
    <>
      <Text style={styles.boldText}>{text}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
    fontSize: FontSizes.medium,
    marginVertical: MarginDimension.extraSmall,
    color: Colors.black,
  },
});

export default CustomText;
