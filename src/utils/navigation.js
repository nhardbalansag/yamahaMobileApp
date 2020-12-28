import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreeen from '../screens/loginScreen';
import PersonalInformnationScreen from '../screens/userInformationInputScreen';
import MyAccountLandingScreen from '../screens/myAccountlandingScreen';
import OrderScreen from '../screens/ordersScreen';
import AccountScreen from '../screens/accountScreen';
import ViewOneProductInformation from '../screens/viewOneProductScreen';

import ScreenAccess from '../screenAccess/screenAccess';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { 
  useSelector
} from 'react-redux';
import {colors} from '../styles/style';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Account = () =>{
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Orders') {
          iconName = 'shopping-bag';
        }else if (route.name === 'Account') {
          iconName = 'account-circle';
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
      tabBarOptions={{
        showIcon: true ,
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 13,
        },
        style: {
          backgroundColor: '#fff', // Makes Android tab bar white instead of standard blue
          height: 60,// I didn't use this in my app, so the numbers may be off. 
          paddingBottom: 5,
        }
      }}
  >
      <Tab.Screen name="Home" component={MyAccountLandingScreen} />
      <Tab.Screen name="Orders" component={OrderScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

const EnterCredentialNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreeen} options={{ title: 'Login' }}/>
            <Stack.Screen name="UserInformation" component={PersonalInformnationScreen} options={{ title: 'User Information' }}/>
        </Stack.Navigator>
    );
}

const ProductsViewNavigation = () => {
  return (
      <Stack.Navigator>
          <Stack.Screen 
            name="Product" 
            component={ViewOneProductInformation} 
            options={
              { 
                title: 'Product Information',
                headerStyle: {
                  backgroundColor: colors.dangerColor,
                },
                headerTintColor: colors.lightColor,
              }
            }
          />
      </Stack.Navigator>
  );
}

const switchScreen = () => {

  const tokenresponse = useSelector(state => state.products.Tokendata);
  const screenresponse = useSelector(state => state.products.screenAccess);
  
  if(tokenresponse !== null){
    switch (screenresponse) {
      case ScreenAccess.homeScreenLandingTab:
        return Account();
        break;
      case ScreenAccess.loginScreen:
        return EnterCredentialNavigation();
        break;
      case ScreenAccess.homeScreenProductStack:
          return ProductsViewNavigation();
          break;
      default:
        return EnterCredentialNavigation();
        break;
    }
  }else{
    return EnterCredentialNavigation();
  }

}

export default switchScreen;  