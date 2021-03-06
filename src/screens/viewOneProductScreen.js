import React,{useState} from 'react';

import {
    View, 
    Text,
    Image,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    ActivityIndicator,
    Linking
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    List, 
    ListItem, 
    Left, 
    Body 
} from 'native-base';

import {
    styles, 
    colors
} from '../styles/style';

import { 
    useDispatch,
    useSelector
} from 'react-redux';

import {stylescopy, colorscopy} from '../styles/copyStyle';

import * as PRODUCTS from '../../store/actions/dataActions';
import * as Customer from '../../store/actions/customerActions'; 

import { SocialIcon } from 'react-native-elements'

import PayPal from 'react-native-paypal-gateway';

const ViewOneProductInformation = ({navigation}) => {

    const ProductInformation = useSelector(state => state.products.ProductInformation);
    const ProductSpecification = useSelector(state => state.products.ProductSpecification);
    const ProductinquiriesCount = useSelector(state => state.products.ProductinquiriesCount);
    const ProductPercentage = useSelector(state => state.products.ProductPercentage);
    const Tokendata = useSelector(state => state.products.Tokendata);
    const CustomerInformation = useSelector(state => state.products.CustomerInformation);
    const dispatch = useDispatch();
    const [loadingstate, setloadingstate] = useState(false);
    
    const refreshInquiryCount  = async (id, token) =>{
        try {
            await dispatch(PRODUCTS.ViewOneProductInformation(id, token));
        } catch (error) {
            console.log(error.message)
        }
    }

    const backtoLanding = async () =>{
        try {
            await dispatch(PRODUCTS.backtoLanding());
        } catch (error) {
            console.log(error.message);
        }
    }

    const sendInquiry = async (id) =>{
        try {
            await dispatch(Customer.sendInquiry(id));
        } catch (error) {
            statusInquiryMessage(id, Tokendata, error.message);
        }
    }

    const statusInquiryMessage = (id, token, message) => {
        Alert.alert(
            "Inquiry Status",
            message,
            [
              { text: "OK" , onPress: () => refreshInquiryCount(id, token)}
            ],
            { cancelable: false }
          );
    }

    const alertMessage = (id) => {
        Alert.alert(
            "Send Inquiry",
            "Do you want to send and Inquiry?",
            [
              { text: "Cancel", style: "cancel" },
              { text: "OK", onPress: () => sendInquiry(id) }
            ],
            { cancelable: false }
          );
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

    const gotoconfirmEmailScreen = async () =>{
        setloadingstate(false);
        try {
            await dispatch(Customer.gotoCofirmEmailScreen());
        } catch (error) {
            Alert.alert(
                "An Error Occured!",
                error.message,
                [
                  { text: "OKAY", onPress: () => setloadingstate(false)}
                ],
                { cancelable: false }
            );
        }
    }

    const gotoConfirmEmail = async (token) =>{
        try {
            setloadingstate(true);
            await dispatch(Customer.confirmEmail(token));
            setloadingstate(false);
        } catch (error) {
            if(error.message === "true" ){
                Alert.alert(
                    "An Error Occured!",
                    error.message,
                    [
                      { text: "OKAY", onPress: () => setloadingstate(false)}
                    ],
                    { cancelable: false }
                );
            }else if(error.message === "false"){
                Alert.alert(
                    "Status",
                    "Succesfully sent, Please Confirm",
                    [
                      { text: "Cancel", onPress: () => setloadingstate(false)},
                      { text: "OKAY", onPress: () => gotoconfirmEmailScreen()}
                    ],
                    { cancelable: false }
                );
            }
        }
    }

    const errorAlert = (message) =>{
        Alert.alert(
            "Status",
            message,
            [
              { text: "OK"}
            ],
            { cancelable: false }
          );
    }


    const sendPayment = async (product_id, amount) =>{
        try {
            const  response = await fetch('http://www.bbalansag.online/api/customer/payment/parts/checkout', {
                method:'POST',
                headers:{
                    'Content-type': 'application/json',
                    'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC',
                    'Authorization': 'Bearer ' + Tokendata
                },
                body: JSON.stringify({
                    product_id,
                    amount
                })
            });
            const responseData = await response.json();
            errorAlert(responseData)
        } catch (error) {
            errorAlert(error.message)
        }
    }

    const renderPaypal = () =>{
        PayPal.initialize(PayPal.SANDBOX, "ARZLAD9HtYUoSG_-oc4dwGlf8p7fiqnX6fDcmo0sGrc_REVZ5OznxQv9AosAX8p_4sKYzL3JAYarpHkA");
        PayPal.pay({
          price: ProductInformation.price.toString(),
          currency: 'PHP',
          description: ProductInformation.title,
        }).then(confirm => confirm.response.state == 'approved' ? sendPayment(ProductInformation.id, ProductInformation.price) : errorAlert(confirm.response.state))
          .catch(error => console.log(error));
    }

    const checkemail = (token, productCategoryId) =>{
       
        if(CustomerInformation[0].verified === 1){
            productCategoryId  == 3 ? renderPaypal() : navigation.navigate('ApplyScreenStart');
        }else{
            Alert.alert(
                "Notice",
                "Please Confirm your email",
                [
                  { text: "Not now", style: "cancel" },
                  { text: "OKAY", onPress: () => gotoConfirmEmail(token) }
                ],
                { cancelable: false }
            );
        }
    }

    const rederProductInformation = () =>{
        return (
            <View>
                <ImageBackground source={{uri: 'http://bbalansag.online/storage/' + ProductInformation.photo_path}} style={{width:"100%", height: 250 }} resizeMode={'contain'}>
                    <View style={{ backgroundColor: 'rgba(52, 52, 52, 0.4)', height:"100%", flex:1, alignItems:'center', textAlign:'center', justifyContent:'flex-end' }}>
                        <Text style={{ color:'white', fontSize:20, padding:10, width:'100%', backgroundColor: 'rgba( 255, 255, 255, 0.3 )'}}>{ProductInformation.title}</Text>
                        <Image 
                            style={{width:"100%", height: 100, borderRadius: 20, margin:5}}
                            source={{uri: 'http://bbalansag.online/storage/' + ProductInformation.photo_path}}
                            resizeMode={'contain'} // cover or contain its upto you view look
                        />
                    </View>
                </ImageBackground>
                <View style={[{paddingHorizontal:"5%"}]}>
                    <View style={[stylescopy.mY2, stylescopy.backgroundPrimary, stylescopy.pY1, stylescopy.flexRow, stylescopy.justifyCenter, stylescopy.alignCenter, stylescopy.rounded]}>
                        <Text style={[stylescopy.textWhite, { fontWeight:'bold', fontSize:20 }]}>₱{ProductInformation.price}</Text>
                        <Icon name="local-offer" size={20} color={colors.starColor} />
                    </View>
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
                    <View style={[stylescopy.mB2,{ flexDirection:'row', justifyContent: 'space-around'}]}>
                        <TouchableOpacity 
                        onPress={() => alertMessage(ProductInformation.id)} 
                        style={[{paddingHorizontal:10, flexDirection:'row', paddingVertical:15, borderWidth:1, borderColor:colors.primaryColor,  justifyContent:'center', alignItems:'center', borderRadius:50}]}>
                            <Text style={[{fontWeight:'bold', marginRight:5}]}>Send Inquiry</Text>
                            <Icon name="mail" size={20} color={colors.darkColor} />
                        </TouchableOpacity>
                        {
                            loadingstate ? <ActivityIndicator size="large" color={colorscopy.primaryColor}/> :
                                ProductInformation.product_category_id == 1 ?
                                    <TouchableOpacity 
                                        onPress={
                                            () => checkemail(
                                                Tokendata,
                                                ProductInformation.product_category_id
                                            )
                                        } 
                                        style={[{paddingHorizontal:10, paddingVertical:15, borderWidth:1, borderColor:colors.primaryColor,  justifyContent:'center', alignItems:'center', flexDirection:'row', borderRadius:50}]}>
                                       <Text style={[{fontWeight:'bold', marginRight:5}]}>Set up Credentials</Text>
                                        <Icon name="folder" size={20} color={colors.darkColor} />
                                    </TouchableOpacity>
                                :
                                    <TouchableOpacity 
                                        onPress={
                                            () => checkemail(
                                                Tokendata,
                                                ProductInformation.product_category_id
                                            )
                                        } 
                                        style={[{paddingHorizontal:10, paddingVertical:15, borderWidth:1, borderColor:colors.primaryColor,  justifyContent:'center', alignItems:'center', flexDirection:'row', borderRadius:50}]}>
                                        <Text style={[{fontWeight:'bold', marginRight:5}]}>Buy Product</Text>
                                        <Icon name="shopping-bag" size={20} color={colors.darkColor} />
                                    </TouchableOpacity>
                        }
                    </View>
                    <View>
                        <Text style={[stylescopy.mB1, { fontWeight:'bold', fontSize:18 }]}>{ProductInformation.title}</Text>
                        <View style={[{ flexDirection:'row' }]}>
                            <Icon name="star-rate" size={20} color={colors.starColor} />
                            <Text>Rate: </Text>
                            <Text style={{ color:colors.successColor, fontWeight:'bold', fontSize:16 }}>{ProductPercentage}%</Text>
                        </View>
                        <View style={[stylescopy.mB1,{ flexDirection:'row' }]}>
                            <Icon name="chat" size={20} color={colors.starColor} />
                            <Text>Inquiries: </Text>
                            <Text style={{ color:colors.successColor, fontWeight:'bold', fontSize:16 }}>{ProductinquiriesCount}</Text>
                        </View>
                    </View>
                    <View style={[stylescopy.mB1]}>
                        <Text style={{ color:colors.disableColor }}>{ProductInformation.description}</Text>
                    </View>
                    <Text style={{ fontSize:18 }}>Specifications:</Text>
                </View>
            </View>
        );  
    }

    return(
        <SafeAreaView style={styles.productContainerViewOne}>
            <FlatList 
            keyExtractor={item => item.id.toString()} 
            data={ProductSpecification} 
            ListHeaderComponent={rederProductInformation()} 
            renderItem={renderProductItem} 
            />
        </SafeAreaView>
    );
}

export default ViewOneProductInformation;