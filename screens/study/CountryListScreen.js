import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
import * as countriesAction from '../../store/actions/countries';

const CountryListScreen = ({navigation, route}) => {
  const {region} = route.params;
  /**
   * @type {ComponentState<Country[]>}
   */
  const [countries, setCountries] = useState([]);

  /**
   * @type {ComponentState<string>}
   */
  const [error, setError] = useState();

  /**
   * @type {ComponentState<boolean>}
   */
  const [isLoading, setIsLoading] = useState(false);

  const countriesState = useSelector(
    /**@param {{countries: CountryStateObj}} state */ state => state.countries,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const loadCountriesOfRegion = async () => {
      setIsLoading(true);
      await dispatch(countriesAction.fetchCountries(region));
      setIsLoading(false);
    };

    loadCountriesOfRegion();
  }, [dispatch, region]);

  useEffect(() => {
    if (countriesState.countries != null) {
      setCountries(countriesState.countries);
    }

    if (countriesState.error.message != null) {
      setError(countriesState.error.message);
    }
  }, [countriesState]);

  return (
    <View style={styles.screen}>
      {isLoading && countries.length === 0 && !error && (
        <ActivityIndicator
          style={styles.centeredItem}
          size="large"
          color={Colors.darkBlue}
        />
      )}
      {countries.length > 0 && !error && (
        <FlatList
          data={countries}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({item}) => (
            <View>
              <Text>{item.name}</Text>
            </View>
          )}
        />
      )}
      {error && !isLoading && <Text>error</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  centeredItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CountryListScreen;
