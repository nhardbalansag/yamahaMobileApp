import React, {useEffect, useState} from 'react';

import {
    FlatList, 
    Image,
    View,
    Text,
    SafeAreaView,
    Alert,
    TouchableOpacity,
    RefreshControl
} from 'react-native';

import { 
    useSelector, 
    useDispatch
} from 'react-redux';

import {styles, colors} from '../styles/style';
import * as Customer from '../../store/actions/customerActions'; 
import * as PRODUCTS from '../../store/actions/dataActions';
import Icon from 'react-native-vector-icons/MaterialIcons';

const toDeliverOrderScreen = () =>{
    
    const allTransactionData = useSelector(state => state.products.transactionData);
    const transactionCount = useSelector(state => state.products.transactionCount);
    const Tokendata = useSelector(state => state.products.Tokendata);
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);
    const [limit, setLimit] = useState(1);

    const getOrders = async (limit, orderstatus) =>{
        setRefreshing(true)
        try {
            const response = await fetch('http://www.bbalansag.online/api/getOrder/' + limit, {
            method: 'POST',
            headers:{
                'Content-type': 'application/json',
                'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC',
                'Authorization': 'Bearer ' + Tokendata
            },
            body: JSON.stringify({
                orderstatus
            })
        });

        const responseData = await response.json();
        console.warn(responseData)
        } catch (error) {
            
        }
        setRefreshing(false);
    }

    const getCountData = async () => {
        try {
            await dispatch(Customer.getCount());
        } catch (error) {
            alertMessage(error.message);
        }
    }
   console.warn(allTransactionData)
    useEffect(() => {
        getOrders()
        getCountData();
    }, []); 

    const alertMessage = (message) => {
        Alert.alert(
            "An error occured",
            message,
            [ { text: "OKAY"}],
            { cancelable: false }
          );
    }

    const backtoLanding = async () =>{
        try {
            await dispatch(PRODUCTS.backtoLanding());
        } catch (error) {
            console.log(error.message);
        }
    }

    const renderProductItem = ({item}) =>{
        return(
            <View style={[styles.productlistContainer]}>
                <View style={styles.productViewImage}>
                    <Image 
                        style={{width:"100%", height: 100, borderRadius: 20}}
                        source={{uri: 'http://bbalansag.online/storage/' + item.photo_path}}
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
                        <View>
                            <Text>Status: {item.transactionStatus}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
     };

    return(
        <SafeAreaView style={styles.productContainer}>
            <View>
                <View style={{ flexDirection:'row', justifyContent: 'space-between'}}>
                    <Text style={{color:'tomato', padding:5, fontWeight:'bold'  }}>{transactionCount} Items</Text>
                    <TouchableOpacity onPress={() => backtoLanding()} style={{ padding:10 }}>
                        <Icon name="arrow-back" size={30} color={colors.dangerColor} />
                    </TouchableOpacity>
                </View>
                {/* <FlatList 
                    keyExtractor={item => item.id.toString()} 
                    data={allTransactionData} 
                    renderItem={renderProductItem} 
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={getOrders} />
                    }
                /> */}
            </View>
        </SafeAreaView>
       
    );
}

export default toDeliverOrderScreen;