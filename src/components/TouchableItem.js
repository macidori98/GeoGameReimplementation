import React from 'react';
import {Platform, TouchableNativeFeedback} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const TouchableItem = ({onPress, children}) => {
  /**
   * @type {React.ElementType}
   */
  const Touchable =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <Touchable
      onPress={() => {
        onPress();
      }}>
      {children}
    </Touchable>
  );
};

export default TouchableItem;
