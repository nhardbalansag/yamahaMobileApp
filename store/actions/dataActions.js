import Products from '../../model/products';

export const SET_PRODUCTS = 'SET_PRODUCTS';

export const viewAllProducts = () => {
    return async dispatch => {

        const loadedProduct = [];
        const  response = await fetch('https://www.bbalansag.online/api')
        const responseData = await response.json();

        for (const key in responseData){
            loadedProduct.push(
                new Products(
                    responseData[key].id, 
                    responseData[key].photo_path,
                    responseData[key].title,
                    responseData[key].description,
                    responseData[key].status,
                    responseData[key].update_count,
                    responseData[key].product_category_id
                )
            )
        }
        dispatch({type:SET_PRODUCTS, products: loadedProduct });
    };
};
