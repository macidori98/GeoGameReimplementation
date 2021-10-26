import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as CommonStyles from '~/theme/CommonStyles';
import TouchableItem from '~/components/common/TouchableItem';
import ShadowedTextContainer from '~/components/common/ShadowedTextContainer';
import GameDetailsItem from '~/components/game/GameDetailsItem';
import {HelperButtonsLabel} from '~/constants/ConstantValues';
import {SafeAreaView} from 'react-native-safe-area-context';

/**
 * @param {StatisticDetailsModalProps} props
 * @returns {JSX.Element}
 */
const StatisticDetailsModal = props => {
  const {data} = props.route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <GameDetailsItem data={data} />
        <View style={CommonStyles.styles.centered}>
          <TouchableItem
            onPress={() => {
              props.route.params.onBack();
            }}>
            <ShadowedTextContainer title={HelperButtonsLabel.back} />
          </TouchableItem>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.gameComponentStyles.centeredScreenWithBorder,
  },
});

export default StatisticDetailsModal;
