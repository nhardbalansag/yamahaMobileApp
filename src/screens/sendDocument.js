import React from 'react';
import {
    View, 
    TouchableOpacity,
    Text, 
    Alert,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

import {
    styles, 
    colors
} from '../styles/style';

import { 
    useSelector
} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

const SendDocument = ({navigation}) =>{

    const Tokendata = useSelector(state => state.products.Tokendata);
    const DocumentId = useSelector(state => state.documents.documentId);

    const openDeviceCamera = async () =>{
        try {
            await ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
              }).then(image => {
                submitPhoto(image)
              });
        } catch (error) {
            alertMessage(error.message);
        }
    }

    const openFile = async () =>{
        try {
            await ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true
              }).then(image => {
                submitPhoto(image)
              });
        } catch (error) {
            alertMessage(error.message);
        }
    }

    const submitPhoto = async (image) =>{
        try {
            const filedata = {
                uri: image.path,
                type: 'image/jpeg',
                type: image.mime,
                name: `${image.modificationDate}.jpeg`
            }
            const dbody = new FormData();
            dbody.append('file', filedata);
            dbody.append('docId', DocumentId);
            const response =  await fetch('http://www.bbalansag.online/api/send-document', {
                method:'POST',
                body:dbody,
                headers:{
                    'content-type': 'multipart/form-data',
                    'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC',
                    'Authorization': 'Bearer ' + Tokendata
                },
            });
            const responseData = await response.json();
            alertMessage(responseData);

        } catch (error) {
            alertMessage(error.message);
        }
    }

    const alertMessage = (message) => {
        Alert.alert(
            "Status",
            message,
            [ { text: "OKAY"}],
            { cancelable: false }
        );
    }

    return(
            <View style={[{paddingVertical:20, flex:1, flexDirection:'column', justifyContent:'space-around', backgroundColor:colors.lightColor}]}>
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