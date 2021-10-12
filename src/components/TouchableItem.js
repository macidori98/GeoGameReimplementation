import React from 'react';
import {Pressable} from 'react-native';
import {RadiusDimension} from '~/theme/Dimen';

/**
 *
 * @param {TouchableItemProps} props
 * @returns {JSX.Element}
 */
const TouchableItem = props => {
  return (
    <Pressable
      style={({pressed}) => [
        {backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white'},
        {borderRadius: RadiusDimension.large},
      ]}
      onPress={props.onPress}>
      {props.children}
    </Pressable>
  );
};

export default TouchableItem;
