import Customer from '../../model/customer';
import TokenData from '../../model/token';
export const REGISTER_CUSTOMER = 'REGISTER_CUSTOMER';
export const LOGIN_CUSTOMER = 'LOGIN_CUSTOMER';

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

        dispatch({type: REGISTER_CUSTOMER, registerStatus: responseData});
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

        dispatch(
            {
                type: LOGIN_CUSTOMER, 
                APIError: errorData,
                APItype: responseData.status.type,
                APIBool: responseData.status.error,
                APIToken: responseData.status.token
            }
        );

        if(responseData.status.type !== "validation" && responseData.status.error !== false){
            throw new Error(responseData.status.messsage);
        }else if(responseData.status.type === "data" && responseData.status.error === false){
            throw new Error(responseData.status.error);
        }
        // customerInformation.push(
        //     new Customer(
        //         responseData[0].first_name, 
        //         responseData[0].last_name, 
        //         responseData[0].middle_name, 
        //         responseData[0].home_address, 
        //         responseData[0].street_address, 
        //         responseData[0].country_region, 
        //         responseData[0].contact_number, 
        //         responseData[0].city, 
        //         responseData[0].state_province, 
        //         responseData[0].postal, 
        //         responseData[0].role, 
        //         responseData[0].verified, 
        //         responseData[0].email, 
        //         responseData[0].password
        //     )
        // );

        // tokeninformation.push( new TokenData(responseData[1].token));
        
    }
}

