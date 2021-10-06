import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {BottomTabNavigaton} from './navigation/BottomNavigation';
import countriesReducer from './store/reducers/countries';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';

const rootReducer = combineReducers({
  countries: countriesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTabNavigaton />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
