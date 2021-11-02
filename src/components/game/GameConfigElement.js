import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RadioGroup} from 'react-native-radio-buttons-group';
import {MarginDimension} from '~/theme/Dimen';
import FontSizes from '~/theme/FontSizes';
import CustomText from '../common/CustomText';

/**
 * @param {GameConfigElementProps} props
 * @returns {JSX.Element}
 */
const GameConfigElement = props => {
  const {onPress, label} = props;
  const [radioButtons, setRadioButtons] = useState(props.radioButtons);
  return (
    <View style={styles.container}>
      <CustomText text={label} size={FontSizes.medium} />
      <RadioGroup
        containerStyle={styles.radioGroup}
        radioButtons={radioButtons}
        onPress={buttons => {
          onPress(buttons);
          setRadioButtons(buttons);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: MarginDimension.medium,
  },
  radioGroup: {
    alignItems: 'flex-start',
  },
});

export default GameConfigElement;
