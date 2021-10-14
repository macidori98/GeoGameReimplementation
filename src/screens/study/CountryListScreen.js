import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import CountryCard from '~/components/CountryCard';
import Error from '~/components/Error';
import LoadingIndicator from '~/components/LoadingIndicator';
import TouchableItem from '~/components/TouchableItem';
import {getRegionCountries} from '~/service/DataService';
import * as CommonStyles from '~/theme/CommonStyles';

/**
 * @param {CountryListScreenProps} props
 */
const CountryListScreen = props => {
  const {regionId} = props.route.params;
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

    const result = await getRegionCountries(regionId);
    //const result = await getCountriesOfRegion(regionId);

    if (result.success === true) {
      setCountries(result.data);
      result.data.map(item => {
        console.log(item.name + ' ' + item.currencies.length);
      });
    } else {
      setError(result.message);
    }

    setIsLoading(false);
  }, [regionId]);

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  const createCountriesList = () => (
    <View>
      <FlatList
        data={countries}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({item}) => (
          <TouchableItem
            onPress={() => {
              props.navigation.navigate('Details', {
                countryCode: item.code,
                countryName: item.name,
              });
            }}>
            <CountryCard country={item} />
          </TouchableItem>
        )}
      />
    </View>
  );
  return (
    <View style={CommonStyles.styles.screen}>
      {isLoading && countries.length === 0 && !error && <LoadingIndicator />}
      {countries.length > 0 && !error && createCountriesList()}
      {error && !isLoading && <Error message={error} />}
    </View>
  );
};

export default CountryListScreen;
