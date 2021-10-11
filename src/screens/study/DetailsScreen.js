import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, View, ScrollView} from 'react-native';
import {getCountryDetailsWithBorders} from '~/api/Service';
import CountryCard from '~/components/CountryCard';
import CustomText from '~/components/CustomText';
import Error from '~/components/Error';
import HourList from '~/components/HourList';
import LoadingIndicator from '~/components/LoadingIndicator';
import TouchableItem from '~/components/TouchableItem';
import {Headers} from '~/constants/ConstantValues';
import * as CommonStyles from '~/theme/CommonStyles';
import Dimen from '~/theme/Dimen';

const DetailsScreen = ({navigation, route}) => {
  /**
   * @type {{countryCode: string, nextRoute: string}}
   */
  const {countryCode, nextRoute} = route.params;

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

  /**
   * @type {ComponentState<Country[]>}
   */
  const [borders, setBorders] = useState(null);

  const loadCountryData = useCallback(async () => {
    setIsLoading(true);
    const result = await getCountryDetailsWithBorders(countryCode);

    if (result.success === true) {
      setCountryDetiails(result.data.countryDetails);
      setBorders(result.data.borders);
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
                  <CustomText text="Neighbours:" />
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
                  <HourList timezones={countryDetails.timezones} />
                </View>
              </View>
            </View>
            <View>
              {borders?.length > 0 ? (
                borders?.map(item => (
                  <TouchableItem
                    onPress={() => {
                      navigation.navigate(nextRoute, {
                        countryCode: item.alpha2Code,
                      });
                    }}>
                    <CountryCard country={item} />
                  </TouchableItem>
                ))
              ) : (
                <CustomText text="No borders" />
              )}
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
