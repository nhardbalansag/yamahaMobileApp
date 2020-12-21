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
import LoginScreen from './src/screens/loginScreen';
import RegisterScreen from './src/screens/registerScreen';
import NavigationScreens from './src/utils/navigation';
import { NavigationContainer } from '@react-navigation/native';

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
        <NavigationContainer>
          <NavigationScreens/>
        </NavigationContainer>
        : 
        <SplashScreen/> 
      }
    </Root>
  );
};

export default App;
