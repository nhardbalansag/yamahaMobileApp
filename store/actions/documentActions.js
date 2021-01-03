import DocumentCategory from '../../model/documentCategory';

export const SET_DOCUMENT_CATEGORY = 'SET_DOCUMENT_CATEGORY';

export const viewAllDocumentCategory = () =>{
    return async (dispatch) => {
        
        const  response = await fetch('https://www.bbalansag.online/api/viewAllDocumentCategory', {
            method: 'GET',
            headers:{
                'Content-type': 'application/json',
                'KEY': '$2y$10$Claj2RctAH3V4HRtSx17b.Q0WTh2STQyusvNZeCNo3UfSRakzStlC'
            }
        });
        const responseData = await response.json();
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
