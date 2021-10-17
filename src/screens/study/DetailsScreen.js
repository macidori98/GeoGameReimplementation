import React, {useCallback, useEffect} from 'react';
import {Dimensions, Image, StyleSheet, View, SectionList} from 'react-native';
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

/**
 * @param {DetailsScreenProps} props
 * @returns
 */
const DetailsScreen = props => {
  const {countryCode} = props.route.params;

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
   * @param {SectionListDataType} data
   * @returns {JSX.Element}
   */
  const createCountryDetailsSectionList = data => (
    <View style={CommonStyles.styles.screen}>
      <SectionList
        sections={data}
        renderItem={({item}) => {
          switch (item.typeIdentifier) {
            case 'flag':
              return (
                <View key={item.typeIdentifier} style={styles.imageContainer}>
                  <Image
                    style={CommonStyles.styles.screen}
                    source={{uri: item.png}}
                  />
                </View>
              );
            case 'text':
              return (
                <View
                  key={item.typeIdentifier}
                  style={{...CommonStyles.styles.centered}}>
                  <CustomText text={item.text} size={FontSizes.medium} />
                </View>
              );
            case 'exchnage':
              return item.exchanges.map(i => (
                <View
                  key={item.typeIdentifier}
                  style={{...CommonStyles.styles.centered}}>
                  <CustomText
                    key={i.from + i.to}
                    text={`1 ${i.from} = ${i.value} ${i.to}`}
                    size={FontSizes.medium}
                  />
                </View>
              ));
            case 'timezones':
              return <TimeZone timezones={item.timezones} />;
            case 'neighbour':
              return item.borders.length > 0 ? (
                item.borders.map(i => (
                  <TouchableItem
                    key={i.code}
                    onPress={() => {
                      props.navigation.navigate('Details', {
                        countryName: i.name,
                        countryCode: i.code,
                      });
                    }}>
                    <CountryCard country={i} />
                  </TouchableItem>
                ))
              ) : (
                <View
                  key={item.typeIdentifier}
                  style={styles.borderTextContainer}>
                  <CustomText
                    text={DetailLabel.noBorder}
                    size={FontSizes.medium}
                  />
                </View>
              );
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
    <GenericComponent
      onDataRecieved={
        /**@param {CountryDetailsType} data */ data => {
          const convertedData = convertDataForSectionList(data);
          return createCountryDetailsSectionList(convertedData);
        }
      }
      loadData={loadCountryData}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: Dimensions.get('screen').height * 0.3,
    width: '100%',
    borderBottomRightRadius: RadiusDimension.extraLarge,
    borderBottomLeftRadius: RadiusDimension.extraLarge,
    borderTopRightRadius: RadiusDimension.extraLarge,
    borderTopLeftRadius: RadiusDimension.extraLarge,
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
    padding: 10,
    alignItems: 'center',
  },
});

export default DetailsScreen;
