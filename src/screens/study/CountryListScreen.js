import React, {useCallback} from 'react';
import {FlatList, View} from 'react-native';
import GenericComponent from '~/components/common/GenericComponent';
import TouchableItem from '~/components/common/TouchableItem';
import CountryCard from '~/components/study/CountryCard';
import {getRegionCountries} from '~/service/DataService';
import * as CommonStyles from '~/theme/CommonStyles';

/**
 * @param {CountryListScreenProps} props
 */
const CountryListScreen = props => {
  const {regionId} = props.route.params;

  const loadCountriesForGenericComponent = useCallback(async () => {
    return await getRegionCountries(regionId);
    //const result = await getCountriesOfRegion(regionId);
  }, [regionId]);

  /**
   * @param {Country[]} countries
   * @returns {JSX.Element}
   */
  const createCountriesList = countries => (
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
      <GenericComponent
        onDataRecieved={
          /**@param {Country[]} data */ data => {
            return createCountriesList(data);
          }
        }
        loadData={loadCountriesForGenericComponent}
      />
    </View>
  );
};

export default CountryListScreen;
