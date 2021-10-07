import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getCountriesOfRegion} from '../../api/Service';
import Error from '../../components/Error';
import Colors from '../../constants/Colors';

/**
 * @param {{navigation: object, route: {params: {region: string}}}} param0
 * @returns
 */
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

  const loadCountries = useCallback(async () => {
    setIsLoading(true);
    const result = await getCountriesOfRegion(region);

    if (result.success === true) {
      setCountries(result.data);
    } else {
      setError(result.message);
    }

    setIsLoading(false);
  }, [region]);

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

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
      {error && !isLoading && <Error message={error} />}
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
