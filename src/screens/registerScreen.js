import React from 'react';
import {StatusBar, TextInput, TouchableOpacity, View, Text } from 'react-native';
import {styles, colors} from '../styles/style';

import TitleComponent from '../components/title';

const RegisterScreen = ({navigation}) =>{
    return(
        <View style={styles.container}>
        <StatusBar backgroundColor={colors.primaryColor} barStyle="white-content"/>
        <View style={styles.screenWidth}>
        <View style={styles.inputGap}>
            <TitleComponent title="welcome to yamaha megavia" subtext="create your account"/>
        </View>
        <View style={styles.inputGap}>
            <TextInput
                style={styles.inputForm}
                placeholder="Email"
            />
        </View>
        <View style={[ styles.justifyCenter]}>
            <TouchableOpacity style={styles.GeneralButton}>
                <View>
                    <Text style={styles.GeneralButtonText}>Next</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PersonalInformation')} style={styles.signupButton}>
                <View>
                    <Text onPress={() => navigation.popToTop()} style={styles.signUpText}>already have an account</Text>
                </View>
            </TouchableOpacity>
        </View>
        </View>
    </View>

    );
}

export default RegisterScreen;