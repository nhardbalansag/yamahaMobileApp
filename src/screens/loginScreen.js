import React, {useState} from 'react';
import {
    StatusBar, 
    View, 
    TouchableOpacity,
    Text, 
    TextInput, 
    Alert, 
    ActivityIndicator,
    ImageBackground
} from 'react-native';

import {
    styles, 
    colors
} from '../styles/style';

import { 
    useDispatch,
    useSelector
} from 'react-redux';

import TitleComponent from '../components/title';
import * as Customer from '../../store/actions/customerActions'; 

import PasswordInputText from 'react-native-hide-show-password-input';

const LoginScreen = ({navigation}) =>{

    const dispatch = useDispatch();

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [loadingstate, setloadingstate] = useState(false);
  
    const errordata = useSelector(state => state.products.errorData);
    const errortype = useSelector(state => state.products.errorType);
    const errorbool = useSelector(state => state.products.errorBool);

    const login = async () =>{
        setloadingstate(true);
        try {
            await dispatch(Customer.loginCustomer(email, password));
            setloadingstate(false);
        } catch (error) {
            error.message === "false" ? alertMessage("login Success") : alertMessage(error.message);
        }
    }

    const alertMessage = (message) => {
        Alert.alert(
            "Status",
            message == "login Success" ? "login Success" : "Login failed",
            message == "login Success" ? [ { text: "OKAY"}] : [ { text: "OKAY", onPress: () => setloadingstate(false)}]
        );
    }

    return(
        <View style={[styles.container,  {backgroundColor:colors.lightColor}]}>
            {/* <StatusBar backgroundColor={colors.dangerColor} barStyle="white-content"/> */}
            <View style={styles.screenWidth}>
            <View style={styles.inputGap}>
                <TitleComponent subtext="login your credentials"/>
            </View>
            <ImageBackground source={require('../assets/images/M.png')} style={{width:"100%", height: 150 }} resizeMode={'cover'}>
            </ImageBackground>
            <View style={styles.inputGap}>
                <TextInput
                    style={styles.inputForm}
                    placeholder="Email"
                    keyboardType ="email-address"
                    onChangeText = {text => setemail(text)}
                />
                {errorbool && <Text style={styles.errormessage}>{errortype == 'validation' ? errordata[0].email : errordata}</Text>}
                <PasswordInputText
                    style={styles.inputForm}
                    value={password}
                    onChangeText={(password) => setpassword(password)}
                />
                {errorbool && <Text style={styles.errormessage}>{errortype == 'validation' ? errordata[0].password : errordata}</Text>}
            </View>
            <View style={[ styles.justifyCenter, {alignItems:'center'}]}>
                <TouchableOpacity onPress={()=>login()} style={styles.GeneralButton}>
                    <View style={[{flexDirection:'row', justifyContent:'center'}]}>
                        <Text style={[{marginRight:5}, styles.GeneralButtonText]}>Login</Text>
                        {
                            loadingstate ? <ActivityIndicator size="small" color={colors.lightColor}/> : <></>
                        }
                    </View>
                </TouchableOpacity>
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

