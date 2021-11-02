import React from 'react';
import {Pressable} from 'react-native';
import Colors from '~/theme/Colors';
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
        {backgroundColor: pressed ? 'rgb(210, 230, 255)' : Colors.white},
        {borderRadius: RadiusDimension.large},
      ]}
      onPress={props.onPress}>
      {props.children}
    </Pressable>
  );
};

export default TouchableItem;
