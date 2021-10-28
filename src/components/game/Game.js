import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Colors from '~/theme/Colors';
import {gameComponentStyles} from '~/theme/CommonStyles';

/**
 * @param {GuessGameProps} props
 * @returns {JSX.Element}
 */
const Game = props => {
  const {data, onItemSelected, givenAnswer} = props;

  return (
    <View>
      <View>{props.children}</View>
      <View style={{}}>
        {data.options.map((item, index) => (
          <TouchableOpacity
            key={item + index}
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
        ))}
      </View>
    </View>
  );
};

const styles = gameComponentStyles;

export default Game;
