import Products from '../../model/products';
import Specification from '../../model/specification';


import ScreenAccess from '../../src/screenAccess/screenAccess';

export const SET_PRODUCTS = 'SET_PRODUCTS';
export const VIEW_ONE_PRODUCT = 'VIEW_ONE_PRODUCT';
export const LANDING = 'LANDING';

export const viewAllProducts = (limit) => {
    return async (dispatch, getState) => {
        const loadedProduct = [];
        const  response = await fetch('http://www.bbalansag.online/api/' + limit, {
            headers:{
                'Content-type': 'application/json',
                'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC',
                'Authorization': 'Bearer ' + getState().products.Tokendata, 
            }
        });
        const responseData = await response.json();
        if(responseData === "Unauthorized"){
            dispatch(
                {
                    type: SET_PRODUCTS, 
                    APIToken: null,
                    screen_access:ScreenAccess.loginScreen
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
            dispatch(
                {
                    type:SET_PRODUCTS, 
                    products: loadedProduct,
                    screen_access:ScreenAccess.homeScreenLandingTab, 
                    ProductCount:Object.keys(responseData).length,
                    allProductsData:responseData,
                    APIToken: getState().products.Tokendata
                }
            );
        }
    };
};

export const ViewOneProductInformation = (id, token) =>{
    return async (dispatch, getState) => {
        
        const  response = await fetch('http://www.bbalansag.online/api/view/product', {
            method: 'POST',
            headers:{
                'Content-type': 'application/json',
                'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC',
                'Authorization': 'Bearer ' + token, 
            },
            body: JSON.stringify({
                id:id
            })
        });
        const responseData = await response.json();
        const loadedSpecification = [];

        for(const key in responseData.data.specification){
            loadedSpecification.push(
                new Specification( 
                    responseData.data.specification[key].id, 
                    responseData.data.specification[key].title, 
                    responseData.data.specification[key].description
                ))
        }

        dispatch(
            {
                type:VIEW_ONE_PRODUCT, 
                ProductInformation:responseData.data.product[0],
                ProductSpecification:loadedSpecification,
                ProductinquiriesCount:responseData.data.inquiriesCount,
                ProductPercentage:responseData.data.Percentage,
                APIToken:token
            }
        );
    }
}


export const backtoLanding = () =>{
    return async (dispatch, getState) => {
        dispatch(
            {
                type:LANDING, 
                screen_access:ScreenAccess.homeScreenLandingTab
            }
        );
    }
}


