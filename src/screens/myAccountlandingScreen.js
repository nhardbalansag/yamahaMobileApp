import React, {useEffect, useState} from 'react';

import {
    FlatList, 
    View,
    Text,
    SafeAreaView,
    ImageBackground,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    RefreshControl,
    Linking,
    Image
} from 'react-native';

import { 
    useSelector, 
    useDispatch
} from 'react-redux';

import {styles, colors} from '../styles/style';
import {stylescopy, colorscopy} from '../styles/copyStyle';
import Icons from 'react-native-vector-icons/MaterialIcons';

import * as PRODUCTS from '../../store/actions/dataActions';
import * as Customer from '../../store/actions/customerActions'; 

import SearchBar from "react-native-dynamic-search-bar";
import Carousel from 'react-native-snap-carousel';

import { SocialIcon } from 'react-native-elements'
import { Avatar, Badge, withBadge } from 'react-native-elements'
const MyAccountLandingScreen = ({navigation}) =>{

    const Tokendata = useSelector(state => state.products.Tokendata);
    const dispatch = useDispatch();

    const [tokendataState, settokendataState] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [Startrefreshing, setStartRefreshing] = useState(true);
    const [loadMoreBool, setLoadmoreBool] = useState(false);
    const [limit, setLimit] = useState(10);
    const [allProducts, setallProducts] = useState();
    const [count, setCount] = useState();
    const [total, setTotal] = useState();
    const [filterList, setfilterList] = useState();


    const searchProducts = async () =>{
        setStartRefreshing(true)
        try {
            const response = await fetch('http://www.bbalansag.online/api/search/product/' + filterList, {
               headers:{
                   'Content-type': 'application/json',
                   'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC',
                   'Authorization': 'Bearer ' + Tokendata
               }
           });
           const responseData = await response.json();
           setallProducts(responseData.data)
           setCount(responseData.data.length)
           setTotal(responseData.total)
       } catch (error) {
           alertMessage(error.message);
       }
       setStartRefreshing(false)
       setRefreshing(false)
       setStartRefreshing(false)
       setLoadmoreBool(false)
    }

    const viewallproducts = async (limit) => {
        setRefreshing(true)
        try {
             const response = await fetch('http://www.bbalansag.online/api/' + limit, {
                headers:{
                    'Content-type': 'application/json',
                    'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC',
                    'Authorization': 'Bearer ' + Tokendata
                }
            });
            const responseData = await response.json();
            setallProducts(responseData.data)
            setCount(responseData.data.length)
            setTotal(responseData.total)
        } catch (error) {
            alertMessage(error.message);
        }
        setRefreshing(false)
        setStartRefreshing(false)
        setLoadmoreBool(false)
    }

    const viewProductInformation = async (id) => {
        try {
            await dispatch(PRODUCTS.ViewOneProductInformation(id, tokendataState));
            navigation.navigate('Product')
        } catch (error) {
            alertMessage(error.message);
        }
    }

    const refreshPage = () =>{
        viewallproducts(limit)
    }

    useEffect(() => {
        setLoadmoreBool(true)
        viewallproducts(limit);
        settokendataState(Tokendata);
    }, [limit]); 

    const alertMessage = (message) => {
        setRefreshing(false)
        Alert.alert(
            "An error occured",
            message,
            [ { text: "OKAY"}],
            { cancelable: false }
          );
    }

    const loadmore = () =>{
        return(
                total > count
                ? 
                    <View style={[{flex:1, flexDirection:'row', justifyContent:'center', marginVertical:20}]}>
                        <TouchableOpacity 
                            onPress={() =>  setLimit(count + 2)}
                            style={[{
                                backgroundColor:colors.primaryColor,
                                paddingVertical:10,
                                paddingHorizontal:10,
                                borderRadius:10
                            }]}>
                            <View style={[{flexDirection:'row', justifyContent:'center', alignItems:'center'}]}>
                                <Text
                                    style={[{
                                        color:'white',
                                        fontSize:15,
                                        marginRight:5
                                    }]}
                                >
                                    Load more
                                </Text>
                                {
                                    !loadMoreBool 
                                    ? <Icons name="cached" size={20} color={colors.lightColor} />
                                    : <Text> <ActivityIndicator size="small" color={colors.lightColor}/> </Text>
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                : 
                    <></>
        )
    }

    const renderProductItem = ({item}) =>{
            return(
                <TouchableOpacity style={[{width:"50%", paddingHorizontal:5}]} key={item.id} onPress={() => viewProductInformation(item.id)}>
                    <View style={{flexDirection:"column",  marginHorizontal:3, marginVertical:10, padding:5, borderRadius:5, backgroundColor:'white'}}>
                        <View>
                            <Image
                                source={{uri: 'http://bbalansag.online/storage/' + item.photo_path}}
                                style={{width:"100%", height: 100}}
                                PlaceholderContent={<ActivityIndicator size="small" color={colors.lightColor}/>}
                            />
                        </View>
                        <View style={[{flexDirection:'column', justifyContent:'space-around', alignItems:'center', height:120}]}>
                            <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
                            <Text style={styles.productDescription} numberOfLines={3}>{item.description}</Text>
                            <View style={{flexDirection:'row' }}>
                                <Text style={styles.productPrice} >Price: ₱{item.price}</Text>
                                <Icons name="local-offer" size={20} color={colors.starColor} />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            );
     };

     const headerHome = () =>{
         return(
             <View style={[{
                 marginTop:10
             }]}>
                 {
                     count == 1
                     ?
                        <></>
                    :
                    (
                        count == 0 
                        ? 
                            <View>
                                <Text style={[{textAlign:'center'}]}>no items available, hold and pull down to refresh</Text>
                            </View>
                        :
                            <>
                               
                                <ImageBackground source={require('../assets/images/slide1.png')} style={{width:"100%", height: 150 }} resizeMode={'cover'}>
                                    <View style={{ backgroundColor: 'rgba(52, 52, 52, 0.4)', height:"100%", flex:1, alignItems:'center', textAlign:'center', justifyContent:'center' }}>
                                        <Text style={{ color:'white', fontSize:20, padding:10, width:'100%', backgroundColor: 'rgba( 255, 255, 255, 0.3 )'}}>All Products</Text>
                                    </View>
                                </ImageBackground>
                                <View style={[stylescopy.mB1]}>
                                    <TouchableOpacity onPress={() => Linking.openURL('fb://page/105158801438012')}>
                                        <SocialIcon
                                            title='Visit Facebook Page'
                                            button
                                            type='facebook'
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => Linking.openURL('http://m.me/105158801438012')}>
                                        <SocialIcon
                                            title='Direct facebook Messenger'
                                            light
                                            button
                                            type='facebook'
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={[stylescopy.flexRow, stylescopy.alignCenter, stylescopy.m1]}>
                                    <Badge value={count} Items status="success" /> 
                                    <Text style={[{marginLeft:5}]}>Items</Text>
                                </View>
                            </>
                    )
                 }
             </View>
         );
     }

    return(
        <SafeAreaView style={[stylescopy.mB5]}>
            
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
                                onChangeText={(text) => setfilterList(text)}
                                onSearchPress={() => searchProducts()}
                                onClearPress={() => setfilterList(false)}
                                onPress={() =>  searchProducts()}
                                />
                            </View>

                            <FlatList 
                                keyExtractor={item => item.id.toString()} 
                                data={allProducts} 
                                renderItem={renderProductItem} 
                                ListFooterComponent={loadmore()}
                                ListHeaderComponent={headerHome}
                                numColumns={2}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={refreshPage} />
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


