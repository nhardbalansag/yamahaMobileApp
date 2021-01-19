import React, {useState} from 'react';
import {
    View, 
    TouchableOpacity,
    Text, 
    Image,
    Alert,
    ScrollView
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

import {
    styles, 
    colors
} from '../styles/style';

import { 
    useDispatch,
    useSelector
} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Document from '../../store/actions/documentActions'; 

const SendDocument = ({navigation}) =>{

    const dispatch = useDispatch();
    const [imagedata, setImageData] = useState('../assets/images/Yamaha-logo.png');
    const [hasImage, setHasImage] = useState(false);
    const [wholeDataImage, setwholeDataImage] = useState([]);

    const Tokendata = useSelector(state => state.products.Tokendata);
    const DocumentId = useSelector(state => state.documents.documentId);

    const openDeviceCamera = async () =>{
        try {
            await ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
              }).then(image => {
                setHasImage(true);
                setImageData(image.path);
                setwholeDataImage(image);
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
                setHasImage(true);
                setImageData(image.path);
                setwholeDataImage(image);
              });
        } catch (error) {
            alertMessage(error.message);
        }
    }

    const submitPhoto = async () =>{
        try {
            await dispatch(Document.sendDocument(wholeDataImage, DocumentId, Tokendata))
        } catch (error) {
            alertMessage(error.message);
        }
    }

    const alertMessage = (message) => {
        Alert.alert(
            "An error occured",
            message,
            [ { text: "OKAY"}],
            { cancelable: false }
        );
    }

    return(
        <ScrollView >
            <View style={[{paddingVertical:20, flex:1, flexDirection:'column', justifyContent:'space-around', backgroundColor:colors.lightColor}]}>
                {
                hasImage 
                    ? 
                        <>
                        <View style={{ marginHorizontal:20}}>
                                <View>
                                    <Image 
                                        style={{width: '100%', height: 400}}
                                        source={{uri: imagedata}}
                                        resizeMode={'cover'} // cover or contain its upto you view look
                                    />
                                </View>
                                {
                                    DocumentId == null 
                                    ? 
                                    <>
                                        <View style={[{marginTop:10}]}>
                                            <TouchableOpacity onPress={() =>navigation.navigate('DocumentListChoices')} style={[{backgroundColor:colors.primaryColor}]}>
                                                <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center', paddingVertical:10 }}>
                                                    <Icon name="rule" size={30} color={'white'}/>
                                                    <Text style={{ color:colors.lightColor }}>Tap to choose photo</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                    :
                                    <>
                                        <View style={[{marginTop:10}]}>
                                            <TouchableOpacity onPress={() =>submitPhoto()} style={[{backgroundColor:colors.primaryColor}]}>
                                                <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center', paddingVertical:10 }}>
                                                    <Icon name="done" size={30} color={'white'}/>
                                                    <Text style={{ color:colors.lightColor }}>Submit</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                       
                                }
                                
                        </View>
                        </> 
                    :
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
                }
            </View>
        </ScrollView>
    );
}

export default SendDocument;