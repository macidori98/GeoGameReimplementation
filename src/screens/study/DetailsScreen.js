import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';
import * as RNLocalize from 'react-native-localize';
import CountryCard from '~/components/CountryCard';
import CustomText from '~/components/CustomText';
import Error from '~/components/Error';
import TimeZone from '~/components/TimeZone';
import LoadingIndicator from '~/components/LoadingIndicator';
import TouchableItem from '~/components/TouchableItem';
import {DetailLabel} from '~/constants/ConstantValues';
import * as CommonStyles from '~/theme/CommonStyles';
import {MarginDimension, RadiusDimension} from '~/theme/Dimen';
import DetailRow from '~/components/DetailRow';
import FontSizes from '~/theme/FontSizes';
import {getCountryDetailsWithBorders} from '~/mapper/CountryMapper';
import {getCurrenciesComparedToLocalCurrencies} from '~/mapper/ExchangeMapper';

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
  const [countryDetails, setCountryDetiails] = useState(null);

  /**
   * @type {ComponentState<Country[]>}
   */
  const [borders, setBorders] = useState(null);

  /**
   * @type {ComponentState<string>}
   */
  const [rate, setRate] = useState();

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

  const loadCurrencyRates = useCallback(async () => {
    const result = await getCurrenciesComparedToLocalCurrencies(
      countryDetails.currencies[0],
      RNLocalize.getCurrencies()[0],
    );

    if (result.success === true) {
      setRate(
        '1 ' +
          countryDetails.currencies[0] +
          ' = ' +
          `${result.data} ` +
          RNLocalize.getCurrencies()[0],
      );
    }
  }, [countryDetails]);

  useEffect(() => {
    if (countryDetails) {
      loadCurrencyRates();
    }
  }, [countryDetails, loadCurrencyRates]);

  useEffect(() => {
    loadCountryData();
  }, [loadCountryData]);

  const createCountryDetails = () => (
    <ScrollView>
      <View style={CommonStyles.styles.screen}>
        <View style={styles.imageContainer}>
          <Image
            style={CommonStyles.styles.screen}
            source={{uri: countryDetails.flag}}
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
          {!rate && (
            <CustomText key={DetailLabel.loading} text={DetailLabel.loading} />
          )}
          {rate && <CustomText key={rate} text={rate} />}
        </DetailRow>

        <DetailRow label={DetailLabel.timezones}>
          <TimeZone timezones={countryDetails.timezones} />
        </DetailRow>
        <View>
          <View style={styles.borderTextContainer}>
            <Text style={styles.label}>{DetailLabel.borders}</Text>
          </View>
          {borders?.length > 0 ? (
            borders?.map(item => (
              <TouchableItem
                key={item.capital}
                onPress={() => {
                  setRate(null);
                  props.navigation.navigate('Details', {
                    countryName: item.name,
                    countryCode: item.code,
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
  );

  return (
    <>
      {isLoading && !error && <LoadingIndicator />}
      {!isLoading && !error && countryDetails && createCountryDetails()}
      {!isLoading && error && <Error message={error} />}
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: Dimensions.get('screen').height * 0.3,
    width: '100%',
    borderBottomRightRadius: RadiusDimension.extraLarge,
    borderBottomLeftRadius: RadiusDimension.extraLarge,
    overflow: 'hidden',
  },
  borderTextContainer: {
    ...CommonStyles.styles.centered,
    marginTop: MarginDimension.medium,
  },
  label: {
    fontWeight: 'bold',
    fontSize: FontSizes.large,
  },
});

export default DetailsScreen;
