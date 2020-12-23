import React, {useEffect, useState} from 'react';

import {
    FlatList, 
    View, 
    Text 
} from 'react-native';

import { 
    useSelector, 
    useDispatch
} from 'react-redux';

import * as PRODUCTS from '../../store/actions/dataActions';

const MyAccountLandingScreen = () =>{

    const allproducts = useSelector(state => state.products.allproducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(PRODUCTS.viewAllProducts());
    }, [dispatch]);

    return(
       <FlatList keyExtractor={item => item.id} data={allproducts} renderItem={renderProductItem} />
    );
}

const renderProductItem = itemData =>{
    return (
         <View>
             <Text>{itemData.item.title}</Text>
         </View>
    );
 };

export default MyAccountLandingScreen;