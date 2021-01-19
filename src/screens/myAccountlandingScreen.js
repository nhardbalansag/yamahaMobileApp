import React, {useEffect, useState} from 'react';

import {
    FlatList, 
    Image,
    View,
    Text,
    SafeAreaView,
    ImageBackground,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    RefreshControl
} from 'react-native';

import { 
    useSelector, 
    useDispatch
} from 'react-redux';

import { Container, Header, Left, Body, Right, Button } from 'native-base';
import {styles, colors} from '../styles/style';
import {stylescopy, colorscopy} from '../styles/copyStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as PRODUCTS from '../../store/actions/dataActions';
import * as Customer from '../../store/actions/customerActions'; 

import SearchBar from "react-native-dynamic-search-bar";
import Carousel from 'react-native-snap-carousel';

const MyAccountLandingScreen = () =>{

    const allproducts = useSelector(state => state.products.allproducts);
    const Tokendata = useSelector(state => state.products.Tokendata);
    const ProductCount = useSelector(state => state.products.ProductCount);
    const dispatch = useDispatch();
    const [tokendataState, settokendataState] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [Startrefreshing, setStartRefreshing] = useState(true);

    const viewallproducts = async () => {
        setRefreshing(true)
        try {
            await dispatch(PRODUCTS.viewAllProducts());
        } catch (error) {
            alertMessage(error.message);
        }
        setRefreshing(false)
        setStartRefreshing(false)
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
                <TouchableOpacity key={item.id} onPress={() => viewProductInformation(item.id)}>
                    <View style={{ width:200, flexDirection:"column",  marginHorizontal:3, marginVertical:10, padding:5, borderRadius:5, backgroundColor:'white'}}>
                        <View>
                            <Image 
                                style={{width:"100%", height: 100, borderRadius: 20}}
                                source={{uri: 'https://bbalansag.online/storage/' + item.photo_path}}
                                resizeMode={'contain'} // cover or contain its upto you view look
                            />
                        </View>
                        <View style={[{flexDirection:'column', justifyContent:'space-around', alignItems:'center', height:120}]}>
                            <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
                            <Text style={styles.productDescription} numberOfLines={3}>{item.description}</Text>
                            <View style={{flexDirection:'row' }}>
                                <Text style={styles.productPrice} >Price: ₱{item.price}</Text>
                                <Icon name="local-offer" size={20} color={colors.starColor} />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            );
     };

     const headerHome = () =>{
         return(
             <View>
                <ImageBackground source={require('../assets/images/unsplash1.jpg')} style={{width:"100%", height: 150 }} resizeMode={'cover'}>
                    <View style={{ backgroundColor: 'rgba(52, 52, 52, 0.4)', height:"100%", flex:1, alignItems:'center', textAlign:'center', justifyContent:'center' }}>
                        <Text style={{ color:'white', fontSize:20, padding:10, width:'100%', backgroundColor: 'rgba( 255, 255, 255, 0.3 )'}}>All Products</Text>
                    </View>
                </ImageBackground>
                <Text style={{color:colors.darkColor, padding:5, fontWeight:'bold'  }}>{ProductCount} Items</Text>
             </View>
         );
     }

    return(
        <SafeAreaView style={styles.productContainer}>
            {
                !Startrefreshing
                    ?
                        <>
                            <View style={[stylescopy.mY1]}>
                                <SearchBar
                                fontColor="#c6c6c6"
                                iconColor="#c6c6c6"
                                shadowColor="#282828"
                                cancelIconColor="#c6c6c6"
                                backgroundColor="white"
                                placeholder="Search here"
                                // onChangeText={(text) => this.filterList(text)}
                                onSearchPress={() => console.log("Search Icon is pressed")}
                                // onClearPress={() => this.filterList("")}
                                onPress={() => alert("onPress")}
                                />
                            </View>
                            <FlatList 
                                keyExtractor={item => item.id.toString()} 
                                data={allproducts} 
                                ListHeaderComponent={headerHome()}  
                                renderItem={renderProductItem} 
                                numColumns={2}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={viewallproducts} />
                                }
                            />
                        </>
                    :
                        <>
                            <ActivityIndicator size="large" color={colors.primaryColor}/> 
                        </>
            }
        </SafeAreaView>
    );
}

export default MyAccountLandingScreen;


