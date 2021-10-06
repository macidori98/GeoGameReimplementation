import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CountryListScreen = ({navigation, route}) => {
  const {region} = route.params;

  return (
    <View>
      <Text>CountryListScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CountryListScreen;
