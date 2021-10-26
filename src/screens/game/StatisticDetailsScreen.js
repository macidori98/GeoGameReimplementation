import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as CommonStyles from '~/theme/CommonStyles';
import GameDetailsItem from '~/components/game/GameDetailsItem';

/**
 * @param {StatisticDetailsScreenProps} props
 * @returns {JSX.Element}
 */
const StatisticDetailsScreen = props => {
  const {data} = props.route.params;
  return (
    <View style={styles.container}>
      <GameDetailsItem data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.gameComponentStyles.centeredScreenWithBorder,
  },
});

export default StatisticDetailsScreen;
