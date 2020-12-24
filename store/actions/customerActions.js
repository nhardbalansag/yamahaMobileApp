import Customer from '../../model/customer';
export const REGISTER_CUSTOMER = 'REGISTER_CUSTOMER';

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
            method: 'post',
            headers:{
                'Content-type': 'application/json'
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

        dispatch({type: REGISTER_CUSTOMER, registerStatus: responseData});
    }

}

