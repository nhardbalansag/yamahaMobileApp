import Products from '../../data/productData';


const initialState = {
    allproducts:Products,
    parts:[]
};


const dataReducer = (state = initialState, action) => {
    return state;
}

export default dataReducer;