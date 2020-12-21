import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import { Container, Content, Form, Item, Input, Label } from 'native-base';

import {styles, colors} from '../styles/style';
import TitleComponent from '../components/title';

const PersonalInformnationScreen = ({navigation}) =>{
    return(
        <Container>
            <Content>
                <Form>
                    <TitleComponent subtext="personal information"/>
                    <Item stackedLabel>
                        <Label>first name</Label>
                        <Input />
                    </Item>
                    <Item stackedLabel>
                        <Label>last name</Label>
                        <Input />
                    </Item>
                    <Item stackedLabel>
                        <Label>middle name</Label>
                        <Input />
                    </Item>
                    <TitleComponent subtext="address"/>
                    <Item stackedLabel>
                        <Label>house number, building name</Label>
                        <Input />
                    </Item>
                    <Item stackedLabel>
                        <Label>street address</Label>
                        <Input />
                    </Item>
                    <Item stackedLabel>
                        <Label>country</Label>
                        <Input />
                    </Item>
                    <Item stackedLabel>
                        <Label>city</Label>
                        <Input />
                    </Item>
                    <Item stackedLabel>
                        <Label>state / province</Label>
                        <Input />
                    </Item>
                    <Item stackedLabel>
                        <Label>zip code</Label>
                        <Input />
                    </Item>
                    <TitleComponent subtext="security credential"/>
                    <Item stackedLabel>
                        <Label>password</Label>
                        <Input />
                    </Item>
                    <TouchableOpacity onPress={() => navigation.navigate('UserInformation')} style={[styles.GeneralButton, styles.marginVertical, styles.marginHorizantal]}>
                        <View>
                            <Text style={styles.GeneralButtonText}>sign up</Text>
                        </View>
                    </TouchableOpacity>
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