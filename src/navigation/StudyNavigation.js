import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Headers} from '~/constants/ConstantValues';
import CountryListScreen from '~/screens/study/CountryListScreen';
import DetailsScreen from '~/screens/study/DetailsScreen';
import RegionListScreen from '~/screens/study/RegionListScreen';

/**
 * @type {CreateNativeStackNavigatorType<StudyNavigationParamList>}
 */
const Stack = createStackNavigator();

export const StudyNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={RegionListScreen}
        name="RegionList"
        options={{headerTitle: Headers.region}}
        initialParams={{nextRoute: 'CountryList'}}
      />
      <Stack.Screen
        component={CountryListScreen}
        name="CountryList"
        options={({route}) => ({title: route.params.regionName})}
        initialParams={{nextRoute: 'Details'}}
      />
      <Stack.Screen
        component={DetailsScreen}
        name="Details"
        options={({route}) => ({title: route.params.countryName})}
        initialParams={{nextRoute: 'Details'}}
      />
    </Stack.Navigator>
  );
};
