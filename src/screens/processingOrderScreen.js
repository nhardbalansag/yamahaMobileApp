import React, {useState, useEffect} from 'react';

import {
    FlatList, 
    Image,
    View,
    Text,
    SafeAreaView,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl
} from 'react-native';

import { 
    useSelector, 
    useDispatch
} from 'react-redux';

import {styles, colors} from '../styles/style';
import {stylesCopy, stylescopy} from '../styles/copyStyle';
import * as PRODUCTS from '../../store/actions/dataActions';
import * as Customer from '../../store/actions/customerActions'; 
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProcessingOrderScreen = ({navigation}) =>{
    
    const orderDataByStatus = useSelector(state => state.products.orderDataByStatus);
    const transactionCountByStatus = useSelector(state => state.products.transactionCountByStatus);

    const [limit, setLimit] = useState(5)
    const [loadMoreBool, setLoadmoreBool] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const Tokendata = useSelector(state => state.products.Tokendata);
    const filterType = useSelector(state => state.products.filterType);

    const dispatch = useDispatch();

    const viewProductInformation = async (id) => {
        try {
            await dispatch(PRODUCTS.ViewOneProductInformation(id, Tokendata));
            navigation.navigate('Product')
        } catch (error) {
            alertMessage(error.message);
        }
    }

    const gotoProcesingScreen = async (orderstatusdata) =>{
        try {
            setLoadmoreBool(true)
            await dispatch(Customer.processingOrderScreen(orderstatusdata, Tokendata, limit));
            setLoadmoreBool(false)
        } catch (error) {
            alertMessage(error.message)
        }
        setRefreshing(false)
    }

    const refreshPage = () =>{
        setRefreshing(true)
        gotoProcesingScreen(filterType)
    }

    useEffect(() => {
        gotoProcesingScreen(filterType)
    }, [limit])

    const renderProductItem = ({item}) =>{
        return(
            <TouchableOpacity onPress={() => viewProductInformation(item.id)} style={[styles.productlistContainer, {marginHorizontal:10}]}>
                <View style={styles.productViewImage}>
                    <Image 
                        style={{width:"100%", height: 100, borderRadius: 20}}
                        source={{uri: 'http://bbalansag.online/storage/' + item.photo_path}}
                        resizeMode={'contain'} // cover or contain its upto you view look
                    />
                </View>
                <View style={[styles.productViewTitle, {paddingVertical:10}]}>
                    <View style={styles.productTitleLeft}>
                        <Text style={styles.productTitle}>{item.title}</Text>
                        <Text style={[styles.productDescription, {marginVertical:5}]} numberOfLines={3}>{item.description}</Text>
                        <View style={{flexDirection:'row' }}>
                            <Text style={[styles.productPrice, {marginVertical:5}]} >Price: ₱{item.price}</Text>
                            <Icon name="local-offer" size={20} color={colors.starColor} />
                        </View>
                        <View>
                            <Text>Status: {item.transactionStatus}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
     };

     const loadmore = () =>{
        return(
                transactionCountByStatus > orderDataByStatus.length
                ? 
                    <View style={[{flex:1, flexDirection:'row', justifyContent:'center', marginVertical:20}]}>
                        <TouchableOpacity 
                            onPress={() =>  setLimit(orderDataByStatus.length + 1)}
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
                                    ? <Icon name="cached" size={20} color={colors.lightColor} />
                                    : <Text> <ActivityIndicator size="small" color={colors.lightColor}/> </Text>
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                : 
                    <></>
        )
    }

    return(
        <SafeAreaView style={[styles.productContainerViewOne, {backgroundColor:colors.lightColor}]}>
            { 
                transactionCountByStatus <= 0 ? 
                    <View style={[{flex:1, justifyContent:'center'}]}>
                        <View style={[{justifyContent:'center', alignItems:'center'}]}>
                            <Icon name="remove-shopping-cart" size={50} style={stylescopy.textGray400} />
                            <Text style={{ textAlign:'center', color:colors.disableColor, fontWeight:'bold',  }}>No curent Item</Text>
                        </View>
                    </View>
                :
                    <View>
                        <FlatList 
                            keyExtractor={item => item.id.toString()} 
                            ListFooterComponent={loadmore()}
                            data={orderDataByStatus} renderItem={renderProductItem} 
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={refreshPage} />
                            }
                        />
                    </View>
            }
        </SafeAreaView>
    );
}

export default ProcessingOrderScreen;