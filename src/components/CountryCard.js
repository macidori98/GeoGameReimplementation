import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import Colors from '~/theme/Colors';
import * as CommonStyles from '~/theme/CommonStyles';
import Dimen from '~/theme/Dimen';
import FontSizes from '~/theme/FontSizes';

const CountryCard = ({country}) => {
  return (
    <View style={styles.container}>
      <View style={{...CommonStyles.styles.centered}}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: country.flags.png}} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {country.name} ({country.alpha2Code})
          </Text>
        </View>
      </View>
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
    color: Colors.black,
  },
});

export default CountryCard;
