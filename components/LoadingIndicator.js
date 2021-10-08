import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import Colors from '../theme/Colors';

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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingIndicator;
