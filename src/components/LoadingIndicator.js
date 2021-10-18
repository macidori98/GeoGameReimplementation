import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Colors from '~/theme/Colors';
import * as CommonStyles from '~/theme/CommonStyles';

const LoadingIndicator = () => {
  return (
    <View style={CommonStyles.styles.screen}>
      <ActivityIndicator
        style={styles.centeredItem}
        size="large"
        color={Colors.darkBlue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredItem: {
    ...CommonStyles.styles.screen,
    ...CommonStyles.styles.centered,
  },
});

export default LoadingIndicator;
