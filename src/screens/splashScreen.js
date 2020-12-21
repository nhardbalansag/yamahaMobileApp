import React from 'react';
import { View, Text, Image } from 'react-native';
import {styles, colors} from '../styles/style';
import {Container } from 'native-base';

const SplashScreen = () => {
    return (
        <Container>
            <View style={styles.container}>
                <Image
                style={[styles.splashlogo]}
                source={require('../assets/images/Yamaha-logo.png')}
                />
            </View>
            <View style={[ styles.justifyCenter, styles.alignCenter] }>
                <Text style={[styles.splashTitle, styles.textCenter]}>© Copyright 2020-2021 | All Rights Reserved | Powered by Capstone Project</Text>
            </View>
        </Container>
    );
}

export default SplashScreen;

