import React from 'react';
import { 
    StatusBar, 
    TextInput, 
    TouchableOpacity, 
    View, 
    Text, 
    SafeAreaView,
    FlatList } from 'react-native';

import {styles, colors} from '../styles/style';
import TitleComponent from '../components/title';

const PersonalInformnationScreen = ({navigation}) =>{
    return(
        <View style={styles.container}>
        <StatusBar backgroundColor={colors.primaryColor} barStyle="white-content"/>
        <View style={styles.screenWidth}>
        <View style={styles.inputGap}>
            <TitleComponent subtext="personal information"/>
        </View>
        <View style={styles.inputGap}>

            <SafeAreaView style={styles.container}>
                <FlatList
                    renderItem={(
                        <TextInput
                            style={styles.inputForm}
                            placeholder="Email"
                        />
                    )}
                />
            </SafeAreaView>
        </View>
        <View style={[ styles.justifyCenter]}>
            <TouchableOpacity style={styles.GeneralButton}>
                <View>
                    <Text style={styles.GeneralButtonText}>Next</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.signupButton}>
                <View>
                    <Text onPress={() => navigation.popToTop()} style={styles.signUpText}>already have an account</Text>
                </View>s
            </TouchableOpacity>
        </View>
        </View>
    </View>

    );
}

export default LoginScreen;