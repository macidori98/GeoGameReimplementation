import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import SimpleCustomButton from '../../components/SimpleCustomButton';
import {Regions} from '../../constants/ConstantValues';
import * as countryAction from '../../store/actions/countries';

const RegionListScreen = ({navigation, route}) => {
  const {nextRoute} = route.params;

  const dispatch = useDispatch();

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
                dispatch(countryAction.deleteError());
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RegionListScreen;
