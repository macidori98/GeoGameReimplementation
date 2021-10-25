import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as CommonStyles from '~/theme/CommonStyles';
import TouchableItem from '~/components/common/TouchableItem';
import ShadowedTextContainer from '~/components/common/ShadowedTextContainer';
import GameDetailsItem from '~/components/game/GameDetailsItem';
import {HelperButtonsLabel} from '~/constants/ConstantValues';

/**
 * @param {StatisticDetailsModalProps} props
 * @returns {JSX.Element}
 */
const StatisticDetailsModal = props => {
  const {data} = props.route.params;
  return (
    <View style={styles.container}>
      <GameDetailsItem data={data} />
      <View>
        <TouchableItem
          onPress={() => {
            props.route.params.onBack();
          }}>
          <ShadowedTextContainer title={HelperButtonsLabel.back} />
        </TouchableItem>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.styles.centered,
    ...CommonStyles.styles.screen,
  },
});

export default StatisticDetailsModal;
