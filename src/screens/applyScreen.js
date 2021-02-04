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

const ApplyScreenStart = ({navigation}) =>{

    return(
        <View style={[{flex:1,flexDirection:'column', justifyContent:'space-between', backgroundColor:colors.lightColor}]}>
            <View style={{ paddingHorizontal:'5%', flex:3, flexDirection:'column', justifyContent:'space-around'}}>
                <View >
                    <Text style={{ fontSize:20}}>Upgrade your account easily to get access in these service</Text>
                </View>
                <View style={{ flexDirection:'row', justifyContent:'flex-start', alignItems:'center' }}>
                    <View style={{ width:'40%' }}>
                        <Icon name="send" size={50} color={colors.successColor} />
                    </View>
                    <View style={{ width:'60%' }}>
                        <Text style={{ color:colors.disableColor, fontSize:15 }}>
                            Sending of files for contactless and easy application
                        </Text>
                    </View>
                </View>
                <View>
                    <View style={{marginVertical:10, flexDirection:'row', justifyContent:'flex-start', alignItems:'center' }}>
                        <Text style={{ fontWeight:'bold', width:'40%' }}>Step 1:</Text>
                        <Text style={{width:'60%', color:colors.disableColor }}>Complete and verify your personal information</Text>
                    </View>
                    <View style={{ flexDirection:'row', justifyContent:'flex-start', alignItems:'center' }}>
                        <Text style={{ fontWeight:'bold', width:'40%' }}>Step 2:</Text>
                        <Text style={{width:'60%', color:colors.disableColor }}>Verify your Identity by sending documents needed to provide for application</Text>
                    </View>
                </View>
            </View>
            <View>
                <View style={[ styles.justifyCenter, {alignItems:'center', marginBottom:10}]}>
                    <TouchableOpacity onPress={() => navigation.navigate('StepNoteToVerify')}style={styles.GeneralButton}>
                        <View>
                            <Text style={styles.GeneralButtonText}>Next</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default ApplyScreenStart;