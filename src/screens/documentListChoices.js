import React, {useState, useEffect} from 'react';
import {
    Text,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Alert,
    View
} from 'react-native';

import {
    styles, 
    colors
} from '../styles/style';

import {
    List, 
    ListItem, 
    Body 
} from 'native-base';

import { 
    useDispatch,
    useSelector
} from 'react-redux';

import * as Documents from '../../store/actions/documentActions'; 

const DocumentListChoices = ({navigation}) =>{

    const [documentList, setDocumentList] = useState();
    const dispatch = useDispatch();

    const Tokendata = useSelector(state => state.products.Tokendata);

    const renderDocumentCategory = async () =>{
        try {
            const  response = await fetch('http://www.bbalansag.online/api/viewAllDocumentCategory/view/all', {
                headers:{
                    'Content-type': 'application/json',
                    'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC',
                    'Authorization': 'Bearer ' + Tokendata
                }
            });
            const responseData = await response.json();
            setDocumentList(responseData);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        renderDocumentCategory()
    }, []);

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
            "An error occured",
            message,
            [ { text: "OKAY"}],
            { cancelable: false }
        );
    }

    const renderProductItem = ({item}) =>{
        return(
            <View style={[{paddingVertical:20, borderBottomWidth:1, borderBottomColor:colors.disableColor}]}>
                <TouchableOpacity onPress={() => choice(item.id)}>
                    <View>
                        <Text style={{ textTransform:'capitalize',fontWeight:'bold', fontSize:18, color:colors.darkColor, textAlign:'center' }}>{item.title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }; 

    return(
        <SafeAreaView style={[{backgroundColor:colors.lightColor}]}>
            <FlatList keyExtractor={item => item.id.toString()} data={documentList} renderItem={renderProductItem} />
        </SafeAreaView>
    );
}

export default DocumentListChoices;