import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Colors from '~/theme/Colors';
import {MarginDimension} from '~/theme/Dimen';
import FontSizes from '~/theme/FontSizes';

/**
 * @param {CustomTextProps} props
 * @returns {JSX.Element}
 */
const CustomText = props => {
  return (
    <>
      <Text style={styles.boldText}>{props.text}</Text>
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
