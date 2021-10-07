import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getCountriesOfRegion} from '../../api/Service';
import * as countriesAction from '../../store/actions/countries';

/**
 * @template T
 * @typedef {[T, React.Dispatch<React.SetStateAction<T>>]} ComponentState
 */

const CountryListScreen = ({navigation, route}) => {
  const {region} = route.params;
  /**
   * @type {ComponentState<Country[]>}
   */
  const [countries, setCountries] = useState();

  /**
   * @type {ComponentState<string>}
   */
  const [error, setError] = useState();

  const countriesState = useSelector(
    /**@param {{countries: import('../../store/reducers/countries').CountryStateObj}} state */ state =>
      state.countries,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(countriesAction.fetchCountries(region));
    if (countriesState.error) {
      setError(countriesState.error.message);
    } else {
      setCountries(countriesState.countries);
      console.log('sadasdasadsdsadasdadsads');
    }
  }, [dispatch, region]);

  return (
    <View>
      <Text>CountryListScreen</Text>
      {countries && <Text>true</Text>}
      {error && <Text>error</Text>}
    </View>
  );
};

const styles = StyleSheet.create({});

export default CountryListScreen;
