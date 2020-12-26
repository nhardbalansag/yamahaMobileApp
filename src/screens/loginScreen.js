import React, {useState, useEffect} from 'react';
import {StatusBar, View, TouchableOpacity,Text, TextInput, Alert, ActivityIndicator} from 'react-native';
import {styles, colors} from '../styles/style';
import { 
    useDispatch,
    useSelector
} from 'react-redux';

import TitleComponent from '../components/title';
import * as Customer from '../../store/actions/customerActions'; 

const LoginScreen = ({navigation}) =>{

    const dispatch = useDispatch();

    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [loadingstate, setloadingstate] = useState(false);
  
    const errordata = useSelector(state => state.products.errorData);
    const errortype = useSelector(state => state.products.errorType);
    const errorbool = useSelector(state => state.products.errorBool);

    const login = async () =>{
        setloadingstate(true);
        try {
            await dispatch(Customer.loginCustomer(email, password));
        } catch (error) {
            error.message === "false" ? alertMessage("login Success") : alertMessage(error.message);
        }
        setloadingstate(false);
    }

    const alertMessage = (message) => {
        Alert.alert(
            "Status",
            message,
            message == "login Success" ? [ { text: "OKAY"}] : [ { text: "OKAY", onPress: () => setloadingstate(false)}]
          );
    }

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.primaryColor} barStyle="white-content"/>
            <View style={styles.screenWidth}>
            <View style={styles.inputGap}>
                <TitleComponent subtext="login your credentials"/>
            </View>
            <View style={styles.inputGap}>
                <TextInput
                    style={styles.inputForm}
                    placeholder="Email"
                    keyboardType ="email-address"
                    onChangeText = {text => setemail(text)}
                />
                {errorbool && <Text style={styles.errormessage}>{errortype == 'validation' ? errordata[0].email : errordata}</Text>}
                <TextInput
                    style={styles.inputForm}
                    placeholder="Password"
                    keyboardType ="visible-password"
                    onChangeText = {text => setpassword(text)}
                />
                {errorbool && <Text style={styles.errormessage}>{errortype == 'validation' ? errordata[0].password : errordata}</Text>}
            </View>
            <View style={[ styles.justifyCenter]}>
                {
                    loadingstate ? <ActivityIndicator size="large" color={colors.dangerColor}/> :
                    <TouchableOpacity onPress={()=>login()} style={styles.GeneralButton}>
                        <View>
                            <Text style={styles.GeneralButtonText}>Login</Text>
                        </View>
                    </TouchableOpacity>
                }
                <TouchableOpacity onPress={() => navigation.navigate('UserInformation')} style={styles.signupButton}>
                    <View>
                        <Text style={styles.signUpText}>sign up an account</Text>
                    </View>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    );
}

export default LoginScreen;