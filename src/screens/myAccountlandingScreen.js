import React, {useEffect} from 'react';

import {
    FlatList, 
    Image,
    View
} from 'react-native';

import { 
    useSelector, 
    useDispatch
} from 'react-redux';

import {styles, colors} from '../styles/style';

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
                <View>
                    <Image 
                        style={{width: "100%", height: 300}}
                        source={{uri: 'https://bbalansag.online/storage/' + itemData.item.photo_path}}
                        resizeMode={'contain'} // cover or contain its upto you view look
                    />
                </View>
            </View>
         
    );
 };

export default MyAccountLandingScreen;