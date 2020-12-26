import React, {useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreeen from '../screens/loginScreen';
import PersonalInformnationScreen from '../screens/userInformationInputScreen';
import MyAccountLandingScreen from '../screens/myAccountlandingScreen';
import OrderScreen from '../screens/ordersScreen';
import AccountScreen from '../screens/accountScreen';

import { 
  useSelector
} from 'react-redux';

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
            <Stack.Screen name="UserInformation" component={PersonalInformnationScreen} />
            <Stack.Screen name="Account" component={Account} />
        </Stack.Navigator>
    );
}

const switchScreen = () => {

  const tokenresponse = useSelector(state => state.products.Tokendata);
  const errorResponse = useSelector(state => state.products.errorBool);
  const [login, setlogin] = useState(false);

  useEffect(() => {
    setlogin(errorResponse);
  },[login])

  if(tokenresponse !== "null" || tokenresponse !== "Undefined"){
    return Navigation();
  }else{
    console.log(tokenresponse);
    return Account();
  }

}

export default switchScreen;  