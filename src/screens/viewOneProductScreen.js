import React,{useEffect, useState} from 'react';

import {
    View, 
    Text,
    Image,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';

import {
    styles, 
    colors
} from '../styles/style';

import { 
    useDispatch,
    useSelector
} from 'react-redux';

import * as PRODUCTS from '../../store/actions/dataActions';
import {Item} from 'native-base';

const ViewOneProductInformation = () => {

    const ProductInformation = useSelector(state => state.products.ProductInformation);
    const ProductSpecification = useSelector(state => state.products.ProductSpecification);
    const ProductinquiriesCount = useSelector(state => state.products.ProductinquiriesCount);
    const ProductPercentage = useSelector(state => state.products.ProductPercentage);
    const dispatch = useDispatch();

    const backtoLanding = async () =>{
        try {
            await dispatch(PRODUCTS.backtoLanding());
        } catch (error) {
            console.log(error.message);
        }
    }

    const renderProductItem = ({item}) =>{
        return(
            <List>
                <ListItem avatar>
                <Left>
                    <Icon name="settings" size={20} color={colors.disableColor} />
                </Left>
                <Body>
                    <Text style={{ fontWeight:'bold' }}>{item.title}</Text>
                    <Text note>{item.description}</Text>
                </Body>
                </ListItem>
            </List>
        );
    };
    const rederProductInformation = () =>{
        return (
            <View>
                <ImageBackground source={{uri: 'https://bbalansag.online/storage/' + ProductInformation.photo_path}} style={{width:"100%", height: 250 }} resizeMode={'contain'}>
                    <View style={{ backgroundColor: 'rgba(52, 52, 52, 0.4)', height:"100%", flex:1, alignItems:'center', textAlign:'center', justifyContent:'flex-end' }}>
                        <Text style={{ color:'white', fontSize:20, padding:10, width:'100%', backgroundColor: 'rgba( 255, 255, 255, 0.3 )'}}>{ProductInformation.title}</Text>
                        <Image 
                            style={{width:"100%", height: 100, borderRadius: 20, margin:5}}
                            source={{uri: 'https://bbalansag.online/storage/' + ProductInformation.photo_path}}
                            resizeMode={'contain'} // cover or contain its upto you view look
                        />
                    </View>
                </ImageBackground>
                <View style={{ paddingHorizontal:"5%" }}>
                    <View style={{ flexDirection:'row', justifyContent: 'center', alignItems:'center'}}>
                        <Text>₱</Text>
                        <Text style={{ fontWeight:'bold', fontSize:20 }}>{ProductInformation.price}</Text>
                        <Icon name="local-offer" size={20} color={colors.starColor} />
                    </View>
                    <View style={{ flexDirection:'row', justifyContent: 'space-around'}}>
                        <TouchableOpacity style={{ padding:10 }}>
                            <Icon name="forward-to-inbox" size={30} color={colors.dangerColor} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding:10 }}>
                            <Icon name="add-shopping-cart" size={30} color={colors.dangerColor} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => backtoLanding()} style={{ padding:10 }}>
                            <Icon name="arrow-back" size={30} color={colors.dangerColor} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{ fontWeight:'bold', fontSize:18 }}>{ProductInformation.title}</Text>
                        <View style={{ flexDirection:'row' }}>
                            <Icon name="star-rate" size={20} color={colors.starColor} />
                            <Text>Rate: </Text>
                            <Text style={{ color:colors.successColor, fontWeight:'bold', fontSize:16 }}>{ProductPercentage}%</Text>
                        </View>
                        <View style={{ flexDirection:'row' }}>
                            <Icon name="chat" size={20} color={colors.starColor} />
                            <Text>Inquiries: </Text>
                            <Text style={{ color:colors.successColor, fontWeight:'bold', fontSize:16 }}>{ProductinquiriesCount}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ color:colors.disableColor }}>{ProductInformation.description}</Text>
                    </View>
                    <Text style={{ fontSize:18 }}>Specifications:</Text>
                </View>
            </View>
        );
    }

    return(
        <SafeAreaView style={styles.productContainer}>
            <FlatList keyExtractor={item => item.id.toString()} data={ProductSpecification} ListHeaderComponent={rederProductInformation()} renderItem={renderProductItem} />
        </SafeAreaView>
    );
}

export default ViewOneProductInformation;