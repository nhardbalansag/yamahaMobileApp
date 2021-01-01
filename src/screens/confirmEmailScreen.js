import React, {useState} from 'react';

import {
    View, 
    TouchableOpacity,
    Text, 
    TextInput, 
    Alert, 
    ActivityIndicator,
    SafeAreaView
} from 'react-native';

import {
    styles, 
    colors
} from '../styles/style';

import { 
    useDispatch,
    useSelector
} from 'react-redux';

import * as Customer from '../../store/actions/customerActions'; 
import * as PRODUCTS from '../../store/actions/dataActions';
import Icon from 'react-native-vector-icons/MaterialIcons';

const confirmEmaiScreen = () =>{
    const dispatch = useDispatch();

    const CustomerInformation = useSelector(state => state.products.CustomerInformation);
    const Tokendata = useSelector(state => state.products.Tokendata);
    const [verification, setVerification] = useState('');
    const [loadingstate, setloadingstate] = useState(false);

    const comnfirmVerification = async (verification, token, id) =>{
        setloadingstate(true);
        try {
            await dispatch(Customer.confirmVerification(verification, token, id));
        } catch (error) {
            alertMessage(error.message);
        }
    }

    const backtoLanding = async () =>{
        try {
            await dispatch(PRODUCTS.backtoLanding());
        } catch (error) {
            console.log(error.message);
        }
    }

    const alertMessage = (message) => {
        Alert.alert(
            "Status",
            message,
            [ { text: "OKAY", onPress: () => setloadingstate(false)}]
          );
    }

    return(
        <SafeAreaView style={[styles.productContainer, {backgroundColor:colors.lightColor}]}>
            <View style={{ flexDirection:'row', justifyContent: 'flex-end'}}>
                <TouchableOpacity onPress={() => backtoLanding()} style={{ padding:10 }}>
                    <Text style={{ color:colors.dangerColor }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        
            <View style={styles.container}>
                <View style={[{justifyContent:'center', alignItems:'center'}]}>
                        <TextInput
                            style={{ fontSize:30, textAlign:'center', borderBottomColor:colors.disableColor, borderBottomWidth:1, marginBottom:5 }}
                            keyboardType ="numeric"
                            onChangeText = {text => setVerification(text)}
                        />
                        <Text style={{ textAlign:'center', color:colors.disableColor, fontSize:20, marginBottom:10 }}>Verification code</Text>
                        {
                            loadingstate ? <ActivityIndicator size="large" color={colors.dangerColor}/> :
                            <TouchableOpacity onPress={()=>comnfirmVerification(verification, Tokendata, CustomerInformation[0].id)} style={styles.GeneralButton}>
                                <View>
                                    <Text style={styles.GeneralButtonText}>Confirm</Text>
                                </View>
                            </TouchableOpacity>
                        }
                </View>
            </View>
        </SafeAreaView>
    );
}

export default confirmEmaiScreen;