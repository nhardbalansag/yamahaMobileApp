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

    const openDeviceCamera = async () =>{
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

    const openFile = async () =>{
        try {
            await ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true
              }).then(image => {
                console.log(image);
              });
        } catch (error) {
            console.log(error.message)
        }
    }

    return(
        <View style={[{flex:1, flexDirection:'column', justifyContent:'space-around', backgroundColor:colors.lightColor}]}>
            <View style={{ marginHorizontal:20}}>
                <View>
                    <Text style={{ fontSize:15 }}>Upload Document</Text>
                    <View>
                        <Text style={{ color:colors.disableColor }}>
                            <Text style={{ fontWeight:'bold' }}>Note: </Text>
                            <Text>Make sure the photo is clear and the whole document is seen in the shot. Don't forget to check its expiry date!</Text>
                        </Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={() =>openDeviceCamera()} style={[{backgroundColor:colors.disableColor}]}>
                        <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center', paddingVertical:10 }}>
                            <Icon name="photo-camera" size={30} color={'black'}/>
                            <Text style={{ color:colors.lightColor }}>Tap to take Document photo</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={[{paddingVertical:10}]}> 
                        <Text style={[{textAlign:'center'}]}>OR</Text>
                    </View>
                    <TouchableOpacity onPress={() =>openFile()} style={[{backgroundColor:colors.disableColor}]}>
                        <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center', paddingVertical:10 }}>
                            <Icon name="image" size={30} color={'black'}/>
                            <Text style={{ color:colors.lightColor }}>Tap to choose photo</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default SendDocument;