import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {getCountriesOfRegion} from '@/api/Service';
import Error from '@/components/Error';
import LoadingIndicator from '@/components/LoadingIndicator';
import * as CommonStyles from '@/theme/CommonStyles';

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
    <View style={CommonStyles.styles.screen}>
      {isLoading && countries.length === 0 && !error && <LoadingIndicator />}
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

const styles = StyleSheet.create({});

export default CountryListScreen;
