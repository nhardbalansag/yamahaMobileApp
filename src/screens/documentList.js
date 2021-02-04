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
    // const [documentList, setDocumentList] = useState();

    const renderDocumentCategory = async () =>{
        try {
            const  response = await fetch('http://www.bbalansag.online/api/viewAllDocumentCategory/view/all', {
                method: 'GET',
                headers:{
                    'Content-type': 'application/json',
                    'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC',
                    'Authorization': 'Bearer ' + getState().products.Tokendata, 
                }
            });
            const responseData = await response.json();
            setDocumentList(responseData);
        } catch (error) {
           
        }
    }

    useState(() =>{
        renderDocumentCategory();
    }, []);

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