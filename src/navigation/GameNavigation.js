import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Headers} from '~/constants/ConstantValues';
import GameScreen from '~/screens/game/GameScreen';
import StatisticDetailsScreen from '~/screens/game/StatisticDetailsScreen';
import StatisticsScreen from '~/screens/game/StatisticsScreen';

/**
 * @type {CreateNativeStackNavigatorType<GameNavigationParamList>}
 */
const Stack = createStackNavigator();

export const GameNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={StatisticsScreen} name="Statistics" />
      <Stack.Screen component={GameScreen} name="Gaming" />
      <Stack.Screen
        component={StatisticDetailsScreen}
        name="StatDetails"
        options={{title: Headers.details}}
      />
    </Stack.Navigator>
  );
};
