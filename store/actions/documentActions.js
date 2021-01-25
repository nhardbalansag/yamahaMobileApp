import DocumentCategory from '../../model/documentCategory';

export const SET_DOCUMENT_CATEGORY = 'SET_DOCUMENT_CATEGORY';
export const GET_DOCUMENT_CHOICE = 'GET_DOCUMENT_CHOICE';
export const SUBMIT_DOCUMENT = 'SUBMIT_DOCUMENT';

export const viewAllDocumentCategory = () =>{
    return async (dispatch, getState) => {
        
        const  response = await fetch('https://www.bbalansag.online/api/viewAllDocumentCategory', {
            method: 'GET',
            headers:{
                'Content-type': 'application/json',
                'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC',
                'Authorization': 'Bearer ' + getState().products.Tokendata, 
            }
        });
        const responseData = await response.json();

        
        console.log(responseData)
        const loadedDocumentCategory = [];
        for(const key in responseData){
            loadedDocumentCategory.push(
                new DocumentCategory( 
                    responseData[key].id, 
                    responseData[key].title, 
                    responseData[key].description
                ))
        }

        dispatch(
            {
                type:SET_DOCUMENT_CATEGORY, 
                documentCategory:loadedDocumentCategory
            }
        );
    }
}


export const sendDocument = (file, documentId, token) => {
    
    return async (dispatch, getState) =>{
        const response =  await fetch('https://www.bbalansag.online/api/send-document', {
            method:'POST',
            headers:{
                'content-type': 'multipart/form-data',
                'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(
                { 
                    file 
                }
            )
        });

        const responseData = await response.json();
console.log(responseData)
        // console.log(JSON.stringify(
        //     { 
        //         file 
        //     }
        // ))
    }
} 


export const setChoiceDocument = (documentId) =>{
    return async (dispatch) =>{
        dispatch(
            {
                type: GET_DOCUMENT_CHOICE, 
                documentId: documentId
            }
        );
    }
}
