import Products from '../../model/products';

export const SET_PRODUCTS = 'SET_PRODUCTS';

export const viewAllProducts = () => {
    return async (dispatch, getState) => {
        const loadedProduct = [];
        const  response = await fetch('https://www.bbalansag.online/api', {
            headers:{
                'Content-type': 'application/json',
                'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC',
                'Authorization': 'Bearer ' + getState().products.Tokendata, 
            }
        });
        const responseData = await response.json();
        console.log(responseData);
        console.log(getState().products.Tokendata);
        if(responseData === "Unauthorized"){
            dispatch(
                {
                    type: SET_PRODUCTS, 
                    APIToken: null
                }
            );
        }else{
            for (const key in responseData){
                loadedProduct.push(
                    new Products(
                        responseData[key].id, 
                        responseData[key].photo_path,
                        responseData[key].title,
                        responseData[key].description,
                        responseData[key].price,
                        responseData[key].product_category_id,
                        responseData[key].created_at
                    )
                )
            }
            dispatch({type:SET_PRODUCTS, products: loadedProduct });
        }
        
    };
};
