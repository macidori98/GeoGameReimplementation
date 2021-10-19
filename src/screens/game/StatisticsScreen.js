import React, {useState} from 'react';
import {Modal, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import StatisticsItem from '~/components/game/StatisticsItem';
import TouchableItem from '~/components/common/TouchableItem';
import * as CommonStyles from '~/theme/CommonStyles';
import {MarginDimension} from '~/theme/Dimen';
import ShadowedTextContainer from '~/components/common/ShadowedTextContainer';
import {
  GameTypes,
  NumberOfQuestions,
  Regions,
} from '~/constants/ConstantValues';
import GameConfigElement from '~/components/game/GameConfigElement';

/**
 * @param {StatisticsScreenProps} props
 * @returns {JSX.Element}
 */
const StatisticsScreen = props => {
  /**
   * @type {ComponentState<boolean>}
   */
  const [isModalVisible, setIsModalVisible] = useState(true);

  /**
   * @type {ComponentState<boolean>}
   */
  const [isButtonVisible, setIsButtonVisible] = useState(false);

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
    <>
      {isModalVisible && (
        <Modal animationType="fade" visible={isModalVisible}>
          <SafeAreaView>
            <ScrollView>
              <View style={{marginHorizontal: MarginDimension.large}}>
                {isButtonVisible && (
                  <View style={{...CommonStyles.styles.centered}}>
                    <TouchableItem
                      onPress={() => {
                        setIsModalVisible(false);
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
      )}
      {!isModalVisible && (
        <ScrollView>
          <View style={CommonStyles.styles.centered}>
            <TouchableItem
              onPress={() => {
                setIsModalVisible(true);
              }}>
              <ShadowedTextContainer title="Play game" />
            </TouchableItem>
          </View>
          {[
            {
              correctAns: 3,
              date: 'datee',
              time: 'timee',
              duration: 'duratioon',
            },
          ].map((item, index) => (
            <View style={styles.itemContainer} key={item.date + index}>
              <TouchableItem
                onPress={() => {
                  props.navigation.navigate('StatDetails', {data: item});
                }}>
                <StatisticsItem data={item} />
              </TouchableItem>
            </View>
          ))}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    margin: MarginDimension.small,
    ...CommonStyles.styles.centered,
  },
});

export default StatisticsScreen;
