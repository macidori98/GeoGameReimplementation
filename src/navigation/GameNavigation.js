import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Headers} from '~/constants/ConstantValues';
import GameConfigModal from '~/screens/game/GameConfigModal';
import GameScreen from '~/screens/game/GameScreen';
import StatisticDetailsScreen from '~/screens/game/StatisticDetailsScreen';
import StatisticsScreen from '~/screens/game/StatisticsScreen';

/**
 * @type {CreateNativeStackNavigatorType<GameNavigationParamList>}
 */
const Stack = createNativeStackNavigator();

export const GameNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen component={StatisticsScreen} name="Statistics" />
        <Stack.Screen component={GameScreen} name="Gaming" />
        <Stack.Screen
          component={StatisticDetailsScreen}
          name="StatDetails"
          options={{title: Headers.details}}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          component={GameConfigModal}
          name="GameConfig"
          options={{headerShown: false}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
