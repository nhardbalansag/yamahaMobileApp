import Customer from '../../model/customer';
import TransactionDataInformation from '../../model/transactiondataInfomation';
import OrderDataByStatus from '../../model/orderDataByStatus';

// import {AsyncStorage} from ' @react-native-async-storage/async-storage'
import ScreenAccess from '../../src/screenAccess/screenAccess';
export const REGISTER_CUSTOMER = 'REGISTER_CUSTOMER';
export const LOGIN_CUSTOMER = 'LOGIN_CUSTOMER';
export const SEND_INQUIRY = 'SEND_INQUIRY';
export const GET_TRANSACTION_DATA = 'GET_TRANSACTION_DATA';
export const PROCESSING_ORDER_SCREEN = 'PROCESSING_ORDER_SCREEN';
export const CONFIRM_EMAIL = 'CONFIRM_EMAIL';
// const saveLogin = (tokenToStore, emailToStore, Password) =>{
//     AsyncStorage.setItem('userData', JSON.stringify({token: }))
// }

export const confirmVerification = (verification, token) =>{
    return async (dispatch, getState) => {
        const response = await fetch('http://www.bbalansag.online/api/confirmVerification', {
            method: 'POST',
            headers:{
                'Content-type': 'application/json',
                'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                verification
            })
        });

        const responseData = await response.json();
        if(responseData === true){
            throw new Error("Verirified successfully")
        }else if(responseData === false){
            throw new Error("Unable to verify your email")
        }else{
            throw new Error("Verification failed")
        }
    }
}

export const gotoCofirmEmailScreen = () =>{
    return async (dispatch, getState) => {
        dispatch(
            {
                type:CONFIRM_EMAIL, 
                screen_access:ScreenAccess.confirmEmailScreen
            }
        );
    }
}

export const confirmEmail =(token) =>{
    return async (dispatch) =>{
        const response = await fetch('http://www.bbalansag.online/api/confirmEmail', {
            method: 'POST',
            headers:{
                'Content-type': 'application/json',
                'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC',
                'Authorization': 'Bearer ' + token
            }
        });

        const responseData = await response.json();
        throw new Error(responseData);
    }
}

export const processingOrderScreen = (orderstatus, token, limit) =>{
    return async (dispatch, getState) => {
        const response = await fetch('http://www.bbalansag.online/api/getOrder/' + limit, {
            method: 'POST',
            headers:{
                'Content-type': 'application/json',
                'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                orderstatus
            })
        });

        const responseData = await response.json();
        
        dispatch(
            {
                type:PROCESSING_ORDER_SCREEN, 
                transactionData:responseData,
                filterType:orderstatus
            }
        );
    }
}

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
        const response = await fetch('http://www.bbalansag.online/api/register', {
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
        const customerInformation = [];
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
            customerInformation.push(
                new Customer(
                    responseData.information.id, 
                    responseData.information.first_name, 
                    responseData.information.last_name, 
                    responseData.information.middle_name, 
                    responseData.information.home_address, 
                    responseData.information.street_address, 
                    responseData.information.country_region, 
                    responseData.information.contact_number, 
                    responseData.information.city, 
                    responseData.information.state_province, 
                    responseData.information.postal, 
                    responseData.information.role, 
                    responseData.information.verified, 
                    responseData.information.email, 
                    responseData.information.password
                )
            );
            dispatch(
                {
                    type: REGISTER_CUSTOMER, 
                    registerStatus: responseData,
                    APIToken: responseData.token,
                    screen_access:ScreenAccess.homeScreenLandingTab,
                    CustomerInformation:customerInformation
                }
            );
          
            throw new Error("false");
        }
       
    }

}

export const loginCustomer = (email, password) => {
    return async dispatch => {
        const response = await fetch('http://www.bbalansag.online/api/login', {
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

        if(responseData.status.type === "validation" && responseData.status.error === true){
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
                    responseData.information[0].id, 
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
                    CustomerInformation:customerInformation,
                    CustomerLoginEmail:email,
                    CustomerLoginPassword:password
                    
                }
            );
            throw new Error(responseData.status.error);
        }
    }
}

export const sendInquiry = (id) =>{
    return async (dispatch, getState) => {
        let verified = getState().products.CustomerInformation[0].verified;
        const productId = id;
        const response = await fetch('http://www.bbalansag.online/api/sendMessage/inquiry', {
            method:'POST',
            headers:{
                'Content-type': 'application/json',
                'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC',
                'Authorization': 'Bearer ' + getState().products.Tokendata
            },
            body: JSON.stringify(
                {
                    productId
                }
            )
        }); 
        const responseData = await response.json();
        if(verified != 1){
            throw new Error("Email not verified");
        }else{
           
            if(responseData){
                throw new Error("Inquiry Sent");
            }else{
                throw new Error("Inquiry Sent");
            }
        }
    }
}

export const editCustomerInformation = (data, token, type) => {
    return async (dispatch) =>{
        const response = await fetch('http://www.bbalansag.online/api/credentials/edit', {
            method:'POST',
            headers:{
                'Content-type': 'application/json',
                'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ data, type })
        });

        const responseData = await response.json();

        if(responseData){
            throw new Error("Edited Succesfully");
        }else{
            throw new Error("Edit Failed");
        }
    }
}

export const getCount = () => {
    
    return async (dispatch, getState) =>{
        const token = getState().products.Tokendata;

        const response =  await fetch('http://www.bbalansag.online/api/getCount', {
            method:'POST',
            headers:{
                'content-type': 'application/json',
                'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC',
                'Authorization': 'Bearer ' + token
            }
        });
        const responseData = await response.json();
        const transactionData = [];

        for (const key in responseData.transactionData){
            transactionData.push(
                new TransactionDataInformation(
                    responseData.transactionData[key].id, 
                    responseData.transactionData[key].purchaseAmount,
                    responseData.transactionData[key].photo_path,
                    responseData.transactionData[key].title,
                    responseData.transactionData[key].description,
                    responseData.transactionData[key].price,
                    responseData.transactionData[key].transactionStatus
                )
            )
        }
        dispatch(
            {
                type: GET_TRANSACTION_DATA, 
                approval_result_percent: responseData.approval_result_percent,
                transactionCount: responseData.transactionCount[0].transactionCount,
                transactionData: transactionData
            }
        );
    }
} 






