import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabNavigaton} from './BottomNavigation';
import GameConfigModal from '~/screens/game/GameConfigModal';
import StatisticDetailsModal from '~/screens/game/StatisticDetailsModal';

/**
 * @type {CreateNativeStackNavigatorType<MainNavigationParamList>}
 */
const Stack = createNativeStackNavigator();

export const MainNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={BottomTabNavigaton} name="MainScreens" />
      <Stack.Screen component={ModalNavigation} name="ModalScreens" />
    </Stack.Navigator>
  );
};

/**
 * @type {CreateNativeStackNavigatorType<ModalScreensParamList>}
 */
const ModalStack = createNativeStackNavigator();

export const ModalNavigation = () => {
  return (
    <ModalStack.Navigator screenOptions={{headerShown: false}}>
      <ModalStack.Group screenOptions={{presentation: 'modal'}}>
        <ModalStack.Screen component={GameConfigModal} name="GameConfigModal" />
        <ModalStack.Screen
          component={StatisticDetailsModal}
          name="EndGameModal"
        />
      </ModalStack.Group>
    </ModalStack.Navigator>
  );
};

const MainStack = createNativeStackNavigator();

export const MainMainNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen component={MainNavigation} name="Main" />
    </MainStack.Navigator>
  );
};
