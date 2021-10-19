import React, {useEffect, useState} from 'react';
import {Modal, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {
  CommonRadioButtonProps,
  ConfigLabels,
  GameTypes,
  NumberOfQuestions,
  Regions,
} from '~/constants/ConstantValues';
import {MarginDimension} from '~/theme/Dimen';
import TouchableItem from '../common/TouchableItem';
import GameConfigElement from './GameConfigElement';
import * as CommonStyles from '~/theme/CommonStyles';
import ShadowedTextContainer from '../common/ShadowedTextContainer';

/**
 *
 * @param {GameConfigModalProps} props
 * @returns {JSX.Element}
 */
const GameConfigModal = props => {
  const {onStartGame, onClose} = props;

  /**
   * @type {ComponentState<import('react-native-radio-buttons-group').RadioButtonProps[]>}
   */
  const [selectedRegionRadioButtons, setSelectedRegionRadioButtons] =
    useState(null);

  /**
   * @type {ComponentState<import('react-native-radio-buttons-group').RadioButtonProps[]>}
   */
  const [selectedGameTypeRadioButtons, setSelectedGameTypeRadioButtons] =
    useState(null);

  /**
   * @type {ComponentState<import('react-native-radio-buttons-group').RadioButtonProps[]>}
   */
  const [
    selectedNumOfQuestionsRadioButtons,
    setSelectedNumOfQuestionsRadioButtons,
  ] = useState(null);

  /**
   * @type {ComponentState<boolean>}
   */
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    const areAllDataSelected = () => {
      if (
        selectedNumOfQuestionsRadioButtons &&
        selectedRegionRadioButtons &&
        selectedGameTypeRadioButtons
      ) {
        setIsButtonVisible(true);
      }
    };

    areAllDataSelected();
  }, [
    selectedGameTypeRadioButtons,
    selectedNumOfQuestionsRadioButtons,
    selectedRegionRadioButtons,
  ]);

  /**
   * @type {GameConfigElementModel[]}
   */
  const configurationData = [
    {
      text: ConfigLabels.region,
      buttons: Regions.map(reg => {
        return {
          ...CommonRadioButtonProps,
          id: reg.id,
          label: reg.name,
          value: reg.id,
        };
      }),
      onPress: buttons => {
        setSelectedRegionRadioButtons(buttons);
      },
    },
    {
      text: ConfigLabels.gameType,
      buttons: GameTypes.map(reg => {
        return {
          ...CommonRadioButtonProps,
          id: reg.id,
          label: reg.name,
          value: reg.id,
        };
      }),
      onPress: buttons => {
        setSelectedGameTypeRadioButtons(buttons);
      },
    },
    {
      text: ConfigLabels.numberOfQuestions,
      buttons: NumberOfQuestions.map(reg => {
        return {
          ...CommonRadioButtonProps,
          id: reg.id,
          label: reg.name,
          value: reg.id,
        };
      }),
      onPress: buttons => {
        setSelectedNumOfQuestionsRadioButtons(buttons);
      },
    },
  ];

  return (
    <SafeAreaView>
      <Modal animationType="fade">
        <SafeAreaView>
          <ScrollView>
            <View style={styles.container}>
              {isButtonVisible && (
                <View style={styles.centeredButton}>
                  <TouchableItem
                    onPress={() => {
                      onStartGame({
                        gameType: selectedGameTypeRadioButtons.find(
                          item => item.selected === true,
                        ).id,
                        numOfQuestions: parseInt(
                          selectedNumOfQuestionsRadioButtons.find(
                            item => item.selected === true,
                          ).id,
                          10,
                        ),
                        region: selectedRegionRadioButtons.find(
                          item => item.selected === true,
                        ).id,
                      });
                    }}>
                    <ShadowedTextContainer title={ConfigLabels.startGame} />
                  </TouchableItem>
                </View>
              )}

              {configurationData.map(item => (
                <GameConfigElement
                  key={item.text}
                  radioButtons={item.buttons}
                  label={item.text}
                  onPress={item.onPress}
                />
              ))}
            </View>
            <View style={styles.centeredButton}>
              <TouchableItem onPress={onClose}>
                <ShadowedTextContainer title={ConfigLabels.closeConfigGame} />
              </TouchableItem>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: MarginDimension.large,
  },
  centeredButton: {
    ...CommonStyles.styles.centered,
  },
});

export default GameConfigModal;