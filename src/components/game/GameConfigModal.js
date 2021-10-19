import React, {useCallback, useEffect, useState} from 'react';
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
  const [selectedRegionRadioButtons, setSelectedRegionRadioButtons] = useState(
    Regions.map(reg => {
      return {
        ...CommonRadioButtonProps,
        id: reg.id,
        label: reg.name,
        value: reg.id,
      };
    }),
  );

  /**
   * @type {ComponentState<import('react-native-radio-buttons-group').RadioButtonProps[]>}
   */
  const [selectedGameTypeRadioButtons, setSelectedGameTypeRadioButtons] =
    useState(
      GameTypes.map(reg => {
        return {
          ...CommonRadioButtonProps,
          id: reg.id,
          label: reg.name,
          value: reg.id,
        };
      }),
    );

  /**
   * @type {ComponentState<import('react-native-radio-buttons-group').RadioButtonProps[]>}
   */
  const [
    selectedNumOfQuestionsRadioButtons,
    setSelectedNumOfQuestionsRadioButtons,
  ] = useState(
    NumberOfQuestions.map(reg => {
      return {
        ...CommonRadioButtonProps,
        id: reg.id,
        label: reg.name,
        value: reg.id,
      };
    }),
  );

  /**
   * @type {ComponentState<boolean>}
   */
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    const areAllDataSelected = () => {
      console.log('asdasdsadsadsadas');
      if (
        selectedNumOfQuestionsRadioButtons.findIndex(
          item => item.selected === true,
        ) > -1 &&
        selectedRegionRadioButtons.findIndex(item => item.selected === true) >
          -1 &&
        selectedGameTypeRadioButtons.findIndex(item => item.selected === true) >
          -1
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
   * @typedef {Object} GameConfigElementModel
   * @property {import('react-native-radio-buttons-group').RadioButtonProps[]} buttons
   * @property {string} text
   * @property {(buttons: import('react-native-radio-buttons-group').RadioButtonProps[]) => void} onPress
   */

  /** @type {GameConfigElementModel[]} */
  const elements = [
    {
      text: ConfigLabels.region,
      buttons: selectedRegionRadioButtons,
      onPress: buttons => {
        setSelectedRegionRadioButtons(buttons);
      },
    },
    {
      text: ConfigLabels.gameType,
      buttons: selectedGameTypeRadioButtons,
      onPress: buttons => {
        setSelectedGameTypeRadioButtons(buttons);
      },
    },
    {
      text: ConfigLabels.numberOfQuestions,
      buttons: selectedNumOfQuestionsRadioButtons,
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

              {elements.map(item => (
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
