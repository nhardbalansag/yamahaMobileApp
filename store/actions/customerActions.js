import Customer from '../../model/customer';
// import {AsyncStorage} from ' @react-native-async-storage/async-storage'
import ScreenAccess from '../../src/screenAccess/screenAccess';
export const REGISTER_CUSTOMER = 'REGISTER_CUSTOMER';
export const LOGIN_CUSTOMER = 'LOGIN_CUSTOMER';
export const SEND_INQUIRY = 'SEND_INQUIRY';

// const saveLogin = (tokenToStore, emailToStore, Password) =>{
//     AsyncStorage.setItem('userData', JSON.stringify({token: }))
// }

export const registerCustomer = (
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
    password) =>{
    return async dispatch =>{
        const response = await fetch('https://www.bbalansag.online/api/register', {
            method: 'POST',
            headers:{
                'Content-type': 'application/json',
                'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC'
            },
            body: JSON.stringify({
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
            })
        });

        const responseData = await response.json();
        
        if(responseData === "Unauthorized"){
            throw new Error("Unauthorized access please login");
        }
        if(responseData.token === undefined){
            dispatch(
                {
                    type: REGISTER_CUSTOMER, 
                    registerStatus: responseData,
                    APIToken: null,
                    screen_access:ScreenAccess.loginScreen
                }
            );
        }else{
            dispatch(
                {
                    type: REGISTER_CUSTOMER, 
                    registerStatus: responseData,
                    APIToken: responseData.token,
                    screen_access:ScreenAccess.homeScreenLandingTab
                }
            );
          
            throw new Error("false");
        }
       
    }

}

export const loginCustomer = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://www.bbalansag.online/api/login', {
            method:'POST',
            headers:{
                'Content-type': 'application/json',
                'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC'
            },
            body: JSON.stringify({email, password})
        }); 

        const customerInformation = [];
        const errorData = [];
        const tokeninformation = [];
        const responseData = await response.json();
        errorData.push(responseData.status.messsage);

        if(responseData.status.type !== "validation" && responseData.status.error !== false){
            dispatch(
                {
                    type: LOGIN_CUSTOMER, 
                    APIError: errorData,
                    APItype: responseData.status.type,
                    APIBool: responseData.status.error,
                    APIToken: responseData.status.token,
                    screen_access:ScreenAccess.loginScreen
                }
            );
            throw new Error(responseData.status.messsage);
        }else if(responseData.status.type === "data" && responseData.status.error === false){

            customerInformation.push(
                new Customer(
                    responseData.information[0].first_name, 
                    responseData.information[0].last_name, 
                    responseData.information[0].middle_name, 
                    responseData.information[0].home_address, 
                    responseData.information[0].street_address, 
                    responseData.information[0].country_region, 
                    responseData.information[0].contact_number, 
                    responseData.information[0].city, 
                    responseData.information[0].state_province, 
                    responseData.information[0].postal, 
                    responseData.information[0].role, 
                    responseData.information[0].verified, 
                    responseData.information[0].email, 
                    responseData.information[0].password
                )
            );

            dispatch(
                {
                    type: LOGIN_CUSTOMER, 
                    APIError: errorData,
                    APItype: responseData.status.type,
                    APIBool: responseData.status.error,
                    APIToken: responseData.status.token,
                    screen_access:ScreenAccess.homeScreenLandingTab,
                    CustomerInformation:customerInformation
                }
            );
            throw new Error(responseData.status.error);
        }
    }
}

export const sendInquiry = (id) =>{
    return async (dispatch, getState) => {

        const first_name = getState().products.CustomerInformation[0].first_name;
        const last_name = getState().products.CustomerInformation[0].last_name;
        const middle_name = getState().products.CustomerInformation[0].middle_name;
        const email_address = getState().products.CustomerInformation[0].email_address;
        const home_address = getState().products.CustomerInformation[0].home_address;
        const street_address = getState().products.CustomerInformation[0].street_address;
        const country_region = getState().products.CustomerInformation[0].country_region;
        const contact_number = getState().products.CustomerInformation[0].contact_number;
        const city = getState().products.CustomerInformation[0].city;
        const state_province = getState().products.CustomerInformation[0].state_province;
        const postal = getState().products.CustomerInformation[0].postal;
        const verified = getState().products.CustomerInformation[0].verified;
        const productId = id;

        const response = await fetch('https://www.bbalansag.online/api/sendMessage/inquiry', {
            method:'POST',
            headers:{
                'Content-type': 'application/json',
                'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC',
                'Authorization': 'Bearer ' + getState().products.Tokendata
            },
            body: JSON.stringify(
                {
                    first_name,
                    last_name,
                    middle_name,
                    email_address,
                    home_address,
                    street_address,
                    country_region,
                    contact_number,
                    city,
                    state_province,
                    postal,
                    productId
                }
            )
        }); 
        if(verified != 1){
            throw new Error("Email not verified");
        }else{
            const responseData = await response.json();
            if(responseData){
                throw new Error("Inquiry Sent");
            }else{
                throw new Error("Inquiry Sent");
            }
        }
    }
}

