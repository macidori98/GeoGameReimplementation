import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

/**
 * @param {GameScreenProps} props
 * @returns {JSX.Element}
 */
const GameScreen = props => {
  return (
    <View>
      <Text>{props.route.params.data.gameType}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default GameScreen;
