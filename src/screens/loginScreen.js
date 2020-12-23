import React, {useState} from 'react';
import {StatusBar, View, TouchableOpacity,Text, TextInput} from 'react-native';
import {styles, colors} from '../styles/style';

import TitleComponent from '../components/title';

const LoginScreen = ({navigation}) =>{

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
                />
                <TextInput
                    style={styles.inputForm}
                    placeholder="Password"
                    keyboardType ="visible-password"
                />
            </View>
            <View style={[ styles.justifyCenter]}>
                <TouchableOpacity style={styles.GeneralButton}>
                    <View>
                        <Text style={styles.GeneralButtonText}>Login</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.signupButton}>
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