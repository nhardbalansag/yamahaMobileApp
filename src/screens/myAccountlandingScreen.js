import React, {useEffect, useState} from 'react';

import {
    FlatList, 
    Image,
    View,
    Text,
    SafeAreaView,
    ImageBackground,
    TouchableOpacity,
    Alert
} from 'react-native';

import { 
    useSelector, 
    useDispatch
} from 'react-redux';

import {styles, colors} from '../styles/style';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as PRODUCTS from '../../store/actions/dataActions';
import * as Customer from '../../store/actions/customerActions'; 

const MyAccountLandingScreen = () =>{

    const allproducts = useSelector(state => state.products.allproducts);
    const Tokendata = useSelector(state => state.products.Tokendata);
    const ProductCount = useSelector(state => state.products.ProductCount);
    const dispatch = useDispatch();
    const [tokendataState, settokendataState] = useState(null);

    const viewallproducts = async () => {
        try {
            await dispatch(PRODUCTS.viewAllProducts());
        } catch (error) {
            alertMessage(error.message);
        }
    }

    const viewProductInformation = async (id) => {
        try {
            await dispatch(PRODUCTS.ViewOneProductInformation(id, tokendataState));
        } catch (error) {
            alertMessage(error.message);
        }
    }

    const getCountData = async () => {
        try {
            await dispatch(Customer.getCount());
        } catch (error) {
            alertMessage(error.message);
        }
    }
   
    useEffect(() => {
        viewallproducts();
        settokendataState(Tokendata);
        getCountData();
    }, [dispatch]); 

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
                <TouchableOpacity onPress={() => viewProductInformation(item.id)}>
                    <View style={[styles.productlistContainer]}>
                        <View style={styles.productViewImage}>
                            <Image 
                                style={{width:"100%", height: 100, borderRadius: 20}}
                                source={{uri: 'https://bbalansag.online/storage/' + item.photo_path}}
                                resizeMode={'contain'} // cover or contain its upto you view look
                            />
                        </View>
                        <View style={styles.productViewTitle}>
                            <View style={styles.productTitleLeft}>
                                <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
                                <Text style={styles.productDescription} numberOfLines={3}>{item.description}</Text>
                                <View style={{flexDirection:'row' }}>
                                    <Text style={styles.productPrice} >Price: ₱{item.price}</Text>
                                    <Icon name="local-offer" size={20} color={colors.starColor} />
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            );
     };

    return(
        
        <SafeAreaView style={styles.productContainer}>
            <ImageBackground source={require('../assets/images/unsplash1.jpg')} style={{width:"100%", height: 120 }} resizeMode={'cover'}>
                <View style={{ backgroundColor: 'rgba(52, 52, 52, 0.4)', height:"100%", flex:1, alignItems:'center', textAlign:'center', justifyContent:'center' }}>
                    <Text style={{ color:'white', fontSize:20, padding:10, width:'100%', backgroundColor: 'rgba( 255, 255, 255, 0.3 )'}}>All Products</Text>
                </View>
            </ImageBackground>
            <View>
                <Text style={{color:'tomato', padding:5, fontWeight:'bold'  }}>{ProductCount} Items</Text>
                <FlatList keyExtractor={item => item.id.toString()} data={allproducts} renderItem={renderProductItem} />
            </View>
        </SafeAreaView>
       
    );
}

export default MyAccountLandingScreen;


