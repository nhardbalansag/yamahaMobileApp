import React, {useState} from 'react';
import {
    Text,
    SafeAreaView,
    FlatList
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

const DocumentList = ({navigation}) =>{

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

    const renderProductItem = ({item}) =>{
        return(
            <List>
                <ListItem>
                    <Body>
                        <Text style={{ textTransform:'capitalize', fontSize:18, color:colors.disableColor }}>{item.title}</Text>
                    </Body>
                </ListItem>
            </List>
        );
    }; 

    return(
        <SafeAreaView style={[styles.productContainer, {backgroundColor:colors.lightColor}]}>
            <FlatList keyExtractor={item => item.id.toString()} data={documentCategory} renderItem={renderProductItem} />
        </SafeAreaView>
    );
}

export default DocumentList;