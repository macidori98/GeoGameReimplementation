import React, {useState} from 'react';
import {Modal, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {
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
 * @param {{onStartGame: (data: {region: string, numOfQuestions: number, gameType: string}) => void}} props
 * @returns {JSX.Element}
 */
const GameConfigModal = props => {
  const {onStartGame} = props;

  /**
   * @type {ComponentState<import('react-native-radio-buttons-group').RadioButtonProps[]>}
   */
  const [selectedRegionRadioButtons, setSelectedRegionRadioButtons] = useState(
    Regions.map(reg => {
      return {id: reg.id, label: reg.name, value: reg.id, selected: false};
    }),
  );

  /**
   * @type {ComponentState<import('react-native-radio-buttons-group').RadioButtonProps[]>}
   */
  const [selectedGameTypeRadioButtons, setSelectedGameTyoeRadioButtons] =
    useState(
      GameTypes.map(reg => {
        return {id: reg.id, label: reg.name, value: reg.id, selected: false};
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
        id: reg.id,
        label: reg.name,
        value: reg.id,
        selected: false,
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
                    <ShadowedTextContainer title="Start game" />
                  </TouchableItem>
                </View>
              )}

              <GameConfigElement
                radioButtons={selectedRegionRadioButtons}
                label="Select Region"
                onPress={buttons => {
                  setSelectedRegionRadioButtons(buttons);
                  areAllDataSelected();
                }}
              />

              <GameConfigElement
                radioButtons={selectedGameTypeRadioButtons}
                label="Select Game Type"
                onPress={buttons => {
                  setSelectedGameTyoeRadioButtons(buttons);
                  areAllDataSelected();
                }}
              />

              <GameConfigElement
                radioButtons={selectedNumOfQuestionsRadioButtons}
                label="Select Number Of Questions"
                onPress={buttons => {
                  setSelectedNumOfQuestionsRadioButtons(buttons);
                  areAllDataSelected();
                }}
              />
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
