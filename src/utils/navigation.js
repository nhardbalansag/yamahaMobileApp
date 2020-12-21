import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreeen from '../screens/loginScreen';
import RegisterScreeen from '../screens/registerScreen';
import PersonalInformnationScreen from '../screens/userInformationInputScreen';
import MyAccountLandingScreen from '../screens/myAccountlandingScreen';
import OrderScreen from '../screens/ordersScreen';
import AccountScreen from '../screens/accountScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Account = () =>{
  return (
    <Tab.Navigator>
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
            <Stack.Screen name="Register" component={RegisterScreeen} />
            <Stack.Screen name="UserInformation" component={PersonalInformnationScreen} />
            <Stack.Screen name="Account" component={Account} />
      </Stack.Navigator>
    );
}

export default Navigation;  