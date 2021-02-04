import DocumentCategory from '../../model/documentCategory';

export const GET_DOCUMENT_CHOICE = 'GET_DOCUMENT_CHOICE';
export const SUBMIT_DOCUMENT = 'SUBMIT_DOCUMENT';

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
