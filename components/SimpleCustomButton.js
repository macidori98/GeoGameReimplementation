import React from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import FontSizes from '../constants/FontSizes';

const dimensions = Dimensions.get('screen');

const SimpleCustomButton = props => {
  const {item, onPress} = props;
  /**
   * @type {React.ElementType}
   */
  const TouchableItem =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <TouchableItem
      onPress={() => {
        onPress(item.name);
      }}>
      <View style={{...styles.myShadow, ...styles.card}}>
        <Text style={styles.text}>{item.name}</Text>
      </View>
    </TouchableItem>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 80,
    width: dimensions.width * 0.66,
    minWidth: 100,
    borderRadius: 20,
    margin: 15,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myShadow: {
    shadowColor: Colors.black,
    shadowOpacity: 0.86,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 8,
  },
  text: {
    fontSize: FontSizes.large,
    fontWeight: '500',
    color: Colors.whiteish,
  },
});

export default SimpleCustomButton;
