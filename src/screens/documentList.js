import React, {useState, useEffect} from 'react';
import {
    Text,
    SafeAreaView,
    FlatList,
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

import { 
    useSelector
} from 'react-redux';
import { stylescopy } from '../styles/copyStyle';

const DocumentList = ({navigation}) =>{

    const Tokendata = useSelector(state => state.products.Tokendata);
    const [docCategory, setDocCategory] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const renderDocumentCategory = async () =>{
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
            setDocCategory(responseData);
        } catch (error) {
            alertMessage(error.message)
        }
        setRefreshing(false)
    }

    useEffect(() =>{
        renderDocumentCategory()
    }, []);

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
                        <Text style={{ textTransform:'capitalize', fontSize:18, color:colors.disableColor }}>{item.title}</Text>
                </ListItem>
            </List>
        );
    }

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
                            data={docCategory} 
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

export default DocumentList;