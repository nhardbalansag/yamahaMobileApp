import React, {useState, useEffect} from 'react';
import {
    Text,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Alert,
    RefreshControl,
    ActivityIndicator
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

import { 
    useDispatch,
    useSelector
} from 'react-redux';

import * as Documents from '../../store/actions/documentActions'; 

const Reservations = ({navigation}) =>{

    const [documentList, setDocumentList] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();

    const Tokendata = useSelector(state => state.products.Tokendata);

    const renderDocumentCategory = async () =>{
        setRefreshing(true)
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
            alertMessage(error.message)
        }
        setRefreshing(false)
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
            <List>
                <ListItem>
                    <TouchableOpacity onPress={() => choice(item.id)}>
                        <Text style={{ textTransform:'capitalize', fontSize:18, color:colors.disableColor }}>{item.title}</Text>
                    </TouchableOpacity>
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
            
        </SafeAreaView>
    );
}

export default Reservations;