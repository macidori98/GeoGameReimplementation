import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ShadowedTextContainer from '~/components/ShadowedTextContainer';
import StatisticsItem from '~/components/StatisticsItem';
import TouchableItem from '~/components/TouchableItem';
import * as CommonStyles from '~/theme/CommonStyles';

/**
 * @param {StatisticsScreenProps} props
 */
const StatisticsScreen = props => {
  return (
    <View style={CommonStyles.styles.centered}>
      <View>
        <TouchableItem onPress={() => {}}>
          <ShadowedTextContainer title="Play game" />
        </TouchableItem>
      </View>
      <FlatList
        data={['egyszer', 'ketszer', 'haromszor']}
        keyExtractor={(item, index) => index.toString() + item}
        renderItem={({item}) => <StatisticsItem data={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default StatisticsScreen;
