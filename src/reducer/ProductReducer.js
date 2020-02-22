const initialState = {
    products: [],
    count: 0,
    error: "",
    isDownloading: false
}

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PRODUCT":
            return{
                ...state,
                products: action.payload,
                count: action.payload.length
            }
        case "ADD_ERROR":{
            return{
                ...state,
                error: action.payload
            }
        }
        case "SET_PRODUCT_DOWNLOADING":
            return{
                ...state,
                isDownloading: !state.isDownloading
            }
        default:
            return state;
    }
}

export const SetProductAC = products => ({
    type: "SET_PRODUCT",
    payload: products
});

export const SetErrorAC = text => ({
    type: "ADD_ERROR",
    payload: text
});

export const SetProductIsDownloading = () =>({
    type: "SET_PRODUCT_DOWNLOADING"
});

export default ProductReducer;

