import React from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import StatisticsItem from '~/components/StatisticsItem';
import * as CommonStyles from '~/theme/CommonStyles';

/**
 * @param {StatisticsScreenProps} props
 */
const StatisticsScreen = props => {
  return (
    <View style={CommonStyles.styles.centered}>
      <View style={{backgroundColor: 'black'}}>
        <Button title="Play game" onPress={() => {}} />
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
