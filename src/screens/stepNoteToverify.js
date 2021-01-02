import React from 'react';
import {
    View, 
    TouchableOpacity,
    Text, 
} from 'react-native';

import {
    styles, 
    colors
} from '../styles/style';

import Icon from 'react-native-vector-icons/MaterialIcons';

const StepNoteToVerify = ({navigation}) =>{

    return(
        <View style={[{flex:1, flexDirection:'column', justifyContent:'space-between', backgroundColor:colors.lightColor}]}>
            <View style={{ paddingHorizontal:'5%', flex:3, flexDirection:'column', justifyContent:'space-around'}}>
                <View style={[{alignItems:'center'}]}>
                    <Icon name="fact-check" size={50} color={colors.successColor}/>
                </View>
                <View>
                    <View style={{ flexDirection:'row', justifyContent:'flex-start', alignItems:'center' }}>
                        <Text style={{ fontWeight:'bold' }}>1.</Text>
                        <Text style={{ color:colors.disableColor }} numberOfLines={3}>Complete and verify your personal information</Text>
                    </View>
                    <View style={{ flexDirection:'row', justifyContent:'flex-start', alignItems:'center' }}>
                        <Text style={{ fontWeight:'bold' }}>2.</Text>
                        <View style={{ flexDirection:'column' }}>
                            <Text style={{color:colors.disableColor }}>Prepare your Documents. </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('DocumentList')}>
                                <Text numberOfLines={3} style={{ color:colors.primaryColor, fontWeight:'bold' }}>Check document list here.</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={{ color:colors.disableColor }}>
                        <Text style={{ fontWeight:'bold' }}>Note: </Text>
                        <Text>strong and stable data connection is required in order to complete the verification process. Please be advised that the process may comsume data. standard mobile rates apply</Text>
                    </Text>
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('SendDocument')} style={styles.GeneralButton}>
                    <View>
                        <Text style={styles.GeneralButtonText}>Next</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default StepNoteToVerify;