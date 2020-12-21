import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreeen from '../screens/loginScreen';
import RegisterScreeen from '../screens/registerScreen';
import PersonalInformnationScreen from '../screens/userInformationInputScreen';

const Stack = createStackNavigator();

const tab_navigation = () =>{
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const Navigation = () => {
    
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreeen} />
            <Stack.Screen name="Register" component={RegisterScreeen} />
            <Stack.Screen name="UserInformation" component={PersonalInformnationScreen} />
      </Stack.Navigator>
    );
}

export default Navigation;  