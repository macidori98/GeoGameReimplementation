import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import Colors from '../theme/Colors';
import * as CommonStyles from '../theme/CommonStyles';

const LoadingIndicator = () => {
  return (
    <ActivityIndicator
      style={styles.centeredItem}
      size="large"
      color={Colors.darkBlue}
    />
  );
};

const styles = StyleSheet.create({
  centeredItem: {
    ...CommonStyles.styles.screen,
    ...CommonStyles.styles.centered,
  },
});

export default LoadingIndicator;
