import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {getCountriesOfRegion} from '../../api/Service';

const CountryListScreen = ({navigation, route}) => {
  const {region} = route.params;

  //const a = getCountriesOfRegion(region);

  //const orders = useSelector(state => state.countries);

  //console.log(orders);

  return (
    <View>
      <Text>CountryListScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CountryListScreen;
