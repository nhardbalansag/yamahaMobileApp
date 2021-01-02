import { SET_DOCUMENT_CATEGORY } from '../actions/documentActions';

const initialState = {
    documentCategory:[]
};

export default (state = initialState, action) => {
    switch(action.type){
        case SET_DOCUMENT_CATEGORY :
            return {
                ...state,
                documentCategory: action.documentCategory
            }
    }
    return state;
}
