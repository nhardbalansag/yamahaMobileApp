import React from 'react';
import {View, Text} from 'react-native';    

import {styles} from '../styles/style';

const TitleComponent = (props) => {
    return(
        <View>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.subtext}>{props.subtext}</Text>
        </View>
    );
}

export default TitleComponent;

