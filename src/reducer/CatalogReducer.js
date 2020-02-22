const initialState = {
    catalogs: [],
    count: 0,
    error: "",
    isDownloading: false
}

const CatalogReducer = (state = initialState, action) => {
    switch(action.type){
        case "SET_CATALOG":
            return{
                ...state,
                catalogs: action.payload,
                count: action.payload.length
            }
        case "SET_ERROR":
            return{
                ...state,
                error: action.payload
            }
        case "SET_IS_DOWNLOADING_CATALOG":
            return{
                ...state,
                isDownloading: !state.isDownloading
            }
        default: 
            return state;
    }
}

export const SetCatalogAC = catalogs => ({
    type: "SET_CATALOG",
    payload: catalogs
});

export const SetErrorAC = text => ({
    type: "SET_ERROR",
    payload: text
});

export const SetIsDownloadingAC = () => ({
    type: "SET_IS_DOWNLOADING_CATALOG"
});

export default CatalogReducer;