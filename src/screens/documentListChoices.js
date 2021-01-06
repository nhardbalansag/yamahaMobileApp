import React, {useState} from 'react';
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

    const documentCategory = useSelector(state => state.documents.documentCategory);
    const dispatch = useDispatch();
    
    const renderDocumentCategory = async () =>{
        try {
            await dispatch(Documents.viewAllDocumentCategory());
        } catch (error) {
            Alert.alert(
                "Status",
                error.message,
                [
                  { text: "OKAY" }
                ],
                { cancelable: false }
              );
        }
    }

    useState(() =>{
        renderDocumentCategory();
    }, [dispatch]);

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
            <View style={[{paddingVertical:10, borderBottomWidth:1, borderBottomColor:colors.disableColor}]}>
                <TouchableOpacity onPress={() => choice(item.id)}>
                    <View>
                        <Text style={{ textTransform:'capitalize', fontSize:18, color:colors.darkColor, textAlign:'center' }}>{item.title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }; 

    return(
        <SafeAreaView style={[styles.productContainer, {backgroundColor:colors.lightColor}]}>
            <FlatList keyExtractor={item => item.id.toString()} data={documentCategory} renderItem={renderProductItem} />
        </SafeAreaView>
    );
}

export default DocumentListChoices;