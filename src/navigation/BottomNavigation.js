import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import FontSizes from '~/theme/FontSizes';
import {GameNavigation} from './GameNavigation';
import Colors from '~/theme/Colors';
import {StudyNavigation} from './StudyNavigation';

/**
 * @type {CreateBottomTabNavigatorType<BottomTabBarParamList>}
 */
const Tab = createBottomTabNavigator();

export const BottomTabNavigaton = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: Colors.greyish,
        tabBarActiveTintColor: Colors.darkBlue,
        tabBarLabelStyle: {fontSize: FontSizes.small},
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: props => {
            return props.focused ? (
              <Icon name="book" color={props.color} size={props.size} />
            ) : (
              <Icon name="book-outline" color={props.color} size={props.size} />
            );
          },
        }}
        component={StudyNavigation}
        name="Study"
      />
      <Tab.Screen
        options={{
          tabBarIcon: props => {
            return props.focused ? (
              <Icon
                name="game-controller"
                color={props.color}
                size={props.size}
              />
            ) : (
              <Icon
                name="game-controller-outline"
                color={props.color}
                size={props.size}
              />
            );
          },
        }}
        component={GameNavigation}
        name="Game"
      />
    </Tab.Navigator>
  );
};
