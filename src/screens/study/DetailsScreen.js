import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';
import {getCountryDetailsWithBorders} from '~/api/Service';
import CountryCard from '~/components/CountryCard';
import CustomText from '~/components/CustomText';
import Error from '~/components/Error';
import TimeZone from '~/components/TimeZone';
import LoadingIndicator from '~/components/LoadingIndicator';
import TouchableItem from '~/components/TouchableItem';
import {DetailLabel} from '~/constants/ConstantValues';
import * as CommonStyles from '~/theme/CommonStyles';
import Dimen from '~/theme/Dimen';
import DetailRow from '~/components/DetailRow';
import FontSizes from '~/theme/FontSizes';

/**
 * @param {DetailsScreenProps} props
 * @returns
 */
const DetailsScreen = props => {
  const {countryCode} = props.route.params;

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

  return (
    <>
      {isLoading && !error && !countryDetails && (
        <View style={CommonStyles.styles.screen}>
          <LoadingIndicator />
        </View>
      )}
      {!isLoading && !error && countryDetails && (
        <ScrollView>
          <View style={CommonStyles.styles.screen}>
            <View style={styles.imageContainer}>
              <Image
                style={CommonStyles.styles.screen}
                source={{uri: countryDetails.flags.png}}
              />
            </View>
            <DetailRow label={DetailLabel.capital}>
              <CustomText text={countryDetails.capital} />
            </DetailRow>
            <DetailRow label={DetailLabel.population}>
              <CustomText text={countryDetails.population} />
            </DetailRow>
            <DetailRow label={DetailLabel.area}>
              <CustomText text={countryDetails.area} />
            </DetailRow>
            <DetailRow label={DetailLabel.currency}>
              {countryDetails.currencies.map(item => (
                <CustomText key={item.code} text={item.code} />
              ))}
            </DetailRow>
            <DetailRow label={DetailLabel.timezones}>
              <TimeZone timezones={countryDetails.timezones} />
            </DetailRow>
            <View>
              <View style={styles.borderTextContainer}>
                <Text style={styles.label}>Borders</Text>
              </View>
              {borders?.length > 0 ? (
                borders?.map(item => (
                  <TouchableItem
                    key={item.capital}
                    onPress={() => {
                      props.navigation.navigate('Details', {
                        countryName: item.name,
                        countryCode: item.alpha2Code,
                      });
                    }}>
                    <CountryCard country={item} />
                  </TouchableItem>
                ))
              ) : (
                <View style={styles.borderTextContainer}>
                  <CustomText text={DetailLabel.noBorder} />
                </View>
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
  borderTextContainer: {
    ...CommonStyles.styles.centered,
    marginTop: Dimen.dim20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: FontSizes.large,
  },
});

export default DetailsScreen;
