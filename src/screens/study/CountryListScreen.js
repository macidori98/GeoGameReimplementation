import React, {useCallback, useState} from 'react';
import {FlatList, View} from 'react-native';
import CountryCard from '~/components/CountryCard';
import GenericComponent from '~/components/GenericComponent';
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
  const [countries, setCountries] = useState();

  const loadCountriesForGenericComponent = useCallback(async () => {
    return await getRegionCountries(regionId);
    //const result = await getCountriesOfRegion(regionId);
  }, [regionId]);

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
      {!countries && (
        <GenericComponent
          onDataRecieved={
            /**@param {Country[]} data */ data => {
              setCountries(data);
            }
          }
          loadData={loadCountriesForGenericComponent}
        />
      )}
      {countries && createCountriesList()}
    </View>
  );
};

export default CountryListScreen;
