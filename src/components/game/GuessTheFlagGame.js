import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {GameTypes, GameTypesObjects} from '~/constants/ConstantValues';
import Colors from '~/theme/Colors';
import {gameComponentStyles} from '~/theme/CommonStyles';

/**
 * @param {GuessGameProps} props
 * @returns {JSX.Element}
 */
const GuessTheFlagGame = props => {
  const {data, onItemSelected, givenAnswer} = props;

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
              <Text
                style={{
                  ...styles.centeredText,
                  color:
                    givenAnswer !== '' && givenAnswer === item
                      ? Colors.darkBlue
                      : Colors.white,
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = gameComponentStyles;

export default GuessTheFlagGame;
