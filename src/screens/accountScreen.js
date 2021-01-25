import React, {useState} from 'react';
import { 
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
    Alert,
    ActivityIndicator
} from 'react-native';

import { 
    useDispatch,
    useSelector
} from 'react-redux';

import {styles, colors} from '../styles/style';

import * as Customer from '../../store/actions/customerActions'; 

const AccountScreen = () =>{
    
    const CustomerInformation = useSelector(state => state.products.CustomerInformation);
    const CustomerLoginEmail = useSelector(state => state.products.CustomerLoginEmail);
    const CustomerLoginPassword = useSelector(state => state.products.CustomerLoginPassword);
    const Tokendata = useSelector(state => state.products.Tokendata);
    const approval_result_percent = useSelector(state => state.products.approval_result_percent);
    const transactionCount = useSelector(state => state.products.transactionCount);
    const [isEdit, setisEdit] = useState('');
    const [editText, setEditText] = useState('');
    const dispatch = useDispatch();

    const dataname = {
        first_name: "first_name",
        last_name: "last_name", 
        middle_name: "middle_name", 
        home_address: "home_address", 
        street_address: "street_address", 
        country_region: "country_region", 
        contact_number: "contact_number", 
        city: "city", 
        state_province: "state_province", 
        postal: "postal", 
        email: "email", 
        password: "password"
    }; 

    const alertMessage = (token, type) => {
        Alert.alert(
            "Warning",
            "Do you want to submit this edit?",
            [
              { text: "Cancel", style: "cancel", onPress: () => setisEdit('')},
              { text: "OK", onPress: () => getTextEdit(editText, token, type) }
            ],
            { cancelable: false }
        );
    }

    const warningEdit = (data) => {
        Alert.alert(
            "Warning",
            "Edit this file?",
            [
              { text: "No", style: "cancel", onPress: () => setisEdit('')},
              { text: "Yes", onPress: () => setdataValue(data)}
            ],
            { cancelable: false }
        );
    }

    const setdataValue = (data) =>{
        setisEdit(data);
    }

    const setresponse = () => {
        refreshEdit(CustomerLoginEmail, CustomerLoginPassword);
        setisEdit('')
    }

    const alertmessageResponse = (message) =>{
        Alert.alert(
            "Status",
            message,
            [
              { text: "OKAY", onPress: () => setresponse()}
            ],
            { cancelable: false }
        );
    }

    const getTextEdit = async (data, token, type) =>{
        setisEdit(type);
        try {
            await dispatch(Customer.editCustomerInformation(data, token, type));
        } catch (error) {
            alertmessageResponse(error.message);
        }
    }

    const refreshEdit = async (email, password) =>{
        try {
            await dispatch(Customer.loginCustomer(email, password));
        } catch (error) {
            if(error.message === "true"){
                alertmessageResponse("edit failed!");
            }
        }
    }

    const customerInformationToEdit = () =>{
        return(
            <View style={{ backgroundColor: colors.lightColor }}>
                <List>
                    <ListItem selected>
                            {
                                isEdit == CustomerInformation[0].first_name ?
                                    <Left>
                                        <Item fixedLabel>
                                            <Label style={{ fontSize:13, color:colors.disableColor }}>First Name:</Label>
                                            <Input style={{ fontSize:13 }} placeholder="Type here" onChangeText = {text => setEditText(text)} />
                                        </Item>
                                    </Left>
                                :
                                    <Left>
                                        <Text style={{ color: colors.disableColor }}>{CustomerInformation[0].first_name}</Text>
                                    </Left>
                            }
                        <Right>
                            {
                                isEdit == CustomerInformation[0].first_name ?
                                    <TouchableOpacity onPress={()=> alertMessage(Tokendata, dataname.first_name)} style={{ paddingHorizontal:20 }}>
                                        <Icon name="check" size={20} color={colors.successColor} />
                                    </TouchableOpacity>
                                :
                                isEdit == dataname.first_name ? <ActivityIndicator size="small" color={colors.darkColor}/> :
                                    <TouchableOpacity onPress={()=> warningEdit(CustomerInformation[0].first_name)} style={{ paddingHorizontal:20 }}>
                                        <Icon name="create" size={20} color={colors.darkColor} />
                                    </TouchableOpacity>
                            }
                        </Right>
                        
                    </ListItem>
                    <ListItem selected>
                            {
                                isEdit == CustomerInformation[0].middle_name ?
                                    <Left>
                                        <Item fixedLabel>
                                            <Label style={{ fontSize:13, color:colors.disableColor }}>Middle Name:</Label>
                                            <Input style={{ fontSize:13 }} placeholder="Type here" onChangeText = {text => setEditText(text)}/>
                                        </Item>
                                    </Left>
                                :
                                    <Left>
                                        <Text style={{ color: colors.disableColor }}>{CustomerInformation[0].middle_name}</Text>
                                    </Left>
                            }
                        <Right>
                            {
                                isEdit == CustomerInformation[0].middle_name ?
                                    <TouchableOpacity onPress={()=> alertMessage(Tokendata, dataname.middle_name)} style={{ paddingHorizontal:20 }}>
                                        <Icon name="check" size={20} color={colors.successColor} />
                                    </TouchableOpacity>
                                :
                                isEdit == dataname.middle_name ? <ActivityIndicator size="small" color={colors.darkColor}/> :
                                    <TouchableOpacity onPress={()=> warningEdit(CustomerInformation[0].middle_name)} style={{ paddingHorizontal:20 }}>
                                        <Icon name="create" size={20} color={colors.darkColor} />
                                    </TouchableOpacity>
                            }
                        </Right>
                    </ListItem>
                    <ListItem selected>
                            {
                                isEdit  == CustomerInformation[0].last_name ?
                                    <Left>
                                        <Item fixedLabel>
                                            <Label style={{ fontSize:13, color:colors.disableColor }}>Last Name:</Label>
                                            <Input style={{ fontSize:13 }} placeholder="Type here" onChangeText = {text => setEditText(text)}/>
                                        </Item>
                                    </Left>
                                :
                                    <Left>
                                        <Text style={{ color: colors.disableColor }}>{CustomerInformation[0].last_name}</Text>
                                    </Left>
                            }
                        <Right>
                            {
                                isEdit  == CustomerInformation[0].last_name ?
                                    <TouchableOpacity onPress={()=> alertMessage(Tokendata, dataname.last_name)} style={{ paddingHorizontal:20 }}>
                                        <Icon name="check" size={20} color={colors.successColor} />
                                    </TouchableOpacity>
                                :
                                isEdit == dataname.last_name ? <ActivityIndicator size="small" color={colors.darkColor}/> :
                                    <TouchableOpacity onPress={()=> warningEdit(CustomerInformation[0].last_name)} style={{ paddingHorizontal:20 }}>
                                        <Icon name="create" size={20} color={colors.darkColor} />
                                    </TouchableOpacity>
                            }
                        </Right>
                    </ListItem>
                    <ListItem selected>
                            {
                                isEdit == CustomerInformation[0].email ?
                                    <Left>
                                        <Item fixedLabel>
                                            <Label style={{ fontSize:13, color:colors.disableColor }}>Email:</Label>
                                            <Input style={{ fontSize:13 }} placeholder="Type here" keyboardType ="email-address" onChangeText = {text => setEditText(text)}/>
                                        </Item>
                                    </Left>
                                :
                                    <Left>
                                        <Text style={{ color: colors.disableColor }}>{CustomerInformation[0].email}</Text>
                                    </Left>
                            }
                        <Right>
                            {
                                CustomerInformation[0].verified != 1 ?
                                    isEdit == CustomerInformation[0].email ?
                                        <TouchableOpacity onPress={()=> alertMessage( Tokendata, dataname.email)} style={{ paddingHorizontal:20 }}>
                                            <Icon name="check" size={20} color={colors.successColor} />
                                        </TouchableOpacity>
                                    :
                                    isEdit == dataname.email ? <ActivityIndicator size="small" color={colors.darkColor}/> :
                                        <TouchableOpacity onPress={()=> warningEdit(CustomerInformation[0].email)} style={{ paddingHorizontal:20 }}>
                                            <Icon name="create" size={20}  color={colors.darkColor} />
                                        </TouchableOpacity>
                                :
                                    <Icon name="verified-user" size={20} style={{ paddingHorizontal:20 }} color={colors.successColor} />
                            }
                        </Right>
                    </ListItem>
                    <ListItem selected>
                            {
                                isEdit == CustomerInformation[0].contact_number ?
                                    <Left>
                                        <Item fixedLabel>
                                            <Label style={{ fontSize:13, color:colors.disableColor }}>Contact Number:</Label>
                                            <Input style={{ fontSize:13 }} keyboardType ="numeric" placeholder="Type here" onChangeText = {text => setEditText(text)}/>
                                        </Item>
                                    </Left>
                                :
                                    <Left>
                                        <Text style={{ color: colors.disableColor }}>{CustomerInformation[0].contact_number}</Text>
                                    </Left>
                            }
                        <Right>
                            {
                                isEdit == CustomerInformation[0].contact_number ?
                                    <TouchableOpacity onPress={()=> alertMessage(Tokendata, dataname.contact_number)} style={{ paddingHorizontal:20 }}>
                                        <Icon name="check" size={20} color={colors.successColor} />
                                    </TouchableOpacity>
                                :
                                isEdit == dataname.contact_number ? <ActivityIndicator size="small" color={colors.darkColor}/> :
                                    <TouchableOpacity onPress={()=> warningEdit(CustomerInformation[0].contact_number)} style={{ paddingHorizontal:20 }}>
                                        <Icon name="create" size={20} color={colors.darkColor} />
                                    </TouchableOpacity>
                            }
                        </Right>
                    </ListItem>
                    <ListItem selected>
                            {
                                isEdit == CustomerInformation[0].home_address ?
                                    <Left>
                                        <Item fixedLabel>
                                            <Label style={{ fontSize:13, color:colors.disableColor }}>Home Address:</Label>
                                            <Input style={{ fontSize:13 }} placeholder="Type here" onChangeText = {text => setEditText(text)}/>
                                        </Item>
                                    </Left>
                                :
                                    <Left>
                                        <Text style={{ color: colors.disableColor }}>{CustomerInformation[0].home_address}</Text>
                                    </Left>
                            }
                        <Right>
                            {
                                isEdit == CustomerInformation[0].home_address ?
                                    <TouchableOpacity onPress={()=> alertMessage(Tokendata, dataname.home_address)} style={{ paddingHorizontal:20 }}>
                                        <Icon name="check" size={20} color={colors.successColor} />
                                    </TouchableOpacity>
                                :
                                isEdit == dataname.home_address ? <ActivityIndicator size="small" color={colors.darkColor}/> :
                                    <TouchableOpacity onPress={()=> warningEdit(CustomerInformation[0].home_address)} style={{ paddingHorizontal:20 }}>
                                        <Icon name="create" size={20} color={colors.darkColor} />
                                    </TouchableOpacity>
                            }
                        </Right>
                    </ListItem>
                    <ListItem selected>
                            {
                                isEdit == CustomerInformation[0].city ?
                                    <Left>
                                        <Item fixedLabel>
                                            <Label style={{ fontSize:13, color:colors.disableColor }}>City :</Label>
                                            <Input style={{ fontSize:13 }} placeholder="Type here" onChangeText = {text => setEditText(text)}/>
                                        </Item>
                                    </Left>
                                :
                                    <Left>
                                        <Text style={{ color: colors.disableColor }}>{CustomerInformation[0].city}</Text>
                                    </Left>
                            }
                        <Right>
                            {
                                isEdit == CustomerInformation[0].city ?
                                    <TouchableOpacity onPress={()=> alertMessage(Tokendata, dataname.city)} style={{ paddingHorizontal:20 }}>
                                        <Icon name="check" size={20} color={colors.successColor} />
                                    </TouchableOpacity>
                                :
                                isEdit == dataname.city ? <ActivityIndicator size="small" color={colors.darkColor}/> :
                                    <TouchableOpacity onPress={()=> warningEdit(CustomerInformation[0].city)} style={{ paddingHorizontal:20 }}>
                                        <Icon name="create" size={20} color={colors.darkColor} />
                                    </TouchableOpacity>
                            }
                        </Right>
                    </ListItem>
                    <ListItem selected>
                            {
                                isEdit == CustomerInformation[0].country_region ?
                                    <Left>
                                        <Item fixedLabel>
                                            <Label style={{ fontSize:13, color:colors.disableColor }}>Country Region:</Label>
                                            <Input style={{ fontSize:13 }} placeholder="Type here" onChangeText = {text => setEditText(text)}/>
                                        </Item>
                                    </Left>
                                :
                                    <Left>
                                        <Text style={{ color: colors.disableColor }}>{CustomerInformation[0].country_region}</Text>
                                    </Left>
                            }
                        <Right>
                            {
                                isEdit == CustomerInformation[0].country_region ?
                                    <TouchableOpacity onPress={()=> alertMessage(Tokendata, dataname.country_region)} style={{ paddingHorizontal:20 }}>
                                        <Icon name="check" size={20} color={colors.successColor} />
                                    </TouchableOpacity>
                                :
                                isEdit == dataname.country_region ? <ActivityIndicator size="small" color={colors.darkColor}/> :
                                    <TouchableOpacity onPress={()=> warningEdit(CustomerInformation[0].country_region)} style={{ paddingHorizontal:20 }}>
                                        <Icon name="create" size={20} color={colors.darkColor} />
                                    </TouchableOpacity>
                            }
                        </Right>
                    </ListItem>
                    <ListItem selected>
                            {
                                isEdit == CustomerInformation[0].postal ?
                                    <Left>
                                        <Item fixedLabel>
                                            <Label style={{ fontSize:13, color:colors.disableColor }}>Zip Code:</Label>
                                            <Input style={{ fontSize:13 }} keyboardType ="numeric" placeholder="Type here" onChangeText = {text => setEditText(text)}/>
                                        </Item>
                                    </Left>
                                :
                                    <Left>
                                        <Text style={{ color: colors.disableColor }}>{CustomerInformation[0].postal}</Text>
                                    </Left>
                            }
                        <Right>
                            {
                                isEdit == CustomerInformation[0].postal ?
                                    <TouchableOpacity onPress={()=> alertMessage(Tokendata, dataname.postal)} style={{ paddingHorizontal:20 }}>
                                        <Icon name="check" size={20} color={colors.successColor} />
                                    </TouchableOpacity>
                                :
                                isEdit == dataname.postal ? <ActivityIndicator size="small" color={colors.darkColor}/> :
                                    <TouchableOpacity onPress={()=> warningEdit(CustomerInformation[0].postal)} style={{ paddingHorizontal:20 }}>
                                        <Icon name="create" size={20} color={colors.darkColor} />
                                    </TouchableOpacity>
                            }
                        </Right>
                    </ListItem>
                    <ListItem selected>
                            {
                                isEdit == CustomerInformation[0].state_province ?
                                    <Left>
                                        <Item fixedLabel>
                                            <Label style={{ fontSize:13, color:colors.disableColor }}>Province:</Label>
                                            <Input style={{ fontSize:13 }} placeholder="Type here" onChangeText = {text => setEditText(text)}/>
                                        </Item>
                                    </Left>
                                :
                                    <Left>
                                        <Text style={{ color: colors.disableColor }}>{CustomerInformation[0].state_province}</Text>
                                    </Left>
                            }
                        <Right>
                            {
                                isEdit == CustomerInformation[0].state_province ?
                                    <TouchableOpacity onPress={()=> alertMessage(Tokendata, dataname.state_province)} style={{ paddingHorizontal:20 }}>
                                        <Icon name="check" size={20} color={colors.successColor} />
                                    </TouchableOpacity>
                                :
                                isEdit == dataname.state_province ? <ActivityIndicator size="small" color={colors.darkColor}/> :
                                    <TouchableOpacity onPress={()=> warningEdit(CustomerInformation[0].state_province)} style={{ paddingHorizontal:20 }}>
                                        <Icon name="create" size={20} color={colors.darkColor} />
                                    </TouchableOpacity>
                            }
                        </Right>
                    </ListItem>
                    <ListItem selected>
                            {
                                isEdit == CustomerInformation[0].street_address ?
                                    <Left>
                                        <Item fixedLabel>
                                            <Label style={{ fontSize:13, color:colors.disableColor }}>Street Address:</Label>
                                            <Input style={{ fontSize:13 }} placeholder="Type here" onChangeText = {text => setEditText(text)}/>
                                        </Item>
                                    </Left>
                                :
                                    <Left>
                                        <Text style={{ color: colors.disableColor }}>{CustomerInformation[0].street_address}</Text>
                                    </Left>
                            }
                        <Right>
                            {
                                isEdit == CustomerInformation[0].street_address ?
                                    <TouchableOpacity onPress={()=> alertMessage(Tokendata, dataname.street_address)} style={{ paddingHorizontal:20 }}>
                                        <Icon name="check" size={20} color={colors.successColor} />
                                    </TouchableOpacity>
                                :
                                isEdit == dataname.street_address ? <ActivityIndicator size="small" color={colors.darkColor}/> :
                                    <TouchableOpacity onPress={()=> warningEdit(CustomerInformation[0].street_address)} style={{ paddingHorizontal:20 }}>
                                        <Icon name="create" size={20} color={colors.darkColor} />
                                    </TouchableOpacity>
                            }
                        </Right>
                    </ListItem>
                    <ListItem selected>
                            {
                                isEdit == CustomerInformation[0].password ?
                                    <Left>
                                        <Item fixedLabel>
                                            <Label style={{ fontSize:13, color:colors.disableColor }}>Password:</Label>
                                            <Input style={{ fontSize:13 }} placeholder="Type here" onChangeText = {text => setEditText(text)}/>
                                        </Item>
                                    </Left>
                                :
                                    <Left>
                                        <Text style={{ color: colors.disableColor }}>{CustomerInformation[0].password}</Text>
                                    </Left>
                            }
                        <Right>
                            {
                                isEdit == CustomerInformation[0].password ?
                                    <TouchableOpacity onPress={()=> alertMessage(Tokendata, dataname.password)} style={{ paddingHorizontal:20 }}>
                                        <Icon name="check" size={20} color={colors.successColor} />
                                    </TouchableOpacity>
                                :
                                isEdit == dataname.password ? <ActivityIndicator size="small" color={colors.darkColor}/> :
                                    <TouchableOpacity onPress={()=> warningEdit(CustomerInformation[0].password)} style={{ paddingHorizontal:20 }}>
                                        <Icon name="create" size={20} color={colors.darkColor} />
                                    </TouchableOpacity>
                            }
                        </Right>
                    </ListItem>
                </List>
            </View>
        );
    }

    const CustomerInformationtop = () =>{
        return(
            <View style={{ backgroundColor:colors.lightColor }}>
                <View  style={{ marginTop:50 }}>
                    <View style={{ marginHorizontal:'5%' }}>
                        <View style={{ flexDirection:'row', justifyContent: 'center', alignItems:'center'}}>
                            <View style={{ justifyContent: 'center', alignItems:'center'}}>
                                <Text style={{ color:colors.darkColor, textTransform: 'capitalize', fontSize:20}}>
                                    {CustomerInformation[0].first_name} {CustomerInformation[0].last_name}
                                </Text>
                                <Text style={{ color:colors.primaryColor, fontSize:15 }}>{CustomerInformation[0].email}</Text>
                                <Text style={{ color:colors.disableColor, fontSize:15 }}>{transactionCount} Orders</Text>
                                
                                <View>
                                    <View style={{ flexDirection:'row', justifyContent: 'center', alignItems:'center'}}>
                                        <Text style={{ color:colors.disableColor, fontSize:15 }}>application status</Text>
                                    </View>
                                    <View style={{ flexDirection:'row', justifyContent: 'center', alignItems:'center'}}>
                                        <Icon name="star-rate" size={20} color={colors.starColor} />
                                        <Text style={{ color:colors.successColor, fontWeight:'bold', fontSize:16 }}>{approval_result_percent}%</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginVertical:10 }}>
                            <View style={{ flexDirection:'row', justifyContent: 'flex-start', alignItems:'center', marginBottom:5}}>
                                <Icon name="mail-outline" size={20} color={colors.darkColor} />
                                <Text style={{ color:colors.disableColor, marginLeft: 5 }}>{CustomerInformation[0].email}</Text>
                            </View>
                            <View style={{ flexDirection:'row', justifyContent: 'flex-start', alignItems:'center', marginBottom:5}}>
                                <Icon name="smartphone" size={20} color={colors.darkColor} />
                                <Text style={{ color:colors.disableColor, marginLeft: 5 }}>{CustomerInformation[0].contact_number}</Text>
                            </View>
                            <View style={{ flexDirection:'row', justifyContent: 'flex-start', alignItems:'center', marginBottom:5}}>
                                <Icon name="location-on" size={20} color={colors.darkColor} />
                                <Text style={{ color:colors.disableColor, marginLeft: 5 }}>
                                    {CustomerInformation[0].home_address} , 
                                    {CustomerInformation[0].city} , 
                                    {CustomerInformation[0].postal} , 
                                    {CustomerInformation[0].country_region} , 
                                    {CustomerInformation[0].state_province}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    return(
        <SafeAreaView>
            <ScrollView>
                {CustomerInformationtop()}
                {customerInformationToEdit()}
            </ScrollView>
      </SafeAreaView>
    );
}

export default AccountScreen;