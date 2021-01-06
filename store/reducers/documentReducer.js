import { 
    SET_DOCUMENT_CATEGORY,
    GET_DOCUMENT_CHOICE
} from '../actions/documentActions';

const initialState = {
    documentCategory:[],
    documentId:null
};

export default (state = initialState, action) => {
    switch(action.type){
        case SET_DOCUMENT_CATEGORY :
            return {
                ...state,
                documentCategory: action.documentCategory
            }

        case GET_DOCUMENT_CHOICE :
            return {
                ...state,
                documentId: action.documentId
            }
    }
    return state;
}
