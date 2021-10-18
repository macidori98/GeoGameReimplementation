import React from 'react';
import {StyleSheet, View, Image, Text, Platform} from 'react-native';
import Colors from '~/theme/Colors';
import * as CommonStyles from '~/theme/CommonStyles';
import {
  HeightDimension,
  MarginDimension,
  PaddingDimension,
  RadiusDimension,
} from '~/theme/Dimen';
import FontSizes from '~/theme/FontSizes';

/**
 * @param {CountryCardProps} props
 * @returns {JSX.Element}
 */
const CountryCard = props => {
  return (
    <View style={styles.container}>
      <View
        style={{
          ...CommonStyles.styles.centered,
          ...CommonStyles.styles.screen,
        }}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: props.country.flag}} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {props.country.name} ({props.country.code})
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    borderTopRightRadius: RadiusDimension.large,
    borderTopLeftRadius: RadiusDimension.large,
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    width: '100%',
    height: HeightDimension.extraLarge,
  },
  container: {
    backgroundColor: Colors.white,
    marginVertical: MarginDimension.small,
    borderRadius: RadiusDimension.large,
    ...CommonStyles.styles.myShadow,
    margin: MarginDimension.large,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  textContainer: {
    margin: MarginDimension.small,
    height: HeightDimension.medium,
    ...CommonStyles.styles.centered,
  },
  text: {
    fontSize: FontSizes.medium,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: PaddingDimension.large,
    color: Colors.black,
  },
});

export default CountryCard;
