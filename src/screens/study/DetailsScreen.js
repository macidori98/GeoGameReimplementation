import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {getCountryDetailsByCode} from '~/api/Service';
import CustomText from '~/components/CustomText';
import Error from '~/components/Error';
import LoadingIndicator from '~/components/LoadingIndicator';
import {Headers} from '~/constants/ConstantValues';
import * as CommonStyles from '~/theme/CommonStyles';
import Dimen from '~/theme/Dimen';

const DetailsScreen = ({navigation, route}) => {
  /**
   * @type {{countryCode: string}}
   */
  const {countryCode} = route.params;

  /**
   * @type {ComponentState<boolean>}
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * @type {ComponentState<string>}
   */
  const [error, setError] = useState();

  /**
   * @type {ComponentState<Country>}
   */
  const [countryDetails, setCountryDetiails] = useState();

  const loadCountryData = useCallback(async () => {
    setIsLoading(true);
    const result = await getCountryDetailsByCode(countryCode);

    if (result.success === true) {
      setCountryDetiails(result.data);
    } else {
      setError(result.message);
    }

    setIsLoading(false);
  }, [countryCode]);

  useEffect(() => {
    loadCountryData();
  }, [loadCountryData]);

  useEffect(() => {
    navigation.setOptions({
      title: countryDetails
        ? `${countryDetails.name} (${countryDetails.alpha2Code})`
        : Headers.loading,
    });
  }, [countryDetails, navigation]);

  return (
    <>
      {isLoading && !error && (
        <View
          style={{
            ...CommonStyles.styles.screen,
          }}>
          <LoadingIndicator />
        </View>
      )}
      {!isLoading && !error && countryDetails && (
        <ScrollView>
          <View
            style={{
              ...CommonStyles.styles.screen,
            }}>
            <View style={styles.imageContainer}>
              <Image
                style={CommonStyles.styles.screen}
                source={{uri: countryDetails.flags.png}}
              />
            </View>
            <View style={styles.countryDetailsContainer}>
              <View style={CommonStyles.styles.screen}>
                <View style={styles.contur}>
                  <CustomText text="Capital:" />
                  <CustomText text="Population:" />
                  <CustomText text="Area:" />
                  <CustomText text="Currency:" />
                  <CustomText text="Timezones:" />
                </View>
              </View>
              <View style={CommonStyles.styles.screen}>
                <View style={styles.contur}>
                  <CustomText text={countryDetails.capital} />
                  <CustomText text={countryDetails.population} />
                  <CustomText text={countryDetails.area} />
                  {countryDetails.currencies.map(item => (
                    <CustomText text={item.code} />
                  ))}
                  {countryDetails.timezones.map(item => (
                    <CustomText text={item} />
                  ))}
                </View>
              </View>
            </View>
            <View>
              <Text>Neighbours</Text>
            </View>
          </View>
        </ScrollView>
      )}
      {!isLoading && error && <Error message={error} />}
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: Dimensions.get('screen').height * 0.3,
    width: '100%',
    borderBottomRightRadius: Dimen.dim30,
    borderBottomLeftRadius: Dimen.dim30,
    overflow: 'hidden',
  },
  countryDetailsContainer: {
    marginTop: Dimen.dim30,
    flexDirection: 'row',
  },
  contur: {
    marginStart: 40,
  },
});

export default DetailsScreen;
