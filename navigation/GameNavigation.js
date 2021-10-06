import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import GameScreen from '../screens/game/GameScreen';
import StatisticsScreen from '../screens/game/StatisticsScreen';

/**
 * @type {CreateNativeStackNavigatorType<GameNavigationParamList>}
 */
const Stack = createStackNavigator();

export const GameNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={StatisticsScreen} name="Statistics" />
      <Stack.Screen component={GameScreen} name="Gaming" />
    </Stack.Navigator>
  );
};
