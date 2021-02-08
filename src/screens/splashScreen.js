import React from 'react';
import { View, Text, Image } from 'react-native';
import {styles, colors} from '../styles/style';
import {Container } from 'native-base';

const SplashScreen = () => {
    return (
        <Container>
            <View style={styles.container}>
                <Image
                    source={require('../assets/images/M.png')}
                    resizeMode={'cover'}
                    style={{width:"100%", height: 150, paddingHorizontal:10 }} 
                />
            </View>
            <View style={[ styles.justifyCenter, styles.alignCenter] }>
                <Text style={[styles.splashTitle, styles.textCenter]}>© Copyright 2020-2021 | All Rights Reserved | Powered by Capstone Project</Text>
            </View>
        </Container>
    );
}

export default SplashScreen;

