import ScreenAccess from '../../src/screenAccess/screenAccess';

import { 
    SET_PRODUCTS,
    VIEW_ONE_PRODUCT,
    LANDING
 } from '../actions/dataActions';

import { 
    REGISTER_CUSTOMER,
    LOGIN_CUSTOMER,
    GET_TRANSACTION_DATA,
    PROCESSING_ORDER_SCREEN,
    CONFIRM_EMAIL
} from '../actions/customerActions';

const initialState = {
    allproducts:[],
    parts:[],
    statusResponse: [],
    Tokendata: null,
    errorBool: true,
    screenAccess: ScreenAccess.loginScreen,
    ProductInformation:[],
    ProductSpecification:[],
    ProductinquiriesCount:null,
    ProductPercentage:null,
    inquiryResponse:null,
    CustomerInformation:[],
    ProductCount:null,
    CustomerLoginEmail: null,
    CustomerLoginPassword: null,
    approval_result_percent: null,
    transactionCount: null,
    transactionData: [],
    orderDataByStatus: [],
    transactionCountByStatus:null
};

export default (state = initialState, action) => {
    switch(action.type){
        case SET_PRODUCTS:
            return {
                ...state,
                allproducts: action.products,
                Tokendata: action.APIToken,
                screenAccess: action.screen_access,
                ProductCount: action.ProductCount
            }

        case REGISTER_CUSTOMER :
            return {
                ...state,
                statusResponse: action.registerStatus,
                Tokendata: action.APIToken,
                screenAccess: action.screen_access,
                CustomerInformation: action.CustomerInformation
            }
        case LOGIN_CUSTOMER :
            return {
                ...state,
                errorData: action.APIError,
                errorType: action.APItype,
                errorBool: action.APIBool,
                Tokendata: action.APIToken,
                screenAccess: action.screen_access,
                CustomerInformation: action.CustomerInformation,
                CustomerLoginEmail:action.CustomerLoginEmail,
                CustomerLoginPassword:action.CustomerLoginPassword
            }
        case VIEW_ONE_PRODUCT :
            return{
                ...state,
                screenAccess: action.screen_access,
                ProductInformation: action.ProductInformation,
                ProductSpecification: action.ProductSpecification,
                ProductinquiriesCount: action.ProductinquiriesCount,
                ProductPercentage: action.ProductPercentage,
                ProductSpecification:action.ProductSpecification,
                Tokendata: action.APIToken
            }
        case LANDING :
            return{
                ...state,
                screenAccess: action.screen_access
            }
        case GET_TRANSACTION_DATA :
            return{
                ...state,
                approval_result_percent: action.approval_result_percent,
                transactionCount: action.transactionCount,
                transactionData: action.transactionData
            }
        case PROCESSING_ORDER_SCREEN :
            return{
                ...state,
                screenAccess: action.screen_access,
                orderDataByStatus: action.transactionData,
                transactionCountByStatus: action.transactionCountByStatus
            }
        case CONFIRM_EMAIL :
            return{
                ...state,
                screenAccess: action.screen_access
            }
    }
    return state;
}
