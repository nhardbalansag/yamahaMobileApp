import React, {useState, useEffect} from 'react';

import {
    FlatList, 
    Image,
    View,
    Text,
    SafeAreaView,
    ImageBackground,
    TouchableOpacity
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { 
    useSelector, 
    useDispatch
} from 'react-redux';

import {styles, colors} from '../styles/style';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ViewProductScreen from '../screens/viewOneProductScreen';

import * as PRODUCTS from '../../store/actions/dataActions';

const Stack = createStackNavigator();

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
        
        <SafeAreaView style={styles.productContainer}>
            <ImageBackground source={require('../assets/images/unsplash1.jpg')} style={{width:"100%", height: 120 }} resizeMode={'cover'}>
                <View style={{ backgroundColor: 'rgba(52, 52, 52, 0.4)', height:"100%", flex:1, alignItems:'center', textAlign:'center', justifyContent:'center' }}>
                    <Text style={{ color:'white', fontSize:20, padding:10, width:'100%', backgroundColor: 'rgba( 255, 255, 255, 0.3 )'}}>All Products</Text>
                </View>
            </ImageBackground>
            <View>
                <Text style={{color:'tomato', padding:5, fontWeight:'bold'  }}>20 Items</Text>
                <FlatList keyExtractor={item => item.id.toString()} data={allproducts} renderItem={renderProductItem} />
            </View>
        </SafeAreaView>
       
    );
}

const renderProductItem = itemData =>{
    return (
        <TouchableOpacity onPress={() => setScreen(true)}>
            <View style={[styles.productlistContainer]}>
                <View style={styles.productViewImage}>
                    <Image 
                        style={{width:"100%", height: 100, borderRadius: 20}}
                        source={{uri: 'https://bbalansag.online/storage/' + itemData.item.photo_path}}
                        resizeMode={'contain'} // cover or contain its upto you view look
                    />
                </View>
                <View style={styles.productViewTitle}>
                    <View style={styles.productTitleLeft}>
                        <Text style={styles.productTitle} numberOfLines={1}>{itemData.item.title}</Text>
                        <Text style={styles.productDescription} numberOfLines={3}>{itemData.item.description}</Text>
                        <View style={{flexDirection:'row' }}>
                            <Icon name="local-offer" size={20} color={colors.starColor} />
                            <Text style={styles.productPrice} >Price: {itemData.item.price}</Text>
                        </View>
                    </View>
                    <View style={styles.productTitleRight}>
                        <View>
                            <Icon name="star-rate" size={20} color={colors.starColor} />
                        </View>
                        <View>
                            <Text>80%</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
 };

//  const ViewProduct = () => {
//     return (
//         <ViewProductScreen/>
//     );
//   }

// const switchScreen = () =>{
    
//     const [screen, setScreen] = useState(false);

//     return(
//         screen ? ViewProduct() : MyAccountLandingScreen()
//     );
// }


export default MyAccountLandingScreen;


