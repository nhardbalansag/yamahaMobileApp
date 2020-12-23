import Products from '../../model/products';

import { SET_PRODUCTS } from '../actions/dataActions';

const initialState = {
    allproducts:[],
    parts:[]
};

export default (state = initialState, action) => {
    switch(action.type){
        case SET_PRODUCTS:
            return {
                allproducts: action.products
            }
    }
    return state;
}
