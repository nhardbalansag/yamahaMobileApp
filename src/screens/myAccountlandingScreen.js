import React from 'react';
import {StatusBar, TextInput, TouchableOpacity, FlatList, View, Text } from 'react-native';
import {styles, colors} from '../styles/style';

import TitleComponent from '../components/title';

import {useSelector} from 'react-redux';



const renderProductItem = itemData =>{
   return (
        <View>
            <Text>{itemData.item.title}</Text>
        </View>
   );
};

const MyAccountLandingScreen = () =>{

    const allproducts = useSelector(state => state.products.allproducts);

    return(
       <FlatList data={allproducts} renderItem={renderProductItem} numColumns={1}/>
    );
}

export default MyAccountLandingScreen;