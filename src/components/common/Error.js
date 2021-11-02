import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {HelperButtonsLabel} from '~/constants/ConstantValues';
import * as CommonStyles from '~/theme/CommonStyles';
import {
  HeightDimension,
  MarginDimension,
  PaddingDimension,
} from '~/theme/Dimen';
import FontSizes from '~/theme/FontSizes';

/**
 * @param {ErrorProps} props
 * @returns {JSX.Element}
 */
const Error = props => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.text}>Something went wrong! Sorryyy </Text>
      <Text style={styles.text}>{props.message}</Text>
      <Button
        title={HelperButtonsLabel.retry}
        onPress={() => {
          props.onRetry();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    width: '100%',
    paddingHorizontal: PaddingDimension.large,
    height: HeightDimension.extraLarge,
    ...CommonStyles.styles.centered,
    ...CommonStyles.styles.screen,
  },
  text: {
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: MarginDimension.medium,
  },
});

export default Error;
