import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import StatisticsItem from '~/components/game/StatisticsItem';
import TouchableItem from '~/components/common/TouchableItem';
import * as CommonStyles from '~/theme/CommonStyles';
import {MarginDimension} from '~/theme/Dimen';
import ShadowedTextContainer from '~/components/common/ShadowedTextContainer';
import {ConfigLabels} from '~/constants/ConstantValues';

/**
 * @param {StatisticsScreenProps} props
 * @returns {JSX.Element}
 */
const StatisticsScreen = props => {
  const createStatisticsView = () => (
    <ScrollView>
      <View style={CommonStyles.styles.centered}>
        <TouchableItem
          onPress={() => {
            props.navigation.navigate('GameConfig', {
              onStartGame: /**@param {GameData} data*/ data => {
                props.navigation.goBack();
                props.navigation.navigate('Gaming', {data: data});
              },
            });
          }}>
          <ShadowedTextContainer title={ConfigLabels.configGame} />
        </TouchableItem>
      </View>
      {[
        {
          //data will come from redux
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
  );

  return <>{createStatisticsView()}</>;
};

const styles = StyleSheet.create({
  itemContainer: {
    margin: MarginDimension.small,
    ...CommonStyles.styles.centered,
  },
});

export default StatisticsScreen;
