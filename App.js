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

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import DataReducer from './store/reducers/dataReducers';
import DocumentDataReducer from './store/reducers/documentReducer';


const rootReducer = combineReducers({
  products:DataReducer,
  documents:DocumentDataReducer
}); 

const store = createStore(rootReducer, applyMiddleware(ReduxThunk)); 

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
      <StatusBar backgroundColor="#3F51B5" barStyle="white-content"/>
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
