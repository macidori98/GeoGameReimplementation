import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {BottomTabNavigaton} from './navigation/BottomNavigation';

const App = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigaton />
    </NavigationContainer>
  );
};

export default App;
