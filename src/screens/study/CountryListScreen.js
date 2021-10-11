import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {getCountriesOfRegion} from '~/api/Service';
import CountryCard from '~/components/CountryCard';
import Error from '~/components/Error';
import LoadingIndicator from '~/components/LoadingIndicator';
import TouchableItem from '~/components/TouchableItem';
import * as CommonStyles from '~/theme/CommonStyles';

/**
 * @param {{navigation: object, route: {params: {regionName: string, regionId: string, nextRoute: string}}}} param0
 * @returns
 */
const CountryListScreen = ({navigation, route}) => {
  const {regionId, nextRoute} = route.params;
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
        <View>
          <FlatList
            data={countries}
            keyExtractor={(item, index) => item.name + index}
            renderItem={({item}) => (
              <TouchableItem
                onPress={() => {
                  navigation.navigate(nextRoute, {
                    countryCode: item.alpha2Code,
                    countryName: item.name,
                  });
                }}>
                <CountryCard country={item} />
              </TouchableItem>
            )}
          />
        </View>
      )}
      {error && !isLoading && <Error message={error} />}
    </View>
  );
};

export default CountryListScreen;
