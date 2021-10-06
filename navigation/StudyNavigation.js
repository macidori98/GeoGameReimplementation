import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import CountryListScreen from '../screens/study/CountryListScreen';
import DetailsScreen from '../screens/study/DetailsScreen';
import RegionListScreen from '../screens/study/RegionListScreen';

/**
 * @type {CreateNativeStackNavigatorType<StudyNavigationParamList>}
 */
const Stack = createStackNavigator();

export const StudyNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={RegionListScreen} name="RegionList" />
      <Stack.Screen component={CountryListScreen} name="CountryList" />
      <Stack.Screen component={DetailsScreen} name="Details" />
    </Stack.Navigator>
  );
};
