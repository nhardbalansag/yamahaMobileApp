import { 
    GET_DOCUMENT_CHOICE
} from '../actions/documentActions';

const initialState = {
    documentCategory:[],
    documentId:null
};

export default (state = initialState, action) => {
    switch(action.type){
        case GET_DOCUMENT_CHOICE :
            return {
                ...state,
                documentId: action.documentId
            }
    }
    return state;
}
