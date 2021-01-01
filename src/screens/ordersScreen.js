import React from 'react';

import {
    TouchableOpacity, 
    View, 
    Text, 
    SafeAreaView, 
    ScrollView ,
    Alert
} from 'react-native';

import { 
    useSelector, 
    useDispatch
} from 'react-redux';

import {styles, colors} from '../styles/style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Customer from '../../store/actions/customerActions'; 

const orderStatus = {
    toProcess: 'processing',
    toDeliver: 'deliver',
    complete: 'complete'
};

const OrderScreen = () =>{
    
    const CustomerInformation = useSelector(state => state.products.CustomerInformation);
    const Tokendata = useSelector(state => state.products.Tokendata);
    const dispatch = useDispatch();

    const gotoProcesingScreen = async (orderstatusdata, id, token) =>{
        try {
            await dispatch(Customer.processingOrderScreen(orderstatusdata, id, token));
        } catch (error) {
            alertMessage(error.message)
        }
    }

    const alertMessage = (message) => {
        Alert.alert(
            "An error occured",
            message,
            [ { text: "OKAY"}],
            { cancelable: false }
        );
    }

    return(
        <SafeAreaView style={[styles.container, {  backgroundColor:colors.lightColor }]}>
                <View>
                    <TouchableOpacity 
                        onPress={() => gotoProcesingScreen(orderStatus.toProcess, CustomerInformation[0].id, Tokendata)} 
                        style={[styles.border, {borderRadius:10, paddingHorizontal:'10%', paddingBottom:10, marginVertical:10}]}
                    >
                        <Icon name="update" size={100} color={colors.dangerColor} />
                        <Text style={{ textAlign:'center', color:colors.disableColor, fontWeight:'bold',  }}>Processing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => gotoProcesingScreen(orderStatus.toDeliver, CustomerInformation[0].id, Tokendata)} 
                        style={[styles.border, {borderRadius:10, paddingHorizontal:'10%', paddingBottom:10, marginVertical:10}]}
                    >
                        <Icon name="local-shipping" size={100} color={colors.dangerColor} />
                        <Text style={{ textAlign:'center', color:colors.disableColor, fontWeight:'bold' }}>To Deliver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => gotoProcesingScreen(orderStatus.complete, CustomerInformation[0].id, Tokendata)} 
                        style={[styles.border, {borderRadius:10, paddingHorizontal:'10%', paddingBottom:10, marginVertical:10}]}
                    >
                        <Icon name="check-circle-outline" size={100} color={colors.dangerColor} />
                        <Text style={{ textAlign:'center', color:colors.disableColor, fontWeight:'bold' }}>Completed</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    );
}

export default OrderScreen;