import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import ShadowedTextContainer from '~/components/ShadowedTextContainer';
import StatisticsItem from '~/components/StatisticsItem';
import TouchableItem from '~/components/TouchableItem';
import * as CommonStyles from '~/theme/CommonStyles';
import {MarginDimension} from '~/theme/Dimen';

/**
 * @param {StatisticsScreenProps} props
 */
const StatisticsScreen = props => {
  return (
    <ScrollView>
      <View style={CommonStyles.styles.centered}>
        <TouchableItem onPress={() => {}}>
          <ShadowedTextContainer title="Play game" />
        </TouchableItem>
      </View>
      {[
        'egyszer',
        'ketszer',
        'haromszor',
        'egyszer',
        'ketszer',
        'egyszer',
        'ketszer',
      ].map((item, index) => (
        <View style={styles.itemContainer} key={item + index}>
          <TouchableItem onPress={() => {}}>
            <StatisticsItem data={item} />
          </TouchableItem>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    margin: MarginDimension.small,
    ...CommonStyles.styles.centered,
  },
});

export default StatisticsScreen;
