import React, {useState} from 'react';
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
  const [selectedGameTypeRadioButtons, setSelectedGameTyoeRadioButtons] =
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

  const areAllDataSelected = () => {
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

              <GameConfigElement
                radioButtons={selectedRegionRadioButtons}
                label={ConfigLabels.region}
                onPress={buttons => {
                  setSelectedRegionRadioButtons(buttons);
                  areAllDataSelected();
                }}
              />

              <GameConfigElement
                radioButtons={selectedGameTypeRadioButtons}
                label={ConfigLabels.gameType}
                onPress={buttons => {
                  setSelectedGameTyoeRadioButtons(buttons);
                  areAllDataSelected();
                }}
              />

              <GameConfigElement
                radioButtons={selectedNumOfQuestionsRadioButtons}
                label={ConfigLabels.numberOfQuestions}
                onPress={buttons => {
                  setSelectedNumOfQuestionsRadioButtons(buttons);
                  areAllDataSelected();
                }}
              />
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
