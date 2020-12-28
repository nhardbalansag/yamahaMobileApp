import React, {useState} from 'react';
import { 
    Container, 
    Left, 
    Right, 
    List, 
    ListItem,
    Item,
    Label,
    Input
} from 'native-base';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native'

import {styles, colors} from '../styles/style';

const AccountScreen = () =>{
    
    const [isEdit, setisEdit] = useState(false);
    const [editText, setEditText] = useState('');


    const alertMessage = () => {
        Alert.alert(
            "Warning",
            "Do you want to submit this edit?",
            [
              { text: "Cancel", style: "cancel", onPress: () => setisEdit(false)},
              { text: "OK", onPress: () => getTextEdit(editText) }
            ],
            { cancelable: false }
          );
    }

    const getTextEdit = (data) =>{
        setisEdit(false);
        console.warn(data);
    }

    return(
        <SafeAreaView>
            <ScrollView>
                <Container>
                    <View  style={{ marginTop:50 }}>
                        <View style={{ marginHorizontal:'5%' }}>
                            <View style={{ flexDirection:'row', justifyContent: 'center', alignItems:'center'}}>
                                <View style={{ justifyContent: 'center', alignItems:'center'}}>
                                    <Text style={{ color:colors.dangerColor, textTransform: 'capitalize', fontSize:20}}>bernard balansag</Text>
                                    <Text style={{ color:colors.primaryColor, fontSize:15 }}>email</Text>
                                    <Text style={{ color:colors.disableColor, fontSize:15 }}>12 Orders</Text>
                                    
                                    <View>
                                        <View style={{ flexDirection:'row', justifyContent: 'center', alignItems:'center'}}>
                                            <Text style={{ color:colors.disableColor, fontSize:15 }}>application status</Text>
                                        </View>
                                        <View style={{ flexDirection:'row', justifyContent: 'center', alignItems:'center'}}>
                                            <Icon name="star-rate" size={20} color={colors.starColor} />
                                            <Text style={{ color:colors.successColor, fontWeight:'bold', fontSize:16 }}>80%</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginVertical:10 }}>
                                <View style={{ flexDirection:'row', justifyContent: 'flex-start', alignItems:'center', marginBottom:5}}>
                                    <Icon name="mail-outline" size={20} color={colors.dangerColor} />
                                    <Text style={{ color:colors.disableColor, marginLeft: 5 }}>emailk@mrkadf</Text>
                                </View>
                                <View style={{ flexDirection:'row', justifyContent: 'flex-start', alignItems:'center', marginBottom:5}}>
                                    <Icon name="smartphone" size={20} color={colors.dangerColor} />
                                    <Text style={{ color:colors.disableColor, marginLeft: 5 }}>09214408766</Text>
                                </View>
                                <View style={{ flexDirection:'row', justifyContent: 'flex-start', alignItems:'center', marginBottom:5}}>
                                    <Icon name="location-on" size={20} color={colors.dangerColor} />
                                    <Text style={{ color:colors.disableColor, marginLeft: 5 }}>09214408766</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <List>
                                <ListItem selected>
                                        {
                                            isEdit ?
                                                <Left>
                                                    <Item fixedLabel>
                                                        <Label style={{ fontSize:13, color:colors.disableColor }}>First Name:</Label>
                                                        <Input onChangeText = {text => setEditText(text)}/>
                                                    </Item>
                                                </Left>
                                            :
                                                <Left>
                                                    <Text style={{ color: colors.disableColor }}>Simon Mignolet</Text>
                                                </Left>
                                        }
                                    <Right>
                                        {
                                            isEdit ?
                                                <TouchableOpacity onPress={()=> alertMessage()} style={{ paddingHorizontal:20 }}>
                                                    <Icon name="check" size={20} color={colors.dangerColor} />
                                                </TouchableOpacity>
                                            :
                                                <TouchableOpacity onPress={()=> setisEdit(true)} style={{ paddingHorizontal:20 }}>
                                                    <Icon name="create" size={20} color={colors.dangerColor} />
                                                </TouchableOpacity>
                                        }
                                    </Right>
                                </ListItem>
                            </List>
                        </View>
                    </View>
                </Container>
            </ScrollView>
      </SafeAreaView>
    );
}

export default AccountScreen;