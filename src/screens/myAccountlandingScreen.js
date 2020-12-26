import React, {useEffect} from 'react';

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

    const viewallproducts = async () => {
        try {
            await dispatch(PRODUCTS.viewAllProducts());
        } catch (error) {
            alertMessage();
        }
    }
   
    useEffect(() => {
        viewallproducts();
    }, [dispatch]);

    const alertMessage = (message) => {
        Alert.alert(
            "An error occured",
            "Unauthorized access to this resource",
            [ { text: "OKAY"}],
            { cancelable: false }
          );
    }

    return(
       <FlatList keyExtractor={item => item.id.toString()} data={allproducts} renderItem={renderProductItem} />
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