const initialState = {
    orders: [],
    isDownloading: false
}


const OrderReducer = (state = initialState, action) => {
    switch(action.type){
        case "SET_ORDERS":
            return{
                ...state,
                orders: action.payload
            }
        case "SET_DOWNLOADING_ORDER":
            return{
                ...state,
                isDownloading: !state.isDownloading
            }
        default:
            return state;
    }
}


export const SetOrdersAC = (orders) => ({
    type: "SET_ORDERS",
    payload: orders
});

export const SetIsDownloadOrderAC = () =>({
    type: "SET_DOWNLOADING_ORDER"
});

export default OrderReducer;