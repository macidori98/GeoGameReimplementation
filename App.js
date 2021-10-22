import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {MainNavigation} from '~/navigation/MainNavigation';
import Colors from '~/theme/Colors';
import statisticsReducer from '~/store/reducers/statistics';

const rootReducer = combineReducers({
  statistics: statisticsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
