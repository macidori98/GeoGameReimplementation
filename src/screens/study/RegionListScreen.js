import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ShadowedTextContainer from '~/components/ShadowedTextContainer';
import TouchableItem from '~/components/TouchableItem';
import {Regions} from '~/constants/ConstantValues';
import * as CommonStyles from '~/theme/CommonStyles';

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
          <TouchableItem
            onPress={() =>
              navigation.navigate(nextRoute, {
                regionName: item.name,
                regionId: item.id,
              })
            }>
            <ShadowedTextContainer item={item} />
          </TouchableItem>
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
