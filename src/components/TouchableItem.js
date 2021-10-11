import React from 'react';
import {Pressable} from 'react-native';
import Dimen from '~/theme/Dimen';

const TouchableItem = ({onPress, children}) => {
  return (
    <Pressable
      style={({pressed}) => [
        {backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white'},
        {borderRadius: Dimen.dim20},
      ]}
      onPress={onPress}>
      {children}
    </Pressable>
  );
};

export default TouchableItem;
