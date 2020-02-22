const initialState = {
    Price: 0,
    Name: "",
    MakerId: "",
    CatalogId: "",
    error: "",
    status: false,
    isDownloading: false
}

const AddProductReducer = (state = initialState, action) => {
    switch(action.type){
        case "CHANGE_FIELD":
            return {
                ...state,
                [action.field]: action.payload
            }
        case "ADD_ERROR":
            return{
                ...state,
                error: action.payload
            }
        case "SET_STATUS":
            return{
                ...state,
                status: !state.status
            }
        case "SET_IS_DOWNLOADING": 
            return{
                ...state,
                isDownloading: !state.isDownloading
            }
        default:
            return state;
    }
}

export const ChangeFieldAC = (field, text) => ({
    type: "CHANGE_FIELD",
    field: field,
    payload: text
});

export const AddErrorAC = (text) => ({
    type: "ADD_ERROR",
    payload: text
});

export const SetStatusAC = () => ({
    type: "SET_STATUS"
});

export const SetIsDownloadingAC = () => ({
    type: "SET_IS_DOWNLOADING"
});

export default AddProductReducer;