/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Root } from 'native-base';

import SplashScreen from './src/screens/splashScreen';
import NavigationScreens from './src/utils/navigation';
import { NavigationContainer } from '@react-navigation/native';

import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import DataReducer from './store/reducers/dataReducers';

const rootReducer = combineReducers({
  products:DataReducer
}); 

const store = createStore(rootReducer); 

const App = () => {

  const [load, setload] = useState(false);

  function loadScreen(){
    setTimeout(
      () =>{
        setload(prevState => prevState = true);
      }, 3000);
      setload(prevState => prevState = false);
  }

  useEffect(loadScreen, [setload]);

  return (
    <Root>
      <StatusBar backgroundColor="black" barStyle="white-content"/>
      { 
        load ? 
        <Provider store={store}>
          <NavigationContainer>
            <NavigationScreens/>
          </NavigationContainer>
        </Provider>
          
        : 
        <SplashScreen/> 
      }
    </Root>
  );
};

export default App;
