import { RENDER_PRODUCTS } from '../actions/dataActions';
import Cart from '../../model/cart';

const initialState = {
    items: {},
    totalAmount:0
};

const addToCart = (state = initialState, action) => {

    switch(action.type){
        case RENDER_PRODUCTS :
            const addedProduct = action.product;
            const ProductTitle = addedProduct.title;
            const ProductPrice = addedProduct.price;

            if(state.items[addedProduct.id]){

            }else{
                const newCartItem  =  new Cart(1, ProductPrice, ProductTitle);

                return {
                    ...state, 
                    items: {...state.items, [addedProduct.id]: newCartItem}
                }
            }
    }
    return state;
}

export default addToCart; 