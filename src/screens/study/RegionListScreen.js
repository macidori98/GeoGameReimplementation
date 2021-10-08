import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import SimpleCustomButton from '@/components/SimpleCustomButton';
import {Regions} from '@/constants/ConstantValues';
import * as CommonStyles from '@/theme/CommonStyles';

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
        renderItem={({item}) => (
          <SimpleCustomButton
            item={item}
            onPress={() =>
              navigation.navigate(nextRoute, {
                regionName: item.name,
                regionId: item.id,
              })
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
