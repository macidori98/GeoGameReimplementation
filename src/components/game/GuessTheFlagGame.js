import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {GameTypes, GameTypesObjects} from '~/constants/ConstantValues';
import Colors from '~/theme/Colors';
import {
  HeightDimension,
  MarginDimension,
  RadiusDimension,
  WidthDimension,
} from '~/theme/Dimen';
import FontSizes from '~/theme/FontSizes';

/**
 * @param {GuessGameProps} props
 * @returns {JSX.Element}
 */
const GuessTheFlagGame = props => {
  const {data, onItemSelected} = props;

  return (
    <View>
      <Text style={styles.question}>
        {GameTypesObjects.find(item => item.id === GameTypes.guessTheFlag).name}
      </Text>
      <Image
        resizeMode={'cover'}
        style={styles.image}
        source={{
          uri: `${data.question}`,
        }}
      />
      <View style={styles.list}>
        <FlatList
          data={data.options}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => onItemSelected(item)}>
              <Text style={styles.centeredText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  question: {
    margin: MarginDimension.large,
    fontWeight: 'bold',
    fontSize: FontSizes.large,
    textAlign: 'center',
  },
  image: {
    alignSelf: 'center',
    width: WidthDimension.extraLarge,
    height: HeightDimension.extraLarge,
    marginTop: MarginDimension.large,
    borderRadius: RadiusDimension.large,
  },
  list: {
    flexDirection: 'row',
  },
  listItem: {
    width: WidthDimension.extraLarge,
    height: HeightDimension.large,
    backgroundColor: Colors.darkPink,
    margin: MarginDimension.small,
    alignSelf: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: RadiusDimension.large,
    borderBottomRightRadius: RadiusDimension.large,
  },
  centeredText: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontWeight: 'bold',
  },
});

export default GuessTheFlagGame;
