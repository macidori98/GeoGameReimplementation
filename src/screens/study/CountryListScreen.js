import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {getCountriesOfRegion} from '~/api/Service';
import CountryCard from '~/components/CountryCard';
import Error from '~/components/Error';
import LoadingIndicator from '~/components/LoadingIndicator';
import * as CommonStyles from '~/theme/CommonStyles';
import Dimen from '~/theme/Dimen';

/**
 * @param {{navigation: object, route: {params: {regionName: string, regionId: string}}}} param0
 * @returns
 */
const CountryListScreen = ({navigation, route}) => {
  const {regionName, regionId} = route.params;
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

  useEffect(() => {
    navigation.setOptions({title: regionName});
  }, [navigation, regionName]);

  const loadCountries = useCallback(async () => {
    setIsLoading(true);
    const result = await getCountriesOfRegion(regionId);

    if (result.success === true) {
      setCountries(result.data);
    } else {
      setError(result.message);
    }

    setIsLoading(false);
  }, [regionId]);

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  return (
    <View
      style={{
        ...CommonStyles.styles.screen,
      }}>
      {isLoading && countries.length === 0 && !error && <LoadingIndicator />}
      {countries.length > 0 && !error && (
        <View
          style={{
            ...CommonStyles.styles.centered,
            ...CommonStyles.styles.screen,
          }}>
          <FlatList
            style={styles.list}
            data={countries}
            keyExtractor={(item, index) => item.name + index}
            renderItem={({item}) => <CountryCard country={item} />}
          />
        </View>
      )}
      {error && !isLoading && <Error message={error} />}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '90%',
    padding: Dimen.dim15,
  },
});

export default CountryListScreen;
