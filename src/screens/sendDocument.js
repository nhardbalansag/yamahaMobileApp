import React from 'react';
import {
    View, 
    TouchableOpacity,
    Text, 
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

import {
    styles, 
    colors
} from '../styles/style';

import Icon from 'react-native-vector-icons/MaterialIcons';

const SendDocument = ({navigation}) =>{

    const openCamera = async () =>{
        try {
            await ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
              }).then(image => {
                console.log(image);
              });
        } catch (error) {
            console.log(error.message)
        }
    }

    return(
        <View style={[{flex:1, flexDirection:'column', justifyContent:'space-between', backgroundColor:colors.lightColor}]}>
            <TouchableOpacity onPress={() =>openCamera()} style={styles.GeneralButton}>
                <View>
                    <Text>open camera</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default SendDocument;