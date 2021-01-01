import React,  {useState} from 'react';
import {TouchableOpacity, View, Text, Alert, ActivityIndicator} from 'react-native';
import { Container, Content, Form, Item, Input, Label } from 'native-base';
import { 
    useDispatch,
    useSelector
} from 'react-redux';

import {styles, colors} from '../styles/style';
import TitleComponent from '../components/title';
import * as Customer from '../../store/actions/customerActions';

const PersonalInformnationScreen = ({navigation}) =>{

    const dispatch = useDispatch();
    const [loadingstate, setloadingstate] = useState(false);
    const registerstatusResponse = useSelector(state => state.products.statusResponse);


    const registerState = async () =>{
        setloadingstate(true);
        try {
            await dispatch(
                    Customer.registerCustomer(
                        first_name, 
                        last_name, 
                        middle_name, 
                        home_address, 
                        street_address, 
                        country_region, 
                        contact_number, 
                        city, 
                        state_province, 
                        postal, 
                        role, 
                        verified, 
                        email, 
                        password
                    )
            )
            setloadingstate(false); 
        } catch (error) {
            error.message === "false" ? alertMessage("login Success") : alertMessage(error.message);
        }
    };

    const alertMessage = (message) => {
        Alert.alert(
            "Status",
            message,
            message == "login Success" ? [ { text: "OKAY"}] : [ { text: "OKAY", onPress: () => setloadingstate(false)}]
          );
    }

    const [first_name, setfirst_name] = useState('ssdsdsdsd');
    const [last_name, setlast_name] = useState('sdsdsdsds');
    const [middle_name, setmiddle_name] = useState('sdsdsdsdsd');
    const [home_address, sethome_address] = useState('sdsdsdsdsd');
    const [street_address, setstreet_address] = useState('sdsdsdsdsd');
    const [country_region, setcountry_region] = useState('sdsdsdsdsd');
    const [contact_number, setcontact_number] = useState('09214408767');
    const [city, setcity] = useState('sdsdsdsdsd');
    const [state_province, setstate_province] = useState('sdsdsdsdsd');
    const [postal, setpostal] = useState('1226');
    const [role, setrole] = useState('customer');
    const [verified, setverified] = useState(0);
    const [email, setemail] = useState('sdfsfsfdd@email.com');
    const [password, setpassword] = useState('capstone');

    return(
        <Container>
            <Content>
                <Form>
                    <TitleComponent subtext="contact information"/>
                    <Item stackedLabel>
                        <Label style={styles.capitalize}>email address</Label>
                        <Input 
                        keyboardType='email-address'
                        onChangeText = {text => setemail(text)}
                        />
                    </Item>
                    <Text style={styles.errormessage}>{registerstatusResponse['email']}</Text>
                    <Item stackedLabel>
                        <Label style={styles.capitalize}>contact number</Label>
                        <Input 
                            keyboardType='numeric'
                            onChangeText = {text => setcontact_number(text)}
                            />
                    </Item>
                    <Text style={styles.errormessage}>{registerstatusResponse['contact_number']}</Text>
                    <TitleComponent subtext="personal information"/>
                    <Item stackedLabel>
                        <Label style={styles.capitalize}>first name</Label>
                        <Input  onChangeText = {text => setfirst_name(text)}/>
                    </Item>
                    <Text style={styles.errormessage}>{registerstatusResponse['first_name']}</Text>
                    <Item stackedLabel>
                        <Label style={styles.capitalize}>last name</Label>
                        <Input  onChangeText = {text => setlast_name(text)}/>
                    </Item>
                    <Text style={styles.errormessage}>{registerstatusResponse['last_name']}</Text>
                    <Item stackedLabel>
                        <Label style={styles.capitalize}>middle name</Label>
                        <Input  onChangeText = {text => setmiddle_name(text)}/>
                    </Item>
                    <Text style={styles.errormessage}>{registerstatusResponse['middle_name']}</Text>
                    <TitleComponent subtext="address"/>
                    <Item stackedLabel>
                        <Label style={styles.capitalize}>house number, building name</Label>
                        <Input  onChangeText = {text => sethome_address(text)}/>
                    </Item>
                    <Text style={styles.errormessage}>{registerstatusResponse['home_address']}</Text>
                    <Item stackedLabel>
                        <Label style={styles.capitalize}>street address</Label>
                        <Input  onChangeText = {text => setstreet_address(text)}/>
                    </Item>
                    <Text style={styles.errormessage}>{registerstatusResponse['street_address']}</Text>
                    <Item stackedLabel>
                        <Label style={styles.capitalize}>country</Label>
                        <Input  onChangeText = {text => setcountry_region(text)}/>
                    </Item>
                    <Text style={styles.errormessage}>{registerstatusResponse['country_region']}</Text>
                    <Item stackedLabel>
                        <Label style={styles.capitalize}>city</Label>
                        <Input  onChangeText = {text => setcity(text)}/>
                    </Item>
                    <Text style={styles.errormessage}>{registerstatusResponse['city']}</Text>
                    <Item stackedLabel>
                        <Label style={styles.capitalize}>state / province</Label>
                        <Input  onChangeText = {text => setstate_province(text)}/>
                    </Item>
                    <Text style={styles.errormessage}>{registerstatusResponse['state_province']}</Text>
                    <Item stackedLabel>
                        <Label style={styles.capitalize}>zip code</Label>
                        <Input keyboardType='numeric'  onChangeText = {text => setpostal(text)}/>
                    </Item>
                    <Text style={styles.errormessage}>{registerstatusResponse['postal']}</Text>
                    <TitleComponent subtext="security credential"/>
                    <Item stackedLabel>
                        <Label style={styles.capitalize}>password</Label>
                        <Input  onChangeText = {text => setpassword(text)}/>
                    </Item>
                    <Text style={styles.errormessage}>{registerstatusResponse['password']}</Text>

                    {
                        loadingstate ? <ActivityIndicator size="large" color={colors.dangerColor}/> :
                        <TouchableOpacity onPress={() => registerState()} style={[styles.GeneralButton, styles.marginVertical, styles.marginHorizantal]}>
                            <View>
                                <Text style={styles.GeneralButtonText}>sign up</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={() => navigation.navigate('PersonalInformation')} style={[styles.signupButton, styles.marginVertical]}>
                        <View>
                            <Text onPress={() => navigation.popToTop()} style={styles.signUpText}>already have an account</Text>
                        </View>
                    </TouchableOpacity>
                </Form>
            </Content>
        </Container>

    );
}

export default PersonalInformnationScreen;