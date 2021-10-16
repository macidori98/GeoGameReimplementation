import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
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
import FontSizes from '~/theme/FontSizes';
import {getCountryDetailsWithBordersAndCurrency} from '~/service/DataService';
import GenericComponent from '~/components/GenericComponent';
import {convertDataForSectionList} from '~/helpers/DataConverter';
import Colors from '~/theme/Colors';

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

  /**
   * @type {SectionListDataType}
   */
  var DATA = [];

  if (details) {
    DATA = convertDataForSectionList(details);
  }

  const createCountryDetailsSectionList = () => (
    <View style={CommonStyles.styles.screen}>
      <SectionList
        sections={DATA}
        renderItem={({item}) => {
          switch (item.typeIdentifier) {
            case 'flag':
              return (
                <View style={styles.imageContainer}>
                  <Image
                    style={CommonStyles.styles.screen}
                    source={{uri: item.png}}
                  />
                </View>
              );
            case 'text':
              return <CustomText text={item.text} />;
            case 'exchnage':
              return item.exchanges.map(i => (
                <CustomText
                  key={i.from + i.to}
                  text={`1 ${i.from} = ${i.value} ${i.to}`}
                />
              ));
            case 'timezones':
              return <TimeZone timezones={item.timezones} />;
            case 'neighbour':
              return item.borders.length > 0 ? (
                item.borders.map(i => (
                  <TouchableItem
                    key={i.code}
                    onPress={() => {
                      setDetails(null);
                      props.navigation.navigate('Details', {
                        countryName: i.name,
                        countryCode: i.code,
                      });
                    }}>
                    <CountryCard country={i} />
                  </TouchableItem>
                ))
              ) : (
                <View style={styles.borderTextContainer}>
                  <CustomText text={DetailLabel.noBorder} />
                </View>
              );
            default:
              return <Text>123</Text>;
          }
        }}
        renderSectionHeader={({section: {title}}) => (
          <View style={styles.titleContainer}>
            <CustomText text={title} size={FontSizes.large} />
          </View>
        )}
      />
    </View>
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
  titleContainer: {
    backgroundColor: Colors.white,
    padding: 10,
    alignItems: 'center',
  },
});

export default DetailsScreen;
