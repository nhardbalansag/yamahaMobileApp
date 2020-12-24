import Products from '../../model/products';
import Customer from '../../model/customer';

import { SET_PRODUCTS } from '../actions/dataActions';
import { REGISTER_CUSTOMER } from '../actions/customerActions';

const initialState = {
    allproducts:[],
    parts:[],
    statusResponse: []
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
    }
    return state;
}
