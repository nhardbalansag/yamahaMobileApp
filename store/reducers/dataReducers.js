import { SET_PRODUCTS } from '../actions/dataActions';
import { 
    REGISTER_CUSTOMER,
    LOGIN_CUSTOMER
} from '../actions/customerActions';

const initialState = {
    allproducts:[],
    parts:[],
    statusResponse: [],
    Tokendata: null,
    errorBool: true
};

export default (state = initialState, action) => {
    switch(action.type){
        case SET_PRODUCTS:
            return {
                allproducts: action.products
            }

        case REGISTER_CUSTOMER :
            return {
                ...state,
                statusResponse: action.registerStatus
            }
        case LOGIN_CUSTOMER :
            return {
                ...state,
                errorData: action.APIError,
                errorType: action.APItype,
                errorBool: action.APIBool,
                Tokendata: action.APIToken
            }
    }
    return state;
}
