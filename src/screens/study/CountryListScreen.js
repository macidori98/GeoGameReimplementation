import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {getCountriesOfRegion} from '~/api/Service';
import Error from '~/components/Error';
import LoadingIndicator from '~/components/LoadingIndicator';
import Colors from '~/theme/Colors';
import * as CommonStyles from '~/theme/CommonStyles';
import Dimen from '~/theme/Dimen';
import FontSizes from '~/theme/FontSizes';

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
            renderItem={({item}) => (
              <View style={styles.container}>
                <View style={{...CommonStyles.styles.centered}}>
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.image}
                      source={{uri: item.flags.png}}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>
                      {item.name} ({item.alpha2Code})
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      )}
      {error && !isLoading && <Error message={error} />}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    ...CommonStyles.styles.screen,
    borderTopRightRadius: Dimen.dim20,
    borderTopLeftRadius: Dimen.dim20,
  },
  imageContainer: {
    width: '100%',
    height: Dimen.dim150,
  },
  container: {
    backgroundColor: Colors.white,
    marginVertical: Dimen.dim10,
    borderRadius: Dimen.dim20,
    ...CommonStyles.styles.myShadow,
    width: '100%',
  },
  list: {
    width: '90%',
    padding: Dimen.dim15,
  },
  textContainer: {
    margin: Dimen.dim10,
    height: 40,
    ...CommonStyles.styles.centered,
  },
  text: {
    fontSize: FontSizes.medium,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: Dimen.dim20,
  },
});

export default CountryListScreen;
