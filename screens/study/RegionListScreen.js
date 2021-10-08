import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import SimpleCustomButton from '../../components/SimpleCustomButton';
import {Regions} from '../../constants/ConstantValues';
import * as CommonStyles from '../../theme/CommonStyles';

/**
 *
 * @param {{navigation: object, route: {params: {nextRoute: string}}}} param0
 * @returns
 */
const RegionListScreen = ({navigation, route}) => {
  const {nextRoute} = route.params;

  return (
    <View style={styles.screen}>
      <FlatList
        data={Regions}
        keyExtractor={(item, _) => item.name}
        renderItem={({item}) => (
          <SimpleCustomButton
            item={item}
            onPress={
              /**@param {string} regionName*/ regionName => {
                navigation.navigate(nextRoute, {region: regionName});
              }
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    ...CommonStyles.styles.screen,
    ...CommonStyles.styles.centered,
  },
});

export default RegionListScreen;
