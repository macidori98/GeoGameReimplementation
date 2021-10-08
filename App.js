import React from 'react';
import {BottomTabNavigaton} from '@/navigation/BottomNavigation';
import NavigationContainer from 'node_modules/@react-navigation/native/lib/typescript/src/NavigationContainer';

const App = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigaton />
    </NavigationContainer>
  );
};

export default App;
