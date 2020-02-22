export const initialState = {
    products: [],
    count: 0,
    totalPrice: 0
}

const BasketReducer = (state = initialState, action) => {
    switch(action.type){
        case "REMOVE_FROM_BASKET":
            return{
                ...state,
                products: action.payload,
                count: action.payload.length,
                totalPrice: action.totalPrice
            }
        case "ADD_PRODUCT": 
            return{
                ...state,
                products:[
                    ...state.products,
                    action.payload
                ],
                count: state.count+1,
                totalPrice: state.totalPrice + action.payload.price
            }
        default:
            return state;
    }
}

export const AddProductToBasket = product => ({
    type: "ADD_PRODUCT",
    payload: product
});

export const RemoveFromBasket = (products, totalPrice) => ({
    type: "REMOVE_FROM_BASKET",
    payload: products,
    totalPrice
});

export default BasketReducer;