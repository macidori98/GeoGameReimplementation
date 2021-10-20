import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabNavigaton} from './BottomNavigation';
import GameConfigModal from '~/screens/game/GameConfigModal';

/**
 * @type {CreateNativeStackNavigatorType<MainNavigationParamList>}
 */
const Stack = createNativeStackNavigator();

export const MainNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={BottomTabNavigaton} name="MainScreens" />
      <Stack.Screen
        component={GameConfigModal}
        name="Modal"
        options={{presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};
