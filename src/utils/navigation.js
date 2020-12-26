import React, {useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreeen from '../screens/loginScreen';
import PersonalInformnationScreen from '../screens/userInformationInputScreen';
import MyAccountLandingScreen from '../screens/myAccountlandingScreen';
import OrderScreen from '../screens/ordersScreen';
import AccountScreen from '../screens/accountScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { 
  useSelector
} from 'react-redux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Account = () =>{
  return (
    <Tab.Navigator
      tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      labelStyle: {
        fontSize: 13,
      },
      style: {
        backgroundColor: '#fff', // Makes Android tab bar white instead of standard blue
        height: 50,// I didn't use this in my app, so the numbers may be off. 
        paddingBottom: 20,
      }
    }}
  >
      <Tab.Screen name="Home" component={MyAccountLandingScreen} />
      <Tab.Screen name="Orders" component={OrderScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

const Navigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreeen} />
            <Stack.Screen name="UserInformation" component={PersonalInformnationScreen} />
            <Stack.Screen name="Account" component={Account} />
        </Stack.Navigator>
    );
}

const switchScreen = () => {

  const tokenresponse = useSelector(state => state.products.Tokendata);

  if(tokenresponse === null){
    return Navigation();
  }else{
    return Account();
  }

}

export default switchScreen;  