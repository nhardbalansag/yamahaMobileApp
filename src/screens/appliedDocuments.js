import React, {useState, useEffect} from 'react';
import {
    Text,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Alert,
    RefreshControl,
    ActivityIndicator,
    View
} from 'react-native';

import {
    styles, 
    colors
} from '../styles/style';

import {
    List, 
    ListItem, 
} from 'native-base';

import { stylescopy } from '../styles/copyStyle';

import ImagePicker from 'react-native-image-crop-picker';

import { 
    useDispatch,
    useSelector
} from 'react-redux';

import * as Documents from '../../store/actions/documentActions'; 

import Icon from 'react-native-vector-icons/MaterialIcons';

const AppliedDocuments = ({navigation}) =>{

    const [documentList, setDocumentList] = useState();
    const [documentListTotal, setDocumentListTotal] = useState();
    const Tokendata = useSelector(state => state.products.Tokendata);
    const [refreshing, setRefreshing] = useState(true);
    const [docId, setDocId] = useState();
    const [resubmit, setresubmit] = useState(false);
    const [total, setTotal] = useState();
    const dispatch = useDispatch();

    const totalCategory = async () =>{
        setRefreshing(true)
        try {
            const  response = await fetch('http://www.bbalansag.online/api/viewAllDocumentCategory/view/all', {
                method: 'GET',
                headers:{
                    'Content-type': 'application/json',
                    'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC',
                    'Authorization': 'Bearer ' + Tokendata
                }
            });
            const responseData = await response.json();
            setTotal(responseData.length);
        } catch (error) {
            alertMessage(error.message)
        }
        setRefreshing(false)
    }

    const renderDocumentCategory = async () =>{
        setRefreshing(true)
        try {
            const  response = await fetch('http://www.bbalansag.online/api/viewAllDocuments/customer/submitted/all', {
                headers:{
                    'Content-type': 'application/json',
                    'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC',
                    'Authorization': 'Bearer ' + Tokendata
                }
            });
            const responseData = await response.json();
            setDocumentList(responseData.data);
            setDocumentListTotal(responseData.total)
        } catch (error) {
            alertMessage(error.message)
        }
        setRefreshing(false)
    }

    useEffect(() =>{
        renderDocumentCategory()
        totalCategory()
    }, [resubmit]);

    const choice = async (documentId) =>{
        try {
            await dispatch(Documents.setChoiceDocument(documentId));
            navigation.navigate('SendDocument');
        } catch (error) {
            alertMessage(error.message)
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
            dbody.append('docId', docId);
            const response =  await fetch('http://www.bbalansag.online/api/customer/resubmit/document', {
                method:'POST',
                body:dbody,
                headers:{
                    'content-type': 'multipart/form-data',
                    'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC',
                    'Authorization': 'Bearer ' + Tokendata
                },
            });
            setresubmit(false)
            const responseData = await response.json();
            alertMessage(responseData);

        } catch (error) {
            alertMessage(error.message);
        }
    }
    
    const setSubmit = (documentid) =>{
        setresubmit(true)        
        setDocId(documentid)
    }

    const renderProductItem = ({item}) =>{
        return(
            <List>
                <ListItem style={[stylescopy.flexRow, stylescopy.justifySpaceBetween]}>
                    <TouchableOpacity onPress={() => choice(item.id)}>
                        <Text style={{ textTransform:'capitalize', fontSize:18, color:colors.disableColor }}>{item.title}</Text>
                        <View style={[stylescopy.flexRow]}>
                            <Text>Status: </Text>
                            <Text style={[item.status == 'approved' ? stylescopy.textSuccess : (item.status == 'pending' ? stylescopy.textWarning : stylescopy.textDanger), stylescopy.textBold, {textTransform:'capitalize'}]}>{ item.status == 'decline' ? 'declined' : item.status}</Text>
                        </View>
                    </TouchableOpacity>
                    {
                        item.status == 'decline' 
                        ?
                            <>
                                <TouchableOpacity onPress={() => setSubmit(item.id)} style={[stylescopy.backgroundPrimary, stylescopy.rounded, {padding:5}]}>
                                    <View>
                                        <Text style={[stylescopy.textWhite]}>Resubmit</Text>
                                    </View>
                                </TouchableOpacity>
                            </>
                        :
                            <>
                            </>
                    }
                    
                </ListItem>
            </List>
        );
    }; 

    return(
        <SafeAreaView style={[stylescopy.pY2, stylescopy.h100, {backgroundColor:colors.lightColor}]}>
            {
                refreshing 
                ?
                    <>
                        <ActivityIndicator size="large" color={colors.primaryColor}/> 
                    </>
                :
                    <>
                        <>
                            <View>
                                <Text style={[stylescopy.textCenter, stylescopy.font15]}>
                                    You have submitted {documentListTotal}/{total} requirement(s)
                                </Text>
                            </View>
                        </>
                        {
                            resubmit
                            ?
                                <>
                                    <View style={[stylescopy.justifyCenter, stylescopy.flexCol, stylescopy.alignCenter, stylescopy.mT1]}>
                                        <TouchableOpacity onPress={() =>openDeviceCamera()} style={[{backgroundColor:colors.disableColor, paddingHorizontal:10}, stylescopy.rounded]}>
                                            <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center', paddingVertical:10 }}>
                                                <Icon name="photo-camera" size={30} color={'black'}/>
                                                <Text style={{ color:colors.lightColor }}>Tap to take Document photo</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={[{paddingVertical:10}]}> 
                                            <Text style={[{textAlign:'center'}]}>OR</Text>
                                        </View>
                                        <TouchableOpacity onPress={() =>openFile()} style={[{backgroundColor:colors.disableColor, paddingHorizontal:10}, stylescopy.rounded]}>
                                            <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center', paddingVertical:10 }}>
                                                <Icon name="image" size={30} color={'black'}/>
                                                <Text style={{ color:colors.lightColor }}>Tap to choose photo</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[stylescopy.justifyCenter, stylescopy.flexCol, stylescopy.alignCenter , stylescopy.mT5]}>
                                        <TouchableOpacity onPress={()=> setresubmit(false) } style={styles.GeneralButton}>
                                            <View style={[{flexDirection:'row', justifyContent:'center'}]}>
                                                <Text style={[{marginRight:5}, styles.GeneralButtonText]}>Cancel</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            :
                                <>
                                    <FlatList 
                                        keyExtractor={item => item.id.toString()} 
                                        data={documentList} 
                                        renderItem={renderProductItem} 
                                        refreshControl={
                                            <RefreshControl refreshing={refreshing} onRefresh={renderDocumentCategory} />
                                        }
                                    />
                                </>
                        }
                    </>
            }
        </SafeAreaView>
    );
}

export default AppliedDocuments;