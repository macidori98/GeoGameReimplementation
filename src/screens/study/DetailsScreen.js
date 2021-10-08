import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import CustomText from '~/components/CustomText';
import * as CommonStyles from '~/theme/CommonStyles';
import Dimen from '~/theme/Dimen';

const DetailsScreen = ({navigation, route}) => {
  /**
   * @type {{countryDetails: Country}}
   */
  const {countryDetails} = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: `${countryDetails.name} (${countryDetails.alpha2Code})`,
    });
  }, [countryDetails, navigation]);

  return (
    <ScrollView>
      <View style={CommonStyles.styles.screen}>
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
