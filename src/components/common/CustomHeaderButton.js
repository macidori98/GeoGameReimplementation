import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HeaderButton} from 'react-navigation-header-buttons';
import Colors from '~/theme/Colors';

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Colors.red}
    />
  );
};

export default CustomHeaderButton;
