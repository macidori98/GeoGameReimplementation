import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const StatisticsItem = props => {
  return (
    <View>
      <Text>{props.data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default StatisticsItem;
