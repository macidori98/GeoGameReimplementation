import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {MainNavigation} from '~/navigation/MainNavigation';
import Colors from '~/theme/Colors';

const App = () => {
  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          primary: Colors.darkPink,
          background: Colors.white,
          card: Colors.white,
          text: Colors.black,
          border: Colors.black,
          notification: Colors.white,
        },
      }}>
      <MainNavigation />
    </NavigationContainer>
  );
};

export default App;
