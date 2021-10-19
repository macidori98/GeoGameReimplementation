import React, {useState} from 'react';
import {View} from 'react-native';
import {RadioGroup} from 'react-native-radio-buttons-group';
import {MarginDimension} from '~/theme/Dimen';
import FontSizes from '~/theme/FontSizes';
import CustomText from '../common/CustomText';

/**
 * @param {{label: string, onPress: (buttons: import('react-native-radio-buttons-group').RadioButtonProps[]) => void, radioButtons: import('react-native-radio-buttons-group').RadioButtonProps[]}} props
 * @returns {JSX.Element}
 */
const GameConfigElement = props => {
  const [radioButtons, setRadioButtons] = useState(props.radioButtons);
  return (
    <View style={{marginBottom: MarginDimension.medium}}>
      <CustomText text={props.label} size={FontSizes.medium} />
      <RadioGroup
        containerStyle={{alignItems: 'flex-start'}}
        radioButtons={radioButtons}
        onPress={buttons => {
          props.onPress(buttons);
          setRadioButtons(buttons);
        }}
      />
    </View>
  );
};

export default GameConfigElement;
