import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  ScrollView,
  Text,
  SectionList,
} from 'react-native';
import * as RNLocalize from 'react-native-localize';
import CountryCard from '~/components/CountryCard';
import CustomText from '~/components/CustomText';
import TimeZone from '~/components/TimeZone';
import TouchableItem from '~/components/TouchableItem';
import {DetailLabel} from '~/constants/ConstantValues';
import * as CommonStyles from '~/theme/CommonStyles';
import {MarginDimension, RadiusDimension} from '~/theme/Dimen';
import DetailRow from '~/components/DetailRow';
import FontSizes from '~/theme/FontSizes';
import {getCountryDetailsWithBordersAndCurrency} from '~/service/DataService';
import GenericComponent from '~/components/GenericComponent';
import {createSelectorHook} from 'react-redux';

/**
 * @param {DetailsScreenProps} props
 * @returns
 */
const DetailsScreen = props => {
  const {countryCode} = props.route.params;

  /**
   * @type {ComponentState<CountryDetailsType>}
   */
  const [details, setDetails] = useState(null);

  const loadCountryData = useCallback(async () => {
    return await getCountryDetailsWithBordersAndCurrency(
      countryCode,
      RNLocalize.getCurrencies(),
    );
  }, [countryCode]);

  useEffect(() => {
    loadCountryData();
  }, [loadCountryData]);

  var DATA = [];

  if (details) {
    DATA = [
      {
        title: '',
        data: [
          <View style={styles.imageContainer}>
            <Image
              style={CommonStyles.styles.screen}
              source={{uri: details.countryDetails.flag}}
            />
          </View>,
        ],
      },
      {
        title: DetailLabel.capital,
        data: [<CustomText text={details.countryDetails.capital} />],
      },
      {
        title: DetailLabel.population,
        data: [<CustomText text={details.countryDetails.population} />],
      },
      {
        title: DetailLabel.area,
        data: [<CustomText text={details.countryDetails.area} />],
      },
      {
        title: DetailLabel.currency,
        data: [
          details.exchangeRates.map(item => (
            <CustomText
              text={'1 ' + item.from + ' = ' + item.value + ' ' + item.to}
            />
          )),
        ],
      },
      {
        title: DetailLabel.timezones,
        data: [<TimeZone timezones={details.countryDetails.timezones} />],
      },
      {
        title: DetailLabel.borders,
        data: [
          details.borders?.length > 0 ? (
            details.borders?.map(item => (
              <TouchableItem
                key={item.code}
                onPress={() => {
                  setDetails(null);
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
          ),
        ],
      },
    ];
  }

  const createCountryDetailsSectionList = () => (
    <View style={CommonStyles.styles.screen}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => item}
        renderSectionHeader={({section: {title}}) => (
          <View style={{backgroundColor: 'white', padding: 10}}>
            <View style={{alignItems: 'center'}}>
              <CustomText text={title} size={FontSizes.large} />
            </View>
          </View>
        )}
      />
    </View>
  );

  const createCountryDetails = () => (
    <ScrollView>
      <View style={CommonStyles.styles.screen}>
        <View style={styles.imageContainer}>
          <Image
            style={CommonStyles.styles.screen}
            source={{uri: details.countryDetails.flag}}
          />
        </View>
        <DetailRow label={DetailLabel.capital}>
          <CustomText text={details.countryDetails.capital} />
        </DetailRow>
        <DetailRow label={DetailLabel.population}>
          <CustomText text={details.countryDetails.population} />
        </DetailRow>
        <DetailRow label={DetailLabel.area}>
          <CustomText text={details.countryDetails.area} />
        </DetailRow>
        <DetailRow label={DetailLabel.currency}>
          {details.exchangeRates.map(item => (
            <CustomText
              key={item.from + item.to}
              text={'1 ' + item.from + ' = ' + item.value + ' ' + item.to}
            />
          ))}
        </DetailRow>

        <DetailRow label={DetailLabel.timezones}>
          <TimeZone timezones={details.countryDetails.timezones} />
        </DetailRow>
        <View>
          <View style={styles.borderTextContainer}>
            <Text style={styles.label}>{DetailLabel.borders}</Text>
          </View>
          {details.borders?.length > 0 ? (
            details.borders?.map(item => (
              <TouchableItem
                key={item.code}
                onPress={() => {
                  setDetails(null);
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
      {!details && (
        <GenericComponent
          onDataRecieved={
            /**@param {CountryDetailsType} data */ data => {
              setDetails(data);
            }
          }
          loadData={loadCountryData}
        />
      )}
      {details && createCountryDetailsSectionList()}
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
