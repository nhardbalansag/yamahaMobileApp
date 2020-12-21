import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {styles} from '../styles/style';

const GeneralButton = (props) =>{
    return(
        <TouchableOpacity style={props.design}>
            <View>
                <Text style={props.designText}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default GeneralButton;