import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  CommonRadioButtonProps,
  ConfigLabels,
  GameTypesObjects,
  HelperButtonsLabel,
  NumberOfQuestions,
  Regions,
} from '~/constants/ConstantValues';
import {MarginDimension} from '~/theme/Dimen';
import TouchableItem from '../../components/common/TouchableItem';
import GameConfigElement from '../../components/game/GameConfigElement';
import * as CommonStyles from '~/theme/CommonStyles';
import ShadowedTextContainer from '../../components/common/ShadowedTextContainer';
import Colors from '~/theme/Colors';
import FontSizes from '~/theme/FontSizes';

/**
 * @param {GameConfigModalProps} props
 * @returns {JSX.Element}
 */
const GameConfigModal = props => {
  const {onStartGame} = props.route.params;

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
      buttons: GameTypesObjects.map(reg => {
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
    <>
      <View style={CommonStyles.styles.screen}>
        <View style={styles.navContainer}>
          <View style={styles.rowItem}>
            <TouchableItem
              onPress={() => {
                props.navigation.goBack();
              }}>
              <View style={styles.backButtonContainer}>
                <Ionicons
                  name="arrow-back-outline"
                  size={30}
                  color={Colors.darkPink}
                />
                <Text style={styles.text}>{HelperButtonsLabel.back}</Text>
              </View>
            </TouchableItem>
          </View>
          <View style={styles.rowCenteredItem}>
            <Text style={styles.title}>{ConfigLabels.configGame}</Text>
          </View>
          <View style={styles.rowItem} />
        </View>
        <ScrollView>
          <View style={styles.container}>
            {configurationData.map(item => (
              <GameConfigElement
                key={item.text}
                radioButtons={item.buttons}
                label={item.text}
                onPress={item.onPress}
              />
            ))}

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
                  <ShadowedTextContainer title={HelperButtonsLabel.startGame} />
                </TouchableItem>
              </View>
            )}

            <View style={styles.centeredButton}>
              <TouchableItem
                onPress={() => {
                  props.navigation.goBack();
                }}>
                <ShadowedTextContainer title={HelperButtonsLabel.close} />
              </TouchableItem>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: MarginDimension.large,
  },
  centeredButton: {
    flex: 1,
    ...CommonStyles.styles.centered,
  },
  navContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: MarginDimension.small,
  },
  rowItem: {
    flex: 1,
    paddingRight: 10,
  },
  text: {
    fontSize: FontSizes.medium,
    color: Colors.darkPink,
    fontWeight: '200',
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: FontSizes.medium,
  },
  rowCenteredItem: {
    flex: 1,
    paddingRight: 10,
    alignItems: 'center',
  },
});

export default GameConfigModal;
